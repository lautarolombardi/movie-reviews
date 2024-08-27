import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "../Footer";
import Navbar from "../Navbar";

const AuthLayout = () => {
  return (
    <Grid
      minHeight={"100vh"}
      templateRows={"80px 1fr max-content"}
      bgColor={"background.500"}
      color={"text.500"}
    >
      <Navbar />
      <Box paddingY={"3rem"}>
        <Outlet />
      </Box>
      <Footer />
    </Grid>
  );
};
export default AuthLayout;
