import React from 'react';
import {
  Box,
  Flex,
  IconButton,
  Button,
  HStack,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';

const Navigation = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLinks = ({ onClick, direction = "horizontal" }) => {
    const Component = direction === "horizontal" ? HStack : VStack;
    return (
      <Component spacing={6} align={direction === "horizontal" ? "center" : "stretch"}>
        <ChakraLink as={Link} to="/" onClick={onClick}>
          Home
        </ChakraLink>
        <ChakraLink as={Link} to="/products" onClick={onClick}>
          All Products
        </ChakraLink>
        <ChakraLink as={Link} to="/create-product" onClick={onClick}>
          Create Product
        </ChakraLink>
        <ChakraLink as={Link} to="/custom-price-tags" onClick={onClick}>
          Custom Price Tags
        </ChakraLink>
        <ChakraLink as={Link} to="/documentation" onClick={onClick}>
          Documentation
        </ChakraLink>
        <ChakraLink as={Link} to="/price-tag-templates" onClick={onClick}>
          Price Tag Templates
        </ChakraLink>
        <ChakraLink as={Link} to="/shop" onClick={onClick}>
          Shop
        </ChakraLink>
        <ChakraLink as={Link} to="/support" onClick={onClick}>
          Support
        </ChakraLink>
      </Component>
    );
  };

  return (
    <Box 
      bg="gray.800" 
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
    >
      {/* Desktop View */}
      <Box display={{ base: 'none', md: 'block' }}>
        {/* Logo Section */}
        <Box borderBottom="1px solid" borderColor="gray.700">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            color="white"
            textAlign="center"
            py={4}
          >
            Price Tag Pro
          </Text>
        </Box>

        {/* Navigation Section */}
        <Box>
          <Flex
            maxW="1400px"
            mx="auto"
            py={4}
            px={6}
            alignItems="center"
            justify="space-between"
          >
            <Box
              color="white"
              width="full"
              justifyContent="center"
              display="flex"
            >
              <NavLinks direction="horizontal" />
            </Box>

            {/* User Menu */}
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                rightIcon={<ChevronDownIcon />}
                color="white"
                _hover={{ bg: 'gray.700' }}
                _active={{ bg: 'gray.700' }}
              >
                <FaUserCircle size="1.5rem" />
              </MenuButton>
              <MenuList bg="white">
                <MenuItem as={Link} to="/manage-subscription">
                  Manage Subscription
                </MenuItem>
                <MenuItem as={Link} to="/account-settings">
                  Account Settings
                </MenuItem>
                <MenuItem>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Box>
      </Box>

      {/* Mobile View */}
      <Box display={{ base: 'block', md: 'none' }}>
        <Flex py={4} px={4} alignItems="center" justify="space-between">
          <IconButton
            icon={<HamburgerIcon />}
            onClick={onOpen}
            variant="ghost"
            color="white"
            _hover={{ bg: 'gray.700' }}
            aria-label="Open Menu"
            size="lg"
          />
          
          <Text
            fontSize="xl"
            fontWeight="bold"
            color="white"
          >
            Price Tag Pro
          </Text>

          <Menu>
            <MenuButton
              as={IconButton}
              variant="ghost"
              color="white"
              _hover={{ bg: 'gray.700' }}
              _active={{ bg: 'gray.700' }}
              icon={<FaUserCircle size="1.5rem" />}
            />
            <MenuList bg="white">
              <MenuItem as={Link} to="/manage-subscription">
                Manage Subscription
              </MenuItem>
              <MenuItem as={Link} to="/account-settings">
                Account Settings
              </MenuItem>
              <MenuItem>Sign Out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg="gray.800" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <NavLinks onClick={onClose} direction="vertical" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navigation;