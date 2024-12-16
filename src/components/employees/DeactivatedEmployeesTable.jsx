import React, { useState, useRef, useEffect } from "react";
import { TbCaretDownFilled } from "react-icons/tb";
import { TfiReload } from "react-icons/tfi";
import ReactivateModal from "./ReactiveModal";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import ManagerListLoader from "../managers/ManagerListLoader";

const DeactivatedEmployeesTable = () => {
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

  const toggleJobTitleDropDown = () => {
    setOpenJobTitleDropDown(!openJobTitleDropDown);
  };

  const toggleLocationDropDown = () => {
    setOpenLocationDropDown(!openLocationDropDown);
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
          console.log("🚀 ~ getUsersData ~ data:", data);
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

    if (sortFilter === "manager") {
      filtered = delUsersData?.filter((item) => item?.userType === "Manager");
      deactivateFiltered = usersData?.filter(
        (item) => item?.userType === "Manager"
      );
    } else if (sortFilter === "employee") {
      filtered = delUsersData?.filter((item) => item?.userType === "Employee");
      deactivateFiltered = usersData?.filter(
        (item) => item?.userType === "Employee"
      );
    }

    setFilteredData(filtered);
    setFilteredDeactivateData(deactivateFiltered);
  }, [sortFilter, delUsersData, usersData]);

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        {activeTab === "deleted" ? "Deleted Users" : "Deactivated Users"}
      </h3>

      <div className="w-full h-auto flex items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("deleted")}
            className={`p-1 rounded-none border-b-[3px] ${
              activeTab === "deleted"
                ? "text-[#199BD1] border-[#199BD1]"
                : "text-white/50 border-transparent"
            }`}
          >
            Deleted Users
          </button>
          <button
            onClick={() => setActiveTab("deactivated")}
            className={`p-1 rounded-none border-b-[3px] ${
              activeTab === "deactivated"
                ? "text-[#199BD1] border-[#199BD1]"
                : "text-white/50 border-transparent"
            }`}
          >
            Deactivated Users
          </button>
        </div>

        <button
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
                  <span className="w-full flex justify-start items-center pl-2 relative">
                    Job Title
                    <button
                      onClick={toggleJobTitleDropDown}
                      className="ml-1 outline-none flex items-center"
                    >
                      <TbCaretDownFilled className="text-[11px] text-white/50" />
                    </button>
                    <div
                      className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                        openJobTitleDropDown ? "scale-100" : "scale-0"
                      } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-4`}
                    >
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Manager
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Guard
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Supervisor
                        </span>
                      </div>
                    </div>
                  </span>
                  <span className="w-full flex justify-start items-center pl-2">
                    User Type
                  </span>
                  <span className="w-full flex justify-start items-center pl-2 relative">
                    Location
                    <button
                      onClick={toggleLocationDropDown}
                      className="ml-1 outline-none flex items-center"
                    >
                      <TbCaretDownFilled className="text-[11px] text-white/50" />
                    </button>
                    <div
                      className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                        openLocationDropDown ? "scale-100" : "scale-0"
                      } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-4`}
                    >
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          East California Dock
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          West California Dock
                        </span>
                      </div>
                    </div>
                  </span>
                </div>

                {filteredData?.map((user, index) => (
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
                ))}
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
                  <span className="w-full flex justify-start items-center pl-2 relative">
                    Job Title
                    <button
                      onClick={toggleJobTitleDropDown}
                      className="ml-1 outline-none flex items-center"
                    >
                      <TbCaretDownFilled className="text-[11px] text-white/50" />
                    </button>
                    <div
                      className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                        openJobTitleDropDown ? "scale-100" : "scale-0"
                      } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-4`}
                    >
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Manager
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Guard
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          Supervisor
                        </span>
                      </div>
                    </div>
                  </span>
                  <span className="w-full flex justify-start items-center pl-2">
                    User Type
                  </span>
                  <span className="w-full flex justify-start items-center pl-2 relative">
                    Location
                    <button
                      onClick={toggleLocationDropDown}
                      className="ml-1 outline-none flex items-center"
                    >
                      <TbCaretDownFilled className="text-[11px] text-white/50" />
                    </button>
                    <div
                      className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                        openLocationDropDown ? "scale-100" : "scale-0"
                      } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-4`}
                    >
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          East California Dock
                        </span>
                      </div>
                      <div className="w-full flex justify-start items-start gap-2">
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white text-[11px] font-medium leading-[14.85px]">
                          West California Dock
                        </span>
                      </div>
                    </div>
                  </span>
                  <span className="w-full flex justify-start items-center pl-2">
                    Action
                  </span>
                </div>

                {filteredDeactivateData?.map((user, index) => (
                  <div
                    key={index}
                    className="w-full grid grid-cols-7 h-12 border-b border-white/10 text-[14px] font-medium leading-[14.85px] text-white justify-start items-center"
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
                      <TfiReload onClick={() => handleActionClick(user?._id)} />
                    </span>
                  </div>
                ))}
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
