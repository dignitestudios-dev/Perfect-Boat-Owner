import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DeleteManagerAccountModal = ({ isOpen, onClose, managerId }) => {
  console.log(managerId)
  const navigate = useNavigate();
  
  const [selectedReason, setSelectedReason] = useState(null);
  
  const reasons = [
    "Account Deletion reason goes here1",
    "Account Deletion reason goes here2",
    "Account Deletion reason goes here3",
  ];
  
  const handleCheckboxChange = (reason) => {
    setSelectedReason(reason);
  };
  
  const handleSubmit = () => {
    if (!selectedReason) {
      alert("Please select a reason");
      return;
    }
    navigate("/deleteaccount", {
      state: { managerId, reasonForDelete: selectedReason },
    });
  };
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
    <div className="relative bg-[#02203A] rounded-lg shadow-md w-[418px] h-[auto] flex flex-col p-4">
      {/* Close button */}
      <button onClick={onClose} className="absolute top-3 right-3 text-xl font-bold text-[#199BD1] hover:text-gray-800" aria-label="Close modal">✕</button>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <p className="block mb-4 text-[16px] font-bold">Select reasons for account deletion:</p>
        {reasons.map(reason => (
          <div className="flex items-center mb-4" key={reason}>
            <input
              type="checkbox"
              className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
              checked={selectedReason === reason}
              onChange={() => handleCheckboxChange(reason)}
            />
            <span className="ml-2 text-[14px] leading-[16.3px]">{reason}</span>
          </div>
        ))}
      </div>

      {/* Container for buttons aligned to the bottom right */}
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose} type="button" className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]">Cancel</button>
        <button onClick={handleSubmit} type="button" className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]">Confirm Delete</button>
      </div>
    </div>
  </div>
  );
};

export default DeleteManagerAccountModal;
