import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => Cookies.get("token"));
  const [name, setName] = useState(Cookies.get("name"));
  const [email, setEmail] = useState(Cookies.get("email"));

  const login = (data) => {
    if (data) {
      Cookies.set("token", data?.data?.token);
      Cookies.set("name", data?.data?.userRecord?.name);
      Cookies.set("email", data?.data?.userRecord?.email);

      setToken(data?.data?.token);
      setName(data?.data?.userRecord?.name);
      setEmail(data?.data?.userRecord?.email);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    // Cookies.clear();
    setToken(null);
  };

  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, email, name }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
