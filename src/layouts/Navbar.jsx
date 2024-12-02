import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import { GlobalContext } from "../contexts/GlobalContext";
import Cookies from "js-cookie";

const Navbar = () => {
  const { navigate, notifications } = useContext(GlobalContext);
  console.log(notifications,"notifications")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(
    (notification) => !notification?.isRead
  )?.length;
console.log(unreadCount,"unreadCount")
  return (
    <div className="w-full h-[60px] bg-[#001229] flex justify-end items-center px-4">
      <div className="flex items-center gap-6 py-4 font-normal text-gray-900">
        <Link
          to="/notifications"
          className="w-[29px] h-[29px] rounded-lg flex items-center justify-center bg-[#1A293D] p-1 relative"
        >
          <IoNotificationsOutline className="text-white w-full h-full" />

          {unreadCount > 0 && (
            <span className="w-[18px] h-[18px] bg-[#F44237] text-white text-xs rounded-full flex  items-center justify-center absolute -top-2 -right-2">
              {unreadCount}
            </span>
          )}
        </Link>

        <button
          onClick={() => setIsDropdownOpen((prev) => !prev)}
          className="flex items-center gap-2 relative"
        >
          {/* Image for profile link */}
          <img
            src={`https://ui-avatars.com/api/?name=${Cookies.get("name")}`}
            alt="Profile"
            className="w-[28px] h-[28px] rounded-full cursor-pointer"
            onClick={() => navigate("/profile", "Profile")}
          />
          <div className="w-auto flex flex-col justify-start items-start">
            <p
              className="text-[11px] font-normal text-white/50"
              onClick={() => navigate("/profile", "Profile")}
            >
              Welcome back,
            </p>
            <p
              className="text-[11px] font-medium text-white"
              onClick={() => navigate("/profile", "Profile")}
            >
              {Cookies.get("name")}
            </p>
          </div>

          <button className="text-xl text-white">
            {/* <RxCaretDown /> */}
          </button>

          {/* Dropdown menu
          <div
            className={`w-[120px] h-[60px] rounded-[12px] absolute top-12 shadow-md p-3 transition-all duration-300 flex flex-col justify-start items-start gap-2 right-0 bg-[#21344C] z-[1000] ${
              isDropdownOpen ? "scale-100" : "scale-0"
            }`}
          >
            <button
              onClick={() => navigate("/profile", "Profile")}
              className="text-white text-[11px] font-medium leading-[14.85px]"
            >
              Profile
            </button>
            <button
              onClick={() => navigate("/settings/notifications", "Notifications")}
              className="text-white text-[11px] font-medium leading-[14.85px]"
            >
              Settings
            </button>
          </div> */}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
