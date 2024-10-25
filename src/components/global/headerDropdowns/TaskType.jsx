import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const TaskType = ({taskTypeDropdownOpen,toggleTaskTypeDropdown, setTaskType, taskType}) => {
  const taskTypes = [
    "RoutineInspection",
    "InspectElectronicsElectrical",
    "CheckMaintain",
    "FuelSystemMaintenance"
  ];

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
        <div className="absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
          {taskTypes.map((task, index) => (
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
}

export default TaskType