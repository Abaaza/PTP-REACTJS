import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";
import HomePage from "./pages/HomePage"

export default function App() {
  return (
    <BrowserRouter>
      <Box 
        display="flex" 
        flexDirection="column" 
        minH="100vh" 
        bg="gray.50"
        overflow="hidden"
      >
        <Navigation />
        <Box 
          as="main" 
          flex="1" 
          py={[4, 6, 8]}
    
          width="100%" 
          maxW="100%"
          mt={{ base: "60px", md: "105px" }} // Accounts for navbar height on mobile and desktop
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
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