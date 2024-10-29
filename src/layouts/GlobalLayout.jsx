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
  const {
    getBoats,
    getEmployees,
    getManagers,
    updateBoats,
    show,
    setShow,
    notification,
  } = useContext(GlobalContext);
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
        {show && (
          <div
            class="min-w-64 max-w-96 fixed animate-pulse z-[100000] bottom-4 right-8 bg-[#001229] shadow border border-gray-800 text-sm text-gray-200 rounded-2xl "
            role="alert"
            tabindex="-1"
            aria-labelledby="hs-toast-soft-color-teal-label"
          >
            <div
              id="hs-toast-soft-color-teal-label"
              class="w-full flex justify-between items-center p-4"
            >
              <div className="w-auto flex gap-3 justify-start items-center">
                <span className="bg-gray-800 flex items-center justify-center w-16 h-12 rounded-xl">
                  <img
                    src="/logo.png"
                    alt=""
                    className="w-full h-full rounded-xl"
                  />
                </span>

                <div className="w-[70%] flex flex-col justify-start items-start">
                  <span className="font-bold text-white">
                    {notification?.title?.length > 20
                      ? notification?.title?.slice(0, 20) + "..."
                      : notification?.title}
                  </span>
                  <span>
                    {notification?.body?.length > 30
                      ? notification?.body?.slice(0, 30) + "..."
                      : notification?.body}
                  </span>
                </div>
              </div>
              <div class="ms-auto">
                <button
                  onClick={() => setShow(false)}
                  type="button"
                  class="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 "
                  aria-label="Close"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="shrink-0 size-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-[calc(100%-60px)] bg-[#1A293D] text-white   flex flex-col justify-start items-start">
          {page}
        </div>
      </div>
    </div>
  );
};

export default GlobalLayout;
