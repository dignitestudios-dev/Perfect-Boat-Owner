import React, { useContext, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const TaskType = ({
  setTaskTypeDropdownOpen,
  taskTypeDropdownOpen,
  toggleTaskTypeDropdown,
  setTaskType,
  taskType,
}) => {
  const { dropDown } = useContext(GlobalContext);
  const taskTypeDropdownRef = useRef(null);

  const handleCheckboxChange = (task) => {
    if (task === "all") {
      setTaskType([]);
    } else {
      setTaskType((prev) => {
        if (prev.includes(task)) {
          return prev.filter((t) => t !== task);
        } else {
          return [...prev, task];
        }
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        taskTypeDropdownRef.current &&
        !taskTypeDropdownRef.current.contains(event.target)
      ) {
        setTaskTypeDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          ref={taskTypeDropdownRef}
          className="max-h-[300px] absolute top-full left-0 mt-1 w-52 bg-[#1A293D] text-white rounded-md shadow-lg 
        z-10 overflow-auto pr-1"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={taskType.length === 0}
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
                checked={taskType.includes(task?.toLowerCase())}
                onChange={() => handleCheckboxChange(task?.toLowerCase())}
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
