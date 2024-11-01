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
import { recurringOptions, taskTypeData } from "../../data/TaskTypeData";
import { FaCaretDown } from "react-icons/fa";
import moment from "moment";
import { ErrorToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";

const AssignReportedTask = () => {
  const location = useLocation();
  const { task } = location.state || {};
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { navigate } = useContext(GlobalContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const [isEdit, setIsEdit] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [isTaskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [isTaskDropdownOpen, setTaskDropdownOpen] = useState(false);
  const [customInput, setCustomInput] = useState(false);
  const [customTypeText, setCustomTypeText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [displaySelectedTask, setDisplaySelectedTask] = useState("");
  const [passSelectedEmployee, setPassSelectedEmployee] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [inputError, setInputError] = useState({});

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
        boat: data.boatId,
        task: displaySelectedTask ? displaySelectedTask : selectedTaskType,
        taskType: selectedTaskType,
        dueDate: dueDate?.unix,
        description: data.note,
        reoccuring: true,
        reoccuringDays: recurringDays,
        assignTo: [passSelectedEmployee?.id],
      };
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
  const RecurringRef = useRef(null);
  const toggleRecurringDropdown = (e) => {
    if (RecurringRef.current && !RecurringRef.current.contains(e.target)) {
      setRecurringDropdown((prev) => !prev);
      // setRecurringDropdown(!RecurringDropdown);
    }
  };

  const handleSelectDay = (day, text) => {
    setRecurringDays(day);
    setSelectedDay(text); // Set selected text
    setRecurringDropdown(false); // Close the dropdown after selecting
  };

  const handleTaskTypeSelection = (taskType) => {
    console.log(taskType);
    if (taskType === "custom") {
      console.log("if call ~~");
      setTaskTypeDropdownOpen(true);
      setCustomInput(true);
    } else {
      setSelectedTaskType(taskType);
      setTasks(taskTypeData[taskType] || []);
      setTaskTypeDropdownOpen(false);
      setTaskDropdownOpen(false);
    }
  };

  const handleTaskSelection = (task) => {
    setTaskDropdownOpen(false);
    setDisplaySelectedTask(task);
  };

  useEffect(() => {
    // Prefill the form with values from the `state`
    if (task) {
      setValue("boatId", task?.boat?._id);
      setValue("name", task?.boat?.name);
      setValue("type", task?.boat?.boatType);
      setValue("note", task?.note);
      setSelectedTaskType(task?.task?.taskType);
      setDisplaySelectedTask(task?.task?.task);
      setPassSelectedEmployee({
        name: task?.employee?.name,
        id: task?.employee?._id,
      });
      setDueDate({
        normal: moment(task?.task?.dueDate * 1000).format("YYYY-MM-DD"),
        unix: task?.task?.dueDate,
      });
      setSelectedDay(
        task?.task?.reoccuringDays
          ? `${task?.task?.reoccuringDays} days`
          : "None"
      );
      setRecurringDays(task?.task?.reoccuringDays);
    }
  }, [task, setValue]);

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form className="w-full" onSubmit={handleSubmit(handleAssignTask)}>
        <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
            <div className="w-full h-auto flex justify-between items-center">
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                Assign Reported Task
              </h3>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
              <div className="w-full grid grid-cols-2 gap-12">
                <AddFleetInput
                  label={"Name"}
                  register={register("name", {
                    required: "Please enter your name",
                  })}
                  error={errors.name}
                />
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <AddFleetInput
                    label={"Boat Type"}
                    register={register("type", {
                      required: "Please enter boat type",
                    })}
                    error={errors.type}
                  />
                </div>
              </div>
              <div className="w-full grid grid-cols-2 gap-12">
                <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Task Type"}
                  </label>
                  <div
                    onClick={toggleTaskTypeDropdown}
                    className={`group transition-all duration-500 w-full ${
                      isTaskTypeDropdownOpen
                        ? "rounded-t-xl rounded-b-none"
                        : "rounded-xl"
                    } h-[52px] ${
                      isEdit && "cursor-pointer"
                    } bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px]
                   focus:border-[#55C9FA] relative`}
                  >
                    <span className="text-gray-400">
                      {" "}
                      {selectedTaskType || "Select Task Type"}{" "}
                    </span>
                    <span className="text-gray-400">
                      <TbCaretDownFilled
                        className={`${
                          isTaskTypeDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>

                    <div
                      // ref={taskTypeDropdownRef}
                      className={`${
                        isTaskTypeDropdownOpen ? "flex" : "hidden"
                      } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute -bottom-40 shadow-xl
                     left-0 w-full h-40 max-h-40 bg-[#1A293D] rounded-b-2xl z-20`}
                    >
                      <div className="w-full h-auto overflow-y-auto">
                        {Object.keys(taskTypeData).map((taskType, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => handleTaskTypeSelection(taskType)}
                            className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10"
                          >
                            {taskType}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTaskTypeSelection("custom");
                          }}
                          className="w-full text-gray-300 h-8 px-5 hover:bg-[#000]/10 flex flex-col gap-1 justify-center 
                        relative items-start"
                        >
                          <span>Custom</span>
                          {customInput && (
                            <div className="absolute w-full top-10 left-0 flex flex-col justify-start items-start gap-2 px-5">
                              <input
                                onChange={(e) =>
                                  setCustomTypeText(e.target.value)
                                }
                                type="text"
                                className="w-[60%] h-[42px] mb-2 bg-[#1A293D] disabled:text-white/50 outline-none px-3
                               border-[1px] border-[#55C9FA] rounded-md"
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTaskTypeSelection(customTypeText);
                                }}
                                className="w-[95%] h-[42px] rounded-md bg-[#119bd1] text-white flex items-center 
                            justify-center text-sm font-medium"
                              >
                                Apply
                              </button>
                            </div>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    Task
                  </label>
                  <div
                    onClick={toggleTaskDropdown}
                    className={`group transition-all duration-500 w-full ${
                      isTaskDropdownOpen
                        ? "rounded-t-xl rounded-b-none"
                        : "rounded-xl"
                    } h-[52px] ${
                      isEdit && "cursor-pointer"
                    } bg-[#1A293D] outline-none flex justify-between items-center px-3 relative`}
                  >
                    <span className="text-gray-400">
                      {displaySelectedTask || "Select Task"}{" "}
                    </span>
                    <span className="text-gray-400">
                      <TbCaretDownFilled
                        className={`${
                          isTaskDropdownOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                    {/* Dropdown menu for tasks */}
                    <div
                      // ref={additionalDropdownRef}
                      className={`${
                        isTaskDropdownOpen ? "flex" : "hidden"
                      } flex-col justify-start items-start gap-3 transition-all duration-500 py-3 absolute top-[54px]
                    shadow-xl left-0 w-full max-h-40 overflow-y-auto bg-[#1A293D] rounded-b-2xl`}
                    >
                      {tasks.length > 0 ? (
                        tasks.map((task, index) => (
                          <button
                            type="button"
                            key={index}
                            onClick={() => handleTaskSelection(task)}
                            className="text-gray-300 w-full h-8 px-5 flex justify-start items-center hover:bg-[#000]/10"
                          >
                            {task}
                          </button>
                        ))
                      ) : (
                        <span className="text-gray-400 px-5">
                          No tasks on the horizon? Assign tasks to keep the crew
                          engaged and productive!
                        </span>
                      )}
                    </div>
                  </div>
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
                      <span className="text-gray-400">
                        {passSelectedEmployee?.name || "Assign Employee"}
                      </span>
                    </div>
                  </div>
                  {/* Horizontal line above the Note label */}
                  <hr className="w-full border-t border-gray-600 my-4" />
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Note"}
                  </label>
                  <textarea
                    {...register("note", {
                      required: "Please enter boat location",
                    })}
                    type="text"
                    // value={task?.note || ""}
                    className="w-full h-[315px] resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                  />
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
                  onClick={() => setIsCalendarOpen(true)}
                  className="text-xs font-normal text-[#199BD1]"
                >
                  {dueDate?.normal || "Select Due Date"}
                </button>
              </div>

              <div className="w-auto flex justify-start items-center gap-3">
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
                    ref={RecurringRef}
                    className={`w-[164px] h-32 overflow-y-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                      RecurringDropdown ? "scale-100" : "scale-0"
                    } flex flex-col gap-3 shadow-lg p-3 justify-start items-start absolute top-6 left-0`}
                  >
                    {recurringOptions?.map((option) => (
                      <div
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
              </div>
            </div>
            <DateModal
              isOpen={isCalendarOpen}
              setIsOpen={setIsCalendarOpen}
              setDueDate={setDueDate}
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
