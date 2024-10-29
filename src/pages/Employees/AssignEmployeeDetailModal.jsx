import React, { useState, useRef, useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const AssignEmployeeDetailModal = ({ setIsOpen, employeesList }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = employeesList?.filter((item) =>
    item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const jobTitleRef = useRef(null);
  const locationRef = useRef(null);

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
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
      <div className="w-[100%]  h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Employee</h3>
              <button
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
                onChange={(e)=>setSearchTerm(e.target.value)} 
                  type="text"
                  placeholder="Search here"
                  className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
                />
              </div>
              {/* <button
                onClick={() => console.log("Search triggered")} // Implement search functionality here
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                Done
              </button> */}
            </div>
          </div>
          <div className="relative h-full overflow-auto">
            <table className="min-w-full mb-4 ">
              <thead className="text-[13px] font-normal leading-[14.85px] text-white/50">
                <tr>
                  {/* <th className="px-0 py-2"></th> */}
                  <th className="px-4 py-2">Employee Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2 relative">
                  <JobType jobTitleDropdownOpen={jobTitleDropdownOpen} toggleJobTitleDropdown={toggleJobTitleDropdown}/>
                  </th>
                  <th className="px-4 py-2 relative">
                    
                  <LocationType locationDropdownOpen={locationDropdownOpen} toggleLocationDropdown={toggleLocationDropdown}/>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((employee, index) =>{
                  return (
                    <tr key={index} className="border-b-[1px] border-white/10">
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        {employee?.name}
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        {employee?.email}
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        {employee?.jobtitle}
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        {employee?.location}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
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

export default AssignEmployeeDetailModal;
