import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { getUnixDate } from "../../data/DateFormat";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";

const statusColors = {
  newtask: "#FF007F",
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

const dummyData = [
  {
    boat: { name: "Sea Breeze 101" },
    taskType: "Engine Check",
    dueDate: "2025-06-01T12:00:00Z",
    reoccuringDays: "30",
    status: "newtask",
  },
  {
    boat: { name: "Wave Rider 202" },
    taskType: "Hull Cleaning",
    dueDate: "2025-06-05T12:00:00Z",
    reoccuringDays: "60",
    status: "inprogress",
  },
  {
    boat: { name: "Ocean Queen 303" },
    taskType: "Safety Inspection",
    dueDate: "2025-05-10T12:00:00Z",
    reoccuringDays: null,
    status: "overdue",
  },
  {
    boat: { name: "Mariner X" },
    taskType: "Battery Replacement",
    dueDate: "2025-06-20T12:00:00Z",
    reoccuringDays: "90",
    status: "completed",
  },
];

const AssignBoatAccessRights = () => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const [passSelectedManagers, SetPassSelectedManagers] = useState([]);
  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [passSelectedEmployee, SetPassSelectedEmployee] = useState([]);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px]">Boat 1</h3>
        <div className=" grid md:grid-cols-2 grid-cols-1 justify-between gap-28 ">
          <div className="space-y-2">
            <label>Boat Name</label>
            <button
              type="button"
              className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 rounded-xl"
            >
              Boat A
            </button>
          </div>
          <div className="space-y-2">
            <label>Manager</label>
            <button
              type="button"
              onClick={() => setIsManagerOpen(true)}
              className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
            >
              {passSelectedManagers.length > 0
                ? passSelectedManagers
                  ? passSelectedManagers?.map((item) => item.name + ",")
                  : "Click Here To Select Manager"
                : passSelectedManager
                ? passSelectedManager.name
                : "Click Here To Select Manager"}
            </button>
          </div>
        </div>
        <h3 className="text-[18px] font-bold leading-[24.3px] py-4">
          Task Details
        </h3>

        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium  border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">
              Task Type
            </span>
            <div className="w-full flex justify-start items-center cursor-pointer">
              Due Date
            </div>
            <span className="w-full flex justify-start items-center">
              Recurring Days
            </span>
            <span className="w-full flex justify-start items-center">
              Assigned To
            </span>
            <span className="w-full flex justify-start items-center">
              Status
            </span>

            <span className="w-full flex justify-start items-center">
              Action
            </span>
          </div>
          {dummyData?.length > 0 ? (
            <>
              {dummyData?.slice(0, 4)?.map((item, index) => (
                <div
                  key={index}
                  type="button"
                  className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] 
              font-medium leading-[14.85px] text-white justify-start items-center"
                >
                  <span className="w-full flex justify-start items-center ">
                    {item?.taskType?.length > 15
                      ? item?.taskType?.slice(0, 24) + "..."
                      : item?.taskType}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {getUnixDate(item?.dueDate)}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    {item?.reoccuringDays || "Non-recurring"}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {item?.boat?.name}
                  </span>
                  <span
                    style={{
                      color:
                        statusColors[item?.status] || statusColors["default"],
                      backgroundColor:
                        statusColorsbg[item?.status] ||
                        statusColorsbg["default"],
                    }}
                    className="w-[110px] text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center h-[27px] "
                    // onClick={() => navigate("/tasks/1", "All Tasks")}
                  >
                    {getFormattedStatus(item?.status)}
                  </span>
                  <span className="w-full flex justify-start items-center text-[#36B8F3] underline ">
                    <p
                      onClick={() => setIsEmployeeModalOpen(true)}
                      className="cursor-pointer"
                    >
                      Change
                    </p>
                  </span>

                  {/* <DeletedModal
                  isOpen={isDeleteModalOpen}
                  _id={item?._id}
                  onClose={() => setDeleteModalOpen(false)}
                  refreshTasks={handleDeleteConfirm}
                /> */}
                </div>
              ))}
            </>
          ) : (
            <p>No record found</p>
          )}
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h3 className="text-[18px] font-bold leading-[24.3px]">Boat 2</h3>
        <div className=" grid md:grid-cols-2 grid-cols-1 justify-between gap-28 ">
          <div className="space-y-2">
            <label>Boat Name</label>
            <button
              type="button"
              className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 rounded-xl"
            >
              Boat A
            </button>
          </div>
          <div className="space-y-2">
            <label>Manager</label>
            <button
              type="button"
              onClick={() => setIsManagerOpen(true)}
              className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
            >
              {passSelectedManagers.length > 0
                ? passSelectedManagers
                  ? passSelectedManagers?.map((item) => item.name + ",")
                  : "Click Here To Select Manager"
                : passSelectedManager
                ? passSelectedManager.name
                : "Click Here To Select Manager"}
            </button>
          </div>
        </div>
        <h3 className="text-[18px] font-bold leading-[24.3px] py-4">
          Task Details
        </h3>

        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium  border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">
              Task Type
            </span>
            <div className="w-full flex justify-start items-center cursor-pointer">
              Due Date
            </div>
            <span className="w-full flex justify-start items-center">
              Recurring Days
            </span>
            <span className="w-full flex justify-start items-center">
              Assigned To
            </span>
            <span className="w-full flex justify-start items-center">
              Status
            </span>

            <span className="w-full flex justify-start items-center">
              Action
            </span>
          </div>
          {dummyData?.length > 0 ? (
            <>
              {dummyData?.slice(0, 4)?.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] 
              font-medium leading-[14.85px] text-white justify-start items-center"
                >
                  <span className="w-full flex justify-start items-center ">
                    {item?.taskType?.length > 15
                      ? item?.taskType?.slice(0, 24) + "..."
                      : item?.taskType}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {getUnixDate(item?.dueDate)}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    {item?.reoccuringDays || "Non-recurring"}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {item?.boat?.name}
                  </span>
                  <span
                    style={{
                      color:
                        statusColors[item?.status] || statusColors["default"],
                      backgroundColor:
                        statusColorsbg[item?.status] ||
                        statusColorsbg["default"],
                    }}
                    className="w-[110px] text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center h-[27px] "
                    // onClick={() => navigate("/tasks/1", "All Tasks")}
                  >
                    {getFormattedStatus(item?.status)}
                  </span>
                  <span className="w-full flex justify-start items-center text-[#36B8F3] underline">
                    Change
                  </span>

                  {/* <DeletedModal
                  isOpen={isDeleteModalOpen}
                  _id={item?._id}
                  onClose={() => setDeleteModalOpen(false)}
                  refreshTasks={handleDeleteConfirm}
                /> */}
                </button>
              ))}
            </>
          ) : (
            <p>No record found</p>
          )}
        </div>
      </div>
      {isManagerOpen && (
        <ManagerDetailModal
          isMultiple={true}
          setIsOpen={setIsManagerOpen}
          SetPassSelectedManager={SetPassSelectedManager}
          SetPassSelectedManagers={SetPassSelectedManagers}
          selectedManagers={selectedManagers}
          setSelectedManagers={setSelectedManagers}
          handleManagerModal={() => console.log("manager modal")}
          isBoat={true}
        />
      )}
      {isEmployeeModalOpen && (
        <EmployeeDetailModal
          setIsOpen={setIsEmployeeModalOpen}
          isOpen={isEmployeeModalOpen}
          SetPassSelectedEmployee={SetPassSelectedEmployee}
          setInputError={() => {}}
          isMultiple={true}
        />
      )}
    </div>
  );
};

export default AssignBoatAccessRights;
