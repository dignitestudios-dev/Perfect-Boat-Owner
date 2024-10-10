import { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import axios from "../../axios";
import DeletedModal from "../../components/global/DeletedModal";
import { GlobalContext } from "../../contexts/GlobalContext";

const TasksCard = ({
  _id,
  title,
  taskType,
  createdBy,
  assignedTo,
  dueDate,
  recurringDays,
  status,
}) => {
  const { navigate } = useContext(GlobalContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to close modal
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
  };

  return (
    <>
      {/* Pass the _id and delete logic to the modal */}
      <DeletedModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        _id={_id} // Pass the taskId here
        refreshTasks={handleDeleteConfirm} // Ensure this refreshes your task list if needed
      />
      <button
        onClick={() => navigate(`/tasks/${_id}`, "All Tasks")}
        className="w-full h-[172px] flex justify-start items-start rounded-l-[6px] rounded-r-[16px] bg-[#1A293D]"
      >
        <div className={`w-[6px] h-full rounded-l-[6px] bg-[#FFCC00]`}></div>
        <div className="w-[calc(100%-6px)] h-full py-4 px-6 flex flex-col gap-2 justify-start items-start relative">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[20px] font-bold leading-[27px]">{title}</h3>
            <span className="w-[70px] capitalize h-[27px] rounded-full bg-[#FFCC00]/[0.12] text-[11px] font-medium leading-[14.85px] flex items-center justify-center text-[#FFCC00]">
              {status}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start gap-1">
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Task Type:{" "}
              <span className="capitalize font-medium">{taskType}</span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Created By: <span className="font-medium">{createdBy}</span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Assigned To: <span className="font-medium">{assignedTo}</span>
            </span>
          </div>
          <div className="absolute bottom-2 left-3 w-[calc(100%-1.5rem)] flex justify-between items-center">
            <div className="w-auto flex gap-2 justify-start items-center">
              <button className="w-auto min-w-12 h-[27px] rounded-full px-2 flex items-center justify-center text-[11px] bg-[#9CA2AB]/[0.12] text-[#fff]/[0.5]">
                Due {dueDate}
              </button>
              {recurringDays && (
                <button className="w-auto min-w-12 h-[27px] rounded-full px-2 flex items-center justify-center text-[11px] bg-[#9CA2AB]/[0.12] text-[#fff]/[0.5]">
                  Recurring {recurringDays} days
                </button>
              )}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setDeleteModalOpen(true); // Open modal when delete icon is clicked
              }}
            >
              <MdDelete className="text-[#fff]/[0.5] text-lg" />
            </button>
          </div>
        </div>
      </button>
    </>
  );
};

export default TasksCard;
