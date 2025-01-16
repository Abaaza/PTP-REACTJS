import React from 'react';
import {
  Box,
  Container,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Divider,
} from '@chakra-ui/react';

const Footer = () => {
  return (
<Box as="footer" bg="gray.800" color="white" pt={6}>

     
      <Container maxW="container.lg" pb={6}>
        <SimpleGrid columns={[1, 3]} spacing={8}>
          {/* Contact Info */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              Contact Us
            </Heading>
            <Text>Dayton, Nevada, USA</Text>
            <Text>Phone: (866) 707-1900</Text>
            <Text>Fax: (866) 422-6257</Text>
            <Text>Email: info@pricetagpro.com</Text>
          </Box>

          {/* Quick Links */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              Quick Links
            </Heading>
            <Stack spacing={2}>
              <Link href="#trial" color="white">
                Free Trial
              </Link>
              <Link href="#shop" color="white">
                Purchase Vinyl Sleeves
              </Link>
              <Link href="#support" color="white">
                Support
              </Link>
              <Link href="#about" color="white">
                About Us
              </Link>
            </Stack>
          </Box>

          {/* Additional Resources */}
          <Box>
            <Heading as="h3" size="md" mb={4}>
              Additional Resources
            </Heading>
            <Stack spacing={2}>
              <Link href="#promos" color="white">
                Promotion Logos
              </Link>
              <Link href="#templates" color="white">
                Price Tag Templates
              </Link>
              <Link href="#faq" color="white">
                FAQ’s
              </Link>
              <Link href="#contact" color="white">
                Contact
              </Link>
            </Stack>
          </Box>
        </SimpleGrid>
      </Container>
      <Box bg="gray.900" py={4} textAlign="center">
        <Text>
          © {new Date().getFullYear()} Price Tag Pro™. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
