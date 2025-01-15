import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";

export default function App() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  };

  // Let’s allow main content to stretch, but center if desired
  const mainStyle = {
    flex: 1,
    padding: "2rem 1rem",
  };

  // Keep a card-like container for internal content if you prefer
  const contentStyle = {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    borderRadius: "6px",
    padding: "2rem",
  };

  return (
    <BrowserRouter>
      <div style={containerStyle}>
        <Navigation />
        <main style={mainStyle}>
          <div style={contentStyle}>
            <Routes>
              <Route path="/" element={<h1>Price Tag Pro™ Web</h1>} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/update-product/:id" element={<UpdateProduct />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
