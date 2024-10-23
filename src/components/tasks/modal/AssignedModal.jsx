import React from "react";
import { FaRegEdit, FaCaretDown } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";


const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1  py-2 rounded-md"
      >
        {label}
        <FaCaretDown />
      </button>
      {isOpen && (
        <div className="absolute top-10 left-0 w-full bg-[#1A293D] rounded-md shadow-lg p-3 z-10">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 p-2">
              <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
              <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AssignedModal = ({ handleViewAllClick, setIsOpen, tasksList }) => {
  console.log("🚀 ~ AssignedModal ~ tasksList:", tasksList)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Task List</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold"
            >
              ✕
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
          <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>
          </div>
          <div className="relative h-full overflow-auto">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-8 grid grid-cols-6 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center mb-2">
                <span className="w-full flex justify-start items-center">
                  Boat Name
                </span>
                <div className="w-full flex justify-start items-center bg-transparent">
                  <Dropdown label="Task Type" options={["Inspection", "Maintenance", "Repair"]} />
                </div>
                <span className="w-full flex justify-start items-center">
                  Due Date
                </span>
                <span className="w-full flex justify-start items-center">
                  Recurring Days
                </span>
                <div className="w-full flex justify-start items-center">
                  <Dropdown label="Status" options={["Pending", "In Progress", "Completed"]} />
                </div>
                <span className="w-full flex justify-start items-center">
                  Action
                </span>
              </div>
              {tasksList?.length > 0 ? (
                <>
                {
                tasksList?.map((task,index)=>(
                  <div className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                  <span className="w-full flex justify-start items-center">
                    {task?.name}
                  </span>
                  <span className="w-full flex justify-start items-center">
                  {task?.type}
                  </span>
                  <span className="w-full flex justify-start items-center">
                  {getUnixDate(task?.dueDate)}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    {task?.recurringDays}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                    {task?.status}
                    </span>
                  </span>
                  <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                    <span
                      className="flex justify-start items-center"
                      onClick={()=>handleEditTaskClick(task?._id)}
                    >
                      <FaRegEdit />
                    </span>
                    <span className="flex justify-start items-center">
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </div>
                ))
              }
                </>
              ):(
                <div>No record found</div>
              )}
              
              {/* Add more rows as needed */}
            </div>
            
            
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedModal;
