import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { REGEXS } from "../../constants/shares";
import { useAuthContext } from "../../context/AuthContext";
import { fetchData } from "../../utils/fetch";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { isAuthenticated } = useAuthContext();
  const toast = useToast();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  const handleSubmitRegister = async (values) => {
    try {
      const res = await fetchData("/users", {
        body: JSON.stringify(values),
        headers: {
          "Content-type": "application/json",
        },
        method: "POST",
      });

      navigate("/login");
    } catch (error) {
      toast({
        title: "Ya existe un usuario registrado con ese email",
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box
      color={"text.500"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Heading mb={10}>Registrarme</Heading>
      <VStack
        spacing={3}
        as="form"
        w={"100%"}
        maxW={"md"}
        onSubmit={handleSubmit(handleSubmitRegister)}
      >
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Nombre</FormLabel>
          <Input
            id="name"
            {...register("name", {
              required: "Debes ingresar un nombre",
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            {...register("email", {
              required: "Debes ingresar una contraseña",
              pattern: {
                value: REGEXS.EMAIL,
                message: "Debes ingresar un email correcto",
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
            type="password"
            id="password"
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
          Registrarme
        </Button>
      </VStack>
    </Box>
  );
};
export default RegisterPage;
