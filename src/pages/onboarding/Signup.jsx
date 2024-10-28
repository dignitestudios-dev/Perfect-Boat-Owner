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

const Signup = () => {
  const { navigate } = useContext(GlobalContext);
  const { signUpData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const createAccount = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
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
                value: /^[A-Za-z\s]+$/, // Name should only contain letters
                message: "Please enter a valid name.",
              },
            })}
            text={"Name"}
            placeholder={"e.g. Mike Smith"}
            type={"text"}
            error={errors.fullName}
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
            placeholder={"Type your email address here"}
            type={"text"}
            error={errors.email}
          />

          <AuthInput
            register={register("phoneNumber", {
              required: "Please enter your phone number.",
              pattern: {
                value: /^[0-9]{10}$/, // Example pattern for 10-digit phone number
                message: "Please enter a valid phone number.",
              },
            })}
            maxLength="10"
            text={"Phone Number"}
            placeholder={"Type your phone number here"}
            type={"text"}
            error={errors.phoneNumber}
          />

          <AuthInput
            register={register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long.",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
              },
            })}
            text={"Password"}
            placeholder={"Enter Password"}
            type={"password"}
            error={errors.password}
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

        <div className="w-full  h-auto flex  flex-col gap-1 justify-center items-start  ">
          <div className="w-full lg:w-[434px] flex justify-center items-center">
            <div className="grid grid-cols-3 gap-3 lg:gap-10">
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-2xl flex items-center justify-center">
                <FaGoogle />
              </div>
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-3xl flex items-center justify-center">
                <FaFacebookF />
              </div>
              <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D]  text-white text-3xl flex items-center justify-center">
                <FaApple />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <div className="w-full lg:w-[434px] flex flex-wrap gap-1 justify-center items-center ">
            <span className="text-[16px] font-medium text-[#C2C6CB]">
              By creating account, I accept the
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
