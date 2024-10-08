import React, { useContext, useRef } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const ViewAllTasksModal = ({ isOpen, setIsOpen }) => {
  const modalRef = useRef();
  const toggleModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };
  const { navigate } = useContext(GlobalContext);
  return (
    <div
      onClick={(e) => toggleModal(e)}
      className={`w-screen fixed top-0 left-0 h-screen bg-black/30 flex transition-all duration-700 rounded-[14px] justify-center items-center ${
        isOpen ? "translate-x-0" : "translate-x-[120vw]"
      }`}
    >
      <div
        ref={modalRef}
        className="w-[65%]  h-auto flex rounded-[18px] bg-[#1A293D]  justify-center items-center p-6"
      >
        <div className="w-full flex flex-col gap-1 justify-start items-start bg-[#001229]  p-4 rounded-[14px]">
          <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium   border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">
              Boat Name
            </span>
            <span className="w-full flex justify-start items-center">
              Task Type
            </span>
            <span className="w-full flex justify-start items-center">
              Due Date
            </span>
            <span className="w-full flex justify-start items-center">
              Recurring Days
            </span>
            <span className="w-full flex justify-start items-center">
              Status
            </span>
            <span className="w-full flex justify-start items-center">
              Action
            </span>
          </div>
          <button
            onClick={() => navigate("/tasks/1", "All Tasks")}
            className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center">
              Boat A
            </span>
            <span className="w-full flex justify-start items-center">
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center">
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center ">
              90 days
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
                <RiDeleteBinLine />
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("/tasks/1")}
            className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center">
              Boat A
            </span>
            <span className="w-full flex justify-start items-center">
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center">
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center ">
              90 days
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
                <RiDeleteBinLine />
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("/tasks/1")}
            className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center">
              Boat A
            </span>
            <span className="w-full flex justify-start items-center">
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center">
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center ">
              90 days
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
                <RiDeleteBinLine />
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("/tasks/1")}
            className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center">
              Boat A
            </span>
            <span className="w-full flex justify-start items-center">
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center">
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center ">
              90 days
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
                <RiDeleteBinLine />
              </span>
            </div>
          </button>
          <button
            onClick={() => navigate("/tasks/1")}
            className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center">
              Boat A
            </span>
            <span className="w-full flex justify-start items-center">
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center">
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center ">
              90 days
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
                <RiDeleteBinLine />
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewAllTasksModal;
