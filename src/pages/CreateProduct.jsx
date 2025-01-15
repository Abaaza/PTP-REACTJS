////////////////////////////////////////////////////////////
// src/pages/CreateProduct.jsx
////////////////////////////////////////////////////////////
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    modelNumber: "",
    description: "",
    brand: "",
    category: "",
    subCategory: "",
    tertiaryCategory: "",
    features: "",
    tagPrice: "",
    salePrice: "",
    cost: "",
    rebate: "",
    tagExpires: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
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
      tagPrice: parseFloat(form.tagPrice || 0),
      salePrice: parseFloat(form.salePrice || 0),
      cost: parseFloat(form.cost || 0),
      rebate: parseFloat(form.rebate || 0),
      tagExpires: form.tagExpires || null,
    };

    try {
      const res = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Product created!");
        navigate("/products");
      } else {
        alert("Error creating product.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error.");
    }
  };

  const containerStyle = {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "1rem",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    borderRadius: "6px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };
  const labelStyle = { fontWeight: "bold", marginBottom: "0.2rem" };
  const inputStyle = {
    padding: "0.5rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
  };
  const buttonStyle = {
    padding: "0.5rem 1rem",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    alignSelf: "flex-start",
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Create Product</h2>
      <form onSubmit={handleSubmit} style={containerStyle}>
        <div>
          <label style={labelStyle}>Model Number</label>
          <input
            style={inputStyle}
            name="modelNumber"
            value={form.modelNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label style={labelStyle}>Description</label>
          <input
            style={inputStyle}
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Brand</label>
          <input
            style={inputStyle}
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Category</label>
          <input
            style={inputStyle}
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Sub-Category</label>
          <input
            style={inputStyle}
            name="subCategory"
            value={form.subCategory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Tertiary Category</label>
          <input
            style={inputStyle}
            name="tertiaryCategory"
            value={form.tertiaryCategory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Features (comma separated)</label>
          <input
            style={inputStyle}
            name="features"
            value={form.features}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Tag Price</label>
          <input
            style={inputStyle}
            name="tagPrice"
            type="number"
            step="0.01"
            value={form.tagPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Sale Price</label>
          <input
            style={inputStyle}
            name="salePrice"
            type="number"
            step="0.01"
            value={form.salePrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Cost</label>
          <input
            style={inputStyle}
            name="cost"
            type="number"
            step="0.01"
            value={form.cost}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Rebate</label>
          <input
            style={inputStyle}
            name="rebate"
            type="number"
            step="0.01"
            value={form.rebate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={labelStyle}>Tag Expires</label>
          <input
            style={inputStyle}
            name="tagExpires"
            type="date"
            value={form.tagExpires}
            onChange={handleChange}
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Create
        </button>
      </form>
    </div>
  );
}
