import React, { useState, useRef, useEffect } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import ReactivateModal from "./ReactiveModal";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import ManagerListLoader from "../managers/ManagerListLoader";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";
import { useNavigate } from "react-router-dom";

const DeactivatedEmployeesTable = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("deleted");
  const [openDropDownFilter, setOpenDropDownFilter] = useState(false);
  const [openJobTitleDropDown, setOpenJobTitleDropDown] = useState(false);
  const [openLocationDropDown, setOpenLocationDropDown] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const [userId, setUserId] = useState();

  const dropDownRef = useRef(null);

  // mahad -
  const [sortFilter, setSortFilter] = useState("none");
  const handleCheckboxChange = (sort) => {
    setSortFilter(sort);
  };

  // const users = activeTab === "deleted" ? deletedUsers : deactivatedUsers;

  const toggleDropDownFilter = () => {
    setOpenDropDownFilter(!openDropDownFilter);
  };

  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleActionClick = (id) => {
    setUserId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [activateLoading, setActivateLoading] = useState(false);
  const handleReactivate = async () => {
    try {
      setActivateLoading(true);
      const response = await axios.put(`/owner/user/activate/${userId}`);

      if (response.status === 200) {
        setIsModalOpen(false);
        getUsersData();
        setActivateLoading(false);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setActivateLoading(false);
    }
  };

  const [usersData, setUsersData] = useState([]);

  const [delUsersData, setDelUsersData] = useState([]);

  const [filteredData, setFilteredData] = useState([]);
  const [filteredDeactivateData, setFilteredDeactivateData] = useState([]);

  const [loading, setLoading] = useState(false);

  const getUsersData = async () => {
    try {
      setLoading(true);
      if (activeTab == "deleted") {
        const { data } = await axios.get(`/owner/user?isDelete=true`);
        if (data.success === true) {
          setDelUsersData(data?.data);
        }
      } else {
        const { data } = await axios.get(`/owner/user?isDelete=${false}`);
        if (data.success === true) {
          setUsersData(data?.data);
        }
      }
    } catch (error) {
      setUsersData([]);
      setDelUsersData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersData();
  }, [activeTab]);

  useEffect(() => {
    let filtered = delUsersData;
    let deactivateFiltered = usersData;

    if (sortFilter === "managers") {
      filtered = delUsersData?.filter((item) => item?.userType === "Manager");
      deactivateFiltered = usersData?.filter(
        (item) => item?.userType === "Manager"
      );
    } else if (sortFilter === "employees") {
      filtered = delUsersData?.filter((item) => item?.userType === "Employee");
      deactivateFiltered = usersData?.filter(
        (item) => item?.userType === "Employee"
      );
    }

    setFilteredData(filtered);
    setFilteredDeactivateData(deactivateFiltered);
  }, [sortFilter, delUsersData, usersData]);

  const deactivateFilteredData = filteredDeactivateData?.filter((item) => {
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? jobType?.includes(item?.jobtitle?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return locationTypeMatch && jobTypeMatch;
  });

  const handleNavigateClick = (userData) => {
    if (userData?.userType === "Manager") {
      navigate(`/edit-manager/${userData?._id}`, { state: "Not Edit" });
    } else {
      navigate(`/edit-employee/${userData?._id}`, { state: "Not Edit" });
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        {activeTab === "deleted" ? "Deleted Users" : "Deactivated Users"}
      </h3>

      <div className="w-full h-auto flex items-center">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("deleted")}
            className={`p-1 rounded-none border-b-[3px] font-semibold ${
              activeTab === "deleted"
                ? "text-[#199BD1] border-[#199BD1]"
                : "text-white/50 border-transparent"
            }`}
          >
            Deleted Users
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("deactivated")}
            className={`p-1 rounded-none border-b-[3px] font-semibold ${
              activeTab === "deactivated"
                ? "text-[#199BD1] border-[#199BD1]"
                : "text-white/50 border-transparent"
            }`}
          >
            Deactivated Users
          </button>
        </div>

        <button
          type="button"
          onClick={toggleDropDownFilter}
          className="w-auto outline-none relative min-w-12 h-8 rounded-full px-2 flex gap-2 items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff] ml-auto"
        >
          <span>Sort By</span>
          <TbCaretDownFilled className="text-md text-white" />
          <div
            ref={dropDownRef}
            className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
              openDropDownFilter ? "scale-100" : "scale-0"
            } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-9 right-0`}
          >
            <div className="w-full flex justify-start items-start gap-2">
              <input
                checked={sortFilter === "none"}
                onChange={() => handleCheckboxChange("none")}
                type="checkbox"
                className="w-3 h-3 accent-[#199BD1]"
              />
              <span className="text-white text-[11px] font-medium leading-[14.85px]">
                None
              </span>
            </div>
            <div className="w-full flex justify-start items-start gap-2">
              <input
                checked={sortFilter === "managers"}
                onChange={() => handleCheckboxChange("managers")}
                type="checkbox"
                className="w-3 h-3 accent-[#199BD1]"
              />
              <span className="text-white text-[11px] font-medium leading-[14.85px]">
                Managers
              </span>
            </div>
            <div className="w-full flex justify-start items-start gap-2">
              <input
                checked={sortFilter === "employees"}
                onChange={() => handleCheckboxChange("employees")}
                type="checkbox"
                className="w-3 h-3 accent-[#199BD1]"
              />
              <span className="text-white text-[11px] font-medium leading-[14.85px]">
                Employees
              </span>
            </div>
          </div>
        </button>
      </div>

      {loading ? (
        <ManagerListLoader />
      ) : (
        <>
          {activeTab === "deleted" ? (
            <div className="w-full overflow-x-auto lg:overflow-visible">
              <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
                <div className="w-full grid grid-cols-6 h-6 border-white/10 border-b text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
                  <span className="w-full flex justify-start items-center pl-2">
                    Name
                  </span>
                  <span className="w-full flex col-span-2 justify-start items-center pl-2">
                    Email
                  </span>
                  <JobType
                    setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                    jobTitleDropdownOpen={jobTitleDropdownOpen}
                    toggleJobTitleDropdown={toggleJobTitleDropdown}
                    jobType={jobType}
                    setJobType={setJobType}
                    JobTitles={usersData?.map((item) => item.jobtitle)}
                  />
                  <LocationType
                    setLocationDropdownOpen={setLocationDropdownOpen}
                    locationDropdownOpen={locationDropdownOpen}
                    toggleLocationDropdown={toggleLocationDropdown}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    locationTitles={usersData?.map((item) => item.location)}
                    title="Location"
                  />
                </div>

                {filteredData.length > 0 ? (
                  filteredData?.map((user, index) => (
                    <div
                      key={index}
                      className="w-full grid grid-cols-6 h-12 border-b border-white/10 text-[14px] font-medium leading-[14.85px] text-white justify-start items-center"
                    >
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.name}
                      </span>
                      <span className="w-full flex col-span-2 justify-start items-center pl-2">
                        {user?.email}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.jobtitle}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.userType}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.location}
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    className="w-full grid grid-cols-6 col-span-6 h-12 border-b border-white/10 text-[14px] font-medium leading-[14.85px]
                   text-white justify-start items-center"
                  >
                    No User Found{" "}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full overflow-x-auto lg:overflow-visible">
              <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
                <div className="w-full grid grid-cols-7 h-6 border-white/10 border-b text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
                  <span className="w-full flex justify-start items-center pl-2">
                    Name
                  </span>
                  <span className="w-full flex col-span-2 justify-start items-center pl-2">
                    Email
                  </span>

                  <JobType
                    setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                    jobTitleDropdownOpen={jobTitleDropdownOpen}
                    toggleJobTitleDropdown={toggleJobTitleDropdown}
                    jobType={jobType}
                    setJobType={setJobType}
                    JobTitles={usersData?.map((item) => item.jobtitle)}
                  />
                  <LocationType
                    setLocationDropdownOpen={setLocationDropdownOpen}
                    locationDropdownOpen={locationDropdownOpen}
                    toggleLocationDropdown={toggleLocationDropdown}
                    locationType={locationType}
                    setLocationType={setLocationType}
                    locationTitles={usersData?.map((item) => item.location)}
                    title="Location"
                  />
                  <span className="w-full flex justify-start items-center pl-2">
                    Action
                  </span>
                </div>

                {deactivateFilteredData?.length > 0 ? (
                  deactivateFilteredData?.map((user, index) => (
                    <div
                      onClick={() => handleNavigateClick(user)}
                      key={index}
                      className="cursor-pointer w-full grid grid-cols-7 min-h-12 h-auto border-b border-white/10 text-[14px] font-medium leading-[14.85px] text-white justify-start items-center"
                    >
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.name}
                      </span>
                      <span className="w-full flex col-span-2 justify-start items-center pl-2">
                        {user?.email}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.jobtitle}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.userType}
                      </span>
                      <span className="w-full flex justify-start items-center pl-2">
                        {user?.location}
                      </span>
                      <span className="w-full flex justify-start items-center pl-5 text-white cursor-pointer">
                        <TfiReload
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(user?._id);
                          }}
                        />
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    className="w-full grid grid-cols-6 col-span-6 h-12 border-b border-white/10 text-[14px] font-medium leading-[14.85px]
                 text-white justify-start items-center"
                  >
                    No User Found{" "}
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <ReactivateModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reactivate={handleReactivate}
          activateLoading={activateLoading}
        />
      )}
    </div>
  );
};

export default DeactivatedEmployeesTable;
