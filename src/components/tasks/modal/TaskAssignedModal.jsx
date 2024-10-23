import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";


const TaskAssignedModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div className="bg-[#02203A] rounded-lg p-6 w-[400px] h-[195px] text-center relative">
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
          <IoDocumentTextOutline className="w-[40px] h-[40px] text-[#199BD1]" />

          </span>
        </div>
        <p className="text-white mb-6 text-[16px]">Reported task has been successfully assigned </p>
      </div>
    </div>
  );
};

export default TaskAssignedModal;
