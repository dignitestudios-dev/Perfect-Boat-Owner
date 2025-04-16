import React, { useContext, useState, useRef, useEffect } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats, TbCaretDownFilled } from "react-icons/tb";
import DateModal from "../../components/tasks/DateModal";
import TaskAssignedModal from "../../components/tasks/modal/TaskAssignedModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import moment from "moment";
import { ErrorToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import RecurringDaysInputField from "../../components/global/customInputs/RecurringDaysInputField";
import TaskInputField from "../../components/global/customInputs/TaskInputField";
import TaskTypeInputField from "../../components/global/customInputs/TaskTypeInputField";

const AssignReportedTask = () => {
  const location = useLocation();
  const { task } = location.state || {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { navigate, taskDropDown } = useContext(GlobalContext);

  const today = moment();
  const additionalDropdownRef = useRef();
  const taskTypeDropdownRef = useRef();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isTaskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [isTaskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [displaySelectedTask, setDisplaySelectedTask] = useState("");

  const [passSelectedEmployee, setPassSelectedEmployee] = useState("");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [inputError, setInputError] = useState({});
  const [customTypeText, setCustomTypeText] = useState("");
  const [customTask, setCustomTask] = useState("");

  const [fieldErrors, setFieldErrors] = useState({});

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!isTaskTypeDropdownOpen);
  };

  const toggleTaskDropdown = () => {
    setTaskDropdownOpen(!isTaskDropdownOpen);
  };

  const handleAssignTask = async (data) => {
    try {
      setSubmitLoading(true);
      const obj = {
        reportedTask: task?._id,
        boat: [data.boatId],
        task: displaySelectedTask ? displaySelectedTask : customTask,
        taskType: selectedTaskType?.replace(/([A-Z])/g, " $1")?.trim(),
        dueDate: dueDate?.unix,
        description: data.note,
        reoccuring: recurringDays === "none" ? false : true,
        reoccuringDays: recurringDays === "none" ? 0 : +recurringDays,
        assignTo: [passSelectedEmployee?.id],
      };

      const errors = {};

      if (!data.boatId) errors.boatId = "Boat is required.";
      if (!(displaySelectedTask || customTask))
        errors.task = "Task is required.";
      if (!selectedTaskType) errors.taskType = "Task type is required.";
      if (!dueDate?.unix) errors.dueDate = "Due date is required.";
      if (!data.note) errors.note = "Description is required.";
      if (!passSelectedEmployee?.id)
        errors.assignTo = "Please assign to someone.";
      if (recurringDays !== "none" && isNaN(+recurringDays)) {
        errors.reoccuringDays = "Recurring days must be a number.";
      }

      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setSubmitLoading(false);
        return;
      }

      // No errors — clear previous ones
      setFieldErrors({});

      const response = await axios.post("/owner/task", obj);

      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignTask ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const [RecurringDropdown, setRecurringDropdown] = useState(false);
  const [recurringDays, setRecurringDays] = useState("");
  const [customDays, setCustomDays] = useState(false);
  const [customRecurring, setCustomRecurring] = useState("");

  const RecurringRef = useRef(null);
  const toggleRecurringDropdown = (e) => {
    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setRecurringDropdown((prev) => !prev);
      // setRecurringDropdown(!RecurringDropdown);
    }
  };

  const handleSelectDay = (day, text) => {
    setFieldErrors({});
    if (day === "custom") {
      setRecurringDays(day);
      setSelectedDay(text);
      setCustomDays(!customDays);
      setRecurringDropdown(true);
    } else {
      setRecurringDays(day);
      setSelectedDay(text); // Set selected text
      setRecurringDropdown(false); // Close the dropdown after selecting
    }
  };

  const handleTaskTypeSelection = (taskType) => {
    setInputError({});
    setSelectedTaskType(taskType);
    setTasks(
      taskDropDown?.find((item) => item?.taskType === taskType)?.task || []
    );
    setTaskDropdownOpen(false);
    setDisplaySelectedTask(null);
    setCustomTask("");
    setFieldErrors({});
    // if (taskType === "custom") {
    //   setTaskTypeDropdownOpen(true);
    //   setCustomInput(true);
    //   setTaskDropdownOpen(false);
    // } else {

    // }
  };

  const handleTaskSelection = (task) => {
    setInputError({});
    setFieldErrors({});
    setTaskDropdownOpen(false); // Close task dropdown after selecting a task
    setDisplaySelectedTask(task);
  };

  useEffect(() => {
    // Prefill the form with values from the `state`
    if (task) {
      setValue("boatId", task?.boat?._id);
      setValue("name", task?.boat?.name);
      setValue("type", task?.boat?.boatType);
      setValue("note", task?.note);
      // setSelectedTaskType(task?.task?.taskType);
      // setDisplaySelectedTask(task?.task?.task);
      setPassSelectedEmployee({
        name: task?.employee?.name,
        id: task?.employee?._id,
      });

      // setDueDate({
      //   normal: moment(task?.task?.dueDate * 1000).format("MM-DD-YY"),
      //   unix: task?.task?.dueDate,
      // });
      // setSelectedDay(
      //   task?.task?.reoccuringDays
      //     ? `${task?.task?.reoccuringDays} days`
      //     : "None"
      // );
      // setRecurringDays(task?.task?.reoccuringDays);
    }
  }, [task, setValue]);

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form className="w-full" onSubmit={handleSubmit(handleAssignTask)}>
        <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229] ">
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start mb-12 ">
            <div className="w-full h-auto flex justify-between items-center">
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                Assign Reported Task
              </h3>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
              <div className="w-full grid grid-cols-2 gap-12">
                <AddFleetInput
                  isDisabled={true}
                  label={"Name"}
                  register={register("name", {
                    onChange: (e) => {
                      const value = e.target.value;
                      e.target.value =
                        value.charAt(0).toUpperCase() + value.slice(1);
                    },
                    setValueAs: (v) =>
                      String(v[0]).toUpperCase() + String(v).slice(1),
                    required: "Please enter your name",
                  })}
                  error={errors.name}
                />
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <AddFleetInput
                    isDisabled={true}
                    label={"Boat Type"}
                    register={register("type", {
                      required: "Please enter boat type",
                    })}
                    error={errors.type}
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-12">
                <div className="z-50">
                  <TaskTypeInputField
                    toggleTaskTypeDropdown={toggleTaskTypeDropdown}
                    selectedTaskType={selectedTaskType}
                    isEdit={true}
                    isTaskTypeDropdownOpen={isTaskTypeDropdownOpen}
                    taskTypeDropdownRef={taskTypeDropdownRef}
                    customTypeText={customTypeText}
                    handleTaskTypeSelection={handleTaskTypeSelection}
                    customInput={customInput}
                    setCustomTypeText={setCustomTypeText}
                    taskDropDown={taskDropDown}
                    setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
                    setCustomInput={setCustomInput}
                  />
                  {fieldErrors?.taskType && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors?.taskType}
                    </p>
                  )}
                </div>
                <div>
                  <TaskInputField
                    handleTaskSelection={handleTaskSelection}
                    toggleTaskDropdown={toggleTaskDropdown}
                    isTaskDropdownOpen={isTaskDropdownOpen}
                    displaySelectedTask={displaySelectedTask}
                    additionalDropdownRef={additionalDropdownRef}
                    tasks={tasks}
                    isEdit={true}
                    setInputError={setFieldErrors}
                    customTask={customTask}
                    setCustomTask={setCustomTask}
                  />
                  {fieldErrors?.task && (
                    <p className="text-red-500 text-sm">{fieldErrors?.task}</p>
                  )}
                </div>
              </div>
              <div className="w-full grid grid-cols-1 gap-12">
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  {/* Horizontal line above the Assigned Employee label */}
                  <hr className="w-full  mb-4 h-[1px] bg-[#1A293D]" />
                  <div className="flex items-center justify-between">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Assigned Employee"}
                    </label>
                    <p
                      onClick={(e) => {
                        e.preventDefault();
                        setIsEmployeeModalOpen(true);
                        setFieldErrors({});
                      }}
                      className="text-[#199BD1] cursor-pointer ml-2 text-sm font-medium hover:underline"
                    >
                      Change
                    </p>
                  </div>
                  <div className="w-full grid grid-cols-2 gap-12">
                    <div
                      className="group transition-all duration-500 w-full h-[52px] bg-[#1A293D] outline-none flex justify-between 
          items-center  px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl  relative"
                    >
                      <span className="text-gray-50">
                        {passSelectedEmployee?.name || "Assign Employee"}
                      </span>
                    </div>
                  </div>
                  {fieldErrors.assignTo && (
                    <p className="text-red-500 text-sm">
                      {fieldErrors.assignTo}
                    </p>
                  )}
                  {/* Horizontal line above the Note label */}
                  <hr className="w-full border-t border-gray-600 my-4" />
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Note"}
                  </label>
                  <textarea
                    {...register("note", {
                      onChange: (e) => {
                        const value = e.target.value;
                        e.target.value =
                          value.charAt(0).toUpperCase() + value.slice(1);
                      },
                      setValueAs: (v) =>
                        String(v[0]).toUpperCase() + String(v).slice(1),
                      required: "Please enter note",
                    })}
                    type="text"
                    // value={task?.note || ""}
                    className="w-full h-[315px] resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                  />
                  {fieldErrors.note && (
                    <p className="text-red-500 text-sm">{fieldErrors.note}</p>
                  )}
                </div>
              </div>
            </div>
            <span className="w-full h-[0.5px] bg-white/10"></span>

            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-auto flex justify-start items-center gap-3">
                <IoCalendarOutline className="text-2xl text-white/40" />
                <span className="text-md font-normal text-white">Due Date</span>
                <button
                  type="button"
                  onClick={() => {
                    setIsCalendarOpen(true);
                    setFieldErrors({});
                  }}
                  className="text-xs font-normal text-[#199BD1]"
                >
                  {dueDate?.normal || "Select Due Date"}
                </button>
              </div>
              {fieldErrors?.dueDate && (
                <p className="text-red-500 text-sm -mt-5">
                  {fieldErrors?.dueDate}
                </p>
              )}
              <RecurringDaysInputField
                toggleRecurringDropdown={toggleRecurringDropdown}
                selectedDay={selectedDay}
                RecurringRef={RecurringRef}
                RecurringDropdown={RecurringDropdown}
                handleSelectDay={handleSelectDay}
                customDays={customDays}
                setCustomRecurring={setCustomRecurring}
                customRecurring={customRecurring}
                isEdit={true}
              />
              {fieldErrors?.reoccuringDays && (
                <p className="text-red-500 text-sm">
                  {fieldErrors?.reoccuringDays}
                </p>
              )}
              {/* <div className="w-auto flex justify-start items-center gap-3">
                <TbCalendarStats className="text-2xl text-white/40" />
                <span className="text-md font-normal text-white">
                  Recurring Days
                </span>
                <button
                  type="button"
                  onClick={toggleRecurringDropdown}
                  className="text-xs flex flex-col justify-start items-start font-normal text-[#199BD1] relative"
                >
                  <span className="flex gap-1 justify-start items-center">
                    <span>{selectedDay || "Select Days"}</span>
                    <FaCaretDown />
                  </span>
                  <div
                    type="button"
                    ref={RecurringRef}
                    className={`w-[164px] h-32 overflow-y-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                      RecurringDropdown ? "scale-100" : "scale-0"
                    } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                  >
                    {recurringOptions?.map((option) => (
                      <div
                        type="button"
                        key={option.value}
                        className="w-full flex justify-start items-start gap-2 cursor-pointer"
                        onClick={() =>
                          handleSelectDay(option.value, option.label)
                        }
                      >
                        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                          {option.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              </div> */}
            </div>
            <DateModal
              isOpen={isCalendarOpen}
              setIsOpen={setIsCalendarOpen}
              setDueDate={setDueDate}
              setInputError={setFieldErrors}
              minDate={moment().startOf("day").toDate()}
            />
          </div>
        </div>
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Back"}
          </button>
          <button
            disabled={submitLoading}
            type="submit"
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Assign Reported Task</span>
              {submitLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>
      </form>
      {/* Conditionally render the EmployeeDetailModal */}
      {isEmployeeModalOpen && (
        <EmployeeDetailModal
          setIsOpen={setIsEmployeeModalOpen}
          SetPassSelectedEmployee={setPassSelectedEmployee}
          setInputError={setInputError}
        />
      )}

      <TaskAssignedModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          navigate("/new-tasks-request");
        }}
      />
    </div>
  );
};

export default AssignReportedTask;
