import React, { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { CheckMark } from "../../assets/export";
import AddFleetInput from "../fleet/AddFleetInput";
import AuthSubmitBtn from "../onboarding/AuthSubmitBtn";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "./Toaster";

const VerifyPhoneEditOtp = ({
  isOpen,
  setIsOpen,
  setPhoneUpdated,
  phoneNum,
  setPhoneNumber,
}) => {
  const { navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input if it's not the last
      if (index < otp.length - 1) {
        inputs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = ""; // Clear the current field
      setOtp(newOtp);

      // Move focus to the previous input if it's not the first
      if (index > 0) {
        inputs.current[index - 1].focus();
      }
    }
  };

  const getOtpValue = () => {
    return parseInt(otp.join(""), 10);
  };

  const phoneEditOtpRef = useRef();
  const toggleModal = (e) => {
    if (
      phoneEditOtpRef.current &&
      !phoneEditOtpRef.current.contains(e.target)
    ) {
      setIsOpen(false);
    }
  };

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      let obj = { phone: phoneNum?.phone, otp: getOtpValue() };
      const response = await axios.put("/owner/profile/verify/phone", obj);
      if (response?.status === 200) {
        setPhoneUpdated(true);
        setIsOpen(false);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      // setIsOpen(false)
      // setPhoneNumber("")
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { phone: "+17862337361" };
      const response = await axios.put("/owner/profile/resend/phone", obj);

      if (response.status === 200) {
        SuccessToast("OTP has been sent to your email");
        setOtp(Array(6).fill(""));
      } else {
        ErrorToast(response?.data?.message);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleVerifyOtp();
            }}
            className="w-full h-auto"
          >
            <div className="w-full h-auto flex justify-start items-center gap-4 my-4 ">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                  className="w-[48px] h-[68px] rounded-lg bg-transparent outline-none text-center border-[1px] border-[#c2c6cb] text-white text-2xl focus-within:border-[#55C9FA] flex items-center justify-center"
                />
              ))}
            </div>
            <div className="w-full h-auto flex  mb-20 flex-col gap-1 justify-start items-start  ">
              <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
                <span className="text-[13px] font-medium text-[#C2C6CB]">
                  Didn't recieve a code?
                </span>
                <button
                  type="button"
                  disabled={resendLoading}
                  onClick={handleResendOtp}
                  className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
                >
                  Resend now
                </button>
              </div>
            </div>
            <AuthSubmitBtn text={"Verify"} loader={loading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPhoneEditOtp;
