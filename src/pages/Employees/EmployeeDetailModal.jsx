import React, { useState, useEffect, useContext } from "react";
import { FiSearch } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import JobType from "../../components/global/headerDropdowns/JobType";
import LocationType from "../../components/global/headerDropdowns/LocationType";
import { ErrorToast } from "../../components/global/Toaster";

const EmployeeDetailModal = ({
  setIsOpen,
  SetPassSelectedEmployee,
  passSelectedEmployee,
  setInputError,
  isMultiple = false,
  employeeId = "",
}) => {
  const { employees, loadingEmployees } = useContext(GlobalContext);
  const [allSelected, setAllSelected] = useState(false);

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [jobType, setJobType] = useState([]);
  const [locationType, setLocationType] = useState([]);

  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = employees?.filter((item) => {
    const employees = employeeId ? employeeId !== item._id : true;

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
    return matchesSearch && locationTypeMatch && jobTypeMatch && employees;
  });

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleSelectEmployee = (employeeId, employeeName) => {
    setInputError({});
    if (isMultiple) {
      const isSelected = selectedEmployee?.some(
        (employee) => employee?.id === employeeId
      );
      if (isSelected) {
        setSelectedEmployee(
          selectedEmployee?.filter((employee) => employee?.id !== employeeId)
        );
      } else {
        setSelectedEmployee([
          ...selectedEmployee,
          { id: employeeId, name: employeeName },
        ]);
      }
      if (selectedEmployee?.length + (isSelected ? -1 : 1) === 0) {
        setAllSelected(false);
      }
    } else {
      if (selectedEmployee?.id === employeeId) {
        setSelectedEmployee(null);
      } else {
        setSelectedEmployee({ id: employeeId, name: employeeName });
      }
    }
  };

  const handleEmployeeSelection = () => {
    if (selectedEmployee) {
      SetPassSelectedEmployee(selectedEmployee);
      setIsOpen(false);
    } else {
      ErrorToast("Select Employee");
    }
  };

  // const handleSelectAll = () => {
  //   if (allSelected) {
  //     // Deselect all employee
  //     setSelectedEmployee([]);
  //   } else {
  //     // Select all employee
  //     setSelectedEmployee(
  //       filteredData.map((employee) => ({
  //         id: employee._id,
  //         name: employee.name,
  //       }))
  //     );
  //   }
  //   setAllSelected(!allSelected);
  // };

  useEffect(() => {
    if (!isMultiple) {
      setSelectedEmployee(passSelectedEmployee);
    }
  }, [passSelectedEmployee]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-10">
      <div className="w-[100%]  h-[90%] lg:w-[953px] lg:h-[680px] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex flex-col mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Select Employee</h3>
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
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="text"
                  placeholder="Search here"
                  className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full text-white/50 pl-2"
                />
              </div>
              <button
                type="button"
                onClick={() => handleEmployeeSelection()}
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                Done
              </button>
            </div>
            {/* <div className="mt-4 mb-2">
              {isMultiple && (
                <label className="flex items-center text-white/50">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border-2 border-[#FFFFFF80] rounded-sm bg-transparent appearance-none checked:bg-white
                    mr-1.5 checked:border-[#FFFFFF80] checked:ring-1 checked:after:font-[500]
                                checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229]
                                 checked:after:text-md checked:after:p-1"
                    checked={allSelected}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              )}
            </div> */}
          </div>
          <div className="relative h-full overflow-auto">
            <table className="min-w-full mb-4 text-white">
              <thead className="text-[11px] border-b-[1px] border-white/10 font-medium leading-[14.85px] text-white/50">
                <tr>
                  <th className="px-0 py-2"></th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                    Employee Name
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                    Email
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                    <JobType
                      setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                      jobTitleDropdownOpen={jobTitleDropdownOpen}
                      toggleJobTitleDropdown={toggleJobTitleDropdown}
                      jobType={jobType}
                      setJobType={setJobType}
                      jobTitles={employees?.map((item) => item.jobtitle)}
                      setCurrentPage={() => {}}
                      isManager={false}
                    />
                  </th>
                  <th className="px-4 py-2 text-[11px] font-medium leading-[14.85px] relative">
                    <LocationType
                      setLocationDropdownOpen={setLocationDropdownOpen}
                      locationDropdownOpen={locationDropdownOpen}
                      toggleLocationDropdown={toggleLocationDropdown}
                      locationType={locationType}
                      setLocationType={setLocationType}
                      setCurrentPage={() => {}}
                      locationTitles={employees?.map((item) => item.location)}
                      title="Location"
                    />
                  </th>
                </tr>
              </thead>
              {loadingEmployees ? (
                <tbody>
                  {[...Array(10)].map((_, index) => (
                    <tr key={index} className="border-b-[1px] border-white/10">
                      <td className="px-0 py-2">
                        <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        <div className="w-28 h-4 bg-gray-600 rounded animate-pulse"></div>
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
                      </td>
                      <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                        <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  {filteredData?.length > 0 ? (
                    <>
                      {filteredData?.map((employee, index) => {
                        const isSelected =
                          selectedEmployee?.id === employee?._id;
                        const isMultiSelected =
                          isMultiple && Array.isArray(selectedEmployee)
                            ? selectedEmployee.some(
                                (selected) => selected?.id === employee?._id
                              )
                            : false;
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
                              checked:ring-[#FFFFFF80] checked:after:content-['✓'] checked:after:text-[#001229] checked:after:text-md checked:after:p-1"
                                checked={
                                  isMultiple ? isMultiSelected : isSelected
                                }
                                onChange={() =>
                                  handleSelectEmployee(
                                    employee._id,
                                    employee.name
                                  )
                                }
                              />
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {employee?.name}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {employee?.email}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px]">
                              {employee?.jobtitle}
                            </td>
                            <td className="px-4 py-2 text-[11px] font-medium leading-[14.85px] w-[240px]">
                              {employee?.location}
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="text-center py-4 text-sm font-medium text-white"
                      >
                        No record found
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
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

export default EmployeeDetailModal;
