import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Link,
  List,
  ListItem,
  ListIcon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Icon,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';


const HomePage = () => {
  return (
    <Box bg="gray.50" minH="100vh" display="flex" flexDirection="column">
      {/* Top Bar / Contact Info */}


      {/* Navigation / Quick Links */}
    
      {/* Hero Section */}
      <Box
        as="section"
        bgGradient="linear(to-r, teal.400, blue.500)"
        color="white"
        py={[10, 20]}
        textAlign="center"
      >
        <Container maxW="container.lg">
          <Heading as="h1" size="2xl" mb={4}>
            Professional Price Tags in Seconds!
          </Heading>
          <Text fontSize="xl" maxW="650px" mx="auto">
            Your silent sales person for Appliances, Electronics, and Furniture
            Price Tags. Save valuable time with our ready-made price tag
            templates and searchable database!
          </Text>
          <Stack
            direction={['column', 'row']}
            spacing={4}
            justify="center"
            mt={8}
          >
            <Button
              as="a"
              href="#download"
              colorScheme="teal"
              variant="solid"
              size="lg"
            >
              Custom Tags
            </Button>
            <Button
              as="a"
              href="#free-trial"
              colorScheme="orange"
              variant="solid"
              size="lg"
            >
              Start Free Trial
            </Button>
            <Button
              as="a"
              href="#purchase"
              colorScheme="pink"
              variant="solid"
              size="lg"
            >
              Purchase Tag Sleeves
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* About / Benefits Section */}
      <Box as="section" py={[10, 16]} bg="white">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Why Price Tag Pro?
          </Heading>
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Free Trial 
              </Heading>
              <List spacing={2}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  No Contract, Cancel Anytime!
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  FREE 30 Day Evaluation!
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="teal.500" />
                  Unlimited Use, Full Features!
                </ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h3" size="md" mb={4}>
                Your Silent Salesperson
              </Heading>
              <Text>
                Price Tag Pro allows you to create custom, automated Price Tags
                loaded with model details including description, features,
                colors, Energy Star, delivery, and financing information.
                Professional price tags in seconds!
              </Text>
              <Text fontWeight="bold" mt={4}>
                Only $37 a Month with a Free 30-Day No Obligation Evaluation!
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box as="section" py={[10, 16]} bg="gray.100">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            Price Tag Pro Benefits
          </Heading>
          <SimpleGrid columns={[1, 2, 4]} spacing={8}>
            <VStack
              bg="white"
              borderRadius="md"
              p={6}
              spacing={3}
              shadow="md"
              align="start"
            >
              <Heading as="h3" size="sm">
                Creates Professional Price Tags
              </Heading>
              <Text fontSize="sm">
                Print custom tags that fit neatly in a vinyl sleeve for a truly
                professional look. Displays all MAP / Estimated retail / UMRP
                pricing.
              </Text>
              <Link color="teal.600" href="#read-more">
                Read more
              </Link>
            </VStack>
            <VStack
              bg="white"
              borderRadius="md"
              p={6}
              spacing={3}
              shadow="md"
              align="start"
            >
              <Heading as="h3" size="sm">
                Instant Access & Rebate Inclusion
              </Heading>
              <Text fontSize="sm">
                References, specs & dimensions for all model numbers updated
                automatically each month.
              </Text>
              <Link color="teal.600" href="#read-more">
                Read more
              </Link>
            </VStack>
            <VStack
              bg="white"
              borderRadius="md"
              p={6}
              spacing={3}
              shadow="md"
              align="start"
            >
              <Heading as="h3" size="sm">
                Gives You the Sales Advantage!
              </Heading>
              <Text fontSize="sm">
                Key features for your sales team are printed directly on the
                tag, turning your price tags into silent salespeople.
              </Text>
              <Link color="teal.600" href="#read-more">
                Read more
              </Link>
            </VStack>
            <VStack
              bg="white"
              borderRadius="md"
              p={6}
              spacing={3}
              shadow="md"
              align="start"
            >
              <Heading as="h3" size="sm">
                Model #/Category Search
              </Heading>
              <Text fontSize="sm">
                Quickly find thousands of models for appliances, electronics,
                and furniture catalogs.
              </Text>
              <Link color="teal.600" href="#read-more">
                Read more
              </Link>
            </VStack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box as="section" py={[10, 16]} bg="white">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" textAlign="center" mb={10}>
            What Our Customers Say
          </Heading>
          <SimpleGrid columns={[1, 2, 3]} spacing={[8, 8, 10]}>
            <Box bg="gray.100" borderRadius="md" p={6} shadow="sm">
              <Text fontStyle="italic" mb={4}>
                “Price Tag Pro™ is a wonderful addition, closing the sale is 100%
                easier and faster using PTP!”
              </Text>
              <Text fontWeight="bold">– Chris McGinnis, Wayside Furniture</Text>
            </Box>
            <Box bg="gray.100" borderRadius="md" p={6} shadow="sm">
              <Text fontStyle="italic" mb={4}>
                “I would be lost without Price Tag Pro!”
              </Text>
              <Text fontWeight="bold">– Rick Capobianco, All Cape MHAC</Text>
            </Box>
            <Box bg="gray.100" borderRadius="md" p={6} shadow="sm">
              <Text fontStyle="italic" mb={4}>
                “Price Tag Pro makes pricing my store so much simpler, getting
                Price Tag Pro is a no-brainer!”
              </Text>
              <Text fontWeight="bold">
                – Big Ed Wernsing, Wernsing’s Appliance & Video & Sleep Center
              </Text>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Call to Action / Pricing */}
      <Box bg="teal.600" color="white" py={[10, 16]} textAlign="center">
        <Container maxW="container.lg">
          <Heading as="h2" size="xl" mb={4}>
            Get Started with Price Tag Pro Today!
          </Heading>
          <Text fontSize="lg" mb={6}>
            Only $37 a month with a Free 30-Day No Obligation Evaluation!
          </Text>
          <Button
            as="a"
            href="#free-trial"
            colorScheme="orange"
            size="lg"
            fontWeight="bold"
          >
            Start Your Free Trial
          </Button>
        </Container>
      </Box>

   

    </Box>
  );
};

export default HomePage;
