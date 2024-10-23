import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbCaretDownFilled } from "react-icons/tb";

const ManagerDetailModal = ({ setIsOpen, boatAccess }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleFilter, setJobTitleFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const jobTitleRef = useRef(null);
  const locationRef = useRef(null);
  const jobRef = React.useRef(null);
  const [jobFilter, setjobFilter] = useState(false);

  const filteredData = boatAccess?.filter((item) =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const jobTitles = ["Manager", "Engineer", "Developer"];
  const locations = ["East California Dock", "West California Dock", "South California Dock"];

  const togglejobFilter = () => {
    setjobFilter((prev) => !prev);
  };

  const toggleLocationFilter = () => {
    setLocationFilter((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (jobTitleRef.current && !jobTitleRef.current.contains(event.target)) {
      setJobTitleFilter(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setLocationFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Manager List</h3>
              <button
                onClick={() => setIsOpen(false)} // Close the modal when "✕" is clicked
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center mb-4 justify-between">
              <div className="flex w-full sm:w-1/2 lg:w-[295px] h-[32px] mb-4 sm:mb-0 justify-start items-start rounded-[8px] bg-[#1A293D] relative">
                <span className="w-[32px] h-full flex items-center justify-center">
                  <FiSearch className="text-white/50 text-lg" />
                </span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search here"
                  className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
                />
              </div>
            </div>
          </div>
          <div className="relative h-full overflow-auto">
            <div className="w-full grid grid-cols-4 text-[13px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Name
              </span>
              <span className="w-full flex justify-start items-center">
                Email
              </span>
              <span className="w-full flex justify-start items-center relative">
                <button
                  type="button"
                  onClick={togglejobFilter}
                  className="flex items-center gap-1"
                >
                  Job Title
                  <TbCaretDownFilled />
                </button>
                <div
                  ref={jobRef}
                  className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    jobFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
                >
                  {["Job Title 1", "Job Title 2", "Job Title 3"].map(
                    (jobTitle, index) => (
                      <div
                        key={index}
                        className="w-full flex justify-start items-start gap-2"
                      >
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                          {jobTitle}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </span>

              <span className="w-full flex justify-start items-center relative">
                <button
                  type="button"
                  onClick={toggleLocationFilter}
                  className="flex items-center gap-1"
                >
                  Location
                  <TbCaretDownFilled />
                </button>
                <div
                  ref={locationRef}
                  className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    locationFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
                >
                  {["East California Dock", "West Dock", "South Dock"].map(
                    (location, index) => (
                      <div
                        key={index}
                        className="w-full flex justify-start items-start gap-2"
                      >
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                          {location}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </span>
            </div>
            {boatAccess?.map((manager, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-full flex justify-start items-center">
                      {manager?.name}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.email}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.jobtitle || "---"}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {manager?.location || "---"}
                    </span>
                  </div>
                );
            })}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsOpen(false)} // Close the modal when "Done" is clicked
              className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDetailModal;
