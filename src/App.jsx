import { ChakraProvider } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    background: {
      500: "#002147",
    },
    text: {
      500: "#f3f3f3",
    },
    accent: {
      500: "#016EEB",
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ChakraProvider>
  );
};
export default App;
