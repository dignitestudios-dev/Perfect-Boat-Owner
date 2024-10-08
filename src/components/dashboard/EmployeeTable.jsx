import React, { useContext, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaCaretDown } from "react-icons/fa";

const EmployeeTable = ({ data }) => {
  const { navigate } = useContext(GlobalContext);
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229] ">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Employees{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data?.length})
        </span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <button
          className="ml-4 w-[109px] h-[35px] flex items-center justify-center bg-[#199BD1] text-white rounded-[10px] hover:bg-[#147aab] transition"
          onClick={() => navigate("/addemployeeplus", "All Tasks")}
        >
          + Add Employee
        </button>
      </div>
      {data?.length > 0 ? (
        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full grid grid-cols-4 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start relative">
            <span className="w-full flex justify-start items-center">Name</span>
            <span className="w-full flex justify-start items-center">
              Email
            </span>
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
          </div>
          {data?.slice(0, 4)?.map((manager, key) => {
            return (
              <div
                key={key}
                className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
              >
                <span className="w-full flex justify-start items-center">
                  {manager?.name}
                </span>
                <span className="w-full flex justify-start items-center">
                  {manager?.email}
                </span>
                <span className="w-full flex justify-start items-center">
                  {manager?.jobtitle}
                </span>
                <span className="w-full flex justify-start items-center ">
                  {manager?.location}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px] font-normal leading-[21.6px] text-white">
          Reminder! show the texts that is in the UI later while integration.
          Click on this to show the tasks table
        </div>
      )}
      <div className="w-full h-auto flex justify-center items-center">
        <Link
          to={"/employees"}
          className="text-[11px] font-bold text-[#199BD1] underline underline-offset-2"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default EmployeeTable;
