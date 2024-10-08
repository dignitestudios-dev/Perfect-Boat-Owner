import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import AuthInput from "../../components/onboarding/AuthInput";
import { useForm } from "react-hook-form";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#fff",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSize: "13px",
      fontWeight: "500",
      "::placeholder": {
        color: "#6B737E",
      },
      backgroundColor: "#1A293D",
      border: "none",
      padding: "0 12px",
      borderRadius: "12px",
      height: "100px",
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
  hidePostalCode: true,
};

const PaymentForm = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardError, setCardError] = useState(false);

  const addCard = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (cardHolderName == "") {
      setCardError("Card Holder Name cannot be left empty.");
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method using stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      try {
        const response = await axios.post("/owner/subscription/addCard", {
          name: cardHolderName,
          paymentMethodId: paymentMethod?.id,
        });

        if (response.status === 200) {
          navigate("/summary");
        } else {
          setError("Payment failed. Please try again.");
        }
      } catch (apiError) {
        setError("An error occurred while processing the payment.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (cardHolderName == "") {
      setCardError("Card Holder Name cannot be left empty.");
    } else {
      setCardError(false);
    }
  }, [cardHolderName]);

  return (
    <form onSubmit={addCard}>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
        <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
          <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
            Card Holder Name
          </label>
          <div
            className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
              cardError && "error"
            } `}
          >
            <div
              className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
            >
              <input
                type={"text"}
                placeholder={"e.g. Mike Smith"}
                className="w-full outline-none  rounded-[12px] placeholder:text-[13px] placeholder:font-normal placeholder:text-[#6B737E] text-white bg-transparent h-full px-3 text-sm font-medium "
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
              />
            </div>
          </div>
          {cardError && <p className="text-red-500 text-sm">{cardError}</p>}
        </div>
        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
          <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
            Payment method
          </label>
          <div
            className={`w-full pt-4 h-[52px] lg:w-[434px] rounded-[12px] bg-[#1A293D] flex items-center justify-start ${
              error && "error"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center rounded-[12px] relative">
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                className="w-full h-full px-3 text-sm font-medium text-white bg-transparent"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 justify-start gap-2 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full h-[48px] md:h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          // onClick={() => navigate("/summary")}
          className="w-full h-[48px] md:h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold"
        >
          {loading ? "Loading" : "Proceed"}
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
