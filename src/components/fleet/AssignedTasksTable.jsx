import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { getUnixDate } from "../../data/DateFormat";
import DeletedModal from "../global/DeletedModal";
import { useNavigate } from "react-router-dom";
import StatusType from "../global/headerDropdowns/StatusType";

const statusColors = {
  newtask: "#FF007F",
  overdue: "#FF3B30",
  default: "#FFCC00",
  inprogress: "#36B8F3",
  completed: "#1FBA46",
  upcomingtask: "#FF007F",
};

const STATUS_ENUM = {
  newtask: "New Task",
  inprogress: "In-Progress",
  recurring: "Recurring",
  overdue: "Overdue",
  completed: "Completed",
  upcomingtask: "Upcoming Task",
};

const AssignedTasksTable = ({
  setIsModalOpen,
  handleDateModalOpen,
  boatsData,
  openDeleteModal,
  getBoats,
}) => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const navigateTo = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    getBoats();
  };

  const handleEditTaskClick = (taskId) => {
    navigateTo(`/tasks/${taskId}`);
  };

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const toggleStatusDropdown = () => {
    setStatusDropdownOpen(!statusDropdownOpen);
  };

  const filteredData = boatsData?.task?.filter((item) => {
    const matchesStatus =
      statusFilter && statusFilter !== "all"
        ? item?.status === statusFilter
        : true;
    return matchesStatus;
  });
  console.log("🚀 ~ filteredData ~ filteredData:", filteredData);

  return (
    <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
      <div className="w-auto flex justify-between items-center gap-2">
        <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
          Assigned Tasks{" "}
        </h3>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
        >
          View All
        </button>
      </div>

      <div className="w-full flex flex-col gap-1 justify-start items-start">
        <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium  border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
          <span className="w-full flex justify-start items-center">
            Boat Name
          </span>
          <span className="w-full flex justify-start items-center">
            Task Type
          </span>
          <div
            className="w-full flex justify-start items-center cursor-pointer"
            onClick={handleDateModalOpen}
          >
            <MdOutlineDateRange className="mr-1 text-lg" />
            Due Date
          </div>
          <span className="w-full flex justify-start items-center">
            Recurring Days
          </span>
          <StatusType
            setStatusDropdownOpen={setStatusDropdownOpen}
            statusDropdownOpen={statusDropdownOpen}
            statusFilter={statusFilter}
            toggleStatusDropdown={toggleStatusDropdown}
            setStatusFilter={setStatusFilter}
          />
          <span className="w-full flex justify-start items-center">Action</span>
        </div>
        {boatsData?.task?.length > 0 ? (
          <>
            {filteredData?.map((item, index) => (
              <button
                type="button"
                className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] 
              font-medium leading-[14.85px] text-white justify-start items-center"
              >
                <span
                  className="w-full flex justify-start items-center"
                  // onClick={() => navigate("/tasks/1", "All Tasks")}
                >
                  {item?.boat?.name}
                </span>
                <span
                  className="w-full flex justify-start items-center "
                  // onClick={() => navigate("/tasks/1", "All Tasks")}
                >
                  {item?.taskType?.length > 15
                    ? item?.taskType?.slice(0, 24) + "..."
                    : item?.taskType}
                </span>
                <span
                  className="w-full flex justify-start items-center"
                  // onClick={() => navigate("/tasks/1", "All Tasks")}
                >
                  {getUnixDate(item?.dueDate)}
                </span>
                <span
                  className="w-full flex justify-start items-center "
                  // onClick={() => navigate("/tasks/1", "All Tasks")}
                >
                  {item?.reoccuringDays}
                </span>
                <span
                  style={{
                    color:
                      statusColors[item?.status] || statusColors["default"],
                  }}
                  className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] "
                  // onClick={() => navigate("/tasks/1", "All Tasks")}
                >
                  {getFormattedStatus(item?.status)}
                </span>
                <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                  <span
                    className="flex justify-start items-center"
                    onClick={() => handleEditTaskClick(item?._id)}
                  >
                    <FaRegEdit />
                  </span>
                  <span
                    className="flex justify-start items-center"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteModalOpen(true); // Open modal when delete icon is clicked
                    }}
                  >
                    <RiDeleteBinLine />
                  </span>
                </div>
                <DeletedModal
                  isOpen={isDeleteModalOpen}
                  _id={item?._id}
                  onClose={() => setDeleteModalOpen(false)}
                  refreshTasks={handleDeleteConfirm}
                />
              </button>
            ))}
          </>
        ) : (
          <p>No record found</p>
        )}
      </div>
    </div>
  );
};

export default AssignedTasksTable;
