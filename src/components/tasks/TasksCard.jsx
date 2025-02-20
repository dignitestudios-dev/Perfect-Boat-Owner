import { useState, useContext } from "react";
import { MdDelete } from "react-icons/md";
import DeletedModal from "../../components/global/DeletedModal";
import { GlobalContext } from "../../contexts/GlobalContext";
import { getUnixDate } from "../../data/DateFormat";
import moment from "moment";

const statusColors = {
  newtask: "#FF69B4",
  overdue: "#FF3B30",
  default: "#FFCC00",
  inprogress: "#36B8F3",
  completed: "#1FBA46",
  upcomingtask: "#FF007F",
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

const TasksCard = ({ getTasks, data }) => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const { navigate } = useContext(GlobalContext);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // Function to close modal
  const handleDeleteConfirm = () => {
    setDeleteModalOpen(false);
    getTasks();
  };

  return (
    <>
      {/* Pass the _id and delete logic to the modal */}
      <DeletedModal
        isOpen={isDeleteModalOpen}
        _id={data?._id}
        onClose={() => setDeleteModalOpen(false)}
        refreshTasks={handleDeleteConfirm}
      />
      <button
        onClick={() => navigate(`/tasks/${data?._id}`, "All Tasks")}
        className="w-full h-[218px] flex justify-start items-start rounded-l-[6px] rounded-r-[16px] bg-[#1A293D]"
      >
        <div
          className={`w-[6px] h-full rounded-l-[6px]`}
          style={{
            backgroundColor:
              statusColors[data?.status] || statusColors["default"],
          }}
        ></div>
        <div className="w-[calc(100%-6px)] h-full py-4 px-6 flex flex-col gap-2 justify-start items-start relative">
          <div className="w-full h-auto text-nowrap flex justify-between items-center">
            <h3 className="text-left   text-[20px] font-bold leading-[27px] ">
              {data?.task?.length > 20
                ? data?.task?.slice(0, 15) + "..."
                : data?.task}
            </h3>
            <span
              className="w-[115px] ms-8 capitalize h-[27px] rounded-full
             bg-[#FFCC00]/[0.12] text-[11px] font-medium leading-[14.85px] flex items-center justify-center"
              style={{
                color: statusColors[data?.status] || statusColors["default"],
                backgroundColor:
                  statusColorsbg[data?.status] || statusColorsbg["default"],
              }}
            >
              {getFormattedStatus(data?.status)}
            </span>
          </div>
          <div className="w-auto flex flex-col justify-start items-start gap-1">
            <span className="text-[15px]  font-normal leading-[21.6px] text-white/50">
              Boat Name:{" "}
              <span className="capitalize font-medium">
                {data?.boat?.name?.length > 30
                  ? data?.boat?.name?.slice(0, 30) + "..."
                  : data?.boat?.name}
              </span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Location:{" "}
              <span className="font-medium">{data?.boat?.location}</span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Created By:{" "}
              <span className="font-medium">{data?.assignBy?.name}</span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Assigned To:{" "}
              <span className="font-medium">{data?.assignTo[0]?.name}</span>
            </span>
            <span className="text-[15px] font-normal leading-[21.6px] text-white/50">
              Created At:
              <span className="font-medium">
                {moment(data?.createdAt).format("MM-DD-YYYY")}
              </span>
            </span>
          </div>
          <div className="absolute bottom-2 left-3 w-[calc(100%-1.5rem)] flex justify-between items-center">
            <div className="w-auto flex gap-2 justify-start items-center">
              <button className="w-auto min-w-12 h-[27px] rounded-full px-2 flex items-center justify-center text-[11px] bg-[#9CA2AB]/[0.12] text-[#fff]/[0.5]">
                Due {data?.dueDate ? getUnixDate(data?.dueDate) : "No Due Date"}
              </button>
              {data?.reoccuring && (
                <button className="w-auto min-w-12 h-[27px] rounded-full px-2 flex items-center justify-center text-[11px] bg-[#9CA2AB]/[0.12] text-[#fff]/[0.5]">
                  Recurring {data?.reoccuringDays ? data?.reoccuringDays : null}{" "}
                  days
                </button>
              )}
            </div>

            <button
              className="hover:bg-[#fff]/[0.1] rounded-full px-2 py-2"
              type="button"
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
