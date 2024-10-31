import React, { useEffect, useState } from "react";
import { FaRegEdit, FaCaretDown } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import axios from "../../../axios";
import { getUnixDate } from "../../../data/DateFormat";
import AssignCompleteModal from "../../../components/tasks/AssignCompleteModal";
import RequestTaskListLoader from "../loaders/RequestTaskListLoader";
import TaskType from "../../global/headerDropdowns/TaskType";
import StatusType from "../../global/headerDropdowns/StatusType";

const Dropdown = ({ label, options }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-1 py-2 rounded-md"
      >
        {label}
        <FaCaretDown />
      </button>
      {isOpen && (
        <div className="absolute top-10 left-0 w-full bg-[#1A293D] rounded-md shadow-lg p-3 z-10">
          {options.map((option, index) => (
            <div key={index} className="flex items-center gap-2 p-2">
              <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
              <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                {option}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SelectTaskModal = ({ handleViewAllClick, setIsOpen, passSelectedTask }) => {

  const statusColors = {
    "newtask": "#FF007F",
    "overdue": "#FF3B30", 
    "default": "#FFCC00", 
    "in-progress":"#36B8F3",
    "completed":"#1FBA46"
  };

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  console.log("🚀 ~ SelectTaskModal ~ search:", search)
  const [selectedTasks, setSelectedTasks] = useState([])
  const [openAssignSuccess, setOpenAssignSuccess] = useState(false)

  const [taskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusFilter , setStatusFilter] = useState("all");
  const [taskType, setTaskType] = useState("all")

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!taskTypeDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const handleOpenAssignSuccess = () =>{
    setOpenAssignSuccess(!openAssignSuccess)
    setIsOpen(false)
  }

  // Fetch tasks from the API
  const getTasks = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/owner/task`);
      setTaskData(data?.data || []);
    } catch (err) {
      console.error("Error fetching Task data:", err);
    } finally {
      setLoading(false);
    }
  };

  // const filteredData = taskData?.filter((item) =>
  //   item?.task?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const filteredData = taskData?.filter((item) => {
    const matchesSearch = search ? item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase()) : true;
    const matchesStatus = statusFilter && statusFilter !== "all" ? item?.status === statusFilter : true;
    const taskTypeMatch = taskType && taskType !== "all" ? item?.taskType?.toLowerCase() === taskType?.toLowerCase() : true;
    return matchesSearch && matchesStatus && taskTypeMatch;
  });

  useEffect(() => {
    getTasks();
  }, []);

  const handleSelectTask = (taskId, taskName) => {
    const isSelected = selectedTasks?.some((task) => task?.id === taskId);
    if (isSelected) {
      setSelectedTasks(selectedTasks?.filter((task) => task?.id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, { id: taskId, name: taskName }]);
    }
};

const handleTaskSubmit = () =>{
  passSelectedTask(selectedTasks); 
  handleOpenAssignSuccess()
  // setIsOpen(false);
}

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
              onChange={(e)=>setSearch(e.target.value)}
                type="text"
                placeholder="Search here"
                className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
              />
            </div>
          </div>
          <div className="flex justify-end items-center mb-4">
            {/* <div className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 accent-[#199BD1]" />
              <span className="text-white text-[13px] font-medium">Select All</span>
            </div> */}
            <button
                onClick={() => handleTaskSubmit()}
                className="bg-[#119bd1] text-white px-6 flex items-center justify-center text-[12px] font-bold leading-[16.2px] w-[118px] h-[32px] rounded-md"
              >
                Done
              </button>
          </div>
          <div className="relative h-full overflow-auto">
            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-8 grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center mb-2">
                <span className="flex items-center justify-start mr-2">
                  {/* <input type="checkbox" className="w-4 h-4 accent-[#199BD1]" /> */}
                </span>
                <span className="flex items-center justify-start">
                  Boat Name
                </span>
                <div className="flex items-center justify-start">
                <TaskType taskTypeDropdownOpen={taskTypeDropdownOpen} toggleTaskTypeDropdown={toggleTaskTypeDropdown} 
          setTaskType={setTaskType} taskType={taskType}/>
                </div>
                <span className="flex items-center justify-start">
                  Due Date
                </span>
                <span className="flex items-center justify-start">
                  Recurring Days
                </span>
                <div className="flex items-center justify-start">
                <StatusType statusDropdownOpen={statusDropdownOpen} statusFilter={statusFilter}
          toggleStatusDropdown={toggleStatusDropdown} 
          setStatusFilter={setStatusFilter} setSearch={setSearch}/>
                </div>
              </div>
              {loading ? (
  <RequestTaskListLoader /> // Show loading spinner while loading
) : (
  <>
    {filteredData.length > 0 ? ( // Check if there's any data to display
      <>
        {filteredData.map((task, index) => {
          const isMultiSelected = selectedTasks?.some(
            (selected) => selected.id === task._id
          );
          return (
            <div
              key={index}
              className="w-full h-10 grid grid-cols-[auto_1fr_1fr_1fr_1fr_1fr] border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white items-center"
            >
              <span className="flex items-center justify-start mr-2">
                <input
                  checked={isMultiSelected}
                  onChange={() =>
                    handleSelectTask(task?._id, task?.task)
                  }
                  type="checkbox"
                  className="w-4 h-4 accent-[#199BD1]"
                />
              </span>
              <p className="flex items-center justify-start">
                {task?.boat?.name}
              </p>
              <p className="flex items-center justify-start">
                {task?.taskType?.length > 15
                  ? task?.taskType?.slice(0, 15) + "..."
                  : task?.taskType}
              </p>
              <span className="flex items-center justify-start">
                {getUnixDate(task?.dueDate)}
              </span>
              <span className="flex items-center justify-start">
                {task?.reoccuringDays} Days
              </span>
              <span className="flex items-center justify-start">
                <span
                  className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] px-2"
                  style={{
                    color:
                      statusColors[task?.status] ||
                      statusColors["default"],
                  }}
                >
                  {task?.status}
                </span>
              </span>
            </div>
          );
        })}
      </>
    ) : (
      <div className="w-full text-center text-white mt-4">
        No data found
      </div> // Display when there's no data
    )}
  </>
)}

              
              {/* Add more rows as needed */}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="bg-[#119bd1] text-white px-6 py-2 rounded-md"
            >
              Done
            </button>
          </div>
        </div>
        <AssignCompleteModal isOpen={openAssignSuccess} setIsOpen={handleOpenAssignSuccess}/>
      </div>
    </div>
  );
};

export default SelectTaskModal;
