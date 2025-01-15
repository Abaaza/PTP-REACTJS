// src/components/Navigation.jsx
import React from "react";
import {
  Box,
  Flex,
  Link as ChakraLink,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function Navigation() {
  return (
    <Box bg="gray.800" boxShadow="md" py={2} px={4}>
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        color="white"
      >
        {/* Logo / Title */}
        <Flex align="center">
          <Text fontSize="lg" fontWeight="bold" mr={8}>
            Price Tag Pro
          </Text>
          <Flex as="nav" align="center" gridGap={4}>
            <ChakraLink as={Link} to="/" fontWeight="semibold">
              Home
            </ChakraLink>
            <ChakraLink as={Link} to="/products" fontWeight="semibold">
              All Products
            </ChakraLink>
            <ChakraLink as={Link} to="/create-product" fontWeight="semibold">
              Create Product
            </ChakraLink>
          </Flex>
        </Flex>

        {/* User Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="User Menu"
            icon={<FaUserCircle size="1.5rem" />}
            variant="ghost"
            _hover={{ bg: "gray.700" }}
            color="white"
            rightIcon={<ChevronDownIcon ml={2} />}
          />
          <MenuList bg="white">
            <MenuItem as={Link} to="/manage-subscription" color="black">
              Manage Subscription
            </MenuItem>
            <MenuItem as={Link} to="/account-settings" color="black">
              Account Settings
            </MenuItem>
            <MenuItem color="black">Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
}
