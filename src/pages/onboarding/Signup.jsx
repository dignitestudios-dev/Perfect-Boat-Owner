import React, { useContext, useRef, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import SocialLogin from "./SocialLogin";

const Signup = () => {
  const { navigate } = useContext(GlobalContext);
  const { signUpData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const createAccount = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: `+1${formData.phoneNumber}`,
        role: "owner",
      };
      const response = await axios.post("/auth/signUp", obj);
      if (response.status === 200) {
        sessionStorage.setItem("email", formData?.email);
        setLoading(false);
        SuccessToast("SignUp Successfully");
        navigate("/onboard-verify-otp");
      } else {
        ErrorToast(response?.data?.message);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
    // navigate("/onboard-verify-otp");
  };
  return (
    <div className="w-screen h-auto xl:h-[1024px] flex items-start justify-start">
      <form
        onSubmit={handleSubmit(createAccount)}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col  justify-center items-center gap-8"
      >
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Sign up
        </h1>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            register={register("fullName", {
              required: "Please enter your name.",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Please enter a valid name.",
              },
            })}
            text={"Name"}
            placeholder={"Enter your name here"}
            type={"text"}
            error={errors.fullName}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
            }}
          />

          <AuthInput
            register={register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Simple email pattern
                message: "Please enter a valid email address.",
              },
            })}
            text={"Email"}
            placeholder={"Enter your email address here"}
            type={"text"}
            error={errors.email}
          />

          <AuthInput
            register={register("phoneNumber", {
              required: "Please enter your phone number.",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Please enter a valid phone number.",
              },
            })}
            maxLength="10"
            text={"Phone Number"}
            placeholder={"Enter your phone number here"}
            type={"text"}
            error={errors.phoneNumber}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            isPhone={true}
          />

          <AuthInput
            register={register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message:
                  "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/,
                message:
                  "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
              },
            })}
            maxLength={18}
            text={"Password"}
            placeholder={"Enter your password here"}
            type={"password"}
            error={errors.password}
          />
          <AuthInput
            register={register("confPassword", {
              required:
                "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
              minLength: {
                value: 8,
                message:
                  "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.",
              },
              validate: (value) =>
                value === password.current || "Confirm Password does not match",
            })}
            maxLength={18}
            text={"Confirm Password"}
            placeholder={"Enter confirm password here"}
            type={"password"}
            error={errors.confPassword}
          />
        </div>

        <AuthSubmitBtn text={"Sign Up"} loader={loading} />
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex gap-1 justify-center items-center ">
            <span className="text-[13px] font-medium text-[#C2C6CB]">
              Already have an account?
            </span>
            <button
              className="outline-none text-[13px] border-none text-[#199BD1] font-bold"
              onClick={() => {
                navigate("/login");
              }}
            >
              Log in
            </button>
          </div>
        </div>

        <SocialLogin />

        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex flex-wrap gap-1 justify-center items-center ">
            <span className="text-[16px] font-medium text-[#C2C6CB]">
              By creating an account, I accept the
            </span>
            <button
              className="outline-none text-[16px] border-none text-[#199BD1] font-bold"
              onClick={() => {
                navigate("/terms-and-conditions");
              }}
            >
              Terms & conditions
            </button>
            <span className="text-[16px] font-medium text-[#C2C6CB]">&</span>
            <button
              className="outline-none text-[16px] border-none text-[#199BD1] font-bold"
              onClick={() => {
                navigate("/privacy-policy");
              }}
            >
              Privacy policy
            </button>
          </div>
        </div>
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Signup;
