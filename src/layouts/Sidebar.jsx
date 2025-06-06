import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Logo, SideLogo } from "../assets/export";
import { sidebarArr } from "../constants/sidebarArr";
import SidebarLink from "./SidebarLink";
import { RiLogoutCircleLine, RiMenuLine } from "react-icons/ri";
import { AuthContext } from "../contexts/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div>
      {/* Drawer Toggle Button */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
      >
        <RiMenuLine size={24} />
      </button>

      {/* Sidebar Container */}

      <div
        className={`fixed lg:static top-0 left-0 w-[280px] bg-[#001229] py-4 px-6 flex flex-col justify-start items-start transition-transform duration-300 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40 h-screen overflow-y-auto`}
      >
        <Link to="/dashboard" className="">
          <img src={SideLogo} alt="perfectboat_logo" className="w-32 " />
        </Link>

        <div className="w-full mt-10 flex flex-col justify-start items-start gap-2">
          {sidebarArr?.map((link, index) => (
            <SidebarLink
              key={index}
              link={link}
              onCloseDrawer={handleCloseDrawer}
            />
          ))}
          <button
            onClick={() => {
              logout();
              handleCloseDrawer();
            }}
            className={`w-full h-[46px] outline-none rounded-[12px] 
            bg-transparent text-white/50 
            font-medium flex items-center justify-start transition-all duration-500 hover:bg-[#199BD1] hover:text-white px-3 gap-2`}
          >
            <span className="text-2xl">
              <RiLogoutCircleLine />
            </span>
            <span className="capitalize text-[13px] font-normal">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay when drawer is open */}
      {isDrawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-30"
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
