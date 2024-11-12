import React, { useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const TaskType = ({
  taskTypeDropdownOpen,
  toggleTaskTypeDropdown,
  setTaskType,
  taskType,
}) => {
  const { dropDown } = useContext(GlobalContext);

  const handleCheckboxChange = (task) => {
    setTaskType(task);
  };

  return (
    <span className="w-full flex justify-start items-center relative">
      Task Type
      <FaCaretDown
        className={`ml-2 cursor-pointer ${
          taskTypeDropdownOpen ? "rotate-180" : "rotate-0"
        }`}
        onClick={toggleTaskTypeDropdown}
      />
      {taskTypeDropdownOpen && (
        <div
          className="h-[300px] absolute top-full left-0 mt-1 w-52 bg-[#1A293D] text-white rounded-md shadow-lg 
        z-10 overflow-auto pr-1"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={taskType === "all"}
              onChange={() => handleCheckboxChange("all")}
              type="checkbox"
              className="form-checkbox text-[#199BD1] mr-2"
            />
            All
          </label>
          {dropDown?.taskDownDropDown?.map((task, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={taskType === task}
                onChange={() => handleCheckboxChange(task)}
                type="checkbox"
                className="form-checkbox text-[#199BD1] mr-2"
              />
              {task.charAt(0).toUpperCase() + task.slice(1)}
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export default TaskType;
