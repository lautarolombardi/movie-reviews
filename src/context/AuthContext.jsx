import { useToast } from "@chakra-ui/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../utils/fetch";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") ? true : false
  );
  const navigate = useNavigate();
  const toast = useToast();

  const logIn = async (userData) => {
    try {
      const { data } = await fetchData("/auth/login", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
        },
      });

      toast({
        title: `Bienvenido de nuevo, ${data.name}`,
        status: "success",
        isClosable: true,
      });

      setIsAuthenticated(true);
      setUser(data);
      localStorage.setItem("token", data.accessToken);
      navigate("/");
    } catch (err) {
      toast({
        title: "Usuario o contraseña incorrectos",
        status: "error",
        isClosable: true,
      });
    }
  };

  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchData("/auth/validate-user", {
        method: "POST",
        headers: {
          Authorization: token,
        },
      })
        .then((res) => {
          setUser(res);
          setIsAuthenticated(true);
        })
        .catch((err) => {
          console.error(err);
          logOut();
        });
    }
  }, [logOut]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
