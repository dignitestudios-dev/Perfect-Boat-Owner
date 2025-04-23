import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const SidebarLink = ({ link, onCloseDrawer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      {!link.submenu ? (
        <NavLink
          to={link.url}
          className={({ isActive }) =>
            `no-underline-important w-full h-[46px] outline-none rounded-[12px] font-medium flex items-center justify-between transition-all duration-500 px-3 gap-2 ${
              isActive
                ? "bg-[#199BD1] color-white "
                : "bg-transparent text-white/50 hover:bg-[#199BD1] hover:text-white"
            }`
          }
          onClick={onCloseDrawer}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{link.icon}</span>
            <span className="capitalize text-sm">{link.title}</span>
          </div>
        </NavLink>
      ) : (
        <button
          onClick={toggleSubmenu}
          className={` w-full h-[46px] outline-none rounded-[12px] font-medium flex items-center justify-between transition-all duration-500 px-3 gap-2 ${
            isOpen
              ? "bg-[#199BD1] text-white"
              : "bg-transparent text-white/50 hover:bg-[#199BD1] hover:text-white"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{link.icon}</span>
            <span className="capitalize text-sm">{link.title}</span>
          </div>
          <span className="text-sm">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        </button>
      )}

      {/* Submenu Links */}
      {link.submenu && isOpen && (
        <div className="ml-4">
          {link.submenu.map((sublink, index) => (
            <NavLink
              key={index}
              to={sublink.url}
              className={({ isActive }) =>
                `no-underline-important w-full h-[46px] rounded-[12px] mt-1 font-medium flex items-center justify-start transition-all duration-500 px-3 gap-2 ${
                  isActive
                    ? " color-white"
                    : "bg-transparent text-white/50  hover:text-white"
                }`
              }
              onClick={onCloseDrawer}
            >
              <span className="capitalize text-sm mx-4">{sublink.title}</span>
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
