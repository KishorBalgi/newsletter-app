import { useAxios } from "./useAxios";

export const useAuth = () => {
  const axios = useAxios();

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      return response.data.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to login");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post("/auth/signup", {
        name,
        email,
        password,
      });

      return response.data.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Failed to register");
    }
  };

  // Is Logged in:
  const isLoggedIn = async () => {
    try {
      const response = await axios.get("/auth/is-logged-in");
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to register");
    }
  };

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return { login, register, isLoggedIn, logout };
};
