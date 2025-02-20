import React, { useContext, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const LocationType = ({
  setLocationDropdownOpen,
  locationDropdownOpen,
  toggleLocationDropdown,
  setLocationType,
  locationType,
  setCurrentPage = () => {},
}) => {
  const { dropDown } = useContext(GlobalContext);

  const locationDropdownRef = useRef(null);

  const handleCheckboxChange = (location) => {
    if (location === "all") {
      setLocationType([]);
    } else {
      setLocationType((prev) => {
        if (prev.includes(location)) {
          return prev.filter((t) => t !== location);
        } else {
          return [...prev, location];
        }
      });
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setLocationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          ref={locationDropdownRef}
          className="max-h-[300px] overflow-auto absolute top-full -left-4 mt-1 w-52 bg-[#1A293D]
         text-white rounded-md shadow-lg z-10"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={locationType.length === 0}
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
                checked={locationType.includes(location?.toLowerCase())}
                onChange={() => handleCheckboxChange(location?.toLowerCase())}
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
