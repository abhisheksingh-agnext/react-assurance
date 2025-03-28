import { Box, Flex, VStack, Text, Button, SimpleGrid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };

  return (
    <Flex h="100vh">
      {/* Sidebar */}
      <Box w="250px" bg="blue.500" color="white" p={5}  bgGradient="linear(to-r, blue.400, purple.500)" >
        <VStack spacing={6} align="stretch">
          <Text fontSize="2xl" fontWeight="bold">Dashboard</Text>
          <Button variant="ghost" colorScheme="white"_hover={{ bg: "blue.600" }}>Overview</Button>
          <Button variant="ghost" colorScheme="white"_hover={{ bg: "blue.600" }}>Reports</Button>
          <Button variant="ghost" colorScheme="white"_hover={{ bg: "blue.600" }}>Settings</Button>
          <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
        </VStack>
      </Box>
      
      {/* Main Content */}
      <Flex flex={1} p={10} direction="column" align="center">
        <Text fontSize="3xl" fontWeight="bold" color="gray.700" mb={6}>Analysis Overview</Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full" maxW="900px">
          <Box p={6}  bgGradient="linear(to-r, blue.400, blue.600)" color="white" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">Revenue</Text>
            <Text fontSize="2xl">$12,340</Text>
          </Box>
          <Box p={6}  bgGradient="linear(to-r, green.400, green.600)" color="white" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">Users</Text>
            <Text fontSize="2xl">1,250</Text>
          </Box>
          <Box p={6}  bgGradient="linear(to-r, purple.400, purple.600)" color="white" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">Conversions</Text>
            <Text fontSize="2xl">8.5%</Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
