import React, { useContext, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import axios from "../../axios";
import { AuthContext } from "../../contexts/AuthContext";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const AddCard = () => {
  const { navigate } = useContext(GlobalContext);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <div className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-start gap-8">
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Add Card Details
        </h1>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <Elements stripe={stripePromise}>
            <PaymentForm />
          </Elements>
          {/* <AuthInput
            text={"Card Number"}
            placeholder={"0000 0000 0000 0000"}
            type={"text"}
          />

          <div className="w-full lg:w-[434px] grid grid-cols-3 gap-2">
            <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
              <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
                {"Valid Through"}
              </label>
              <div
                className={`w-full h-[52px]  focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
                  error && "error"
                } `}
              >
                <div
                  className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
                >
                  <input
                    type={"text"}
                    placeholder={"MM/YY"}
                    className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
              <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
                {"CVC"}
              </label>
              <div
                className={`w-full h-[52px]  focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
                  error && "error"
                } `}
              >
                <div
                  className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
                >
                  <input
                    type={"text"}
                    placeholder={"0000"}
                    className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
              <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
                {"Zip Code"}
              </label>
              <div
                className={`w-full h-[52px]  focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
                  error && "error"
                } `}
              >
                <div
                  className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
                >
                  <input
                    type={"text"}
                    placeholder={"12345"}
                    className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                  />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>

        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default AddCard;
