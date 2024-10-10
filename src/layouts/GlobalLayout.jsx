import React, { useContext, useEffect } from "react";
import { Logo } from "../assets/export";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { GlobalContext } from "../contexts/GlobalContext";
import { AuthContext } from "../contexts/AuthContext";
import Cookies from "js-cookie";

const GlobalLayout = ({ page }) => {
  const { token } = useContext(AuthContext);
  const { getBoats, getEmployees, getManagers, updateBoats } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  const validateToken = () => {
    if (token) {
      getBoats();
      getEmployees();
      getManagers();
      return true;
    } else {
      navigate("/login");
      Cookies.remove("token");
      return false;
    }
  };

  useEffect(() => {
    validateToken();
  }, [updateBoats]);
  return (
    <div className="w-full h-screen overflow-y-hidden flex justify-start items-start">
      <Sidebar />
      <div className="w-full lg:w-[calc(100%-280px)]  h-full relative flex flex-col justify-start items-start">
        <Navbar />
        <div className="w-full h-[calc(100%-60px)] bg-[#1A293D] text-white   flex flex-col justify-start items-start">
          {page}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
