import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [auth, setAuth] = useState({
    user: null,
    token: ""
  });

  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {

    const data = localStorage.getItem("auth");

    if (data) {

      const parsed = JSON.parse(data);

      setAuth({
        user: parsed.user,
        token: parsed.token
      });

      axios.defaults.headers.common["Authorization"] =
        `Bearer ${parsed.token}`;
    }

    setAuthLoading(false);

  }, []);

  useEffect(() => {

    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${auth.token}`;
    }

  }, [auth?.token]);

  return (
    <AuthContext.Provider value={[auth, setAuth, authLoading]}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);