import React, { useContext, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import MiniListLoader from "../global/MiniListLoader";
import TaskType from "../global/headerDropdowns/TaskType";
import StatusType from "../global/headerDropdowns/StatusType";

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

const NewTaskTable = ({ data, loading }) => {
  const navigate = useNavigate();
  const { formatTimestampToDate } = useContext(GlobalContext);
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const [taskTypeDropdownOpen, setTaskTypeDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleTaskTypeDropdown = () => {
    setTaskTypeDropdownOpen(!taskTypeDropdownOpen);
  };

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const [search, setSearch] = useState("");
  const [taskType, setTaskType] = useState("");

  // const filteredData = data?.filter((item) =>
  //   item?.boat?.name?.toLowerCase()?.includes(search?.toLowerCase())
  // );

  const filteredData = data?.filter((item, index) => {
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

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
        New Task Request{" "}
        <span className="text-[12px] font-normal text-white/50 ">
          ({data?.length})
        </span>
      </h3>

      <div className="w-full h-auto flex justify-between items-center">
        <div className="flex w-[295px] h-[32px]  justify-start items-start rounded-[8px] bg-[#1A293D] relative">
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

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full grid grid-cols-4 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start relative">
          <span className="w-full flex justify-start items-center">
            Boat name
          </span>
          <TaskType
            taskTypeDropdownOpen={taskTypeDropdownOpen}
            setTaskTypeDropdownOpen={setTaskTypeDropdownOpen}
            toggleTaskTypeDropdown={toggleTaskTypeDropdown}
            setTaskType={setTaskType}
            taskType={taskType}
          />
          <span className="w-full flex justify-start items-center">
            Due Date
          </span>
          <StatusType
            setStatusDropdownOpen={setStatusDropdownOpen}
            statusDropdownOpen={statusDropdownOpen}
            toggleStatusDropdown={toggleStatusDropdown}
            setStatusFilter={setStatusFilter}
            statusFilter={statusFilter}
          />
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
                      onClick={() =>
                        navigate(`/new-tasks-request/${task?._id}`)
                      }
                      key={key}
                      className="cursor-pointer w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[11px] font-medium leading-[14.85px] text-white justify-start items-center"
                    >
                      <span className="w-full capitalize flex justify-start items-center">
                        {task?.boat?.name}
                      </span>
                      <span className="w-full capitalize flex justify-start items-center">
                        {task?.task?.taskType}
                      </span>
                      <span className="w-full flex justify-start items-center">
                        {formatTimestampToDate(task?.task?.dueDate)}
                      </span>
                      <span className="w-full flex justify-start items-center ">
                        <span
                          style={{
                            color:
                              statusColors[task?.task?.status] ||
                              statusColors["default"],
                            backgroundColor:
                              statusColorsbg[task?.task?.status] ||
                              statusColorsbg["default"],
                          }}
                          className="w-auto h-[27px] capitalize rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2"
                        >
                          {getFormattedStatus(task?.task?.status)}
                        </span>
                      </span>
                    </div>
                  );
                })}
              </>
            ) : (
              <div
                className="w-full cursor-pointer py-8 flex justify-center items-center text-[16px] 
            font-normal leading-[21.6px] text-white"
              >
                Ready to dive into action? Stay tuned for upcoming tasks
                requests by your team.
              </div>
            )}
          </>
        )}
      </div>

      <div className="w-full h-auto flex justify-center items-center">
        <Link
          to={"/new-tasks-request"}
          className="text-[11px] font-bold text-[#199BD1] underline underline-offset-2"
        >
          View all
        </Link>
      </div>
    </div>
  );
};

export default NewTaskTable;
