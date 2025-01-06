import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";

const ManagerDeleteAssignModal = ({
  managers,
  managerId = "",
  setIsOpen,
  SetPassSelectedManager,
  selectedManager,
  setSelectedManager,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const filteredData = managers?.filter((item) => {
    const managers = managerId ? managerId !== item._id : true;
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
    return matchesSearch && locationTypeMatch && jobTypeMatch && managers;
  });

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleSelectManager = (manager) => {
    if (selectedManager?.id === manager?._id) {
      setSelectedManager(null);
    } else {
      setSelectedManager(manager);
    }
  };

  const handleManagerSelection = () => {
    if (selectedManager) {
      SetPassSelectedManager(selectedManager);
      setIsOpen(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[100%]  h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Manager</h3>
              <button
                type="button"
                onClick={() => setIsOpen(false)} // Close the modal when "✕" is clicked
                className="text-lg font-bold"
              >
                ✕
              </button>
            </div>
            <div className="w-full h-auto flex justify-between items-center mt-4">
              <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
                <span className="w-[32px] h-full flex items-center justify-center">
                  <FiSearch className="text-white/50 text-lg" />
                </span>
                <input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search here"
                  className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
                />
              </div>
              <button
                type="button"
                onClick={() => handleManagerSelection()}
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                Done
              </button>
            </div>
          </div>
          <div className="relative h-full overflow-auto">
            <table className="min-w-full mb-4 text-white">
              <thead className="text-[11px] border-b-[1px] border-white/10 font-medium leading-[14.85px] text-white/50">
                <tr>
                  <th className="px-0 py-2"></th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                    Manager Name
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                    Email
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                    <JobType
                      setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                      jobTitleDropdownOpen={jobTitleDropdownOpen}
                      toggleJobTitleDropdown={toggleJobTitleDropdown}
                      setJobType={setJobType}
                      jobType={jobType}
                      isManager={true}
                    />
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                    <LocationType
                      setLocationDropdownOpen={setLocationDropdownOpen}
                      locationDropdownOpen={locationDropdownOpen}
                      toggleLocationDropdown={toggleLocationDropdown}
                      setLocationType={setLocationType}
                      locationType={locationType}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.length > 0 ? (
                  <>
                    {filteredData?.map((manager, index) => {
                      const isSelected = selectedManager?._id === manager._id;
                      return (
                        <tr
                          key={index}
                          className="border-b-[1px] border-white/10"
                        >
                          <td className="px-0 py-2">
                            <input
                              type="checkbox"
                              className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500] 
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] 
                                checked:after:text-md checked:after:p-1"
                              checked={isSelected}
                              onChange={() => handleSelectManager(manager)}
                            />
                          </td>
                          <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                            {manager?.name}
                          </td>
                          <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                            {manager?.email}
                          </td>
                          <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                            {manager?.jobtitle}
                          </td>
                          <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                            {manager?.location}
                          </td>
                        </tr>
                      );
                    })}
                  </>
                ) : (
                  <div className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px] font-normal leading-[21.6px] text-white">
                    No managers available
                  </div>
                )}
              </tbody>
            </table>
          </div>
          {/* <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
            >
              Done
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ManagerDeleteAssignModal;
