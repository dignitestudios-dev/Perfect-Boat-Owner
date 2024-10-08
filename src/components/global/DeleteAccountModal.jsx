import React from "react";
import { useNavigate } from "react-router-dom";

const DeleteAccountModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSubmit = () => {
    navigate("/deletemanageraccount");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center transition-all duration-500 bg-opacity-50 z-50 rounded-xl">
      <div className="bg-[#02203A] text-white p-8 rounded-2xl shadow-lg w-[508px] h-[529px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-[20px] mb-4">Delete Account</h2>
          <button
            className="text-[#199BD1] text-xl font-bold mb-8"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <p className="block mb-4 text-[16px] font-bold">
          Select reasons for account deletion:
        </p>
        {/* Checkboxes go here */}
        {/* ... (rest of your checkboxes) */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            className="w-4 h-4 rounded-full outline-none border-2 border-white appearance-none checked:bg-[#199BD1] checked:border-transparent relative checked:before:absolute checked:before:content-['✔'] checked:before:text-white checked:before:text-xs checked:before:left-1/2 checked:before:transform checked:before:-translate-x-1/2 checked:before:-translate-y-[1px]"
          />
          <span className="ml-2 text-[14px] leading-[16.3px]">
            Account Deletion reason goes here
          </span>
        </div>
        

        <button
          className="w-[440px] h-[54px] text-[16px] py-2 bg-[#199BD1] rounded-lg text-md font-medium"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
