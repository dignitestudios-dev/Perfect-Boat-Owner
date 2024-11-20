import React, { useContext } from "react";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";

const JobType = ({
  jobTitleDropdownOpen,
  toggleJobTitleDropdown,
  jobType,
  setJobType,
  setCurrentPage = "",
}) => {
  const { dropDown } = useContext(GlobalContext);

  const handleCheckboxChange = (job) => {
    setJobType(job);
    setCurrentPage(1);
  };

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
        <div className="max-h-[300px] overflow-auto absolute top-full left-0 mt-1 w-48 bg-[#1A293D] text-white rounded-md shadow-lg z-20">
          <label className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10">
            <input
              checked={jobType === "all"}
              onChange={() => handleCheckboxChange("all")}
              type="checkbox"
              className="form-checkbox text-[#199BD1] mr-2"
            />
            All
          </label>
          {dropDown?.jobtitleDropDown?.map((job, index) => (
            <label
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-[#000]/10"
            >
              <input
                checked={jobType === job}
                onChange={() => handleCheckboxChange(job)}
                type="checkbox"
                className="form-checkbox text-[#199BD1] mr-2"
              />
              {job?.charAt(0).toUpperCase() + job?.slice(1)}
            </label>
          ))}
        </div>
      )}
    </span>
  );
};

export default JobType;
