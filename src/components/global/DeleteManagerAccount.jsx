import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AccountDeletedModal from "./AccountDeletedModal";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "./Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDeleteAssignModal from "../managers/ManagerDeleteAssignModal";
import JobType from "./headerDropdowns/JobType";
import LocationType from "./headerDropdowns/LocationType";

const DeleteManagerAccount = () => {
  const { id } = useParams();
  const location = useLocation();
  const { reasonForDelete } = location.state || {};

  const { setUpdateManager } = useContext(GlobalContext);

  const [jobTitleDropdownOpen, setJobTitleDropdownOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [locationType, setLocationType] = useState([]);
  const [jobType, setJobType] = useState([]);

  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);

  const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] =
    useState(false);
  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [selectedManager, setSelectedManager] = useState("");

  const [loading, setLoading] = useState(false);
  const [deleteLoad, setDeleteLoad] = useState(false);
  const [userData, setUserData] = useState("");
  const [managers, setManagers] = useState([]);

  const [deactivateLoading, setDeactivateLoading] = useState(false);

  const filteredData = userData?.employees?.filter((item) => {
    const jobTypeMatch =
      jobType && jobType.length !== 0
        ? item?.jobtitle?.toLowerCase() === jobType?.toLowerCase()
        : true;
    const locationTypeMatch =
      locationType && locationType.length !== 0
        ? item?.location?.toLowerCase() === locationType?.toLowerCase()
        : true;
    return locationTypeMatch && jobTypeMatch;
  });

  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/edit-manager/${id}`);
  };
  const backSubmit = () => {
    navigate("/managers");
  };

  const toggleJobTitleDropdown = () => {
    setJobTitleDropdownOpen(!jobTitleDropdownOpen);
  };

  const toggleLocationDropdown = () => {
    setLocationDropdownOpen(!locationDropdownOpen);
  };

  const handleDeactivate = async () => {
    try {
      setDeactivateLoading(true);
      const obj = { reason: "Deactivate" };
      const response = await axios.delete(
        `/owner/manager/${id}?deactivate=true`,
        { data: obj }
      );

      if (response?.status === 200) {
        setUpdateManager((prev) => !prev);
        navigate("/managers");
      }
    } catch (err) {
      console.log("🚀 ~ handleDeactivate ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (userData?.employees.length === 0) {
        setDeleteLoad(true);
        const obj = {
          reason: reasonForDelete,
        };
        const deleteResponse = await axios.delete(`/owner/manager/${id}`, {
          data: obj,
        });

        if (deleteResponse?.status === 200) {
          setDeleteLoad(false);
          setIsAccountDeletedModalOpen(true);
          setUpdateManager((prev) => !prev);
        }
      } else {
        if (!passSelectedManager?._id && userData?.employees.length > 0) {
          ErrorToast("Select Managers");
          return;
        }
        setDeleteLoad(true);
        const employeeData = {
          employees: [
            ...new Set([
              ...(userData?.employees?.map((employee) => employee?._id) || []),
              ...(passSelectedManager?.employees?.map(
                (employee) => employee?._id
              ) || []),
            ]),
          ],
        };

        const putResponse = await axios.put(
          `/owner/manager/${passSelectedManager?._id}/employees/assign`,
          employeeData
        );
        if (putResponse?.status === 200) {
          const obj = {
            reason: reasonForDelete,
          };
          const deleteResponse = await axios.delete(`/owner/manager/${id}`, {
            data: obj,
          });

          if (deleteResponse?.status === 200) {
            setIsAccountDeletedModalOpen(true);
            setUpdateManager((prev) => !prev);
          }
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoad(false);
    }
  };

  const getDataById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/owner/manager/${id}`);
      if (response?.status === 200) {
        setUserData(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getManagers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/owner/manager/employees`);
      if (response?.status === 200) {
        setManagers(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
    getManagers();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        {loading ? (
          <div className="w-full h-[90dvh] flex justify-center items-center">
            <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              {reasonForDelete === "deactivation" ? (
                <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                  Deactivate Account
                </h3>
              ) : (
                <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                  Delete Account
                </h3>
              )}
              <button
                onClick={handleViewProfile}
                className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center
                         bg-[#1A293D] text-[#199BD1] text-[11px] font-bold leading-[14.85px]"
              >
                View Profile
              </button>
            </div>
            <p className="text-[16px]">
              Before{" "}
              <span>
                {reasonForDelete === "deactivation"
                  ? "deactivating"
                  : "deleting"}
              </span>{" "}
              the account of {userData?.managers?.name}, please reassign the
              following employees that are currently assigned to this manager to
              another manager.
            </p>
            <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 lg:gap-6">
              <label className="text-[16px] font-medium leading-[21.6px] text-white">
                Select Manager
              </label>
              <button
                onClick={() => setIsBoatModalOpen(true)}
                className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px]
                         focus:border-[#55C9FA] rounded-xl"
              >
                {passSelectedManager?.name || "Click Here To Select Manager"}
              </button>
            </div>

            <div className="w-full overflow-x-auto lg:overflow-visible mt-4">
              <div className="min-w-[600px]">
                {/* Table Headings */}
                <div className="w-full grid h-10 grid-cols-10 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
                  <div className="flex items-center px-2 col-span-2">
                    <span className="text-white/50">Name</span>
                  </div>
                  <div className="flex items-center px-2 col-span-3">
                    <span className="text-white/50">Email</span>
                  </div>
                  <div className="flex items-center px-2 col-span-2 relative">
                    <JobType
                      setJobTitleDropdownOpen={setJobTitleDropdownOpen}
                      jobTitleDropdownOpen={jobTitleDropdownOpen}
                      toggleJobTitleDropdown={toggleJobTitleDropdown}
                      jobType={jobType}
                      setJobType={setJobType}
                      isManager={true}
                    />
                  </div>
                  <div className="flex items-center px-2 col-span-2 relative">
                    <LocationType
                      setLocationDropdownOpen={setLocationDropdownOpen}
                      locationDropdownOpen={locationDropdownOpen}
                      toggleLocationDropdown={toggleLocationDropdown}
                      locationType={locationType}
                      setLocationType={setLocationType}
                      setCurrentPage={() => {}}
                      locationTitles={userData?.employees?.map(
                        (item) => item.location
                      )}
                      title="Location"
                    />
                  </div>
                </div>
                {filteredData?.length > 0 ? (
                  <>
                    {filteredData?.map((employee, index) => (
                      <div
                        key={index}
                        className="w-full h-10 grid grid-cols-10 border-b border-[#fff]/[0.14] text-[11px] font-medium leading-[14.85px] text-white"
                      >
                        <span className="col-span-2 flex items-center px-2">
                          {employee?.name}
                        </span>
                        <span className="col-span-3 flex items-center px-2">
                          {employee?.email}
                        </span>
                        <span className="col-span-2 flex items-center px-2">
                          {employee?.jobtitle}
                        </span>
                        <span className="col-span-3 flex items-center px-2">
                          {employee?.location}
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="pt-2">
                    No employees are assigned to this manager.{" "}
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-4 flex justify-end gap-4">
        <button
          onClick={backSubmit}
          className="w-[235px] h-[54px] bg-[#02203A] text-[#FFFFFF] text-[16px] rounded-lg"
        >
          Back
        </button>
        {reasonForDelete === "deactivation" ? (
          <button
            disabled={deactivateLoading}
            onClick={handleDeactivate} // Trigger delete action
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Deactivate Account</span>
              {deactivateLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        ) : (
          <button
            disabled={deleteLoad}
            onClick={handleDelete} // Trigger delete action
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Delete Account</span>
              {deleteLoad && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        )}
      </div>

      {/* EmployeeDetailModal Component */}
      {isBoatModalOpen && (
        <ManagerDeleteAssignModal
          managerId={id}
          SetPassSelectedManager={SetPassSelectedManager}
          managers={managers}
          setIsOpen={setIsBoatModalOpen}
          setSelectedManager={setSelectedManager}
          selectedManager={selectedManager}
        />
      )}

      {/* AssignManagerModal Component */}
      {/* {isAssignEmployeeModalOpen && (
          <AssignManagerModal
          managerId={id}
            isOpen={isAssignEmployeeModalOpen}
            onClose={() => setIsAssignEmployeeModalOpen(false)}
            SetPassSelectedManager={SetPassSelectedManager}
          />
        )} */}

      {/* AccountDeletedModal Component */}
      {isAccountDeletedModalOpen && (
        <AccountDeletedModal
          isManager={true}
          isOpen={isAccountDeletedModalOpen}
          setIsOpen={setIsAccountDeletedModalOpen}
        />
      )}
    </div>
  );
};

export default DeleteManagerAccount;
