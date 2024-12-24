import React, { useContext, useState } from "react";
import { getUnixDate } from "../../../data/DateFormat";
import RequestTaskListLoader from "../loaders/RequestTaskListLoader";
import { FiSearch } from "react-icons/fi";
import TaskType from "../../global/headerDropdowns/TaskType";
import StatusType from "../../global/headerDropdowns/StatusType";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import DeletedModal from "../../global/DeletedModal";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../contexts/GlobalContext";

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

const ViewAssignedTaskModal = ({
  setIsOpen,
  employeeTasks,
  loading = false,
  handleRemoveTask,
}) => {
  console.log("🚀 ~ employeeTasks:", employeeTasks);
  const navigateTo = useNavigate();

  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const [search, setSearch] = useState("");
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

  const handleEditTaskClick = (taskId) => {
    navigateTo(`/tasks/${taskId}`);
  };

  const filteredData = employeeTasks?.filter((item) => {
    const matchesSearch = search
      ? item?.taskType?.toLowerCase()?.includes(search?.toLowerCase()) ||
        item?.boatName?.toLowerCase()?.includes(search?.toLowerCase()) ||
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

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-[90%] max-w-4xl h-[80%] max-h-[80%] rounded-3xl flex items-center justify-center p-4 bg-[#1A293D]">
        <div className="bg-[#001229] text-white rounded-2xl shadow-lg w-full h-full p-4 overflow-hidden">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Select Tasks</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold"
            >
              ✕
            </button>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
              <span className="w-[32px] h-full flex items-center justify-center">
                <FiSearch className="text-white/50 text-lg" />
              </span>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
              />
            </div>
          </div>

          <div className="relative h-full overflow-auto">
            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
                <span className="w-full flex justify-start items-center">
                  Boat Name
                </span>
                <TaskType
                  setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
                  taskTypeDropdownOpen={taskTypeDropdownOpen}
                  toggleTaskTypeDropdown={toggleTaskTypeDropdown}
                  taskType={taskType}
                  setTaskType={setTaskType}
                />
                <span className="w-full flex justify-start items-center">
                  Due Date
                </span>
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
              {filteredData?.length > 0 ? (
                <>
                  {filteredData?.map((task, index) => (
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
                        {task?.reoccuringDays}
                      </span>
                      <span className="w-full flex justify-start items-center ">
                        <span
                          style={{
                            color:
                              statusColors[task?.status] ||
                              statusColors["default"],
                            backgroundColor:
                              statusColorsbg[task?.status] ||
                              statusColorsbg["default"],
                          }}
                          className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2"
                        >
                          {getFormattedStatus(task?.status)}
                        </span>
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
                            handleRemoveTask(task?._id); // Open modal when delete icon is clicked
                          }}
                        >
                          <RiDeleteBinLine />
                        </span>
                      </div>
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
        </div>
      </div>
    </div>
  );
};

export default ViewAssignedTaskModal;
