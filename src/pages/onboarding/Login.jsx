import React, { useContext, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import getFCMToken from "../../firebase/getFcmToken";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { navigate } = useContext(GlobalContext);

  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const fcmToken = await getFCMToken();
      console.log("🚀 ~ handleLogin ~ fcmToken:", fcmToken);
      // console.log(fcmToken);
      let obj = {
        email: formData.email,
        password: formData.password,
        fcmToken: fcmToken,
        role: "owner",
      };

      const response = await axios.post("/auth/signIn", obj);
      if (response.status === 200) {
        login(response.data);
        if (response?.data?.data?.isEmailVerified === true) {
          if (response?.data?.data?.isSubscribed === true) {
            navigate("/dashboard");
            SuccessToast("Logged in successfully");
          } else {
            navigate("/select-package");
            SuccessToast("Please purchase a plan to continue.");
          }
        } else {
          sessionStorage.setItem("email", formData?.email);
          let obj = { email: formData?.email };

          const response = await axios.post("/auth/otp/resend/email", obj);
          if (response.status === 200) {
            SuccessToast("Please verify your email to continue.");
            navigate("/onboard-verify-otp");
          }
        }
        // navigate("/dashboard");
        setLoading(false);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <div className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col justify-start items-center gap-8">
        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Log In
          </h1>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4 pt-6">
            <AuthInput
              register={register("email", {
                required: "Please enter your email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
              })}
              text={"Email Address"}
              placeholder={"Enter your email here"}
              type={"text"}
              error={errors.email}
            />
            <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1">
              <AuthInput
                register={register("password", {
                  required: "Please enter your password.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long.",
                  },
                })}
                maxLength={12}
                text={"Password"}
                placeholder={"Enter your password here"}
                type={"password"}
                error={errors.password}
              />
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[13px] font-medium text-[#fff]"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          <div className="pt-8">
            <AuthSubmitBtn text={"Log in"} loader={loading} />
          </div>

          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center pt-8">
              <span className="text-[13px] font-medium text-[#C2C6CB]">
                Don’t have an account?
              </span>
              <button
                type="button"
                className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Create one
              </button>
            </div>
          </div>
        </form>
        <SocialLogin />
      </div>

      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>
        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
