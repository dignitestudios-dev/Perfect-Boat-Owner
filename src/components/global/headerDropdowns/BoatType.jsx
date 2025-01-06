import React, { useContext, useEffect, useRef } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const BoatType = ({
  boatTypeDropdownOpen,
  setBoatTypeDropdownOpen,
  toggleBoatTypeDropdown,
  boatType,
  setBoatType,
}) => {
  console.log("🚀 ~ boatType:", boatType);
  const { dropDown } = useContext(GlobalContext);
  const boatTypeDropdownRef = useRef(null);

  // const handleCheckboxChange = (boat) => {
  //   setBoatType(boat);
  // };

  const handleCheckboxChange = (boat) => {
    if (boat === "all") {
      setBoatType([]);
    } else {
      setBoatType((prev) => {
        if (prev.includes(boat)) {
          return prev.filter((t) => t !== boat);
        } else {
          return [...prev, boat];
        }
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        boatTypeDropdownRef.current &&
        !boatTypeDropdownRef.current.contains(event.target)
      ) {
        setBoatTypeDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div
          ref={boatTypeDropdownRef}
          className="max-h-[300px] overflow-auto absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={boatType.length === 0}
              onChange={() => handleCheckboxChange("all")}
              type="checkbox"
              className="form-checkbox text-[#199BD1] mr-2"
            />
            All
          </label>
          {dropDown?.boatTypeDropDown?.map((boat, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={boatType.includes(boat?.toLowerCase())}
                onChange={() => handleCheckboxChange(boat?.toLowerCase())}
                type="checkbox"
                className="form-checkbox text-[#199BD1] mr-2"
              />
              {boat?.charAt(0).toUpperCase() + boat?.slice(1)}
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export default BoatType;
