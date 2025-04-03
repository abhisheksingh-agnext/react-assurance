import React from "react";
import {
  Box,
  Container,
  Flex,
  Button,
  Heading,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

/**
 * Header component for handles the top navigation bar with back button and title
 * @param {Object} props - Component props
 * @param {Function} props.onBack - Function to handle back navigation
 * @returns {JSX.Element} Header component
 */
const Header = ({ onBack }) => (
  <Box py={4} bg="white" borderBottomWidth={1} shadow="sm" position="absolute" top={0} left={0} right={0} zIndex={10}>
    <Container maxW="100%" px={6}>
      <Flex justify="space-between" align="center">
        <Button 
          leftIcon={<ChevronLeftIcon />} 
          variant="ghost" 
          onClick={onBack}
        >
          Back to Configuration
        </Button>
        <Heading size="md" color="gray.700">Stage Process Flow</Heading>
        <Button colorScheme="green" size="sm">Export PDF</Button>
      </Flex>
    </Container>
  </Box>
);

export default Header; 