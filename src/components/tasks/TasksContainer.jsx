import React, { useContext, useRef, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";
import TasksCard from "./TasksCard";
import { TbCaretDownFilled } from "react-icons/tb";
import axios from "../../axios"; // Assuming axios instance is set up

const TasksContainer = () => {
  const { navigate } = useContext(GlobalContext);
  const [openDropDownFilter, setOpenDropdownFilter] = useState(false);
  const dropDownRef = useRef(null);
  const [TaskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const toggleModal = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setOpenDropdownFilter((prev) => !prev);
    }
  };

  // Fetch tasks from the API
  const getTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get("/owner/task");
      setTaskData(data?.data || []);
    } catch (err) {
      console.error("Error fetching Task data:", err);
      setError("Failed to fetch tasks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="h-full w-full flex flex-col gap-6 justify-start items-center">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
          Tasks{" "}
          <span className="text-[12px] font-normal text-white/50 ">
            ({TaskData.length})
          </span>
        </h3>

        <div className="w-full h-auto flex flex-col sm:flex-row justify-between items-center">
          <div className="flex w-full sm:w-1/2 lg:w-[295px] h-[32px] mb-4 sm:mb-0 justify-start items-start rounded-[8px] bg-[#1A293D] relative">
            <span className="w-[32px] h-full flex items-center justify-center">
              <FiSearch className="text-white/50 text-lg" />
            </span>
            <input
              type="text"
              placeholder="Search here"
              className="w-[calc(100%-35px)] outline-none text-sm bg-transparent h-full"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <button
              onClick={() => navigate("/new-tasks-request")}
              className="h-[35px] w-full md:w-[107px] flex items-center gap-1 rounded-[10px] justify-center bg-[#1A293D] text-[#199BD1] text-[11px] font-normal leading-[14.85px]"
            >
              New Task Request
            </button>
            <button
              onClick={() => navigate("/add-task", "All Tasks")}
              className="h-[35px] w-full md:w-[107px] flex items-center gap-1 rounded-[10px] justify-center bg-[#199BD1] text-white text-[11px] font-normal leading-[14.85px]"
            >
              <span className="text-[11px]">+</span>
              Add New Task
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col sm:flex-row justify-between items-center">
          <div className="w-full sm:w-auto flex flex-wrap gap-2 justify-start items-center">
            <button className="w-auto outline-none focus-within:bg-[#fff] focus-within:text-[#001229] min-w-12 h-8 rounded-full px-2 flex items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]/[0.5]">
              All
            </button>
            <button className="w-auto outline-none focus-within:bg-[#fff] focus-within:text-[#001229] min-w-12 h-8 rounded-full px-2 flex items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]/[0.5]">
              In-Progress
            </button>
            <button className="w-auto outline-none focus-within:bg-[#fff] focus-within:text-[#001229] min-w-12 h-8 rounded-full px-2 flex items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]/[0.5]">
              Completed
            </button>
            <button className="w-auto outline-none focus-within:bg-[#fff] focus-within:text-[#001229] min-w-12 h-8 rounded-full px-2 flex items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]/[0.5]">
              Recurring
            </button>
            <button className="w-auto outline-none focus-within:bg-[#fff] focus-within:text-[#001229] min-w-12 h-8 rounded-full px-2 flex items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]/[0.5]">
              Overdue
            </button>
          </div>
          <button
            onClick={toggleModal}
            className="w-auto outline-none relative min-w-12 h-8 rounded-full px-2 flex gap-2 items-center justify-center text-[11px] font-medium leading-[28px] bg-[#1A293D] text-[#fff]"
          >
            <span>Sort By</span>
            <TbCaretDownFilled className="text-md text-white" />
            <div
              ref={dropDownRef}
              className={`w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                openDropDownFilter ? "scale-100" : "scale-0"
              } flex flex-col gap-1 shadow-lg p-3 justify-start items-start absolute top-9 right-0`}
            >
              <div className="w-auto flex gap-2 justify-start items-center">
                <span className="text-white/50">Sort By</span>
                <TbCaretDownFilled className="text-md text-white/50" />
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-3">
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    None
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Latest
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Earliest
                  </span>
                </div>
                <div className="w-full flex justify-start items-start gap-2">
                  <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                  <span className="text-white text-[11px] font-medium leading-[14.85px]">
                    Calendar
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-white">Loading tasks...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            TaskData.map((task) => {
              const assignedTo = task.assingTo?.[0]?.name || "Unknown";
              const createdBy = task.assingBy?.name || "Unknown";
              const dueDate = task?.dueDate || "No due date";
              const taskType = task?.taskType || "General";

              return (
                <TasksCard
                  key={task?._id}
                  title={task?.title}
                  taskType={taskType}
                  createdBy={createdBy}
                  dueDate={dueDate}
                  recurringDays={task.recurringDays} // Assuming `recurringDays` is part of the task data
                  assignedTo={assignedTo}
                  status={task.status} // Assuming the status like "In-Progress", "Completed" exists
                />
              );
            })
          )}
        </div> */}
        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
  {TaskData.length > 0 ? (
    TaskData.map((task) => {
      const assignedTo = task.assingTo && task.assingTo.length > 0 ? task.assingTo[0]?.name : "Unknown"; // Adjust based on the API response structure
      return (
        <TasksCard
         _id={task._id}
          key={task._id}
          title={task.title || "No Title"}  // Pass the title correctly
          taskType={task.taskType || "No Type"}
          createdBy={assignedTo}
          dueDate={task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Due Date"}
          recurringDays={task.recurringDays || "N/A"} // Ensure recurringDays is passed properly
          status={task.status || "No Status"}
        />
      );
    })
  ) : (
    <p>Loading Tasks....</p>
  )}
</div>

      </div>
    </div>
    );
    };
    
    export default TasksContainer;
    