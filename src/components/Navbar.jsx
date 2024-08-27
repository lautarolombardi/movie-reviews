import {
  Avatar,
  Box,
  Button,
  Container,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logOut } = useAuthContext();
  const { user } = useAuthContext();

  return (
    <Box as="nav">
      <Container
        maxW={"6xl"}
        h={"100%"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Link to={"/"}>
          <Image
            src="https://wv5n.cuevana.biz/index_files/cuevana3.png"
            maxW={"200px"}
          />
        </Link>
        <Menu>
          {!isAuthenticated ? (
            <Link to={"/login"}>
              <Button colorScheme="accent">Iniciar sesión</Button>
            </Link>
          ) : (
            <MenuButton>
              <Avatar src={user?.avatar} />
            </MenuButton>
          )}
          <MenuList bg={"background.500"}>
            <MenuGroup title={`Bienvenido, ${user?.name}`}>
              {isAuthenticated ? (
                <Box>
                  <MenuItem
                    as={"a"}
                    href="/dashboard"
                    bg={"background.500"}
                    _hover={{ bg: "accent.500", color: "text.500" }}
                  >
                    Panel de control
                  </MenuItem>
                  <MenuItem
                    bg={"background.500"}
                    _hover={{ bg: "accent.500", color: "text.500" }}
                    onClick={() => logOut()}
                  >
                    Cerrar sesión
                  </MenuItem>
                </Box>
              ) : (
                <Link to={"/login"}>
                  <MenuItem>Iniciar sesión</MenuItem>
                </Link>
              )}
            </MenuGroup>
          </MenuList>
        </Menu>
      </Container>
    </Box>
  );
};
export default Navbar;
