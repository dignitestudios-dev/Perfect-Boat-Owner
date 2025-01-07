import React, { useEffect } from "react";
import { SuccessVector } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const PasswordUpdateSuccessModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
      navigate("/login");
    }, 3000);
  }, []);
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen ${
        isOpen ? "flex" : "hidden"
      } flex-col bg-[#001229] justify-center items-center gap-6`}
    >
      <img src={SuccessVector} alt="success_vector" />
      <p className="text-[36px] font-bold  text-white leading-[48.6px]">
        Password updated successfully!
      </p>
    </div>
  );
};

export default PasswordUpdateSuccessModal;
