import React, { useContext, useRef, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats, TbCaretDownFilled } from "react-icons/tb";
import DateModal from "../../components/tasks/DateModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal"; // Ensure the correct path
import BoatSelectModal from "../Fleet/BoatSelectModal";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import TaskAssignSucessModal from "./TaskAssignSuccessModal";

const AddTask = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);
  const [isTaskTypeDropdownOpen, setIsTaskTypeDropdownOpen] = useState(false);
  const [isAdditionalDropdownOpen, setIsAdditionalDropdownOpen] = useState(false);
  const [RecurringDropdown, setRecurringDropdown] = useState(false);
  const [hasAssigned, setHasAssigned] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false); // State for Employee Modal
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false); // State for Boat Modal

  const dropdownRef = useRef();
  const taskTypeDropdownRef = useRef();
  const additionalDropdownRef = useRef();
  const RecurringRef = useRef(null);
  const navigate = useNavigate();

  const toggleDropdown = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsTaskDropdownOpen((prev) => !prev);
    }
  };

  const toggleTaskTypeDropdown = (e) => {
    if (
      taskTypeDropdownRef.current &&
      !taskTypeDropdownRef.current.contains(e.target)
    ) {
      setIsTaskTypeDropdownOpen((prev) => !prev);
    }
  };

  const toggleAdditionalDropdown = (e) => {
    if (
      additionalDropdownRef.current &&
      !additionalDropdownRef.current.contains(e.target)
    ) {
      setIsAdditionalDropdownOpen((prev) => !prev);
    }
  };

  const toggleRecurringDropdown = (e) => {
    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setRecurringDropdown((prev) => !prev);
    }
  };

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
          <div className="w-full h-auto flex justify-between items-center">
            <div>
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                Assign New Task
              </h3>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
            <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  Select Boat
                </label>
                <button
                  onClick={() => setIsBoatModalOpen(true)} // Open the Boat Modal
                  className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  {/* Display text or selected boat name here */}
                </button>
              </div>
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  Assign Employee
                </label>
                <button
                  onClick={() => setIsEmployeeModalOpen(true)} // Open the Employee Modal
                  className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  {/* Display text or employee name here */}
                  {/* Assign Employee */}
                </button>
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
              <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Task Type"}
                </label>
                <div
                  onClick={toggleTaskTypeDropdown}
                  className={`group transition-all duration-500 w-full ${
                    isTaskTypeDropdownOpen
                      ? "rounded-t-xl rounded-b-none"
                      : "rounded-xl"
                  } h-[52px] cursor-pointer bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] relative`}
                >
                  <span className="text-gray-400">Select Type</span>
                  <span className="text-gray-400">
                    <TbCaretDownFilled
                      className={`${
                        isTaskTypeDropdownOpen ? "rotate-180" : "rotate-0"
                      } `}
                    />
                  </span>

                  <div
                    ref={taskTypeDropdownRef}
                    className={`${
                      isTaskTypeDropdownOpen ? "flex" : "hidden"
                    } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-40 shadow-xl left-0 w-full h-40 max-h-40 bg-[#1A293D] rounded-b-2xl`}
                  >
                    <div className="w-full h-auto overflow-y-auto">
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Type A
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Type B
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Type C
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Type D
                      </button>
                      <button
                        onClick={() => setCustomInput(true)}
                        className="w-full text-gray-300 h-8 px-5 hover:bg-[#000]/10 flex flex-col gap-1 justify-center relative items-start"
                      >
                        <span>Custom</span>
                        {customInput && (
                          <div className="absolute w-full top-10 left-0 flex flex-col justify-start items-start gap-2 px-5">
                            <input
                              type="text"
                              className="w-[60%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3 border-[1px] border-[#55C9FA] rounded-md"
                            />
                            <button className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center justify-center text-sm font-medium">
                              Apply
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Task"}
                </label>
                <div
                  onClick={toggleAdditionalDropdown}
                  className={`group transition-all duration-500 w-full ${
                    isAdditionalDropdownOpen
                      ? "rounded-t-xl rounded-b-none"
                      : "rounded-xl"
                  } h-[52px] cursor-pointer bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] relative`}
                >
                  <span className="text-gray-400">Select Task</span>
                  <span className="text-gray-400">
                    <TbCaretDownFilled
                      className={`${
                        isAdditionalDropdownOpen ? "rotate-180" : "rotate-0"
                      } `}
                    />
                  </span>

                  <div
                    ref={additionalDropdownRef}
                    className={`${
                      isAdditionalDropdownOpen ? "flex" : "hidden"
                    } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-40 shadow-xl left-0 w-full h-40 max-h-40 bg-[#1A293D] rounded-b-2xl`}
                  >
                    <div className="w-full h-auto overflow-y-auto">
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Option 1
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Option 2
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Option 3
                      </button>
                      <button className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10">
                        Option 4
                      </button>
                      <button
                        onClick={() => setCustomInput(true)}
                        className="w-full text-gray-300 h-8 px-5 hover:bg-[#000]/10 flex flex-col gap-1 justify-center relative items-start"
                      >
                        <span>Custom</span>
                        {customInput && (
                          <div className="absolute w-full top-10 left-0 flex flex-col justify-start items-start gap-2 px-5">
                            <input
                              type="text"
                              className="w-[60%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3 border-[1px] border-[#55C9FA] rounded-md"
                            />
                            <button className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center justify-center text-sm font-medium">
                              Apply
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-12 mt-4">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Note"}
                </label>
                <textarea
                  type="text"
                  className="w-full h-[315px] resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <span className="w-full h-[0.5px] bg-white/10"></span>
        <div className="w-1/2">
          <div className="w-full flex flex-col gap-4">
            <div className="w-auto flex justify-start items-center gap-3">
              <IoCalendarOutline className="text-2xl text-white/40" />
              <span className="text-md font-normal text-white">Due Date</span>
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="text-xs font-normal text-[#199BD1]"
              >
                Select Due Date
              </button>
            </div>
            <div className="w-auto flex justify-start items-center gap-3">
              <TbCalendarStats className="text-2xl text-white/40" />
              <span className="text-md font-normal text-white">
                Recurring Days
              </span>
              <button
                onClick={toggleRecurringDropdown}
                className="text-xs flex flex-col justify-start items-start font-normal text-[#199BD1] relative"
              >
                <span className="flex gap-1 justify-start items-center">
                  <span>Select Days</span>
                  <FaCaretDown />
                </span>
                <div
                  ref={RecurringRef}
                  className={`w-[164px] h-32 overflow-y-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    RecurringDropdown ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                >
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      None
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      30 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      45 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      60 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      90 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      180 days
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      1 year
                    </span>
                  </div>
                  <div className="w-full flex justify-start items-start gap-2">
                    <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                      Custom
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <DateModal isOpen={isCalendarOpen} setIsOpen={setIsCalendarOpen} />
        {isEmployeeModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <EmployeeDetailModal
              isOpen={isEmployeeModalOpen}
              setIsOpen={setIsEmployeeModalOpen}
            />
          </div>
        )}
        {isBoatModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <BoatSelectModal
              isOpen={isBoatModalOpen}
              setIsOpen={setIsBoatModalOpen}
            />
          </div>
        )}
      </div>

      <div className="w-full flex mt-16 justify-end items-center gap-6">
         <div className="w-auto flex justify-between items-center gap-4">
           <button
            type="button"
            onClick={() => {
              navigate("/dashboard");
            }}
            className="w-52 h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Back"}
          </button>
          <button
            onClick={() => {
              setHasAssigned(true);
            }}
            className="w-52 h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Save"}
          </button>
          {/* <TaskAssignedModal
            isOpen={hasAssigned}
            // onClick={() => setHasAssigned(false)}
          /> */}

{hasAssigned && (
  <TaskAssignSucessModal
    isOpen={hasAssigned}
    setIsOpen={setHasAssigned}
  />
)}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
