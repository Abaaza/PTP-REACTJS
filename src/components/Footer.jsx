// src/components/Footer.jsx
import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      py={4}
      textAlign="center"
      mt="auto"
    >
      <Text mb={0}>
        © {new Date().getFullYear()} Price Tag Pro™. All rights reserved.
      </Text>
    </Box>
  );
}
