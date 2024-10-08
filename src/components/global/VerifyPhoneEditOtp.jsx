import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CheckMark } from "../../assets/export";
import AddFleetInput from "../fleet/AddFleetInput";

const VerifyPhoneEditOtp = ({ isOpen, setIsOpen, setPhoneUpdated }) => {
  const { navigate } = useContext(GlobalContext);
  const arr = [1, 2, 3, 4, 5, 6];

  const phoneEditOtpRef = useRef();
  const toggleModal = (e) => {
    if (
      phoneEditOtpRef.current &&
      !phoneEditOtpRef.current.contains(e.target)
    ) {
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
        ref={phoneEditOtpRef}
        className="bg-[#02203A] w-[553px] h-auto flex flex-col  gap-5 justify-start items-center p-8 shadow-sm rounded-[14px]"
      >
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <div className="w-full h-auto flex flex-col justify-center items-start gap-1 ">
            <h1 className="text-[22px] leading-[29.7px] text-white font-bold">
              Change Phone Number
            </h1>
            <span className="text-[16px] leading-[21.6px] text-white font-normal text-left">
              Please enter the code that we send to your new phone number.
            </span>
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-1">
            <div className="w-full h-auto flex justify-start items-center mt-10 gap-4 my-4 ">
              {arr.map((item) => {
                return (
                  <input
                    key={item}
                    className="w-[48px] h-[68px] rounded-lg bg-transparent outline-none text-center border-[1px] border-[#fff]/[35%] text-white text-2xl focus-within:border-[#55C9FA] flex items-center justify-center"
                  />
                );
              })}
            </div>
            <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
              <div className="w-full lg:w-[434px] flex gap-1 justify-start items-center ">
                <span className="text-[13px] font-medium text-[#C2C6CB]">
                  Didn't recieve a code?
                </span>
                <button className="outline-none text-[13px] border-none text-[#199BD1] font-bold">
                  Resend now
                </button>
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-8 mt-10">
            <button
              onClick={() => {
                setIsOpen(false);
                setPhoneUpdated(true);
              }}
              className="w-full  h-[42px] bg-[#199BD1] text-white rounded-[8px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Verify"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneEditOtp;
