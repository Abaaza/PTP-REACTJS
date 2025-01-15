// src/pages/UpdateProduct.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState({
    modelNumber: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
    tertiaryCategory: "",
    features: "",
    tagPrice: 0,
    salePrice: 0,
    cost: 0,
    rebate: 0,
    tagExpires: "",
  });

  useEffect(() => {
    fetch(
      `https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/products/${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        setForm({
          modelNumber: data.modelNumber || "",
          description: data.description || "",
          brand: data.brand || "",
          category: data.category || "",
          subCategory: data.subCategory || "",
          tertiaryCategory: data.tertiaryCategory || "",
          features: data.features?.join(", ") || "",
          tagPrice: data.tagPrice || 0,
          salePrice: data.salePrice || 0,
          cost: data.cost || 0,
          rebate: data.rebate || 0,
          tagExpires: data.tagExpires ? data.tagExpires.slice(0, 10) : "",
        });
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const featuresArr = form.features
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);

    const payload = {
      modelNumber: form.modelNumber,
      description: form.description,
      brand: form.brand,
      category: form.category,
      subCategory: form.subCategory,
      tertiaryCategory: form.tertiaryCategory,
      features: featuresArr,
      tagPrice: parseFloat(form.tagPrice) || 0,
      salePrice: parseFloat(form.salePrice) || 0,
      cost: parseFloat(form.cost) || 0,
      rebate: parseFloat(form.rebate) || 0,
      tagExpires: form.tagExpires || null,
    };

    try {
      const res = await fetch(
        `https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/products/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (res.ok) {
        toast({
          title: "Success",
          description: "Product updated successfully.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/products");
      } else {
        toast({
          title: "Error",
          description: "Error updating product.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Server error.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box width="100%" mt={8} p={6} bg="white" boxShadow="lg" rounded="md">
      <Heading as="h2" mb={4} textAlign="center">
        Update Product
      </Heading>
      <form onSubmit={handleUpdate}>
        <SimpleGrid columns={{ base: 1, md: 1, lg: 2 }} spacing={4}>
          <FormControl isRequired>
            <FormLabel>Model Number</FormLabel>
            <Input
              name="modelNumber"
              value={form.modelNumber}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Brand</FormLabel>
            <Input
              name="brand"
              value={form.brand}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Category</FormLabel>
            <Input
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Sub-Category</FormLabel>
            <Input
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tertiary Category</FormLabel>
            <Input
              name="tertiaryCategory"
              value={form.tertiaryCategory}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Features (comma separated)</FormLabel>
            <Input
              name="features"
              value={form.features}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tag Price</FormLabel>
            <Input
              name="tagPrice"
              type="number"
              step="0.01"
              value={form.tagPrice}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Sale Price</FormLabel>
            <Input
              name="salePrice"
              type="number"
              step="0.01"
              value={form.salePrice}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Cost</FormLabel>
            <Input
              name="cost"
              type="number"
              step="0.01"
              value={form.cost}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Rebate</FormLabel>
            <Input
              name="rebate"
              type="number"
              step="0.01"
              value={form.rebate}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tag Expires</FormLabel>
            <Input
              name="tagExpires"
              type="date"
              value={form.tagExpires}
              onChange={handleChange}
            />
          </FormControl>
        </SimpleGrid>
        <Button type="submit" colorScheme="blue" mt={6}>
          Update
        </Button>
      </form>
    </Box>
  );
}
