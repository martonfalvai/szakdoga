import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axiosConfig";

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  avatar: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("access_token");
    const savedUser = sessionStorage.getItem("user");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      axios.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;
    }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await axios.post("/api/login", {
      email,
      password,
    });

    const { access_token, user } = response.data;

    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    setToken(access_token);
    setUser(user);
  };

  const logout = async () => {
    if (!token) return;

    const response = await axios.post("/api/logout");

    const { message } = await response.data;

    if (message === "Logout successful" || response.status == 200) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      setToken(null);
      setUser(null);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    const response = await axios.post("/api/register", {
      name,
      email,
      password,
      password_confirmation,
    });

    const { access_token, user } = response.data;

    sessionStorage.setItem("access_token", access_token);
    sessionStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;

    setToken(access_token);
    setUser(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
