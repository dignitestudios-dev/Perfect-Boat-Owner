import React from 'react'
import { FaCaretDown } from 'react-icons/fa'

const LocationType = ({locationDropdownOpen, toggleLocationDropdown}) => {
  return (
    <span className="w-full flex justify-start items-center relative">
              Location
              <FaCaretDown
                className={`ml-2 cursor-pointer ${
                  locationDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                onClick={toggleLocationDropdown}
              />
              {locationDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    East California Dock
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    West Marina Bay
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    South Beach Port
                  </label>
                  <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
                    <input
                      type="checkbox"
                      className="form-checkbox text-[#199BD1] mr-2"
                    />
                    North Harbor
                  </label>
                </div>
              )}
            </span>
  )
}

export default LocationType