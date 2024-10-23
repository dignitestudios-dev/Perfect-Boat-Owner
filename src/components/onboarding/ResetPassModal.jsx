import axios from '../../axios';
import React, { useState } from 'react';
import { SuccessToast } from '../global/Toaster';

const ResetPasswordModal = ({ isOpen, onClose,id }) => {
  
  if (!isOpen) return null;
  const [password, setPassword] = useState({ new: "", confirm: "" });
  console.log("🚀 ~ ResetPasswordModal ~ password:", password)
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleResetPassword=async()=>{
    try{
      const obj = {
        newPassword:password.new,
        confirmPassword:password.confirm
      }
      const response = await axios.put(`/owner/manager/${id}/credentials`,obj)
      if(response.status === 200){
        SuccessToast("Password Reset Success");
        onClose();
      }
    }
    catch(err){
    console.log("🚀 ~ handleResetPassword ~ err:", err)

    }finally{

    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50 rounded-xl">
      <div className="bg-[#02203A] text-white p-8 rounded-2xl shadow-lg w-[553px] h-[409px]">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-[18px] mb-6">Reset Password</h2>
          <button
            className="text-[#199BD1] text-xl font-bold mb-8"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div>
          <label className="block mb-2 text-[16px]">New Password</label>
          <input
            name="new"
            onChange={(e) => handleChange(e)}
            value={password.new} 
            type="password"
            className="w-[485px] h-[52px] p-2 mb-4 bg-[#1A293D] rounded-xl"
          />
        </div>
        <div>
          <label className="block mb-2 text-[16px]">Confirm Password</label>
          <input
            name="confirm" 
            onChange={(e) => handleChange(e)}
            value={password.confirm}
            type="password"
            className="w-[485px] h-[52px] p-2 mb-8 bg-[#1A293D] rounded-xl focus:outline-none"
          />
        </div>
        <button
          className="w-[485px] h-[54px] text-[16px] py-2 bg-[#199BD1] rounded-xl text-md font-medium"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
