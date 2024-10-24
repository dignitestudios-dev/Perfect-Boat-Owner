import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown } from "react-icons/fa";
import { GlobalContext } from "../../contexts/GlobalContext";
import BoatAccessModal from "./BoatAccessModal";
import { IoIosSearch } from "react-icons/io";
import BoatAccessList from "./BoatAccessList";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const BoatAccessRights = () => {
  const { managers } = useContext(GlobalContext);
  const [search, setSearch] = useState("");
  const [isBoatAccessModalOpen, setIsBoatAccessModalOpen] = useState(false);
  const [managerId, setManagerId] = useState("")
  const [managerName, setManagerName] = useState("")
  const jobRef = useRef(null);
  const locationRef = useRef(null);

  const filteredData = managers?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const openBoatAccessModal = (id, name) => {
    setManagerName(name)
    setManagerId(id)
    setIsBoatAccessModalOpen(true);
  };

  const handleClickOutside = (event) => {
    if (jobRef.current && !jobRef.current.contains(event.target)) {
      setJobFilter(false);
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
    <div className="h-full w-full p-2 lg:p-6 flex flex-col gap-6">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
          Manager Access
        </h3>

        <div className="w-full flex flex-wrap gap-4 items-center">
          <div className="flex w-full lg:w-[295px] h-[32px] justify-start items-center rounded-[8px] bg-[#1A293D] relative">
            <span className="w-[32px] h-full flex items-center justify-start">
              <IoIosSearch className="text-white/50 text-lg" />
            </span>
            <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here"
              className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white"
            />
          </div>
        </div>

        <div className="w-full flex flex-col gap-1">
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-[800px] bg-[#001229]">
              <div className="grid h-10  border-b border-[#fff]/[0.14] grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50  sticky top-0 bg-[#001229] z-10">
                <span className="flex items-center justify-start">
                  Manager Name
                </span>
                <JobType jobTitleDropdownOpen={jobTitleDropdownOpen} toggleJobTitleDropdown={toggleJobTitleDropdown}/>
                <LocationType locationDropdownOpen={locationDropdownOpen} toggleLocationDropdown={toggleLocationDropdown}/>

                <span className="flex items-center justify-start">Access</span>
              </div>

              <div className="w-full h-[calc(100vh-300px)] overflow-x-auto">
                <div className="w-full h-full overflow-y-auto">
                  <div className="w-full h-auto min-w-[800px]">
                    {filteredData?.map((item, index) => (
                      <div
                        key={index}
                        className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] 
                        py-1 text-[11px] font-medium text-white items-center"
                      >
                        <span
                          // onClick={() => navigate("/employees/1", "Employees")}
                          className="flex items-center justify-start cursor-pointer"
                        >
                          {item?.name}
                        </span>
                        <span className="flex items-center justify-start">
                          {item?.jobtitle}
                        </span>
                        <span className="flex items-center justify-start">
                          {item?.location || "---"}
                        </span>
                        <span className="flex items-center justify-start">
                          {item?.managerAccess}
                        </span>
                        <button
                          onClick={()=>openBoatAccessModal(item?._id, item?.name)}
                          className="w-[74px] h-[27px] flex justify-center items-center bg-[#1A293D] text-[#199BD1] rounded-full py-1"
                        >
                          View Details
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BoatAccessList managerId={managerId} managerName={managerName} isOpen={isBoatAccessModalOpen} setIsOpen={setIsBoatAccessModalOpen}/>
    </div>
  );
};

export default BoatAccessRights;
