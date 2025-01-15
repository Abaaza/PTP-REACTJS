// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";

export default function App() {
  return (
    <BrowserRouter>
      <Box display="flex" flexDirection="column" minH="100vh" bg="gray.50">
        <Navigation />
        <Box as="main" flex="1" py={8} px={4}>
          <Routes>
            <Route path="/" element={<h1>Price Tag Pro™ Web</h1>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/update-product/:id" element={<UpdateProduct />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </BrowserRouter>
  );
}
