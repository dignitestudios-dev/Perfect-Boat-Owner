import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const StatusType = ({
  statusDropdownOpen,
  setStatusDropdownOpen,
  toggleStatusDropdown,
  setStatusFilter,
  statusFilter,
}) => {
  const statuses = [
    "upcomingtask",
    "inprogress",
    "completed",
    "recurring",
    "overdue",
    "newtask",
  ];

  const statusDropdownRef = useRef(null);

  const handleCheckboxChange = (status) => {
    // setStatusFilter(status);
    if (status === "all") {
      setStatusFilter([]);
    } else {
      setStatusFilter((prev) => {
        if (prev.includes(status)) {
          return prev.filter((t) => t !== status);
        } else {
          return [...prev, status];
        }
      });
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target)
      ) {
        setStatusDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div
          ref={statusDropdownRef}
          className="max-h-[300px] overflow-auto absolute top-full left-0 mt-1 w-48 bg-[#1A293D]
           text-white rounded-md shadow-lg z-10"
        >
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={statusFilter.length === 0}
              onChange={() => handleCheckboxChange("all")}
              type="checkbox"
              className="form-checkbox text-[#199BD1] mr-2"
            />
            All
          </label>
          {statuses.map((status, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={statusFilter.includes(status)}
                onChange={() => handleCheckboxChange(status)}
                type="checkbox"
                className="form-checkbox text-[#199BD1] mr-2"
              />
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export default StatusType;
