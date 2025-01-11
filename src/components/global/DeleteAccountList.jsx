import React, { useContext, useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import EmployeeDetailModal from "../../pages/Employees/EmployeeDetailModal";
import AssignManagerModal from "../../pages/Managers/AssignManagerModal";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AccountDeletedModal from "./AccountDeletedModal";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast } from "./Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";
import StatusType from "./headerDropdowns/StatusType";
import TaskType from "./headerDropdowns/TaskType";
import ManagerListLoader from "../managers/ManagerListLoader";
import { getUnixDate } from "../../data/DateFormat";

const statusColors = {
  newtask: "#FF007F",
  overdue: "#FF3B30",
  default: "#FFCC00",
  inprogress: "#36B8F3",
  completed: "#1FBA46",
};

const statusColorsbg = {
  newtask: "#FF69B41F",
  overdue: "#FF3B301F",
  default: "#FFCC001F",
  inprogress: "#36B8F31F",
  completed: "#1FBA461F",
  upcomingtask: "#FF007F1F",
};

const STATUS_ENUM = {
  newtask: "New Task",
  inprogress: "In-Progress",
  recurring: "Recurring",
  overdue: "Overdue",
  completed: "Completed",
  upcomingtask: "Upcoming Task",
};

const DeleteAccountList = () => {
  const location = useLocation();
  const { reasonForDelete } = location.state || {};
  const { id } = useParams();
  const { setUpdateEmployee } = useContext(GlobalContext);

  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] =
    useState(false);
  const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const [deleteLoad, setDeleteLoad] = useState(false);
  const [deactivateLoading, setDeactivateLoading] = useState(false);

  const [passSelectedEmployee, SetPassSelectedEmployee] = useState("");
  const [inputError, setInputError] = useState("");

  const navigate = useNavigate();

  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const [taskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState([]);
  const [taskType, setTaskType] = useState([]);

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!taskTypeDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const [search, setSearch] = useState("");

  // const filteredData = data?.filter((item) => item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase()) );
  const filteredData = userData?.tasks?.filter((item, index) => {
    const matchesSearch = search
      ? item?.taskType?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.status?.toLowerCase()?.includes(search?.toLowerCase())
      : true;
    const matchesStatus =
      statusFilter && statusFilter.length !== 0
        ? statusFilter?.includes(item?.status?.toLowerCase())
        : true;
    const taskTypeMatch =
      taskType && taskType.length !== 0
        ? taskType?.includes(item?.taskType?.toLowerCase())
        : true;
    return matchesSearch && matchesStatus && taskTypeMatch;
  });

  const handleViewProfile = () => {
    navigate(`/edit-employee/${id}`);
  };

  const backSubmit = () => {
    navigate("/employees");
  };

  const handleDelete = async () => {
    setInputError({});
    // if(!passSelectedEmployee?.id){
    //   setInputError("Select Employee")
    // }
    setDeleteLoad(true);
    try {
      const taskData = {
        task: userData?.tasks?.map((task) => task?._id),
      };

      const putResponse = await axios.put(
        `/owner/employees/${passSelectedEmployee.id}/task/assign`,
        taskData
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
          setUpdateEmployee((prev) => !prev);
        }
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setDeleteLoad(false);
    }
  };

  const handleDeactivate = async () => {
    try {
      setDeactivateLoading(true);
      const taskData = {
        task: userData?.tasks?.map((task) => task?._id),
      };
      const putResponse = await axios.put(
        `/manager/employees/${passSelectedEmployee.id}/task/assign`,
        taskData
      );
      if (putResponse?.status === 200) {
        const obj = { reason: "Deactivate" };
        const response = await axios.delete(
          `/owner/employees/${passSelectedEmployee.id}?deactivate=true`,
          { data: obj }
        );

        if (response?.status === 200) {
          setUpdateEmployee((prev) => !prev);
          navigate("/employees");
        }
      }
    } catch (err) {
      console.log("🚀 ~ handleDeactivate ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setDeactivateLoading(false);
    }
  };

  const getDataById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/owner/employees/${id}`);
      if (response?.status === 200) {
        setUserData(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataById();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
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
            className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#1A293D] text-[#199BD1] text-[11px] font-bold leading-[14.85px]"
          >
            View Profile
          </button>
        </div>
        <p className="text-[16px]">
          Before{" "}
          <span>
            {reasonForDelete === "deactivation" ? "deactivating" : "deleting"}
          </span>{" "}
          the account of {userData?.employee?.name}, please reassign the
          following tasks that are currently assigned to this employee to
          another employee.
        </p>
        <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 ">
          <label className="text-[16px] font-medium leading-[21.6px] text-white">
            Assign Employee
          </label>
          <button
            onClick={() => setIsBoatModalOpen(true)} // Open the Employee Detail Modal
            className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
          >
            {passSelectedEmployee?.name || "Click here to assign"}
          </button>
          {inputError?.employee && (
            <p className="text-red-500 -mt-3 pl-2">{inputError?.employee}</p>
          )}
        </div>

        <div className="w-full overflow-x-auto lg:overflow-visible mt-4">
          <div className="min-w-[700px]">
            {" "}
            {/* Increased min-width to accommodate the new column */}
            {/* Table Headings */}
            <div className="w-full grid h-10 grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
              <span className="w-full flex justify-start items-center">
                Boat name
              </span>
              <TaskType
                setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
                taskTypeDropdownOpen={taskTypeDropdownOpen}
                toggleTaskTypeDropdown={toggleTaskTypeDropdown}
                setTaskType={setTaskType}
                taskType={taskType}
              />
              <span className="w-full flex justify-start items-center">
                Due Date
              </span>
              <span className="w-full flex justify-start items-center">
                Recurring
              </span>{" "}
              {/* New column */}
              <StatusType
                setStatusDropdownOpen={setStatusDropdownOpen}
                statusDropdownOpen={statusDropdownOpen}
                statusFilter={statusFilter}
                toggleStatusDropdown={toggleStatusDropdown}
                setStatusFilter={setStatusFilter}
              />
            </div>
            {loading ? (
              <div className="pt-2">
                <ManagerListLoader />
              </div>
            ) : (
              <>
                {userData?.tasks?.length > 0 ? (
                  <>
                    {filteredData?.map((task, index) => (
                      <div
                        key={index}
                        className="w-full h-10 grid grid-cols-5 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
                      >
                        <span className="w-full flex justify-start items-center">
                          {task?.boatName}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {task?.taskType}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {task?.dueDate
                            ? getUnixDate(task?.dueDate)
                            : "No Due Date"}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {task?.reoccuringDays || "---"}
                        </span>{" "}
                        {/* Recurring */}
                        <span className="w-full flex justify-start items-center">
                          <span
                            style={{
                              color:
                                statusColors[task?.status] ||
                                statusColors["default"],
                              backgroundColor:
                                statusColorsbg[task?.status] ||
                                statusColorsbg["default"],
                            }}
                            className={`w-auto h-[27px] rounded-full flex items-center justify-center px-2`}
                          >
                            {getFormattedStatus(task?.status)}
                          </span>
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="pt-4">No record found</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full mt-4 flex justify-end gap-4">
        <button
          onClick={backSubmit}
          className="w-[235px] h-[54px] bg-[#02203A] text-[#FFFFFF] font-medium rounded-lg"
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
            onClick={handleDelete}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center font-medium leading-[21.6px] tracking-[-0.24px]"
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
        <EmployeeDetailModal
          employeeId={id}
          setIsOpen={setIsBoatModalOpen}
          SetPassSelectedEmployee={setPassSelectedEmployee}
          setInputError={setInputError}
        />
      )}

      {/* AssignManagerModal Component */}
      {isAssignEmployeeModalOpen && (
        <AssignManagerModal
          isOpen={isAssignEmployeeModalOpen}
          onClose={() => setIsAssignEmployeeModalOpen(false)}
        />
      )}

      {/* AccountDeletedModal Component */}
      {isAccountDeletedModalOpen && (
        <AccountDeletedModal
          isOpen={isAccountDeletedModalOpen}
          setIsOpen={setIsAccountDeletedModalOpen}
        />
      )}
    </div>
  );
};

export default DeleteAccountList;
