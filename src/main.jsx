import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ToasterContainer } from "./components/global/Toaster.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
      <ToasterContainer />
        <AuthProvider>
        <App />
        </AuthProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
