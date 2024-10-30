import React, { useContext, useState } from "react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaCaretDown } from "react-icons/fa";
import MiniListLoader from "../global/MiniListLoader";
import TaskType from "../global/headerDropdowns/TaskType";
import StatusType from "../global/headerDropdowns/StatusType";

const statusColors = {
  "newtask": "#FF007F",
  "overdue": "#FF3B30",
  "default": "#FFCC00", 
  "in-progress":"#36B8F3",
  "completed":"#1FBA46"
};

const STATUS_ENUM = {
  newtask: "New Task",
  inprogress: "In Progress",
  recurring: "Recurring",
  overdue: "Overdue",
  completed: "Completed",
  upcomingtask: "Upcoming Task"
};

const DashboardTasksTable = ({ data, loading }) => {
  
  const { navigate, formatTimestampToDate } = useContext(GlobalContext);

  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const [taskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusFilter , setStatusFilter] = useState("all");
  const [taskType, setTaskType] = useState("")

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!taskTypeDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const [search, setSearch] = useState("");

  // const filteredData = data?.filter((item) => item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase()) );
  const filteredData = data?.filter((item) => {
    const matchesSearch = search ? item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase()) : true;
    const matchesStatus = statusFilter && statusFilter !== "all" ? item?.status === statusFilter : true;
    const taskTypeMatch = taskType && taskType !== "all" ? item?.taskType?.toLowerCase() === taskType?.toLowerCase() : true;
    return matchesSearch && matchesStatus && taskTypeMatch;
  });
  
  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        Tasks{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data?.length})
        </span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] bg-[#1A293D] relative">
          <span className="w-[32px] h-full flex items-center justify-center">
            <FiSearch className="text-white/50 text-lg" />
          </span>
          <input
          onChange={(e)=> setSearch(e.target.value)}
            type="text"
            placeholder="Search here"
            className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
          />
        </div>

        <button
          onClick={() => navigate("/add-task", "Tasks")}
          className="ml-4 w-[104px] h-[35px] flex items-center justify-center bg-[#199BD1] text-white rounded-[10px] hover:bg-[#147aab] transition"
        >
          + Add Task
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-4 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start relative">
          <span className="w-full flex justify-start items-center">
            Boat name
          </span>
          <TaskType taskTypeDropdownOpen={taskTypeDropdownOpen} toggleTaskTypeDropdown={toggleTaskTypeDropdown} 
          setTaskType={setTaskType} taskType={taskType}/>
          <span className="w-full flex justify-start items-center">
            Due Date
          </span>
          <StatusType statusDropdownOpen={statusDropdownOpen} statusFilter={statusFilter}
          toggleStatusDropdown={toggleStatusDropdown} 
          setStatusFilter={setStatusFilter} setSearch={setSearch}/>
        </div>
        {loading ? (
          <MiniListLoader />
        ) : (
          <>
            {data?.length > 0 ? (
              <>
                {filteredData?.slice(0, 4)?.map((task, key) => {
                  return (
                    <div
                      key={key}
                      className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[11px] 
                          font-medium leading-[14.85px] text-white justify-start items-center"
                    >
                      <span className="w-full capitalize flex justify-start items-center">
                        {task?.boat?.name}
                      </span>
                      <span className="w-full capitalize flex justify-start items-center">
                        {task?.taskType}
                      </span>
                      <span className="w-full flex justify-start items-center">
                        {formatTimestampToDate(task?.dueDate)}
                      </span>
                      <span className="w-full flex justify-start items-center ">
                        <span
                        style={{ color: statusColors[task?.status] || statusColors["default"] }}
                          className="w-auto h-[27px] capitalize rounded-full flex items-center
                             justify-center bg-[#FFCC00]/[0.12] px-2" 
                        >
                          {getFormattedStatus(task?.status)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px] font-normal leading-[21.6px] text-white">
                No tasks on the horizon? Assign tasks to keep the crew engaged
                and productive!
              </div>
            )}
          </>
        )}
      </div>
      <div className="w-full h-auto flex justify-center items-center">
        <Link
          to={"/tasks"}
          className="text-[11px] font-bold text-[#199BD1] underline underline-offset-2"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default DashboardTasksTable;
