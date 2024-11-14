import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const StatusType = ({
  statusDropdownOpen,
  toggleStatusDropdown,
  setStatusFilter,
  statusFilter,
}) => {
  const statuses = [
    "all",
    "upcoming",
    "in-progress",
    "completed",
    "recurring",
    "overdue",
    "newtask",
  ];

  const handleCheckboxChange = (status) => {
    setStatusFilter(status);
  };

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
        <div className="max-h-[300px] overflow-auto absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-10">
          {statuses.map((status, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={statusFilter === status}
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
