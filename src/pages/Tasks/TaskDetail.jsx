import axios from "../../axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { IoCalendarOutline } from "react-icons/io5";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FiLoader } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { taskTypeData } from "../../data/TaskTypeData";
import DateModal from "../../components/tasks/DateModal";
import BoatSelectModal from "../Fleet/BoatSelectModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";
import moment from "moment";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import TaskInputField from "../../components/global/customInputs/TaskInputField";
import TaskTypeInputField from "../../components/global/customInputs/TaskTypeInputField";
import RecurringDaysInputField from "../../components/global/customInputs/RecurringDaysInputField";
import AssignedEmployeeCard from "../../components/tasks/cards/AssignedEmployeeCard";
import { formValidation } from "../../constants/formValidation";
import { AuthMockup } from "../../assets/export";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { useForm } from "react-hook-form";

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

const TaskDetail = () => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const today = moment();

  const { taskDropDown, setUpdateDropDown } = useContext(GlobalContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [tasks, setTasks] = useState([]);
  const [taskDetail, setTaskDetail] = useState({});
  const [customTask, setCustomTask] = useState("");

  const [noteText, setNoteText] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [displaySelectedTask, setDisplaySelectedTask] = useState("");
  const [passSelectedEmployee, setPassSelectedEmployee] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isTaskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [isTaskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [customTypeText, setCustomTypeText] = useState("");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [passSelectedBoat, setPassSelectedBoat] = useState("");

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!isTaskTypeDropdownOpen);
    setTaskDropdownOpen(false);
    setRecurringDropdown(false);
  };

  const toggleTaskDropdown = () => {
    setTaskDropdownOpen(!isTaskDropdownOpen);
    setTaskTypeDropdownOpen(false);
    setRecurringDropdown(false);
  };

  const [RecurringDropdown, setRecurringDropdown] = useState(false);
  const [recurringDays, setRecurringDays] = useState("");
  const [customDays, setCustomDays] = useState(false);
  const [customRecurring, setCustomRecurring] = useState("");
  const [inputError, setInputError] = useState({});

  const RecurringRef = useRef(null);
  const toggleRecurringDropdown = (e) => {
    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setRecurringDropdown((prev) => !prev);
      setTaskTypeDropdownOpen(false);
      setTaskDropdownOpen(false);
      // setRecurringDropdown(!RecurringDropdown);
    }
  };

  const handleSelectDay = (day, text) => {
    if (day === "custom") {
      setRecurringDays(day);
      setSelectedDay(text);
      setCustomDays(true);
      setRecurringDropdown(true);
    } else {
      setRecurringDays(day);
      setSelectedDay(text); // Set selected text
      setRecurringDropdown(false); // Close the dropdown after selecting
    }
  };

  const handleTaskTypeSelection = (taskType) => {
    setInputError({});
    if (taskType === "custom") {
      setTaskTypeDropdownOpen(true);
      setCustomInput(true);
    } else {
      setSelectedTaskType(taskType);
      setTasks(
        taskDropDown?.find((item) => item?.taskType === taskType)?.task || []
      );
      setTaskTypeDropdownOpen(false);
      setTaskDropdownOpen(false);
    }
    setDisplaySelectedTask(null);
  };

  const handleTaskSelection = (task) => {
    setTaskDropdownOpen(false);
    setDisplaySelectedTask(task);
  };

  const getTaskDetail = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/owner/task/${id}`);
      if (response.status === 200) {
        const data = response?.data?.data;
        setTaskDetail(data);
        setNoteText(data?.description || "");
        setSelectedTaskType(data?.taskType || "");
        // setTasks(
        //   taskDropDown?.find((item) => item?.taskType === data?.taskType)
        //     ?.tasks || []
        // );
        setDisplaySelectedTask(data?.task || "");
        setPassSelectedBoat(data?.boat || null);
        setPassSelectedEmployee(data?.assignTo[0] || null);
        setValue("assignBy", data?.assignBy?.name);
        setSelectedDay(
          data?.reoccuringDays ? `${data?.reoccuringDays} days` : "None"
        );
        setDueDate({
          normal: moment(data?.dueDate * 1000).format("YYYY-MM-DD"),
          unix: data?.dueDate,
        });
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.log("🚀 ~ getTaskDetail ~ err:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTaskDetail();
    }
  }, [id]);

  const handleUpdate = async () => {
    setInputError({});
    const validateData = {
      passSelectedEmployee,
      passSelectedBoat,
      selectedTaskType,
      noteText,
      dueDate,
    };
    const errors = formValidation(validateData);
    if (Object.keys(errors).length > 0) {
      setInputError(errors);
      return;
    }
    try {
      setUpdateLoad(true);
      const obj = {
        boat: passSelectedBoat?._id
          ? passSelectedBoat?._id
          : passSelectedBoat?.id,
        task: displaySelectedTask ? displaySelectedTask : selectedTaskType,
        taskType: selectedTaskType,
        dueDate: dueDate?.unix,
        description: noteText,
        reoccuring: true,
        reoccuringDays: +recurringDays,
        assignTo: [
          passSelectedEmployee?._id
            ? passSelectedEmployee?._id
            : passSelectedEmployee?.id,
        ],
      };
      const response = await axios.put(`/owner/task/${id}`, obj);
      if (response.status === 200) {
        SuccessToast("Task Updated successfully");
        setUpdateDropDown((prev) => !prev);
        getTaskDetail();
        setIsEdit(false);
      }
    } catch (error) {
      console.error("Error update task:", error);
      ErrorToast(error?.response?.data.message);
    } finally {
      setUpdateLoad(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {isLoading ? (
        <div className="w-full h-[90dvh] flex justify-center items-center">
          <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col gap-6 justify-start items-center">
          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-full flex justify-between items-center h-12">
              <div className="w-auto flex justify-start items-center gap-2">
                <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                  {isEdit ? "Edit Task" : "Task"}
                </h3>
                <span
                  className="text-[11px] capitalize bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] 
              font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] "
                  style={{
                    color:
                      statusColors[taskDetail?.status] ||
                      statusColors["default"],
                    backgroundColor:
                      statusColorsbg[taskDetail?.status] ||
                      statusColorsbg["default"],
                  }}
                >
                  {getFormattedStatus(taskDetail?.status)}
                </span>
              </div>
              {!isEdit && (
                <button
                  onClick={() => setIsEdit(true)}
                  className="w-[118px] h-[32px] flex justify-center items-center gap-2 bg-[#36B8F3]/[0.12] rounded-[10px] text-[#36B8F3] text-[13px] font-bold"
                >
                  <TiPencil className="text-lg" />
                  <span>Edit</span>
                </button>
              )}
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
              <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
                {/* Select Boat */}
                {/* <div>
                <SelectBoatInputField passSelectedBoat={passSelectedBoat} setIsBoatModalOpen={setIsBoatModalOpen} isEdit={isEdit}/>
                {inputError.updateBoat && <p className="text-red-500">{inputError.updateBoat}</p>}
              </div> */}
                <div className="w-full lg:w-[327px] h-[90px] flex gap-3 justify-start items-center rounded-[12px] bg-[#1A293D] p-2">
                  <img
                    src={taskDetail?.boat?.cover || AuthMockup}
                    alt="taskimage"
                    className="w-[106px] h-[74px] rounded-[12px]"
                  />
                  <div className="w-auto flex flex-col justify-start items-start">
                    <h3 className="text-[16px] font-medium leading-[21.6px] text-white">
                      {taskDetail?.boat?.name}
                    </h3>
                    <p className="text-[14px] font-normal text-[#199bd1]">
                      {taskDetail?.boat?.model}/{taskDetail?.boat?.make}/
                      {taskDetail?.boat?.size}
                    </p>
                  </div>
                </div>

                {/* Assign Employee */}
                <div>
                  <AddFleetInput
                    label={"Task Created By"}
                    register={register("assignBy")}
                    isDisabled={true}
                  />
                  {/* <SelectEmployeeInputField setIsEmployeeModalOpen={setIsEmployeeModalOpen} passSelectedEmployee={passSelectedEmployee} isEdit={isEdit}/> */}
                  {/* {inputError.updateEmployee && <p className="text-red-500">{inputError.updateEmployee}</p>} */}
                </div>
              </div>

              {/* Task Type */}
              <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
                <div>
                  <TaskTypeInputField
                    toggleTaskTypeDropdown={toggleTaskTypeDropdown}
                    selectedTaskType={selectedTaskType}
                    isEdit={isEdit}
                    isTaskTypeDropdownOpen={isTaskTypeDropdownOpen}
                    customTypeText={customTypeText}
                    taskDropDown={taskDropDown}
                    handleTaskTypeSelection={handleTaskTypeSelection}
                    customInput={customInput}
                    setCustomTypeText={setCustomTypeText}
                    setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
                    setCustomInput={setCustomInput}
                  />
                  {inputError.task && (
                    <p className="text-red-500">{inputError.task}</p>
                  )}
                </div>

                <div>
                  <TaskInputField
                    handleTaskSelection={handleTaskSelection}
                    toggleTaskDropdown={toggleTaskDropdown}
                    isTaskDropdownOpen={isTaskDropdownOpen}
                    displaySelectedTask={displaySelectedTask}
                    tasks={tasks}
                    isEdit={isEdit}
                    customTask={customTask}
                    setCustomTask={setCustomTask}
                  />
                  {inputError.task && (
                    <p className="text-red-500">{inputError.task}</p>
                  )}
                </div>
              </div>

              {/* Note */}
              <div className="w-full grid grid-cols-1 gap-12 mt-4">
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    Add Note
                  </label>
                  <textarea
                    disabled={!isEdit}
                    value={noteText}
                    onChange={(e) => {
                      const value = e.target.value;
                      const capitalizedValue =
                        value.charAt(0).toUpperCase() + value.slice(1);
                      setNoteText(capitalizedValue);
                      setInputError({});
                    }}
                    className="w-full h-[315px] resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                  />
                  {inputError.note && (
                    <p className="text-red-500">{inputError.note}</p>
                  )}
                </div>
              </div>

              {/* Due Date */}
              <div className="w-full flex flex-col gap-4">
                <div>
                  <div className="w-auto flex justify-start items-center gap-3">
                    <IoCalendarOutline className="text-2xl text-white/40" />
                    <span className="text-md font-normal text-white">
                      Due Date
                    </span>
                    <button
                      onClick={() => setIsCalendarOpen(true)}
                      className="text-xs font-normal text-[#199BD1]"
                    >
                      {dueDate?.normal || "Select Due Date"}
                    </button>
                  </div>
                  {inputError.dueDate && (
                    <p className="text-red-500">{inputError.dueDate}</p>
                  )}
                </div>

                {/* Recurring Days */}
                <RecurringDaysInputField
                  toggleRecurringDropdown={toggleRecurringDropdown}
                  selectedDay={selectedDay}
                  RecurringRef={RecurringRef}
                  RecurringDropdown={RecurringDropdown}
                  handleSelectDay={handleSelectDay}
                  customDays={customDays}
                  setCustomRecurring={setCustomRecurring}
                  customRecurring={customRecurring}
                  isEdit={isEdit}
                />
              </div>
            </div>
            <DateModal
              isOpen={isCalendarOpen}
              setIsOpen={setIsCalendarOpen}
              setDueDate={setDueDate}
              setInputError={setInputError}
              minDate={today.toDate()}
            />
            {isBoatModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
                <BoatSelectModal
                  isOpen={isBoatModalOpen}
                  setIsOpen={setIsBoatModalOpen}
                  SetPassSelectedBoat={setPassSelectedBoat}
                  setInputError={setInputError}
                />
              </div>
            )}
            {isEmployeeModalOpen && (
              <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
                <EmployeeDetailModal
                  isOpen={isEmployeeModalOpen}
                  setIsOpen={setIsEmployeeModalOpen}
                  SetPassSelectedEmployee={setPassSelectedEmployee}
                  setInputError={setInputError}
                />
              </div>
            )}
          </div>
          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-auto flex justify-start items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Assigned Employee
              </h3>
              {isEdit ? (
                <button
                  onClick={() => setIsEmployeeModalOpen(true)}
                  className="w-[42px] h-[42px] rounded-[8px] text-[#55C9FA] flex justify-center items-center"
                >
                  Change
                </button>
              ) : (
                <span></span>
              )}
            </div>
            <AssignedEmployeeCard
              taskDetail={taskDetail}
              passSelectedEmployee={passSelectedEmployee}
            />
          </div>
          {isEdit ? (
            <div className="w-full flex justify-end py-4 items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsEdit(false);
                }}
                className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                {"Back"}
              </button>
              <button
                disabled={updateLoad}
                onClick={handleUpdate}
                className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                <div className="flex items-center">
                  <span className="mr-1">Save</span>
                  {updateLoad && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
          ) : (
            <div className="w-full flex justify-end py-4 items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                {"Back"}
              </button>
              {taskDetail?.status !== "completed" && (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/task-completed", { state: taskDetail })
                  }
                  className="w-full lg:w-[208px] h-[52px] bg-[#1FBA46] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  {"Mark As Completed"}
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskDetail;
