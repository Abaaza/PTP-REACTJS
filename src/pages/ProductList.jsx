////////////////////////////////////////////////////////////
// src/pages/ProductList.jsx
////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";

export default function ProductList() {
  // State for all products fetched from server
  const [products, setProducts] = useState([]);

  // Search, filter, sort states
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");

  // For printing and bulk selection
  const [quantities, setQuantities] = useState({});
  const [selected, setSelected] = useState({});

  // Distinct brands for filter dropdown
  const [distinctBrands, setDistinctBrands] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    fetch("https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/{proxy+}/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        // Gather distinct brands for dropdown
        const brands = [...new Set(data.map((p) => p.brand || ""))];
        setDistinctBrands(brands.filter((b) => b.trim()));
      })
      .catch((err) => console.error(err));
  }, []);

  // Handle changes in the quantity input field
  const handleQuantityChange = (id, val) => {
    setQuantities({ ...quantities, [id]: val });
  };

  // Toggle selection for a product in the bulk selection
  const toggleSelect = (id) => {
    setSelected({ ...selected, [id]: !selected[id] });
  };

  // Single item print
  const handlePrintTag = (id) => {
    const qty = parseInt(quantities[id] || 1, 10);
    window.open(`https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/{proxy+}/api/pdf/tag/${id}/${qty}`, "_blank");
  };

  // Bulk print for selected items
  const handleBulkPrint = async () => {
    // Collect all checked product IDs
    const productIds = Object.keys(selected).filter((id) => selected[id]);
  
    if (!productIds.length) {
      alert("No items selected");
      return;
    }
  
    // Build 'items' array, matching each productId to its quantity
    const items = productIds.map((id) => ({
      productId: id,
      qty: parseInt(quantities[id] || 1, 10),
    }));
  
    try {
      const res = await fetch("https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/{proxy+}/api/pdf/print-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }), // <-- pass as items
      });
      if (!res.ok) {
        alert("Bulk print failed");
        return;
      }
      const blob = await res.blob();
      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");
    } catch (err) {
      console.error(err);
      alert("Bulk print error");
    }
  };
  

  // Filter and sort logic
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

  // Inline style objects for quick reference
  const headingStyle = {
    textAlign: "center",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  };

  const filterContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
    marginBottom: "1rem",
  };

  const filterInputStyle = {
    flex: "1",
    minWidth: "150px",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
  };

  const thtdStyle = {
    border: "1px solid #ccc",
    padding: "0.5rem",
  };

  const printBtnStyle = {
    padding: "0.3rem 0.8rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "0.5rem",
  };

  const updateLinkStyle = {
    padding: "0.3rem 0.8rem",
    backgroundColor: "#ffc107",
    color: "#000",
    borderRadius: "4px",
    cursor: "pointer",
    textDecoration: "none",
  };

  const bulkBtnStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#6c757d",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div>
      <h2 style={headingStyle}>All Products</h2>

      {/* Filters + Sort */}
      <div style={filterContainer}>
        <input
          style={filterInputStyle}
          placeholder="Search Model # or Desc"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          style={filterInputStyle}
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        >
          <option value="">All Brands</option>
          {distinctBrands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
        <select
          style={filterInputStyle}
          value={sortPrice}
          onChange={(e) => setSortPrice(e.target.value)}
        >
          <option value="">No Sort</option>
          <option value="asc">Price Asc</option>
          <option value="desc">Price Desc</option>
        </select>
        <button style={bulkBtnStyle} onClick={handleBulkPrint}>
          Bulk Print
        </button>
      </div>

      {/* Main Table */}
      <table style={tableStyle}>
        <thead>
          <tr style={{ backgroundColor: "#f0f0f0" }}>
            <th style={thtdStyle} />
            <th style={thtdStyle}>Model #</th>
            <th style={thtdStyle}>Description</th>
            <th style={thtdStyle}>Brand</th>
            <th style={thtdStyle}>Category</th>
            <th style={thtdStyle}>Price</th>
            <th style={thtdStyle}>Qty</th>
            <th style={thtdStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => (
            <tr key={p._id}>
              <td style={thtdStyle}>
                <input
                  type="checkbox"
                  checked={!!selected[p._id]}
                  onChange={() => toggleSelect(p._id)}
                />
              </td>
              <td style={thtdStyle}>{p.modelNumber}</td>
              <td style={thtdStyle}>{p.description}</td>
              <td style={thtdStyle}>{p.brand}</td>
              <td style={thtdStyle}>{p.category}</td>
              <td style={thtdStyle}>${p.tagPrice?.toFixed(2) || "0.00"}</td>
              <td style={thtdStyle}>
                <input
                  type="number"
                  min="1"
                  style={{ width: "60px", padding: "0.3rem" }}
                  value={quantities[p._id] || 1}
                  onChange={(e) => handleQuantityChange(p._id, e.target.value)}
                />
              </td>
              <td style={thtdStyle}>
                <button
                  onClick={() => handlePrintTag(p._id)}
                  style={printBtnStyle}
                >
                  Print
                </button>
                <a href={`/update-product/${p._id}`} style={updateLinkStyle}>
                  Update
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
