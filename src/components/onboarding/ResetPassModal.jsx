import axios from '../../axios';
import React, { useState } from 'react';
import { SuccessToast } from '../global/Toaster';

const ResetPasswordModal = ({ isOpen, onClose,id }) => {
  
  if (!isOpen) return null;
  const [password, setPassword] = useState({ new: "", confirm: "" });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false)
  
  const handleChange = (e) => {
    setFormErrors({})
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleResetPassword=async()=>{
    const errors = {};
    if (!password.new) {
      errors.new = "New password is required";
    }
    if (!password.confirm) {
      errors.confirm = "Confirm password is required";
    }
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try{
      setLoading(true)
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
      setErrorMessage(err?.response?.data?.message)
    }finally{
      setLoading(false)
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
        <div className='flex justify-start items-center w-full'>
        <p className="text-red-500 text-sm -mt-3 mb-1">{errorMessage}</p>
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
           {formErrors.new && <p className="text-red-500 text-sm -mt-3 mb-1">{formErrors.new}</p>}
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
          {formErrors.confirm && <p className="text-red-500 text-sm -mt-6 mb-3">{formErrors.confirm}</p>}
        </div>
        <button
        disabled={loading}
          className="w-[485px] h-[54px] text-[16px] py-2 bg-[#199BD1] rounded-xl text-md font-medium"
          onClick={handleResetPassword}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
