import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TbCaretDownFilled } from "react-icons/tb";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const ManagerListModal = ({ setIsOpen, boatAccess }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const filteredData = boatAccess?.filter((item) => {
    const matchesSearch = searchTerm
      ? item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.jobtitle?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      : true;
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? jobType?.includes(item?.jobtitle?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return locationTypeMatch && jobTypeMatch && matchesSearch;
  });

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
              <JobType
                setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                jobTitleDropdownOpen={jobTitleDropdownOpen}
                toggleJobTitleDropdown={toggleJobTitleDropdown}
                jobType={jobType}
                setJobType={setJobType}
                isManager={true}
              />
              <LocationType
                setLocationDropdownOpen={setLocationDropdownOpen}
                locationDropdownOpen={locationDropdownOpen}
                toggleLocationDropdown={toggleLocationDropdown}
                locationType={locationType}
                setLocationType={setLocationType}
                title="Location "
              />
            </div>
            {filteredData?.map((manager, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-auto grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                >
                  <span className="h-[40px] w-full flex justify-start items-center">
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

export default ManagerListModal;
