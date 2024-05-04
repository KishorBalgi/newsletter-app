"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "hooks/useAuth";

const AuthContext = createContext({
  user: null,
  isValidating: true,
  login: (token: string) => {},
  logout: () => {},
});

const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isValidating, setIsValidating] = useState(true);

  useEffect(() => {
    // Validate token with server
    validateToken();
  }, []);

  const validateToken = async () => {
    try {
      setIsValidating(true);

      const { isLoggedIn } = useAuth();
      const response = await isLoggedIn();
      if (response.status === "success") {
        console.log("Token is valid:", response.data);
        const userData = response.data.author;
        setUser(userData);
      } else {
        // Handle invalid/expired token
        localStorage.removeItem("token");
        setUser(null);
      }
      setIsValidating(false);
    } catch (error) {
      setIsValidating(false);
      console.error("Error validating token:", error);
    }
  };

  const login = async (token) => {
    // Store token in local storage
    console.log("Token stored in local storage:", token);
    localStorage.setItem("token", token);
    // Validate token with server
    validateToken();
  };

  const logout = () => {
    // Remove token from local storage
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isValidating, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuthContext };
