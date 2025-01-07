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

const statusColors = {
  newtask: "#FF007F",
  overdue: "#FF3B30",
  default: "#FFCC00",
  inprogress: "#36B8F3",
  completed: "#1FBA46",
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
  const [locationFilter, setLocationFilter] = useState(false);
  const [jobFilter, setJobFilter] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [isAssignEmployeeModalOpen, setIsAssignEmployeeModalOpen] =
    useState(false);
  const [isAccountDeletedModalOpen, setIsAccountDeletedModalOpen] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  const [deleteLoad, setDeleteLoad] = useState(false);
  const [passSelectedEmployee, SetPassSelectedEmployee] = useState("");
  const [inputError, setInputError] = useState("");

  const navigate = useNavigate();

  const locationRef = useRef(null);
  const jobRef = useRef(null);

  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

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

  // const handleDelete = async () => {
  //   setDeleteLoad(true)
  // try {
  //   const obj = {
  //       reason: reasonForDelete,
  //   }
  //   const response = await axios.delete(`owner/employees/${id}`,obj);
  //   if(response?.status === 200){
  //     setIsAccountDeletedModalOpen(true);
  //   }
  // } catch (error) {
  //   ErrorToast(error?.response?.data?.message)
  // console.error("Error deleting task:", error);
  // }
  // finally{
  // setDeleteLoad(false)
  // }
  // };

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
        {loading ? (
          <div className="w-full h-[90dvh] flex justify-center items-center">
            <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
          </div>
        ) : (
          <>
            <div className="flex w-full items-center justify-between">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Delete Account
              </h3>
              <button
                onClick={handleViewProfile}
                className="w-full lg:w-[135px] h-[35px] flex items-center gap-1 rounded-[10px] justify-center bg-[#1A293D] text-[#199BD1] text-[11px] font-bold leading-[14.85px]"
              >
                View Profile
              </button>
            </div>
            <p className="text-[16px]">
              Before deleting the account of {userData?.employee?.name}, please
              reassign the following tasks that are currently assigned to this
              employee to another employee.
            </p>
            <div className="w-full max-w-[500px] flex flex-col gap-2 sm:gap-4 ">
              <label className="text-[16px] font-medium leading-[21.6px] text-white">
                Assign Employee
              </label>
              <button
                onClick={() => setIsBoatModalOpen(true)}
                className="w-full h-[52px] bg-[#1A293D] disabled:text-50 outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
              >
                {passSelectedEmployee?.name || "Click here to assign"}
              </button>
            </div>

            <div className="w-full overflow-x-auto mt-4">
              <div className="min-w-[700px]">
                {/* Table Headings */}
                <div className="w-full grid h-10 grid-cols-5 text-[11px] font-medium leading-[14.85px] text-white/50 border-b border-[#fff]/[0.14] py-1">
                  <span className="w-full flex justify-start items-center">
                    Boat name
                  </span>
                  {/* <TaskType
            setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
            taskTypeDropdownOpen={taskTypeDropdownOpen}
            toggleTaskTypeDropdown={toggleTaskTypeDropdown}
            setTaskType={setTaskType}
            taskType={taskType}
          /> */}
                  <span className="w-full flex justify-start items-center">
                    Task Type
                  </span>
                  <span className="w-full flex justify-start items-center">
                    Due Date
                  </span>
                  <span className="w-full flex justify-start items-center">
                    Recurring
                  </span>{" "}
                  <span className="w-full flex justify-start items-center">
                    Status Type
                  </span>
                  {/* New column */}
                  {/* <StatusType
            setStatusDropdownOpen={setStatusDropdownOpen}
            statusDropdownOpen={statusDropdownOpen}
            statusFilter={statusFilter}
            toggleStatusDropdown={toggleStatusDropdown}
            setStatusFilter={setStatusFilter}
            setSearch={setSearch}
          /> */}
                </div>

                {userData?.tasks?.length > 0 ? (
                  <>
                    {userData?.tasks?.map((task, index) => (
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
                          {task?.dueDate}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {task?.reoccuringDays}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          <span
                            style={{
                              color:
                                statusColors[task?.status] ||
                                statusColors["default"],
                            }}
                            className="w-auto h-[27px] capitalize rounded-full flex items-center
                             justify-center bg-[#FFCC00]/[0.12] px-2"
                          >
                            {getFormattedStatus(task?.status)}
                          </span>
                        </span>
                      </div>
                    ))}
                  </>
                ) : (
                  <p className="mt-2">No task assigned to this employee</p>
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
          className="w-[235px] h-[54px] bg-[#02203A] rounded-[12px] text-[#FFFFFF] font-medium "
        >
          Back
        </button>
        <button
          disabled={deleteLoad}
          onClick={handleDelete}
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
      </div>

      {/* EmployeeDetailModal Component */}
      {isBoatModalOpen && (
        <EmployeeDetailModal
          setIsOpen={setIsBoatModalOpen}
          SetPassSelectedEmployee={SetPassSelectedEmployee}
          setInputError={SetPassSelectedEmployee}
          employeeId={id}
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
          userId={id}
          isOpen={isAccountDeletedModalOpen}
          setIsOpen={setIsAccountDeletedModalOpen}
        />
      )}
    </div>
  );
};

export default DeleteAccountList;
