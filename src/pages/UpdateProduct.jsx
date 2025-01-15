////////////////////////////////////////////////////////////
// src/pages/UpdateProduct.jsx
////////////////////////////////////////////////////////////
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    fetch(`https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/products/${id}`)
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
      const res = await fetch(`https://qxxaz9rivc.execute-api.me-south-1.amazonaws.com/dev/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        alert("Product updated!");
        navigate("/products");
      } else {
        alert("Error updating product.");
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
      <h2 style={{ textAlign: "center", marginTop: "1rem" }}>Update Product</h2>
      <form onSubmit={handleUpdate} style={containerStyle}>
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
          Update
        </button>
      </form>
    </div>
  );
}
