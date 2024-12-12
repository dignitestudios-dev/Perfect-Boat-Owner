import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";

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

const PaymentForm = ({ cardHolderName, setNameError }) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!cardHolderName) {
      setNameError("User name is required");
      return;
    }
    if (!stripe || !elements) {
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
          paymentMethodId: paymentMethod.id,
        });

        if (response.status === 200) {
          navigate("/summary");
        } else {
          setError("Payment failed. Please try again.");
        }
      } catch (apiError) {
        setError("An error occurred while processing the payment.");
        console.error(apiError);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      {/* Buttons */}
      <div className="w-full grid grid-cols-6 md:grid-cols-12 lg:grid-cols-1 md:justify-start gap-4 mt-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full px-8 md:px-0   h-[48px] md:h-[52px] bg-[#02203A] text-[#199BD1] 
          rounded-[12px] flex items-center justify-center text-[14px] md:text-[16px] font-bold"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={loading}
          // onClick={() => navigate("/summary")}
          className="w-full px-14 md:px-0 h-[48px] md:h-[52px] bg-[#199BD1] text-white rounded-[12px] 
          flex items-center justify-center text-[14px] md:text-[16px] font-bold"
        >
          <div className="flex items-center">
            <span className="mr-1">Proceed</span>
            {loading && <FiLoader className="animate-spin text-lg mx-auto" />}
          </div>
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
