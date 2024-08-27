import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useAuthContext } from "../../context/AuthContext";

const AuthCallback = () => {
  const { setUser, setIsAuthenticated } = useAuthContext();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const name = params.get("name");
    const role = params.get("role");
    const avatar = params.get("avatar");
    const token = params.get("token");

    const userData = { id, name, role, avatar };

    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem("token", token);

    toast({
      status: "success",
      title: `Bienvenido de nuevo, ${name}`,
      isClosable: true,
    });

    navigate("/");
  }, [setIsAuthenticated, setUser, toast, navigate]);

  return <Loading />;
};

export default AuthCallback;
