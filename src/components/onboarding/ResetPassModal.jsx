import axios from "../../axios";
import React, { useState } from "react";
import { SuccessToast } from "../global/Toaster";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const ResetPasswordModal = ({ isOpen, onClose, id }) => {
  if (!isOpen) return null;
  const [password, setPassword] = useState({ new: "", confirm: "" });
  const [formErrors, setFormErrors] = useState({ new: "", confirm: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });

    // Initialize error state for the field
    let errors = { ...formErrors };

    // Password validation logic
    if (name === "new") {
      // Check for minimum length
      if (
        value.length < 8 &&
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(
          value
        )
      ) {
        errors.new =
          "Password must be at least 8 characters, including uppercase, lowercase, number, and special character.";
      }
      // Check for pattern (uppercase, lowercase, number, special character)
      else {
        errors.new = ""; // Clear errors if input is valid
      }
    }

    if (name === "confirm") {
      if (value !== password.new) {
        errors.confirm = "Passwords do not match.";
      } else {
        errors.confirm = ""; // Clear errors if passwords match
      }
    }

    // Update error state
    setFormErrors(errors);
  };

  const handleResetPassword = async () => {
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
    try {
      setLoading(true);
      const obj = {
        newPassword: password.new,
        confirmPassword: password.confirm,
      };
      const response = await axios.put(`/owner/manager/${id}/credentials`, obj);
      if (response.status === 200) {
        SuccessToast("Password Reset Success");
        onClose();
      }
    } catch (err) {
      setErrorMessage(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex justify-start items-center w-full">
          <p className="text-red-500 text-sm -mt-3 mb-1">{errorMessage}</p>
        </div>
        <div>
          <label className="block mb-2 text-[16px]">New Password</label>
          <div className="relative">
            <input
              name="new"
              maxLength={18}
              onChange={(e) => handleChange(e)}
              value={password.new}
              type={isPassVisible ? "text" : "password"}
              className={`w-[485px] h-[52px] p-2 mb-4 bg-[#1A293D] outline-none rounded-xl
                ${
                  formErrors.new === ""
                    ? "focus:border-[#55C9FA] focus:ring-[#55C9FA]"
                    : "focus:ring-[#FF453A] focus:border-[#FF453A]"
                } focus:ring-1 `}
            />
            <span
              type="button"
              onClick={() => setIsPassVisible((prev) => !prev)}
              className="cursor-pointer absolute top-4 text-lg right-4"
              style={{
                color: "#6B7373",
              }}
            >
              {!isPassVisible ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {formErrors.new && (
            <p className="text-red-500 text-sm -mt-3 mb-1">{formErrors.new}</p>
          )}
        </div>
        <div>
          <label className="block mb-2 text-[16px]">Confirm Password</label>
          <div className="relative">
            <input
              name="confirm"
              maxLength={18}
              onChange={(e) => handleChange(e)}
              value={password.confirm}
              type={isConfirm ? "text" : "password"}
              className={`w-[485px] h-[52px] p-2 mb-4 bg-[#1A293D] outline-none rounded-xl
              ${
                formErrors.confirm === ""
                  ? "focus:border-[#55C9FA] focus:ring-[#55C9FA]"
                  : "focus:ring-[#FF453A] focus:border-[#FF453A]"
              } focus:ring-1 `}
            />
            <span
              type="button"
              onClick={() => setIsConfirm((prev) => !prev)}
              className="cursor-pointer absolute top-4 text-lg right-4"
              style={{
                color: "#6B7373",
              }}
            >
              {!isConfirm ? <BsEyeSlash /> : <BsEye />}
            </span>
          </div>
          {formErrors.confirm && (
            <p className="text-red-500 text-sm -mt-3 mb-3">
              {formErrors.confirm}
            </p>
          )}
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
