import React, { useContext, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { AuthContext } from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const { navigate } = useContext(GlobalContext);
  const { signUpData } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgot = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        email: formData.email,
      };

      const response = await axios.post("/auth/forget/otp/email", obj);
      if (response.status === 200) {
        // login(response.data)
        sessionStorage.setItem("email", formData.email);
        navigate("/verify-otp");
        setLoading(false);
        SuccessToast("Otp Send Successfully");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={handleSubmit(handleForgot)}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-white" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Forgot Password
          </h1>
          <p className="w-[90%] font-normal text-[16px] text-white leading-[21.6px] tracking-[-1.2px]">
            No worries, we’ve got you covered. Enter your registered email
            address below, and we will send you a code to reset your password.
            Get back to enjoying a seamless experience in just a few simple
            steps.
          </p>
        </div>
        <div className="w-full h-auto flex flex-col mt-4 mb-20 justify-start items-start gap-4">
          <AuthInput
            register={register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            text={"Email Address"}
            placeholder={"Type your email address here"}
            type={"text"}
            error={errors.email}
          />
        </div>

        <AuthSubmitBtn text={"Continue"} loader={loading} />
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default ForgotPassword;
