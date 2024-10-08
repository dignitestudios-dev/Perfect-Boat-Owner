import React, { useState, useContext } from "react";
import { FaPaypal, FaCcMastercard, FaCcVisa } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext"; // Adjust the path as needed

const PaymentMethod = ({ method, icon: Icon, selected, onSelect }) => (
  <div
    onClick={() => onSelect(method)}
    className={`w-full flex items-center gap-4 p-4 rounded-lg cursor-pointer ${
      selected ? "border-2 border-[#55C9FA]" : "border border-gray-600"
    }`}
    style={{ backgroundColor: selected ? "#21344C" : "#21344C" }}
  >
    <Icon className="text-white h-6 w-6" />
    <span className="text-white font-medium">{method}</span>
  </div>
);

const SelectPaymentMethod = () => {
  const [selectedMethod, setSelectedMethod] = useState("Debit card");
  const { navigate } = useContext(GlobalContext);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    navigate("/Add-Card");
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4  bg-[#1A293D] rounded-lg">
      <h1 className="text-xl font-bold text-white leading-[24.3px] mb-4">
        Select Payment Method
      </h1>

      <PaymentMethod
        method="Paypal"
        icon={FaPaypal}
        selected={selectedMethod === "Paypal"}
        onSelect={handleSelectMethod}
      />
      <PaymentMethod
        method="Debit card"
        icon={FaCcMastercard}
        selected={selectedMethod === "Debit card"}
        onSelect={handleSelectMethod}
      />
      <PaymentMethod
        method="Credit card"
        icon={FaCcVisa}
        selected={selectedMethod === "Credit card"}
        onSelect={handleSelectMethod}
      />
    </div>
  );
};

export default SelectPaymentMethod;
