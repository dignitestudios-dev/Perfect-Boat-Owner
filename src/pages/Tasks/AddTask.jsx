import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";

import { IoCalendarOutline } from "react-icons/io5";
import DateModal from "../../components/tasks/DateModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";
import { useNavigate } from "react-router-dom";
import TaskAssignSucessModal from "../../components/tasks/modal/TaskAssignSuccessModal";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import SelectBoatInputField from "../../components/global/customInputs/SelectBoatInputField";
import SelectEmployeeInputField from "../../components/global/customInputs/SelectEmployeeInputField";
import TaskTypeInputField from "../../components/global/customInputs/TaskTypeInputField";
import TaskInputField from "../../components/global/customInputs/TaskInputField";
import RecurringDaysInputField from "../../components/global/customInputs/RecurringDaysInputField";
import { formValidation } from "../../constants/formValidation";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddTaskBoatModal from "../../components/fleet/AddTaskBoatModal";

const AddTask = () => {
  const today = moment();
  const { taskDropDown, setUpdateDropDown, setNotificationUpdate } =
    useContext(GlobalContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [noteText, setNoteText] = useState("");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [isTaskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [isTaskDropdownOpen, setTaskDropdownOpen] = useState(false);

  const [RecurringDropdown, setRecurringDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [recurringDays, setRecurringDays] = useState("");
  const [customDays, setCustomDays] = useState(false);
  const [customRecurring, setCustomRecurring] = useState("");

  const RecurringRef = useRef(null);
  const toggleRecurringDropdown = (e) => {
    setTaskTypeDropdownOpen(false);
    setTaskDropdownOpen(false);

    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setRecurringDropdown((prev) => !prev);
      // setRecurringDropdown(!RecurringDropdown);
    }
  };

  const handleSelectDay = (day, text) => {
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

  const [hasAssigned, setHasAssigned] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [employeeBoats, setEmployeeBoats] = useState([]);
  const [employeeBoatsLoader, setEmployeeBoatsLoader] = useState(false);

  const [passSelectedBoat, SetPassSelectedBoat] = useState([]);
  const [passSelectedEmployee, SetPassSelectedEmployee] = useState("");

  const taskTypeDropdownRef = useRef();
  const additionalDropdownRef = useRef();
  const navigate = useNavigate();

  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [displaySelectedTask, setDisplaySelectedTask] = useState("");
  const [dueDate, setDueDate] = useState({});
  const [customTypeText, setCustomTypeText] = useState("");
  const [customTask, setCustomTask] = useState("");
  const [inputError, setInputError] = useState({});

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

  const handleTaskTypeSelection = (taskType) => {
    setInputError({});
    setSelectedTaskType(taskType);
    setTasks(
      taskDropDown?.find((item) => item?.taskType === taskType)?.task || []
    );
    setTaskDropdownOpen(false);
    setDisplaySelectedTask(null);
    // if (taskType === "custom") {
    //   setTaskTypeDropdownOpen(true);
    //   setCustomInput(true);
    //   setTaskDropdownOpen(false);
    // } else {

    // }
  };

  const handleTaskSelection = (task) => {
    setInputError({});
    setTaskDropdownOpen(false); // Close task dropdown after selecting a task
    setDisplaySelectedTask(task);
  };

  const submitTask = async () => {
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
    if (!passSelectedBoat?.length) {
      setInputError({ boat: "Select boat" });
      return;
    }
    try {
      setSubmitLoading(true);
      const obj = {
        boat: passSelectedBoat?.map((item) => item?.id),
        task: displaySelectedTask ? displaySelectedTask : customTask,
        taskType: selectedTaskType?.replace(/([A-Z])/g, " $1")?.trim(),
        dueDate: dueDate?.unix,
        description: noteText,
        reoccuring: recurringDays === "none" ? false : true,
        reoccuringDays: recurringDays === "none" ? 0 : +recurringDays,
        assignTo: [passSelectedEmployee?.id],
      };

      const response = await axios.post("/owner/task", obj);

      if (response.status === 200) {
        setHasAssigned(true);
        setUpdateDropDown((prev) => !prev);
        setNotificationUpdate((prev) => !prev);
      }
    } catch (err) {
      console.log("🚀 ~ submitTask ~ err:", err);
      ErrorToast(err?.response?.data.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getEmployeeBoats = async () => {
    setEmployeeBoatsLoader(true);
    setEmployeeBoats([]);
    try {
      const { data } = await axios.get(
        `/owner/employees/${passSelectedEmployee?.id}/boat`
      );
      if (data?.success) {
        setEmployeeBoatsLoader(false);
        setEmployeeBoats(data?.data);
      }
    } catch (error) {
      setEmployeeBoatsLoader(false);
      ErrorToast(error?.response?.data?.message);
      console.log("🚀 ~ getEmployeeBoats ~ error:", error);
    }
  };

  useEffect(() => {
    if (passSelectedEmployee?.id) {
      getEmployeeBoats();
    }
  }, [passSelectedEmployee]);

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
          <div className="w-full h-auto flex justify-between items-center">
            <div>
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                Assign New Task
              </h3>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
            <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
              <div>
                <SelectEmployeeInputField
                  setIsEmployeeModalOpen={setIsEmployeeModalOpen}
                  passSelectedEmployee={passSelectedEmployee}
                  isEdit={true}
                />
                {inputError.employee && (
                  <p className="text-red-500">{inputError.employee}</p>
                )}
              </div>
              <div>
                <SelectBoatInputField
                  passSelectedEmployee={passSelectedEmployee}
                  passSelectedBoat={passSelectedBoat}
                  setIsBoatModalOpen={setIsBoatModalOpen}
                  isEdit={passSelectedEmployee ? true : false}
                  setInputError={setInputError}
                />
                {inputError.boat && (
                  <p className="text-red-500">{inputError.boat}</p>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-2 gap-5 lg:gap-32">
              <div>
                <TaskTypeInputField
                  setInputError={setInputError}
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
                  additionalDropdownRef={additionalDropdownRef}
                  tasks={tasks}
                  isEdit={true}
                  setInputError={setInputError}
                  customTask={customTask}
                  setCustomTask={setCustomTask}
                />
                {inputError.task && (
                  <p className="text-red-500">{inputError.task}</p>
                )}
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-12 mt-4">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Add Note"}
                </label>
                <textarea
                  onChange={(e) => {
                    const value = e.target.value;
                    const capitalizedValue =
                      value.charAt(0).toUpperCase() + value.slice(1);
                    setNoteText(capitalizedValue);
                    setInputError({});
                  }}
                  value={noteText}
                  type="text"
                  // eslint-disable-next-line react/no-unknown-property
                  autocapitalize="characters"
                  className="w-full h-[315px] resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px]
                   focus:border-[#55C9FA] rounded-xl"
                ></textarea>
                {inputError.note && (
                  <p className="text-red-500">{inputError.note}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <span className="w-full h-[0.5px] bg-white/10"></span>
        <div className="w-1/2">
          <div className="w-full flex flex-col gap-4">
            <div>
              <div className="w-auto flex justify-start items-center gap-3">
                <IoCalendarOutline className="text-2xl text-white/40" />
                <span className="text-md font-normal text-white">Due Date</span>
                <button
                  onClick={() => setIsCalendarOpen(true)}
                  className="text-xs font-normal text-[#199BD1]"
                >
                  {dueDate?.normal
                    ? moment(dueDate?.normal).format("MM-DD-YYYY")
                    : "Select Due Date"}
                </button>
              </div>
              {inputError.dueDate && (
                <p className="text-red-500">{inputError.dueDate}</p>
              )}
            </div>
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
          </div>
        </div>
        <DateModal
          isOpen={isCalendarOpen}
          setIsOpen={setIsCalendarOpen}
          setDueDate={setDueDate}
          setInputError={setInputError}
          minDate={new Date()}
        />
        {isEmployeeModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <EmployeeDetailModal
              isOpen={isEmployeeModalOpen}
              setIsOpen={setIsEmployeeModalOpen}
              SetPassSelectedEmployee={SetPassSelectedEmployee}
              setInputError={setInputError}
              passSelectedEmployee={passSelectedEmployee}
            />
          </div>
        )}
        {isBoatModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
            <AddTaskBoatModal
              isOpen={isBoatModalOpen}
              setIsOpen={setIsBoatModalOpen}
              SetPassSelectedBoat={SetPassSelectedBoat}
              passSelectedBoat={passSelectedBoat}
              setInputError={setInputError}
              isMultiple={true}
              boats={employeeBoats}
              employeeBoatsLoader={employeeBoatsLoader}
            />
          </div>
        )}
      </div>

      <div className="w-full flex mt-16 justify-end items-center gap-6">
        <div className="w-auto flex justify-between items-center gap-4">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="w-52 h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Back"}
          </button>
          <button
            disabled={submitLoading}
            onClick={() => {
              submitTask();
            }}
            className="w-52 h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Save</span>
              {submitLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
          {/* <TaskAssignedModal
            isOpen={hasAssigned}
            // onClick={() => setHasAssigned(false)}
          /> */}

          {hasAssigned && (
            <TaskAssignSucessModal
              isOpen={hasAssigned}
              setIsOpen={setHasAssigned}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
