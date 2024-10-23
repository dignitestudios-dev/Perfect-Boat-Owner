import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const BoatType = ({boatTypeDropdownOpen,toggleBoatTypeDropdown}) => {
  return (
    <span className="w-full flex justify-start items-center relative">
              Boat Type
              <FaCaretDown
                className={`ml-2 cursor-pointer ${
                  boatTypeDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleBoatTypeDropdown}
              />
              {boatTypeDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Sailboat
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Motorboat
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Yacht
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    Catamaran
                  </label>
                </div>
              )}
            </span>
  )
}

export default BoatType