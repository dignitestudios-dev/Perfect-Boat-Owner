import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const test = "";

  function formatTimestampToDate(timestamp) {
    const date = new Date(timestamp);
    const options = { month: "2-digit", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options).replace(/\//g, "-");
  }
  return (
    <GlobalContext.Provider value={{ test, navigate, formatTimestampToDate }}>
      {children}
    </GlobalContext.Provider>
  );
};
