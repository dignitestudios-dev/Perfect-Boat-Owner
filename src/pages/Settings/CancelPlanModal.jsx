import React, { useState } from "react";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const CancelPlanModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const navigate = useNavigate();

  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const reasons = [
    "Service is too expensive",
    "Not using the service enough",
    "Found a better alternative",
    "Dissatisfied with customer service",
    "Technical issues with the service",
    "Prefer another service",
    "Other",
  ];

  const cancelSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.put("/owner/subscription/cancel", {
        reason,
      });
      if (response?.status === 200) {
        SuccessToast("Subscription plan cancelled successfully.");
        Cookies.remove("token");
        navigate("/login");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 rounded-xl">
      <div className="bg-[#02203A] text-white p-8 rounded-2xl shadow-lg w-[508px] min-h-[429px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-[20px] mb-4">
            Subscription Cancellation
          </h2>
          <button
            className="text-[#199BD1] text-xl font-bold mb-8"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="block mb-4 text-[16px] font-bold">
          Select reason for cancellation:
        </p>
        {reasons.map((item, index) => (
          <div className="flex items-center mb-4" key={index}>
            <input
              type="radio"
              name="reason"
              value={item}
              checked={reason === item}
              onChange={() => setReason(item)}
              className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
            />
            <span className="ml-2 text-[14px] leading-[16.3px]">{item}</span>
          </div>
        ))}

        <button
          className="w-[440px] h-[54px] text-[16px] py-2 bg-[#199BD1] rounded-lg text-md font-medium"
          onClick={cancelSubscription}
          disabled={loading || !reason}
        >
          {loading ? "Cancelling..." : "Cancel Subscription"}
        </button>
      </div>
    </div>
  );
};

export default CancelPlanModal;
