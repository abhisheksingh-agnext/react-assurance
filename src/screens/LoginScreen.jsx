import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Input, Text, VStack, Flex } from "@chakra-ui/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const emailStr="Agnext";
    const passStr="Agnext123";

    if (emailStr== email && passStr == password) {
      localStorage.setItem("loggedIn", true);
      // navigate("/home");
      navigate("/servicesDashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Flex height="100vh" width="100vw"align="center" justify="center"  bgGradient="linear(to-r, blue.400, purple.500)">
      <Box p={8} maxW="sm" w="full" bg="white"  borderRadius="xl" boxShadow="lg">
        <VStack spacing={5} >
          <Text fontSize="xl" color="blue.600" fontWeight="bold">Login</Text>
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
          <Button colorScheme="blue" width="full"  size="lg" _hover={{ bg: "blue.600" }} onClick={handleLogin}>Login</Button>
          <Text fontSize="sm">
            Don't have an account?{" "}
            <Text as="span" color="blue.500" cursor="pointer" onClick={() => navigate("/signup")}>
              Sign up
            </Text>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
}
