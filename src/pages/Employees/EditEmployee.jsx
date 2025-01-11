import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { FaRegEdit, FaCaretDown } from "react-icons/fa"; // Import dropdown icon
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import ResetPassModal from "../../components/onboarding/ResetPassModal";
import AssignedModal from "../../components/tasks/modal/AssignedModal";
import ResendModal from "../onboarding/ResendModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { getUnixDate } from "./../../data/DateFormat";
import AssignTaskModal from "../../components/tasks/modal/AssignTaskModal";
import TaskType from "../../components/global/headerDropdowns/TaskType";
import StatusType from "../../components/global/headerDropdowns/StatusType";
import ViewAssignedTaskModal from "../../components/tasks/modal/ViewAssignedTaskModal";
import AssignedManagerModal from "../../components/employees/AssignedManagerModal";
import { CiCalendar } from "react-icons/ci";
import DateModal from "../../components/tasks/DateModal";
import moment from "moment";

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

const statusColorsbg = {
  newtask: "#FF69B41F",
  overdue: "#FF3B301F",
  default: "#FFCC001F",
  inprogress: "#36B8F31F",
  completed: "#1FBA461F",
  upcomingtask: "#FF007F1F",
};

const EditEmployee = () => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };
  const { navigate, setUpdateEmployee } = useContext(GlobalContext);
  const { id } = useParams();
  const navigateTo = useNavigate();
  const today = moment("01-01-2024");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [employee, setEmployee] = useState("");

  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [taskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [selectedManager, setSelectedManager] = useState(null);
  const [tasksError, setTasksError] = useState("");
  const [statusFilter, setStatusFilter] = useState([]);
  const [taskType, setTaskType] = useState([]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [dueDate, setDueDate] = useState({});
  const [inputError, setInputError] = useState({});

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isSelectTaskModalOpen, setIsSelectTaskModalOpen] = useState(false);

  // Function to close modal
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    getEmployeeData();
  };

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!taskTypeDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { manager: passSelectedManager?.name },
  });

  const handleViewAllClick = () => {
    // setIsTaskModalOpen(true);
    // setIsAssignedModalOpen(true); // Open AssignedModal instead of navigating
    setIsSelectTaskModalOpen(true);
  };

  const handleAssignNewTask = () => {
    setIsTaskModalOpen(true);
    // setIsAssignedModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassClick = () => {
    setIsModalOpen(true);
  };

  const handleResetModal = () => {
    setIsResendModalOpen(true); // Open ResendModal
  };

  const handleChangeClick = () => {
    setIsManagerDetailModalOpen(true); // Open ManagerDetailModal
  };

  const handleEditTaskClick = (taskId) => {
    navigateTo(`/tasks/${taskId}`);
  };

  const handleRemoveTask = (taskID) => {
    const tasks = employeeTasks?.filter((task) => task?._id !== taskID);
    setEmployeeTasks(tasks);
    setTasks(tasks);
  };

  const handleDeleteClick = () => {
    setIsDeletedModalOpen(true);
  };

  const handleUpdateEmployee = async (data) => {
    try {
      setSubmitLoading(true);

      const updatedEmployeeData = {
        ...data,
        phone: `+1${data?.phone}`,
        manager: passSelectedManager?.id,
        password: "Test@123",
        tasks: tasks
          ? tasks?.map((item) => item?._id)
          : employeeTasks?.map((item) => item?.id),
      };

      const response = await axios.put(
        `/owner/employees/${id}`,
        updatedEmployeeData
      );
      if (response.status === 200) {
        SuccessToast("Employee Updated");
        setUpdateEmployee((prev) => !prev);
        navigate("/employees", "Employee List");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.error("Error updating employee:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getEmployeeData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/owner/employees/${id}`);
      if (response.status === 200) {
        const data = response?.data?.data;
        setEmployee(response?.data?.data?.employee);
        setEmployeeTasks(response?.data?.data?.tasks);
        const phoneNumber = response?.data?.data?.employee?.phoneNumber;

        const formattedPhoneNumber = phoneNumber?.startsWith("+1")
          ? phoneNumber.slice(2)
          : phoneNumber;
        setValue("phone", formattedPhoneNumber);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEmployeeData();
    }
  }, [id]);

  useEffect(() => {
    setValue("name", employee?.name);
    setValue("email", employee?.email);
    setValue("jobtitle", employee?.jobtitle);
    setValue("location", employee?.location);
    SetPassSelectedManager({
      name: employee?.manager?.name,
      id: employee?.manager?._id,
    });
  }, [employee, setValue]);

  const employeeFilteredData = employeeTasks?.filter((item, index) => {
    const dueDateMatch =
      !dueDate.calendar ||
      getUnixDate(item?.dueDate) ===
        moment(dueDate.calendar).format("DD-MM-YYYY");
    const matchesStatus =
      statusFilter && statusFilter.length !== 0
        ? statusFilter?.includes(item?.status?.toLowerCase())
        : true;
    const taskTypeMatch =
      taskType && taskType.length !== 0
        ? taskType?.includes(item?.taskType?.toLowerCase())
        : true;
    return matchesStatus && taskTypeMatch && dueDateMatch;
  });

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {isLoading ? (
        <div className="w-full h-[90dvh] flex justify-center items-center">
          <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
        </div>
      ) : (
        <form
          className="w-full h-auto grid grid-cols-1 justify-center items-center gap-4"
          onSubmit={handleSubmit(handleUpdateEmployee)}
        >
          <div className="w-full h-auto bg-[#1A293D] text-white flex flex-col justify-start items-start">
            <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
              <div className="w-full h-auto flex flex-col lg:flex-row justify-between items-center gap-3">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  {isEditing ? `Edit ${employee.name}` : employee.name}
                </h3>
                <div className="flex gap-4 ml-auto">
                  {isEditing ? (
                    <div></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-[#199BD1] font-medium bg-[#002240] px-4 py-2 rounded-lg"
                    >
                      Edit Details
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleAssignNewTask}
                    className="flex items-center gap-2 text-white font-medium bg-[#199BD1] hover:bg-[#002240] px-4 py-2 rounded-lg"
                  >
                    Assign New Task
                  </button>
                </div>
              </div>

              <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
                <div className="w-full flex flex-col justify-start items-start gap-6">
                  <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Name"
                        type="text"
                        placeholder="Enter Name"
                        register={register("name", {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Please enter your name.",
                          pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: "Please enter a valid name.",
                          },
                        })}
                        error={errors.name}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /[^A-Za-z\s]/g,
                            ""
                          );
                        }}
                      />
                      <AddFleetInput
                        isDisabled={true}
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        register={register("email", {
                          required: "Please enter your email address.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                        error={errors.email}
                      />
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Job Title"
                        type="text"
                        placeholder="Enter Job Title"
                        register={register("jobtitle", {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Please enter your job title",
                        })}
                        error={errors.jobtitle}
                      />
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Location"
                        type="text"
                        placeholder="Enter Location"
                        register={register("location", {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Please enter a location",
                          minLength: {
                            value: 2,
                            message:
                              "Location must be at least 2 characters long",
                          },
                        })}
                        error={errors.location}
                      />
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Phone Number"
                        type="text"
                        placeholder="Enter Phone Number"
                        isPhone={true}
                        register={register("phone", {
                          required: "Please enter your phone number.",
                          pattern: {
                            value: /^\+?[0-9]{10}$/,
                            message: "Please enter a valid phone number.",
                          },
                        })}
                        maxLength={10}
                        error={errors.phone}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(
                            /(?!^\+)[^\d]/g,
                            ""
                          );
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-6 justify-start items-start mt-14 py-6 border-t-[1px] border-white/10">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-[18px] font-bold leading-[24.3px]">
                      Resend Password
                    </h3>
                    <button
                      type="button"
                      className="text-[14px] font-medium text-[#199bd1]"
                      onClick={handleResetModal} // Update to open ResendModal
                    >
                      Resend
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPassClick}
                    className="text-[14px] text-md font-medium text-[#199BD1] items-end bg-[#199bd1]/[0.2] h-10 rounded-full w-[130px]"
                  >
                    Reset Password
                  </button>
                </div>

                <div className="w-auto flex flex-col justify-start items-start gap-3">
                  <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                    <span className="text-white/50">Email:</span>
                    <span>{employee?.email}</span>
                  </div>
                  <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                    <span className="text-white/50">Password:</span>
                    <span>{employee?.password}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-auto flex  items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Assigned Manager{" "}
              </h3>
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleChangeClick}
                  className="text-[14px] font-medium text-[#199bd1]"
                >
                  Change
                </button>
              ) : (
                <span></span>
              )}
            </div>

            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
                <span className="w-full flex justify-start items-center">
                  Employee Name
                </span>
                <span className="w-full flex justify-start items-center">
                  Email
                </span>
                <span className="w-full flex justify-start items-center">
                  Job Title
                </span>
                <span className="w-full flex justify-start items-center">
                  Location
                </span>
              </div>
              {employee?.manager !== null ? (
                <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                  <span className="w-full flex justify-start items-center">
                    {passSelectedManager?.name || employee?.manager?.name}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {employee?.manager?.email}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {employee?.manager?.jobtitle}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    {employee?.manager?.location}
                  </span>
                </div>
              ) : (
                <div
                  className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 
                text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                >
                  {" "}
                  No record found
                </div>
              )}
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-auto flex justify-between items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Assigned Tasks{" "}
                <span className="text-[14px] leading-[24.3px] text-[#ffffff98]">
                  {" "}
                  ({employeeTasks?.length})
                </span>
              </h3>
              <button
                type="button"
                onClick={handleViewAllClick}
                className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
              >
                View All
              </button>
            </div>

            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
                <span className="w-full flex justify-start items-center">
                  Boat Name
                </span>
                <TaskType
                  setTaskType={setTaskType}
                  taskType={taskType}
                  setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
                  taskTypeDropdownOpen={taskTypeDropdownOpen}
                  toggleTaskTypeDropdown={toggleTaskTypeDropdown}
                />
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  className="w-full flex  gap-1  justify-start items-center relative"
                >
                  <CiCalendar className="text-lg" />
                  <span>Due Date</span>
                </button>
                <span className="w-full flex justify-start items-center">
                  Recurring Days
                </span>
                <StatusType
                  setStatusDropdownOpen={setStatusDropdownOpen}
                  statusDropdownOpen={statusDropdownOpen}
                  toggleStatusDropdown={toggleStatusDropdown}
                  setStatusFilter={setStatusFilter}
                  statusFilter={statusFilter}
                />
                <span className="w-full flex justify-start items-center">
                  Action
                </span>
              </div>
              {employeeFilteredData?.length > 0 ? (
                <>
                  {employeeFilteredData?.slice(0, 4)?.map((task, index) => (
                    <div className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                      <span className="w-full flex justify-start items-center">
                        {task?.boatName}
                      </span>
                      <span className="w-full flex justify-start items-center">
                        {task?.taskType}
                      </span>
                      <span className="w-full flex justify-start items-center">
                        {getUnixDate(task?.dueDate)}
                      </span>
                      <span className="w-full flex justify-start items-center ">
                        {task?.reoccuringDays || "Non-recurring"}
                      </span>

                      <span
                        className="w-[100px] capitalize h-[27px] rounded-full
                         bg-[#FFCC00]/[0.12] text-[11px] font-medium leading-[14.85px] flex items-center justify-center"
                        style={{
                          color:
                            statusColors[task?.status] ||
                            statusColors["default"],
                          backgroundColor:
                            statusColorsbg[task?.status] ||
                            statusColorsbg["default"],
                        }}
                      >
                        {getFormattedStatus(task?.status)}
                      </span>
                      <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                        <span
                          className="flex justify-start items-center cursor-pointer"
                          onClick={() => handleEditTaskClick(task?._id)}
                        >
                          <FaRegEdit />
                        </span>
                        <span
                          className="flex justify-start items-center cursor-pointer"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveTask(task?._id);
                            // setDeleteModalOpen(true); // Open modal when delete icon is clicked
                          }}
                        >
                          <RiDeleteBinLine />
                        </span>
                      </div>
                      {/* <DeletedModal
                        isOpen={isDeleteModalOpen}
                        _id={task?._id}
                        onClose={() => setDeleteModalOpen(false)}
                        refreshTasks={handleDeleteConfirm}
                      /> */}
                    </div>
                  ))}
                </>
              ) : (
                <p
                  className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px]
                 font-normal leading-[21.6px] text-white"
                >
                  No tasks on the horizon? Assign tasks to keep the crew engaged
                  and productive!
                </p>
              )}

              {/* Add more rows as needed */}
            </div>
          </div>

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full lg:w-[208px] h-[52px] text-[#199BD1] bg-[#002240] rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px] hover:text-[#199BF9]"
                >
                  Back
                </button>
                <button
                  disabled={submitLoading}
                  type="submit"
                  className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  <div className="flex items-center">
                    <span className="mr-1">Save</span>
                    {submitLoading && (
                      <FiLoader className="animate-spin text-lg mx-auto" />
                    )}
                  </div>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                Back
              </button>
            )}
          </div>
        </form>
      )}
      <ResetPassModal
        id={id}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        getEmployeeData={getEmployeeData}
      />

      <DateModal
        isOpen={isCalendarOpen}
        setIsOpen={setIsCalendarOpen}
        setDueDate={setDueDate}
        setInputError={setInputError}
        minDate={today.toDate()}
      />

      {isAssignedModalOpen && (
        <AssignedModal
          tasksList={employee?.tasks}
          handleViewAllClick={handleViewAllClick} // Pass the function if needed in the modal
          setIsOpen={setIsAssignedModalOpen}
        />
      )}
      {isTaskModalOpen && (
        <AssignTaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
          setTasks={setTasks}
          setTasksError={setTasksError}
        />
      )}

      {isManagerDetailModalOpen && (
        <AssignedManagerModal
          setIsOpen={setIsManagerDetailModalOpen}
          SetPassSelectedManager={SetPassSelectedManager}
          selectedManager={selectedManager}
          setSelectedManager={setSelectedManager}
          assignedManagers={employee?.manager}
        />
      )}

      {isResendModalOpen && (
        <ResendModal
          id={id}
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)}
        />
      )}

      {isSelectTaskModalOpen && (
        <ViewAssignedTaskModal
          setIsOpen={setIsSelectTaskModalOpen}
          handleRemoveTask={(taskID) => handleRemoveTask(taskID)}
          employeeTasks={employeeTasks}
          getEmployeeData={() => getEmployeeData()}
          loading={isLoading}
        />
      )}

      {/* <DeletedModal isOpen={isDeletedModalOpen} onClose={() => setIsDeletedModalOpen(false)}/> */}
    </div>
  );
};

export default EditEmployee;
