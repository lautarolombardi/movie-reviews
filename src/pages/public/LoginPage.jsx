import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { REGEXS } from "../../constants/shares";
const API_URL = import.meta.env.VITE_API_URL;

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { isAuthenticated, logIn } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const handleSubmitLogin = (userData) => {
    logIn(userData);
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <Box
      height={"100%"}
      color={"text.500"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={10}>Inicio de sesión</Heading>
      <VStack
        spacing={5}
        as="form"
        w={"100%"}
        maxW={"xs"}
        onSubmit={handleSubmit(handleSubmitLogin)}
      >
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            {...register("email", {
              required: "Debes ingresar un email",
              pattern: {
                value: REGEXS.EMAIL,
                message: "Ingresa un email correcto",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Contraseña</FormLabel>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "Debes ingresar una contraseña",
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="accent"
          isLoading={isSubmitting}
          type="submit"
        >
          Entrar
        </Button>
      </VStack>
      <Button
        mt={10}
        leftIcon={<Icon as={FaGoogle} />}
        colorScheme="blue"
        variant="solid"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
      <HStack mt={12}>
        <Text>¿No tienes una cuenta?</Text>
        <Link to={"/register"}>
          <Button colorScheme="accent">Registrate aquí</Button>
        </Link>
      </HStack>
    </Box>
  );
};
export default LoginPage;
