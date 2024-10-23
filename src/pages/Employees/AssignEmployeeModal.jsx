import React from "react";

const AssignEmployeeModal = ({ isOpen, onClose, managerName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-[#02203A] rounded-lg p-6 w-[418px] h-[247px] text-center relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-[#199BD1] px-4 py-2 rounded-md text-xl mb-8"

        >
          ✕
        </button>

        {/* Modal content */}
        <div className="mb-4">
          <span className="inline-block bg-[#1A293D] p-3 rounded-full mt-2">
            <svg
              className="w-12 h-12 text-[#199BD1] font-bold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>
        </div>
        <p className="text-white mb-6 text-[16px]">You have successfully assigned employees to {managerName}</p>
      </div>
    </div>
  );
};

export default AssignEmployeeModal;
