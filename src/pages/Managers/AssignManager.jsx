import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import ManagerDetailModal from "../Managers/ManagerDetailModal"; // Update with the correct path
import AssignManagerModal from "../Managers/AssignManagerModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import ManagerDetailLoader from "../../components/managers/ManagerDetailLoader";

const AssignManager = () => {
  const { getEmployees, employees, loadingEmployees } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredData = employees?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

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

  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] =
    useState(false);

  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [assignLoading, setAssignLoading] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [selectedEmployeesError, setSelectedEmployeesError] = useState(false);
  const [selectedManagerError, setSelectedManagerError] = useState(false);

  const handleSelectEmployee = (employeeId, employeeName) => {
    setSelectedEmployeesError(false);
    const isSelected = selectedEmployees.some(
      (employee) => employee?.id === employeeId
    );
    if (isSelected) {
      setSelectedEmployees(
        selectedEmployees.filter((employee) => employee?.id !== employeeId)
      );
    } else {
      setSelectedEmployees([
        ...selectedEmployees,
        { id: employeeId, name: employeeName },
      ]);
    }
  };

  const handleAssignManager = async () => {
    setAssignLoading(true);
    try {
      if (!passSelectedManager?.id) {
        setSelectedManagerError(true);
        return;
      }
      if (selectedEmployees.length === 0) {
        setSelectedEmployeesError(true);
        return;
      }
      const obj = {
        employees: selectedEmployees?.map((item) => item.id),
      };
      const response = await axios.put(
        `/owner/manager/${passSelectedManager?.id}/employees/assign`,
        obj
      );
      if (response.status === 200) {
        setIsAssignEmployeeModalOpen(true);
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setAssignLoading(false);
    }
  };

  useEffect(() => {
    getEmployees(jobType, locationType);
  }, [locationType, jobType]);

  // const toggleLocationDropdown = (e) => {
  //   if (locationRef.current && !locationRef.current.contains(e.target)) {
  //     setLocationFilter((prev) => !prev);
  //   }
  // };

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
              onClick={() => {
                setIsBoatModalOpen(true);
                setSelectedManagerError(false);
              }} // Open the Employee Detail Modal
              className="w-full h-[52px] text-gray-400 bg-[#1A293D] text-left disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl mb-6"
            >
              {passSelectedManager?.name || "Click here to select manager"}
            </button>
            {selectedManagerError && (
              <p className="text-red-500 -mt-12">Select Manager</p>
            )}
          </div>
          <button
            disabled={assignLoading}
            onClick={handleAssignManager}
            className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Assign Manager</span>
              {assignLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
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
        {selectedEmployeesError && (
          <p className="text-red-500 ">Select Employee</p>
        )}
        <div className="w-full overflow-x-auto lg:overflow-visible">
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
              <div className="flex items-center px-2 col-span-2">
                <JobType
                  setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                  jobTitleDropdownOpen={jobTitleDropdownOpen}
                  toggleJobTitleDropdown={toggleJobTitleDropdown}
                  jobType={jobType}
                  setJobType={setJobType}
                  isManager={false}
                />
              </div>

              <div className="flex items-center px-2 col-span-1">
                <LocationType
                  setLocationDropdownOpen={setLocationDropdownOpen}
                  locationDropdownOpen={locationDropdownOpen}
                  toggleLocationDropdown={toggleLocationDropdown}
                  setLocationType={setLocationType}
                  locationType={locationType}
                />
              </div>
            </div>

            <>
              {loadingEmployees ? (
                <ManagerDetailLoader />
              ) : (
                <>
                  {filteredData && filteredData.length > 0 ? (
                    filteredData?.map((employee, index) => {
                      const isMultiSelected = selectedEmployees?.some(
                        (selected) => selected?.id === employee?._id
                      );
                      return (
                        <div
                          key={index}
                          className="w-full h-10 grid grid-cols-10 border-b border-[#fff]/[0.14] text-[11px] font-medium leading-[14.85px] text-white"
                        >
                          <div className="flex items-center col-span-1 px-2">
                            <input
                              checked={isMultiSelected}
                              onChange={() =>
                                handleSelectEmployee(
                                  employee?._id,
                                  employee?.name
                                )
                              }
                              type="checkbox"
                              className="w-4 h-4 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] checked:after:text-xs checked:after:p-0.5"
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
                    <div className="w-full h-10 grid grid-cols-1 border-b mt-2 text-center">
                      No data found.
                    </div>
                  )}
                </>
              )}
            </>
          </div>
        </div>

        {/* EmployeeDetailModal Component */}
        {isBoatModalOpen && (
          <ManagerDetailModal
            setIsOpen={setIsBoatModalOpen}
            SetPassSelectedManager={SetPassSelectedManager}
            selectedManager={selectedManager}
            setSelectedManager={setSelectedManager}
          />
        )}

        {/* AssignManagerModal Component */}
        {isAssignEmployeeModalOpen && (
          <AssignManagerModal
            isOpen={isAssignEmployeeModalOpen}
            onClose={() => {
              setIsAssignEmployeeModalOpen(false);
              navigate("/employees");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AssignManager;
