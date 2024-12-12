import React, { useContext, useState } from "react";
import { SplashLogo } from "../../assets/export";
import QRModal from "../../components/onboarding/QRModal";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const Splash = () => {
  const [isQrOpen, setIsQrOpen] = useState(false);
  const { navigate } = useContext(GlobalContext);
  return (
    <div className="bg-[#001229] w-screen min-h-screen h-auto flex flex-col gap-32 pt-[136px]  justify-start items-center relative">
      <span className="w-[386px] h-[386px] rounded-full bg-[#00638C] blur-[95px] flex items-center justify-center absolute top-16 left-[calc(50%-180px)]" />
      <img
        src={SplashLogo}
        alt="splash_logo"
        className="z-50 lg:w-[480px] object-cover"
      />

      <div className="w-auto flex flex-col gap-8 px-4 md:px-0 justify-center items-center">
        <h1 className="text-[32px] text-center font-bold leading-[43.2px] text-white z-10">
          Will you be managing boats with a team?
        </h1>

        <div className="w-full flex flex-col gap-4 justify-center items-center z-10">
          <button
            onClick={() => navigate("/signup")}
            className="w-full md:w-[434px] h-[52px] rounded-[12px] focus:border-[1px] border-[#55C9FA] bg-[#1A293D] text-white text-[16px] font-normal tracking-[-0.24px] leading-[21.6px] flex justify-center items-center"
          >
            Yes, with a team
          </button>
          <button
            onClick={() => {
              setIsQrOpen(true);
            }}
            className="w-full md:w-[434px] h-[52px] rounded-[12px] focus:border-[1px] border-[#55C9FA] bg-[#1A293D] text-white text-[16px] font-normal tracking-[-0.24px] leading-[21.6px] flex justify-center items-center"
          >
            No, I will manage myself
          </button>

          {/* <div className="w-auto flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Already have an account?
            </span>
            <button
              className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
          </div> */}
        </div>

        <QRModal isOpen={isQrOpen} setIsOpen={setIsQrOpen} />
      </div>
    </div>
  );
};

export default Splash;
