import React, { useEffect, useRef } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
// import { taskTypeData } from '../../../data/TaskTypeData';

const TaskTypeInputField = ({
  toggleTaskTypeDropdown,
  selectedTaskType,
  isTaskTypeDropdownOpen,
  isEdit,
  taskTypeDropdownRef,
  handleTaskTypeSelection,
  customInput,
  setCustomTypeText,
  customTypeText,
  taskDropDown,
  setTaskTypeDropdownOpen,
  setCustomInput,
}) => {
  const customInputRef = useRef(null);

  useEffect(() => {
    if (customInput && customInputRef.current) {
      customInputRef.current.focus();
    }
  }, [customInput]);

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start z-10">
      <label className="text-[16px] font-medium leading-[21.6px]">
        {"Task Type"}
      </label>
      <div
        type="button"
        onClick={isEdit ? toggleTaskTypeDropdown : null}
        className={`group transition-all duration-500 w-full ${
          isTaskTypeDropdownOpen ? "rounded-t-xl rounded-b-none" : "rounded-xl"
        } h-[52px] ${
          isEdit && "cursor-pointer"
        } bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px]
                   focus:border-[#55C9FA] relative`}
      >
        <span
          className={`${selectedTaskType ? "text-white" : "text-gray-400"}`}
        >
          {" "}
          {selectedTaskType?.replace(/([A-Z])/g, " $1")?.trim() ||
            "Select Task Type"}{" "}
        </span>
        <span className="text-gray-400">
          <TbCaretDownFilled
            className={`${isTaskTypeDropdownOpen ? "rotate-180" : "rotate-0"}`}
          />
        </span>

        <div
          type="button"
          ref={taskTypeDropdownRef}
          className={`${
            isTaskTypeDropdownOpen ? "flex" : "hidden"
          } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-56 shadow-xl
                     left-0 w-full h-56 max-h-56 bg-[#21344C] rounded-b-2xl`}
        >
          <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-2">
            {taskDropDown?.map((item, index) => (
              <button
                type="button"
                key={index}
                onClick={() => handleTaskTypeSelection(item.taskType)}
                className="text-gray-300 w-full h-8 px-5 py-2 flex justify-start items-center hover:bg-[#000]/10"
              >
                {item?.taskType?.replace(/([A-Z])/g, " $1")?.trim()}
              </button>
            ))}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                // handleTaskTypeSelection("custom");
                // setTaskTypeDropdownOpen(true);
                setCustomInput(true);
              }}
              className="w-full text-gray-300 h-8 px-5 hover:bg-[#000]/10 flex flex-col gap-1 justify-center 
                        relative items-start"
            >
              <span>Custom</span>
              {customInput && (
                <div className="absolute w-full top-10 left-0 flex flex-col justify-start items-start gap-2 px-5">
                  <input
                    ref={customInputRef}
                    onChange={(e) => setCustomTypeText(e.target.value)}
                    type="text"
                    className="w-[95%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3
                               border-[1px] border-[#55C9FA] rounded-md"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTaskTypeSelection(customTypeText);
                      setTaskTypeDropdownOpen(false);
                    }}
                    className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center 
                            justify-center text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskTypeInputField;
