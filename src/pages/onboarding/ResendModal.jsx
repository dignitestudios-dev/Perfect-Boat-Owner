import React from 'react';
import { MdAccessTime } from "react-icons/md";
import { SuccessToast } from '../../components/global/Toaster';
import axios from '../../axios';

const ResendModal = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;

  const resendCredentials = async()=>{
    try{
      const response = await axios.get(`/owner/manager/${id}/credentials/send`)
      if(response.status === 200){
        console.log("🚀 ~ resendCredentials ~ response:", response)
        onClose()
        SuccessToast("Credentials Send")
      }
    }catch(err){
    console.log("🚀 ~ resendCredentials ~ err:", err)

    }
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="relative bg-[#02203A] rounded-lg shadow-md w-full max-w-md">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-800"
          aria-label="Close modal"
        >
          {/* Add your icon or text here */}
        </button>
        <div className="p-4 text-left">
          <p className="mb-2 mt-2 text-[18px] text-white font-bold">Resend Credentials</p>
          <p className="text-[16px] text-white">Are you sure you want to resend the credentials</p>
          <p className="mb-5 text-md text-white">to the managers?</p>

          {/* Container for buttons aligned to the right */}
          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              type="button"
              className="text-[#199BD1] font-bold	 py-2 px-4 rounded-lg text-[16px]"
            >
              Cancel
            </button>
            <button
              onClick={resendCredentials}
              type="button"
              className="text-[#199BD1] font-bold	 py-2 px-4 rounded-lg text-[16px]"
            >
              Resend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResendModal;
