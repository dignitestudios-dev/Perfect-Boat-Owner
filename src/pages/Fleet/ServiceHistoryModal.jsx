import React from 'react';
import { MdAccessTime } from "react-icons/md";

const ServiceHistoryModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#001229] bg-opacity-50">
      <div className="relative bg-[#001229] rounded-lg shadow-md w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-800"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <path stroke="#36B8F3" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
</svg>

        </button>
        <div className="p-4 text-center items-center">
        <MdAccessTime className="mx-auto mb-4 text-[#36B8F3] bg-[#001F3F] p-2 w-12 h-12 rounded-full" />
        <p className="mb-5 text-lg font-normal text-white">Choose an option to access comprehensive service history for this boat</p>
          {/* Add your modal content here */}
          <button
            onClick={onClose}
            type="button"
            className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-lg"
          >
            Send a copy via email
          </button>
          &nbsp; &nbsp;
          <button
            onClick={onClose}
            type="button"
            className="bg-[#36B8F3] text-white py-2 px-4 rounded-lg"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistoryModal;
