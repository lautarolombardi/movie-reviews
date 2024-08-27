import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <Box bgColor={"background.500"} color={"text.500"} height={"100vh"}>
      <Outlet />
    </Box>
  );
};
export default DefaultLayout;
