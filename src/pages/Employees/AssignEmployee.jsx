import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import AssignEmployeeModal from "../Employees/AssignEmployeeModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDetailLoader from "../../components/managers/ManagerDetailLoader";
import { ErrorToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";

const AssignEmployee = () => {
  const { employees, loadingEmployees, getEmployees, setLoadingEmployees } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const filteredData = employees?.filter((item) =>
    item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  );

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] =
    useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const [passSelectedManager, SetPassSelectedManager] = useState("");

  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const handleSelectEmployee = (employeeId, employeeName) => {
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

  const handleAssignEmployees = async () => {
    if (!passSelectedManager?.id) {
      ErrorToast("Select manager");
      return;
    }
    if (selectedEmployees?.length === 0) {
      ErrorToast("Select employee");
      return;
    }
    setAssignLoading(true);
    try {
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
  }, [jobType, locationType]);

  useEffect(() => {
    if (selectedManager?.id) {
      const managerById = async () => {
        try {
          setLoadingEmployees(true);
          const { data } = await axios.get(
            `/owner/manager/${selectedManager?.id}/employees`
          );
          if (data?.success === true) {
            const transformedData = data?.data?.map((item) => ({
              id: item?._id,
              name: item?.name,
            }));
            setSelectedEmployees(transformedData);
          }
        } catch (err) {
          console.log("🚀 ~ handleAssignEmployees ~ err:", err);
          ErrorToast(err?.response?.data?.message);
        } finally {
          setLoadingEmployees(false);
        }
      };
      managerById();
    }
  }, [selectedManager]);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white mb-4">
          Assign Employee
        </h3>
        {/* Select Manager and Assign Employees Button on the same row */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
          <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 lg:gap-6">
            <label className="text-[16px] font-medium leading-[21.6px] text-white mb-[-15px]">
              Select Manager
            </label>
            <button
              onClick={() => setIsBoatModalOpen(true)}
              className="w-full h-[52px] text-gray-400 bg-[#1A293D] text-left disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl mb-6"
            >
              {passSelectedManager
                ? passSelectedManager.name
                : "Click Here To Select Manager"}
            </button>
          </div>
          <button
            disabled={assignLoading}
            onClick={handleAssignEmployees} // Open the Assign Employee Modal
            className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Assign Employees</span>
              {assignLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>
        {/* Search box remains separate */}
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

        <div className="w-full overflow-x-auto lg:overflow-visible">
          <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
            {/* Table Headings */}
            <div className="w-full grid h-10 grid-cols-[1fr_4fr_4fr_4fr_2fr] text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
              <div></div>
              <div className="flex items-center ">
                <span className="text-white/50">Employee Name</span>
              </div>
              <div className="flex items-center ">
                <span className="text-white/50">Email</span>
              </div>
              <div className="flex items-center ">
                <JobType
                  setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                  jobTitleDropdownOpen={jobTitleDropdownOpen}
                  toggleJobTitleDropdown={toggleJobTitleDropdown}
                  jobType={jobType}
                  setJobType={setJobType}
                  isManager={false}
                />
              </div>
              <div className="flex items-center">
                <LocationType
                  setLocationDropdownOpen={setLocationDropdownOpen}
                  locationDropdownOpen={locationDropdownOpen}
                  toggleLocationDropdown={toggleLocationDropdown}
                  setLocationType={setLocationType}
                  locationType={locationType}
                />
              </div>
            </div>

            {loadingEmployees ? (
              <ManagerDetailLoader />
            ) : (
              <>
                {/* Table Content */}
                {filteredData?.length > 0 ? (
                  filteredData?.map((employee, index) => {
                    const isMultiSelected = selectedEmployees.some(
                      (selected) => selected.id === employee._id
                    );
                    return (
                      <div
                        key={index}
                        className="w-full h-10 grid grid-cols-[1fr_4fr_4fr_4fr_2fr] border-b border-[#fff]/[0.14] 
                        text-[11px] font-medium leading-[14.85px] text-white"
                      >
                        <div className="flex items-center ">
                          <input
                            checked={isMultiSelected}
                            onChange={() =>
                              handleSelectEmployee(
                                employee?._id,
                                employee?.name
                              )
                            }
                            type="checkbox"
                            className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                                   checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                  checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] checked:after:text-md checked:after:p-1"
                          />
                        </div>
                        <div className="flex items-center ">
                          <span className=" flex items-center">
                            {employee?.name}
                          </span>
                        </div>

                        <span className="flex items-center ">
                          {employee?.email}
                        </span>
                        <span className="flex items-center ">
                          {employee?.jobtitle}
                        </span>
                        <span className="flex items-center ">
                          {employee?.location || "---"}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className=" mt-6">No record found</div>
                )}
              </>
            )}
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

        {/* AssignEmployeeModal Component */}
        {isAssignEmployeeModalOpen && (
          <AssignEmployeeModal
            managerName={passSelectedManager.name}
            isOpen={isAssignEmployeeModalOpen}
            onClose={() => {
              setIsAssignEmployeeModalOpen(false);
              navigate("/managers");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AssignEmployee;
