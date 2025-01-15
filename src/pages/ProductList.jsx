// src/pages/ProductList.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  useToast,
  HStack,
  Spinner,
} from "@chakra-ui/react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [quantities, setQuantities] = useState({});
  const [selected, setSelected] = useState({});
  const [distinctBrands, setDistinctBrands] = useState([]);
  const toast = useToast();

  useEffect(() => {
    setLoading(true);
    fetch("https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const brands = [...new Set(data.map((p) => p.brand || ""))];
        setDistinctBrands(brands.filter((b) => b.trim()));
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleQuantityChange = (id, val) => {
    setQuantities({ ...quantities, [id]: val });
  };

  const toggleSelect = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
  };

  // Single item print
  const handlePrintTag = (id) => {
    const qty = parseInt(quantities[id] || 1, 10);
    window.open(
      `https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/pdf/tag/${id}/${qty}`,
      "_blank"
    );
  };

  // Bulk print for selected items
  const handleBulkPrint = async () => {
    const productIds = Object.keys(selected).filter((id) => selected[id]);
    if (!productIds.length) {
      toast({
        title: "No items selected",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const items = productIds.map((id) => ({
      productId: id,
      qty: parseInt(quantities[id] || 1, 10),
    }));

    try {
      const res = await fetch(
        "https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/pdf/print-bulk",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        }
      );
      if (!res.ok) {
        toast({
          title: "Bulk print failed",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      const blob = await res.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error(err);
      toast({
        title: "Bulk print error",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Filter and sort
  const filtered = products
    .filter((p) => {
      const sTerm = searchTerm.trim().toLowerCase();
      if (sTerm) {
        const match =
          (p.modelNumber || "").toLowerCase().includes(sTerm) ||
          (p.description || "").toLowerCase().includes(sTerm);
        if (!match) return false;
      }
      if (brandFilter) {
        if ((p.brand || "").toLowerCase() !== brandFilter.toLowerCase())
          return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (!sortPrice) return 0;
      if (sortPrice === "asc") return a.tagPrice - b.tagPrice;
      if (sortPrice === "desc") return b.tagPrice - a.tagPrice;
      return 0;
    });

  // Show a Spinner if loading
  if (loading) {
    return (
      <Box textAlign="center" mt="40px">
        <Spinner size="xl" color="blue.500" />
      </Box>
    );
  }

  return (
    <Box>
      <Heading textAlign="center" mb={4} size="lg">
        All Products
      </Heading>

      <HStack
        spacing={3}
        mb={4}
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
      >
        <Input
          placeholder="Search Model # or Desc"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width={["100%", "200px"]}
        />
        <Select
          placeholder="All Brands"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          width={["100%", "150px"]}
        >
          {distinctBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </Select>
        <Select
          placeholder="No Sort"
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
          width={["100%", "150px"]}
        >
          <option value="asc">Price Asc</option>
          <option value="desc">Price Desc</option>
        </Select>
        <Button colorScheme="gray" onClick={handleBulkPrint}>
          Bulk Print
        </Button>
      </HStack>

      <Box overflowX="auto">
        <Table variant="simple" bg="white">
          <Thead bg="gray.100">
            <Tr>
              <Th></Th>
              <Th>Model #</Th>
              <Th>Description</Th>
              <Th>Brand</Th>
              <Th>Category</Th>
              <Th>Price</Th>
              <Th>Qty</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filtered.map((p) => (
              <Tr key={p._id}>
                <Td>
                  <Checkbox
                    isChecked={!!selected[p._id]}
                    onChange={() => toggleSelect(p._id)}
                  />
                </Td>
                <Td>{p.modelNumber}</Td>
                <Td>{p.description}</Td>
                <Td>{p.brand}</Td>
                <Td>{p.category}</Td>
                <Td>${p.tagPrice?.toFixed(2) || "0.00"}</Td>
                <Td>
                  <Input
                    type="number"
                    min="1"
                    width="60px"
                    value={quantities[p._id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(p._id, e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Button
                    size="sm"
                    colorScheme="green"
                    mr={2}
                    onClick={() => handlePrintTag(p._id)}
                  >
                    Print
                  </Button>
                  <Button
                    as="a"
                    href={`/update-product/${p._id}`}
                    size="sm"
                    colorScheme="yellow"
                  >
                    Update
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
