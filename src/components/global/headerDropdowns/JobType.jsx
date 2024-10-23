import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const JobType = ({jobTitleDropdownOpen,toggleJobTitleDropdown}) => {
  return (
    <span className="w-full flex justify-start items-center relative">
              Job Title
              <FaCaretDown
                className={`ml-2 cursor-pointer ${
                  jobTitleDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleJobTitleDropdown}
              />
              {jobTitleDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Dock Guard
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Manager
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Engineer
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Captain
                  </label>
                </div>
              )}
            </span>
  )
}

export default JobType