import React, { useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { AuthMockup } from "../../assets/export";
import { FiEdit, FiEdit2 } from "react-icons/fi";
import PhoneEditModal from "../../components/global/PhoneEditModal";
import VerifyPhoneEditOtp from "../../components/global/VerifyPhoneEditOtp";
import PhoneUpdateSuccess from "../../components/global/PhoneUpdateSuccess";
import Cookies from "js-cookie";

const UserManagementPage = () => {
  const [edit, setEdit] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  const name = Cookies.get("name");
  const [firstName, lastName] = name.split(" ");
  const email = Cookies.get("email");
  const phoneNumber = Cookies.get("phoneNumber");
  const profilePicture = Cookies.get("profilePicture");
  console.log("🚀 ~ UserManagementPage ~ profilePicture:", profilePicture)

  return (
    <div className="w-full flex flex-col gap-6 px-5 pb-5 md:px-0">
      <div className="w-full flex flex-col  gap-8 justify-between items-start">
        <div className="w-full flex justify-between items-start">
          <div className="flex flex-col gap-2">
            <h1 className="text-[24px] font-bold leading-[32.4px]">
              User Information
            </h1>
            <p className="text-[12px] leading-[16.2px] text-white/50">
              View your information below. Please contact the owner for any
              changes or updates.
            </p>
          </div>
          <button
            onClick={() => setEdit((prev) => !prev)}
            className="bg-[#199BD1] w-[77px] h-[28px] rounded-lg text-white flex items-center justify-center text-sm font-medium leading-5"
          >
            Edit
          </button>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <div className="w-[120px] h-[120px] rounded-full bg-[#1A293D] flex justify-center items-center relative">
            <img
              src={profilePicture}
              alt="user_image"
              className="w-full h-full rounded-full"
            />
            {/* {edit && (
              <button className="w-6 h-6 rounded-full bg-blue-600 absolute bottom-1 right-2 flex items-center justify-center text-sm">
                <FiEdit />
              </button>
            )} */}
          </div>
          <div className="w-full h-auto flex justify-start items-start gap-4">
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">First Name</label>
      <div className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center`}>
        <input
          disabled
          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400"
          value={firstName}
        />
      </div>
    </div>
            
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">Last Name</label>
      <div className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center`}>
        <input
          disabled
          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400"
          value={lastName}
        />
      </div>
    </div>
          </div>
          <div className="w-full h-auto flex justify-start items-start gap-4">
          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">First Name</label>
      <div className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center`}>
        <input
          disabled
          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400"
          value={email}
        />
      </div>
    </div>
            
    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">Last Name</label>
      <div className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center`}>
        <input
          disabled
          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400"
          value={phoneNumber}
        />
      </div>
    </div>
          </div>
          {edit && (
            <PhoneEditModal
              isOpen={edit}
              setIsOpen={setEdit}
              setVerifyOtp={setVerifyOtp}
            />
          )}
          {verifyOtp && (
            <VerifyPhoneEditOtp
              isOpen={verifyOtp}
              setIsOpen={setVerifyOtp}
              setPhoneUpdated={setPhoneUpdated}
            />
          )}
          {phoneUpdated && (
            <PhoneUpdateSuccess
              isOpen={phoneUpdated}
              setIsOpen={setPhoneUpdated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
