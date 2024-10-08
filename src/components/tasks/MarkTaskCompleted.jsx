import React, { useContext, useRef, useState } from "react";
import { TbClipboardText } from "react-icons/tb";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaCheck } from "react-icons/fa";

const MarkTaskCompleted = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const assignModalRef = useRef();

  const toggleModal = (e) => {
    if (assignModalRef.current && !assignModalRef.current.contains(e.target)) {
      setIsOpen(false);
      navigate("/tasks", "All Tasks");
    }
  };

  return (
    <div
      onClick={toggleModal}
      className={`fixed z-[10000] top-0 p-2 left-0 transition-all duration-300 w-screen h-screen flex justify-center items-center bg-transparent ${
        isOpen ? "scale-1" : "scale-0"
      }`}
    >
      <div
        ref={assignModalRef}
        className="w-full lg:w-[418px] h-[207px] bg-[#02203A] rounded-xl flex flex-col justify-center items-center gap-5"
      >
        <span className="w-20 h-20 rounded-full flex items-center justify-center bg-[#1A293d] ">
          <FaCheck className="text-3xl text-[#199BD1]" />
        </span>
        <p className="text-[16px] font-normal leading-[21.6px]">
          Great job! You’ve successfully marked this task a <br />
          completed. Your progress is sailing smoothly.
        </p>
      </div>
    </div>
  );
};

export default MarkTaskCompleted;
