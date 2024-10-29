import React from 'react';


const DeleteAccount = ({ isOpen, onClose, onDeactivate, onDelete, deactivateLoading=false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="relative bg-[#02203A] rounded-lg shadow-md w-[418px] h-[202px] flex flex-col p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-[#199BD1] hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[18px] text-white font-bold text-left mt-[-22px] mb-2">Confirm Action?</p>
          <p className="text-[16px] text-white text-left">What would you like to do with this account?</p>
        </div>

        {/* Container for buttons aligned to the bottom right */}
        <div className="flex justify-end gap-2 mt-4">
          <button
          disabled={deactivateLoading}
            onClick={onDeactivate}
            type="button"
            className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]"
          >
           {deactivateLoading ? "Deactivating..." : "Deactivate"} 
          </button>
          <button
            onClick={()=>onDelete()}
            type="button"
            className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
