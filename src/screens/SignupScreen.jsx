import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack,Flex  } from "@chakra-ui/react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Account created successfully!");
    navigate("/");
  };

  return (
        <Flex height="100vh" width="100vw"align="center" justify="center"  bgGradient="linear(to-r, blue.400, purple.500)">
      <Box p={8} maxW="sm" w="full" bg="white"  borderRadius="xl" boxShadow="lg">
      <VStack spacing={5} >
        <Text fontSize="xl" color="blue.600"fontWeight="bold">Sign Up</Text>
        <Input 
          placeholder="Email" 
          value={email} 
          focusBorderColor="blue.400"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          value={password} 
          focusBorderColor="blue.400"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button colorScheme="green" width="full"  size="lg" _hover={{ bg: "green.600" }}onClick={handleSignup}>Sign Up</Button>
        <Text fontSize="sm">
          Already have an account? 
          <Text as="span" color="blue.500" cursor="pointer" onClick={() => navigate("/")}>
            Login
          </Text>
        </Text>
      </VStack>
    </Box></Flex>
  );
}
