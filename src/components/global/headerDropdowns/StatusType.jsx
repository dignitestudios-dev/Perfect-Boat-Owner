import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const StatusType = ({statusDropdownOpen,toggleStatusDropdown}) => {
  return (
    <span className="w-full flex justify-start items-center relative">
              Status
              <FaCaretDown
                className={`ml-2 cursor-pointer ${
                  statusDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleStatusDropdown}
              />
              {statusDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    In-Progress
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Completed
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Overdue
                  </label>
                </div>
              )}
            </span>
  )
}

export default StatusType