import React, { useContext, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import ManagerDetailModal from "../Managers/ManagerDetailModal"; // Update with the correct path
import AssignManagerModal from "../Managers/AssignManagerModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";

const AssignManager = () => {
  const { managers, employees } = useContext(GlobalContext);
  const navigate = useNavigate()
  const [search, setSearch] = useState("");
  const filteredData = employees?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
);

  const [locationFilter, setLocationFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false); // State for employee detail modal
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] =
    useState(false); // State for assign employee modal 

  const [passSelectedManager, SetPassSelectedManager] = useState("")
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false)

  const handleSelectEmployee = (employeeId, employeeName) => {
      const isSelected = selectedEmployees.some((employee) => employee?.id === employeeId);
      if (isSelected) {
        setSelectedEmployees(selectedEmployees.filter((employee) => employee?.id !== employeeId));
      } else {
        setSelectedEmployees([...selectedEmployees, 
          { id: employeeId, name: employeeName }]);
      }
  };

  const handleAssignManager =async()=>{
    setAssignLoading(true)
    try{
      const obj = {
        employees: selectedEmployees?.map(item=>item.id)
      }
      const response = await axios.put(`/owner/manager/${passSelectedManager?.id}/employees/assign`,obj)
      if(response.status === 200){
        setIsAssignEmployeeModalOpen(true) 
      }
    }
    catch(err){
      console.log("🚀 ~ handleAssignEmployees ~ err:", err)
      ErrorToast(err?.response?.data?.message)
    }
    finally{
      setAssignLoading(false)
    }
  }

  const locationRef = useRef(null);
  const jobRef = useRef(null);

  const toggleLocationDropdown = (e) => {
    if (locationRef.current && !locationRef.current.contains(e.target)) {
      setLocationFilter((prev) => !prev);
    }
  };

  const toggleJobDropdown = (e) => {
    if (jobRef.current && !jobRef.current.contains(e.target)) {
      setJobFilter((prev) => !prev);
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white mb-4">
          Assign Manager
        </h3>

        {/* Select Manager and Assign Manager Button on the same row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
          <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 lg:gap-6">
            <label className="text-[16px] font-medium leading-[21.6px] text-white mb-[-15px]">
              Select Manager
            </label>
            <button
              onClick={() => setIsBoatModalOpen(true)} // Open the Employee Detail Modal
              className="w-full h-[52px] text-gray-400 bg-[#1A293D] text-left disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl mb-6"
            >
              {passSelectedManager?.name ||"Click here to select manager"}
            </button>
          </div>

          <button
          disabled={assignLoading}
            onClick={handleAssignManager} 
            className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
          >
            <div className="flex items-center"><span className="mr-1">Assign Manager</span>{assignLoading &&(
                <FiLoader className="animate-spin text-lg mx-auto" />)}</div>
          </button>
        </div>

        <div className="w-full flex justify-start items-center gap-4 lg:gap-6 mt-4 lg:mt-0">
          <div className="flex w-full lg:w-[295px] h-[32px] justify-start items-center rounded-[8px] bg-[#1A293D] relative">
            <span className="w-[32px] h-full flex items-center justify-center">
              <IoIosSearch className="text-white/50 text-lg" />
            </span>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here"
              className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white"
            />
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Table Headings */}
            <div className="w-full grid h-10 grid-cols-10 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
              <div className="flex items-center px-2 col-span-1"></div>
              <div className="flex items-center px-2 col-span-2">
                <span className="text-white/50">Employee Name</span>
              </div>
              <div className="flex items-center px-2 col-span-3">
                <span className="text-white/50">Email</span>
              </div>
              <div className="flex items-center px-2 col-span-2 relative">
                <span className="text-white/50">Job Title</span>
                <button onClick={toggleJobDropdown} className="ml-1">
                  <FaCaretDown className="text-white/50 text-sm" />
                </button>
                <div
                  ref={jobRef}
                  className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    jobFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium">
                      Dock Guard
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium">
                      Boat Captain
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center px-2 col-span-2 relative">
                <span className="text-white/50">Location</span>
                <button onClick={toggleLocationDropdown} className="ml-1">
                  <FaCaretDown className="text-white/50 text-sm" />
                </button>
                <div
                  ref={locationRef}
                  className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    locationFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 absolute top-full left-0 mt-1`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium">
                      East California Dock
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-3 h-3 accent-[#199BD1]"
                    />
                    <span className="text-white/50 text-[11px] font-medium">
                      West California Dock
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Content */}
            <>
  {filteredData && filteredData.length > 0 ? (
    filteredData?.map((employee, index) => {
      const isMultiSelected = selectedEmployees?.some((selected) => selected?.id === employee?._id);
      return (
        <div
          key={index}
          className="w-full h-10 grid grid-cols-10 border-b border-[#fff]/[0.14] text-[11px] font-medium leading-[14.85px] text-white"
        >
          <div className="flex items-center col-span-1 px-2">
            <input
              checked={isMultiSelected}
              onChange={() => handleSelectEmployee(employee?._id, employee?.name)}
              type="checkbox"
              className="w-3 h-3 accent-[#199BD1]"
            />
          </div>
          <span className="col-span-2 flex items-center px-2">
            {employee?.name}
          </span>
          <span className="flex items-center px-2 col-span-3">
            {employee?.email}
          </span>
          <span className="flex items-center px-2 col-span-2">
            {employee?.jobtitle}
          </span>
          <span className="flex items-center px-2 col-span-2">
            {employee?.location}
          </span>
        </div>
      );
    })
  ) : (
    <div className="w-full h-10 grid grid-cols-10 border-b text-center">
      No data found. Add employees and conquer the tasks together!
    </div>
  )}
</>
          </div>
        </div>

        {/* EmployeeDetailModal Component */}
        {isBoatModalOpen && (
          <ManagerDetailModal setIsOpen={setIsBoatModalOpen} SetPassSelectedManager={SetPassSelectedManager}/>
        )}

        {/* AssignManagerModal Component */}
        {isAssignEmployeeModalOpen && (
          <AssignManagerModal
            isOpen={isAssignEmployeeModalOpen}
            onClose={() => {setIsAssignEmployeeModalOpen(false); navigate("/employees")}}
          />
        )}
      </div>
    </div>
  );
};

export default AssignManager;
