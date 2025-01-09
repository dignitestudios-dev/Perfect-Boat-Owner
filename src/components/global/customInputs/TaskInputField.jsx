import React, { useEffect, useRef } from "react";
import { TbCaretDownFilled } from "react-icons/tb";

const TaskInputField = ({
  isEdit,
  handleTaskSelection,
  toggleTaskDropdown,
  isTaskDropdownOpen,
  displaySelectedTask,
  additionalDropdownRef,
  tasks,
  setCustomTask,
  customTask,
}) => {
  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
      <label className="text-[16px] font-medium leading-[21.6px]">Task</label>
      <div
        type="button"
        onClick={isEdit ? toggleTaskDropdown : null}
        className={`group transition-all duration-500 w-full ${
          isTaskDropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } h-[52px] ${
          isEdit && "cursor-pointer"
        } bg-[#1A293D] outline-none flex justify-between items-center px-3 relative`}
      >
        <span
          className={`${displaySelectedTask ? "text-white" : "text-gray-400"}`}
        >
          {displaySelectedTask || "Select Task"}{" "}
        </span>
        <span className="text-gray-400">
          <TbCaretDownFilled
            className={`${isTaskDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </span>
        {/* Dropdown menu for tasks */}
        <div
          type="button"
          ref={additionalDropdownRef}
          className={`${
            isTaskDropdownOpen ? "flex" : "hidden"
          } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute top-[54px]
                    shadow-xl left-0 w-full max-h-40 overflow-y-auto bg-[#21344C] rounded-b-2xl`}
        >
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <button
                type="button"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  handleTaskSelection(task);
                }}
                className="text-gray-300 text-left w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10"
              >
                {task}
              </button>
            ))
          ) : (
            <div className="w-full flex flex-col justify-start items-start gap-2 px-6">
              <input
                onChange={(e) => setCustomTask(e.target.value)}
                onClick={(e) => e.stopPropagation()}
                type="text"
                className="w-[95%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3
                               border-[1px] border-[#55C9FA] rounded-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  // e.stopPropagation();
                  // handleTaskTypeSelection(customTypeText);
                  // setTaskTypeDropdownOpen(false);
                  handleTaskSelection(customTask);
                }}
                className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center 
                            justify-center text-sm font-medium"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInputField;
