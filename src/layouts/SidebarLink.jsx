import React, { useContext, useState } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const SidebarLink = ({ link, onCloseDrawer }) => {
  const { navigate, activeLink } = useContext(GlobalContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSubmenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (url, title) => {
    navigate(url, title);
    onCloseDrawer();
  };

  return (
    <div className="w-full">
      <button
        onClick={
          link.submenu
            ? toggleSubmenu
            : () => handleNavigation(link?.url, link?.title)
        }
        className={`w-full h-[46px] outline-none rounded-[12px] ${
          location.pathname === link?.url
            ? "bg-[#199BD1] text-white"
            : "bg-transparent text-white/50 "
        } font-medium flex items-center justify-between transition-all duration-500 hover:bg-[#199BD1] hover:text-white px-3 gap-2`}
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">{link?.icon}</span>
          <span className="capitalize text-[13px] font-medium">
            {link?.title}
          </span>
        </div>
        {link.submenu && (
          <span className="text-sm">
            {isOpen ? <FaCaretUp /> : <FaCaretDown />}
          </span>
        )}
      </button>
      {link.submenu && isOpen && (
        <div className="ml-8 mt-2 flex flex-col justify-start items-start gap-2">
          {link.submenu.map((sublink, index) => (
            <button
              key={index}
              onClick={() => handleNavigation(sublink.url, sublink.title)}
              className={` w-full  outline-none rounded-[12px] 
              bg-transparent ${
                sublink.url === location.pathname
                  ? "text-[#199BD1]"
                  : "text-white/50"
              }  hover:text-[#199BD1]
              font-medium flex items-center justify-start transition-all duration-500   px-3 gap-2`}
            >
              <span className="capitalize text-[13px] font-medium">
                {sublink.title}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
