import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CheckMark } from "../../assets/export";
import AddFleetInput from "../fleet/AddFleetInput";
import VerifyPhoneEditOtp from "./VerifyPhoneEditOtp";

const PhoneEditModal = ({ isOpen, setIsOpen, setVerifyOtp }) => {
  const { navigate } = useContext(GlobalContext);
  const phoneEditRef = useRef();
  const toggleModal = (e) => {
    if (phoneEditRef.current && !phoneEditRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed top-0 left-0 w-screen h-screen bg-black/30 transition-all duration-500 z-50 flex items-center justify-center ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={phoneEditRef}
        className="bg-[#001229] w-[553px] h-auto flex flex-col  gap-5 justify-start items-center p-8 shadow-sm rounded-[14px]"
      >
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <div className="w-full h-auto flex flex-col justify-center items-start gap-1 ">
            <h1 className="text-[22px] leading-[29.7px] text-white font-bold">
              Change Phone Number
            </h1>
            <span className="text-[16px] leading-[21.6px] text-white font-normal text-left">
              We will send a verification code to your new number to ensure{" "}
              <br /> its accuracy and security.
            </span>
          </div>

          <div className="w-full h-auto flex flex-col gap-8 mt-10">
            <AddFleetInput
              label={"New Phone Number"}
              disabled={false}
              state={""}
            />
            <button
              onClick={() => {
                setVerifyOtp(true);
                setIsOpen(false);
              }}
              className="w-full  h-[42px] bg-[#199BD1] text-white rounded-[8px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneEditModal;
