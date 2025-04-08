import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import DeleteAccount from "../global/DeleteAccount";
import DeactivateAccountModal from "../../pages/Employees/DeactivateAccountModal";
import DeleteAccountModal from "../global/DeleteAccountModal";
import ManagerListLoader from "../managers/ManagerListLoader";
import { ErrorToast } from "../global/Toaster";
import axios from "../../axios";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";
import { CiExport } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import ReactivateModal from "./ReactiveModal";

const EmployeesTableBig = ({
  data,
  loading,
  getEmployees,
  locationType,
  setFindSearch,
  setLocationType,
  jobType,
  setJobType,
  setCurrentPage,
}) => {
  const { navigate, setUpdateEmployee } = useContext(GlobalContext);
  const timeoutRef = useRef(null);
  const navigation = useNavigate();

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);
  const [employeeId, setEmployeeId] = useState();
  const [exportLoader, setExportLoader] = useState(false);

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  // const filteredData = data?.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const handleEditClick = (id) => {
    navigation(`/edit-employee/${id}`, { state: "Edit" });
  };

  const handleNavigateClick = (id) => {
    navigation(`/edit-employee/${id}`, { state: "Not Edit" });
  };

  const [userId, setUserId] = useState();
  const [isReactivateModalOpen, setIsReactivateModalOpen] = useState(false);

  const handleActionClick = (id) => {
    setUserId(id);
    setIsReactivateModalOpen(true);
  };

  const [activateLoading, setActivateLoading] = useState(false);
  const handleReactivate = async () => {
    try {
      setActivateLoading(true);
      const response = await axios.put(`/owner/user/activate/${userId}`);

      if (response.status === 200) {
        setIsReactivateModalOpen(false);
        getEmployees();
        setActivateLoading(false);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setActivateLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setEmployeeId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeactivate = async () => {
    navigation(`/delete-account/${employeeId}`, {
      state: { reasonForDelete: "deactivation" },
    });
  };

  const handleDelete = () => {
    setIsAccountDeleteModalOpen(true); // Open the delete modal
    // setIsModalOpen(false); // Close the delete modal when deactivate modal opens
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    //* Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setFindSearch(search);
    }, 1000);
  };

  const exportManagers = async () => {
    setExportLoader(true);
    try {
      const response = await axios.get("/owner/employees/csv");

      if (response.status === 200) {
        const result = await response?.data;

        // Check if the data contains the download link
        if (result?.success && result?.data) {
          const downloadUrl = result?.data;

          // Create an anchor element and trigger a download
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "Manager.csv"; // Optional: Specify the download file name
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.error("Failed to fetch download link:", result?.message);
        }
      } else {
        ErrorToast("Failed to download CSV");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.error("Error downloading file:", err);
    } finally {
      setExportLoader(false);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Employees List
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <div className="flex content-center justify-end  h-full w-full ">
          <button
            disabled={exportLoader}
            onClick={exportManagers}
            className="h-[35px] w-[125px] mr-1 px-1 flex items-center gap-1 rounded-[10px] justify-center
             bg-[#4c585c] text-white text-[11px] font-bold leading-[14.85px] hover:bg-[#576367]"
          >
            <span className="text-[11px]">
              <CiExport className="text-[16px]" />
            </span>
            {exportLoader ? "Exporting..." : "Export Employees"}
          </button>

          <button
            onClick={() => navigate("/add-employee", "Employees")}
            className="h-[35px] w-[114px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1]
             text-white text-[11px] font-bold leading-[14.85px]"
          >
            <span className="text-lg">+</span>
            Add Employee
          </button>
        </div>
      </div>

      <div className="w-full overflow-x-auto lg:overflow-visible">
        <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start ">
          <div
            className="w-full grid grid-cols-[4fr_5fr_4fr_4fr_4fr_auto] border-b border-white/10 h-6 text-[11px] font-medium 
          leading-[14.85px] text-white/50 justify-start items-start pr-10"
          >
            <span className="w-full flex justify-start items-center">
              Employee Name
            </span>
            <span className="w-full flex justify-start items-center">
              Email
            </span>
            <span className="w-full flex justify-start items-center">
              Manager
            </span>
            <JobType
              setJobTitleDropdownOpen={setJobTitleDropdownOpen}
              jobTitleDropdownOpen={jobTitleDropdownOpen}
              toggleJobTitleDropdown={toggleJobTitleDropdown}
              jobType={jobType}
              setJobType={setJobType}
              setCurrentPage={setCurrentPage}
              isManager={false}
            />
            <LocationType
              setLocationDropdownOpen={setLocationDropdownOpen}
              locationDropdownOpen={locationDropdownOpen}
              toggleLocationDropdown={toggleLocationDropdown}
              locationType={locationType}
              setLocationType={setLocationType}
              setCurrentPage={setCurrentPage}
              locationTitles={data?.map((item) => item.location)}
              title="Location"
            />
            <span className="w-full flex justify-start items-center ">
              Action
            </span>
          </div>

          {loading ? (
            <ManagerListLoader />
          ) : (
            <>
              {data?.length > 0 ? (
                data?.map((employee, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      if (employee?.isActive) {
                        handleNavigateClick(employee?._id);
                      }
                    }}
                    className={` ${
                      employee?.isActive === true ? "cursor-pointer" : ""
                    } w-full h-auto grid grid-cols-[4fr_5fr_4fr_4fr_4fr_auto] border-b border-white/10  text-[11px]
            font-medium leading-[14.85px] text-white justify-start items-center pr-8 py-1`}
                  >
                    <span className="h-10 w-full flex justify-start items-center">
                      {employee?.name}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employee?.email}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employee?.manager?.name
                        ? employee?.manager?.name
                        : "Not assigned"}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employee?.jobtitle}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employee?.location || "---"}
                    </span>
                    <div className="w-full flex  text-[15px] text-white/40 justify-start items-center gap-2 ml-1">
                      <span
                        className="flex justify-start items-center cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(employee?._id);
                        }}
                      >
                        <FaRegEdit />
                      </span>
                      {employee?.isActive === true ? (
                        <span
                          className="flex justify-start items-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(employee?._id);
                          }}
                        >
                          <RiDeleteBinLine />
                        </span>
                      ) : (
                        <span
                          className="flex justify-start items-center cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleActionClick(employee?._id);
                          }}
                        >
                          <TfiReload />
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div>No record found</div>
              )}
            </>
          )}
        </div>
        <DeleteAccount
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDeactivate={handleDeactivate}
          onDelete={() => handleDelete()}
          deactivateLoading={deactivateLoading}
        />

        {isReactivateModalOpen && (
          <ReactivateModal
            isOpen={isReactivateModalOpen}
            onClose={handleCloseModal}
            reactivate={handleReactivate}
            activateLoading={activateLoading}
          />
        )}

        <DeactivateAccountModal
          isOpen={isDeactivateModalOpen}
          setIsOpen={setIsDeactivateModalOpen}
        />

        <DeleteAccountModal
          employeeId={employeeId}
          isOpen={isAccountDeleteModalOpen}
          onClose={() => setIsAccountDeleteModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default EmployeesTableBig;
