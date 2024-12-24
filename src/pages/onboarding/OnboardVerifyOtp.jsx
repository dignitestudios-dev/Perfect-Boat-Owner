import React, { useContext, useState, useRef } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import EmailVerificationSuccessModal from "../../components/onboarding/EmailVerificationSuccessModal";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "../../axios.js";
import { ErrorToast, SuccessToast } from "./../../components/global/Toaster";
import getFCMToken from "../../firebase/getFcmToken.js";
import CountDown from "../../components/onboarding/CountDown.jsx";

const OnboardVerifyOtp = () => {
  const { navigate } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [isActive, setIsActive] = useState(true);
  const [seconds, setSeconds] = useState(30);
  const [navigateString, setNavigateString] = useState("");

  const inputs = useRef([]);
  const { login } = useContext(AuthContext);
  const otpEmail = sessionStorage.getItem("email");

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

  const [isVerified, setIsVerified] = useState(false);

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      const fcmToken = await getFCMToken();
      let obj = {
        email: otpEmail,
        otp: getOtpValue(),
        fcmToken: fcmToken,
      };
      const response = await axios.post("/auth/otp/verify/email", obj);
      if (response?.status === 200) {
        login(response?.data);
        setLoading(false);
        SuccessToast("Email Verified");
        if (response?.data?.data?.isEmailVerified === true) {
          if (response?.data?.data?.isSubscribed === true) {
            setNavigateString("/welcome-aboard");
            // navigate("/welcome-aboard");
            setIsVerified(true);
          } else {
            setNavigateString("/select-package");
            // navigate("/select-package");
            setIsVerified(true);
          }
        } else {
          navigate("/onboard-verify-otp");
        }
      } else {
        ErrorToast("Error");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      setResendLoading(true);
      let obj = { email: otpEmail };
      const response = await axios.post("/auth/otp/resend/email", obj);

      if (response.status === 200) {
        // navigate("/select-package");
        SuccessToast("OTP has been sent to your email");
        setResendLoading(false);
        setOtp(Array(6).fill(""));
        handleRestart();
      } else {
        ErrorToast(response?.data?.message);
      }
    } catch (err) {
      console.log("🚀 ~ handleResendOtp ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  const handleRestart = () => {
    setSeconds(30);
    setIsActive(true);
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleVerifyOtp();
        }}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Verification
          </h1>
          <p className=" font-normal text-[16px] text-white leading-[21.6px] tracking-[0.2px]">
            Enter the OTP sent to your email
          </p>
        </div>
        <div className="w-full h-auto flex justify-start items-center gap-4 my-4 ">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => e.preventDefault()}
              ref={(el) => (inputs.current[index] = el)}
              className="w-[48px] h-[68px] rounded-lg bg-transparent outline-none text-center border-[1px] border-[#c2c6cb] text-white text-2xl focus-within:border-[#55C9FA] flex items-center justify-center"
            />
          ))}
        </div>
        <div className="w-full h-auto flex  mb-20 flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Didn't receive an OTP?
            </span>
            {isActive ? (
              <CountDown
                isActive={isActive}
                setIsActive={setIsActive}
                seconds={seconds}
                setSeconds={setSeconds}
              />
            ) : (
              <button
                type="button"
                disabled={resendLoading}
                onClick={handleResendOtp}
                className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
              >
                {resendLoading ? "Resending..." : "Resend now"}
              </button>
            )}
          </div>
        </div>
        <AuthSubmitBtn text={"Verify"} loader={loading} />

        {isVerified && (
          <EmailVerificationSuccessModal
            isOpen={isVerified}
            setIsOpen={setIsVerified}
            navigateString={navigateString}
          />
        )}
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default OnboardVerifyOtp;
