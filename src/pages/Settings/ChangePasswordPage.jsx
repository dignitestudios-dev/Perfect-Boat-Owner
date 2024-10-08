import React, { useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import UpdatedModal from "../../components/global/UpdatedModal";

const ChangePasswordPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateClick = () => {
    // Perform password update logic here...

    // Show the modal after updating the password
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 px-5 pb-5 md:px-0">
      <div className="w-full flex flex-col justify-start gap-8 items-start">
        <div>
          <h1 className="text-[24px] font-bold leading-[32.4px]">Change Password</h1>
        </div>

        <div className="w-full flex flex-col justify-start items-start gap-4">
          <AddFleetInput label={"Current Password"} />
          <AddFleetInput label={"New Password"} />
          <AddFleetInput label={"Confirm New Password"} />
          <button
            className="w-full h-[52px] rounded-xl mt-6 bg-[#119bd1] text-white flex items-center justify-center text-sm font-medium"
            onClick={handleUpdateClick}
          >
            Update
          </button>
        </div>
      </div>
      <UpdatedModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ChangePasswordPage;
