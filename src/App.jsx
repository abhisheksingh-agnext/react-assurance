import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./screens/LoginScreen";
import Signup from "./screens/SignupScreen";
import Home from "./screens/HomeScreen";
import PostApiInt from "./screens/PostApiInt";
import ServicesDashboard from "./screens/stageConfig/StageConfig";
import { Provider } from "react-redux";
import store from "./redux/store";

// import theme from "./theme";

export default function App() {
  return (
    <Provider store={store}>
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/servicesDashboard" element={<ServicesDashboard />} />

          //Experiment
          <Route path="/postApi" element={<PostApiInt />} />

        </Routes>
      </Router>
    </ChakraProvider>
    </Provider>
  );
}
