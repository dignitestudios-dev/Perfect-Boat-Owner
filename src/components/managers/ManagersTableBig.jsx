import React, { useContext, useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaCaretDown, FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GlobalContext } from "../../contexts/GlobalContext";
import DeleteAccount from "../global/DeleteAccount";
import DeactivateAccountModal from "../../pages/Employees/DeactivateAccountModal";
import DeleteManagerAccountModal from "../global/DeleteManagerAccountModal";
import ManagerListLoader from "./ManagerListLoader";
import axios from "../../axios";
import { ErrorToast } from "../global/Toaster";
import JobType from "../global/headerDropdowns/JobType";
import LocationType from "../global/headerDropdowns/LocationType";
import { CiExport } from "react-icons/ci";
import { TfiReload } from "react-icons/tfi";
import ReactivateModal from "../employees/ReactiveModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../global/pagination/Pagination";

const ManagerTableBig = ({
  data,
  loading,
  getManagers,
  locationType,
  setFindSearch,
  setLocationType,
  jobType,
  setJobType,
}) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
  const [isAccountDeleteModalOpen, setIsAccountDeleteModalOpen] =
    useState(false);
  const [managerId, setManagerId] = useState("");
  const [deactivateLoading, setDeactivateLoading] = useState(false);
  const [exportLoader, setExportLoader] = useState(false);

  // const filteredData = data?.filter((item) =>
  //   item?.name?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleEditClick = (e, managerData) => {
    e.stopPropagation();
    navigate(`/edit-manager/${managerData?._id}`, { state: "Edit" });
  };

  const handleNavigateClick = (managerData) => {
    navigate(`/edit-manager/${managerData?._id}`, { state: "Not Edit" });
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
        getManagers();
        setActivateLoading(false);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      setActivateLoading(false);
    }
  };

  const handleDeleteClick = (managerID) => {
    setManagerId(managerID);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeactivate = async () => {
    navigate(`/delete-manager-account/${managerId}`, {
      state: { reasonForDelete: "deactivation" },
    });
  };

  const handleDelete = () => {
    setIsAccountDeleteModalOpen(true);
    // setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const search = e.target.value;

    setSearch(search);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    //* Set a new timeout
    timeoutRef.current = setTimeout(() => {
      setFindSearch(search);
      setCurrentPage(1);
    }, 1000);
  };

  const exportManagers = async () => {
    setExportLoader(true);
    try {
      const response = await axios.get("/owner/manager/csv");

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

  const filteredData = data?.filter((item) => {
    const matchesSearch = search
      ? item?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.email?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.jobtitle?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.location?.toLowerCase()?.includes(search?.toLowerCase())
      : true;
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? jobType?.includes(item?.jobtitle?.toLowerCase())
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? locationType?.includes(item?.location?.toLowerCase())
        : true;
    return matchesSearch && locationTypeMatch && jobTypeMatch;
  });

  const totalPages = Math.ceil(filteredData?.length / pageSize);
  // Slice the data for the current page
  const paginatedData = filteredData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Manager List
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
            className="h-[34px] w-[120px] mr-1 px-1 flex items-center gap-1 rounded-[10px] justify-center
             bg-[#4c585c] text-white text-[11px] font-bold leading-[14.85px] hover:bg-[#576367]"
          >
            <span className="text-[11px]">
              <CiExport className="text-[16px]" />
            </span>
            {exportLoader ? "Exporting..." : "Export Managers"}
          </button>

          <button
            onClick={() => navigate("/managers/add", "Managers")}
            className="h-[34px] w-[104px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-bold leading-[14.85px]"
          >
            <span className="text-[11px]">+</span>
            Add Manager
          </button>
        </div>
      </div>
      {loading ? (
        <ManagerListLoader />
      ) : (
        <div className="w-full overflow-x-auto lg:overflow-visible">
          <div className="min-w-[768px] flex flex-col gap-1 justify-start items-start">
            <div
              className="w-full grid grid-cols-[5fr_5fr_5fr_5fr_auto] text-[11px] font-medium leading-[14.85px]
             text-white/50 justify-start items-start pr-10"
            >
              <span className="w-full flex justify-start items-start">
                Manager Name
              </span>
              <span className="w-full flex justify-start items-start">
                Email
              </span>
              <JobType
                setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                jobTitleDropdownOpen={jobTitleDropdownOpen}
                toggleJobTitleDropdown={toggleJobTitleDropdown}
                jobType={jobType}
                setJobType={setJobType}
                jobTitles={data?.map((item) => item.jobtitle)}
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
              <span className="w-full flex justify-end items-center ml-1">
                Action
              </span>
            </div>
            {paginatedData.length > 0 ? (
              paginatedData?.map((manager, index) => (
                <div
                  key={index}
                  onClick={() => handleNavigateClick(manager)}
                  className="w-full h-auto grid grid-cols-[5fr_5fr_5fr_5fr_auto] border-b cursor-pointer
                 border-white/10  text-[11px] font-medium leading-[14.85px] text-white pr-8"
                >
                  <span
                    key={index}
                    className="h-[40px] w-full flex justify-start items-center"
                  >
                    {manager?.name}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {manager?.email}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {manager?.jobtitle ?? "---"}
                  </span>
                  <span className="w-full flex justify-start items-center pr-1 ">
                    {manager?.location ?? "---"}
                  </span>
                  <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2 ml-2">
                    <span
                      className="flex justify-start items-center"
                      onClick={(e) => handleEditClick(e, manager)}
                    >
                      <FaRegEdit />
                    </span>
                    {manager?.isActive === true ? (
                      <span
                        className="flex justify-start items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClick(manager?._id);
                        }}
                      >
                        <RiDeleteBinLine />
                      </span>
                    ) : (
                      <span
                        className="flex justify-start items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(manager?._id);
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
          </div>
        </div>
      )}

      <div className="w-full flex justify-center pb-4">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          setTotalPages={() => {}}
        />
      </div>

      {/* DeleteAccount Modal */}
      <DeleteAccount
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDeactivate={handleDeactivate}
        onDelete={() => handleDelete()}
        deactivateLoading={deactivateLoading}
      />
      <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        setIsOpen={setIsDeactivateModalOpen}
      />

      {isReactivateModalOpen && (
        <ReactivateModal
          isOpen={isReactivateModalOpen}
          onClose={handleCloseModal}
          reactivate={handleReactivate}
          activateLoading={activateLoading}
        />
      )}

      <DeleteManagerAccountModal
        managerId={managerId}
        isOpen={isAccountDeleteModalOpen}
        onClose={() => setIsAccountDeleteModalOpen(false)}
      />
    </div>
  );
};

export default ManagerTableBig;
