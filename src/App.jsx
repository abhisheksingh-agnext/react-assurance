import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./screens/LoginScreen";
import Signup from "./screens/SignupScreen";
import Home from "./screens/HomeScreen";
import ServicesDashboard from "./screens/stageConfig/StageConfig";

// import theme from "./theme";

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/servicesDashboard" element={<ServicesDashboard />} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}
