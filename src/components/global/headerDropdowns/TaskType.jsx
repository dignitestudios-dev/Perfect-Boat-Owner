import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const TaskType = ({taskTypeDropdownOpen,toggleTaskTypeDropdown}) => {
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
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Maintenance
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Cleaning
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Inspection
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Repair
                  </label>
                </div>
              )}
            </span>
  )
}

export default TaskType