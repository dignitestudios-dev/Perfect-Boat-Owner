import React, { useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const LocationType = ({
  locationDropdownOpen,
  toggleLocationDropdown,
  setLocationType,
  locationType,
}) => {
  const { dropDown } = useContext(GlobalContext);

  const handleCheckboxChange = (location) => {
    setLocationType(location);
  };

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
        <div
          className="max-h-[300px] overflow-auto absolute top-full -left-4 mt-1 w-52 bg-[#1A293D]
         text-white rounded-md shadow-lg z-10"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={locationType === "all"}
              onChange={() => handleCheckboxChange("all")}
              type="checkbox"
              className="form-checkbox text-[#199BD1] mr-2"
            />
            All
          </label>
          {dropDown?.locationDropDown?.map((location, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={locationType === location}
                onChange={() => handleCheckboxChange(location)}
                type="checkbox"
                className="form-checkbox text-[#199BD1] mr-2"
              />
              {location?.charAt(0).toUpperCase() + location?.slice(1)}
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export default LocationType;
