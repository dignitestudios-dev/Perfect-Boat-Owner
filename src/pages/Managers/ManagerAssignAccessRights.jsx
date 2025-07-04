import { useEffect, useState } from "react";
import { getUnixDate } from "../../data/DateFormat";
import ManagerDetailModal from "./ManagerDetailModal";
import BoatAccessModal from "../Fleet/BoatAccessModal";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useLocation, useNavigate } from "react-router-dom";
import EmployeeUnAssignModal from "../../components/employees/EmployeeUnAssignModal";
import ManagerAccessRightModal from "../../components/managers/ManagerAccessRightModal";
import BoatOrManagerAssignAccessModal from "../../components/tasks/modal/BoatOrManagerAssignAccessModal";

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

const ManagerAssignAccessRights = () => {
  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  // const boatId = "67f79d3e25a9fc0bb742d7c3";
  const location = useLocation();
  const boats = location?.state?.boats;
  const boatNames = boats?.map((b) => b.name).join(", ");

  const manager = location?.state?.managerName;
  const navigate = useNavigate();

  const [isPopup, setIsPopup] = useState(true);

  const [loadingTasks, setLoadingTasks] = useState({});
  const [isEmployee, setIsEmployee] = useState(false);
  const [managerLoading, setManagerLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);

  const [boatTasks, setBoatTasks] = useState({});

  const [taskId, setTaskId] = useState("");
  const [boatId, setBoatId] = useState("");
  const [checkedManagers, setCheckedManagers] = useState([]);

  const handleAssignManager = async (managers) => {
    setManagerLoading(true);
    try {
      const obj = {
        managers: managers?.map((item) => item?.id),
      };
      const response = await axios.put(`/owner/boat/${boatId}/access`, obj);
      if (response.status === 200) {
        // setIsManagerDetailModalOpen(false)
        SuccessToast("Boat access assigned");
        setIsEmployee((prev) => !prev);
        setManagerLoading(true);
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      // setPassSelectedManagers([]);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setManagerLoading(false);
    }
  };

  const handleAssignTask = async (passEmployee) => {
    try {
      setEmployeeLoading(true);
      const obj = {
        employees: passEmployee?.id,
      };
      const response = await axios.put(`/owner/task/${taskId}/assign`, obj);
      if (response.status === 200) {
        SuccessToast("Task assigned");
        if (boats?.length > 0) {
          fetchTasksForBoats();
        }
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setEmployeeLoading(false);
    }
  };

  const fetchTasksForBoats = async () => {
    const taskData = {};

    await Promise.all(
      boats.map(async (boat, index) => {
        try {
          setLoadingTasks((prev) => ({ ...prev, [boat._id]: true }));
          const response = await axios.get(
            `/owner/boat/${boat._id}/task/unassign`
          );
          if (response.status === 200) {
            taskData[boat._id] = response?.data?.data || [];
          }
        } catch (err) {
          console.error(`Failed to fetch tasks for boat ${boat._id}`, err);
          taskData[boat._id] = [];
        } finally {
          setLoadingTasks((prev) => ({ ...prev, [boat._id]: false }));
        }
      })
    );
    setBoatTasks(taskData);
    const allEmpty = Object.values(taskData).every(
      (tasks) => tasks.length === 0
    );
    if (allEmpty) {
      setMessageModal(true);
    }
  };

  useEffect(() => {
    if (boats?.length > 0) {
      fetchTasksForBoats();
    }
  }, [boats]);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="bg-[#001229] border-l-4 border-yellow-500 text-white p-4 rounded-md text-sm">
        <p className="font-semibold">🚫 Warning: Unassigned Tasks</p>
        <p>
          You have changed boat access. Please assign all tasks before
          navigating away or closing the screen to prevent data loss.
        </p>
      </div>
      {boats?.map((boat, index) => (
        <div
          key={index}
          className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]"
        >
          {/* <h3 className="text-[18px] font-bold leading-[24.3px]">
            Boat {index + 1}
          </h3> */}
          <div className=" grid md:grid-cols-2 grid-cols-1 justify-between gap-28 ">
            <div className="space-y-2">
              <label>Boat Name</label>
              <button
                type="button"
                className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 rounded-xl"
              >
                {boat.name}
              </button>
            </div>
            <div className="space-y-2">
              <label>Manager</label>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(true);
                  setBoatId(boat?._id);
                }}
                className="w-full h-[52px] bg-[#1A293D] text-left text-[12px] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
              >
                {managerLoading
                  ? "Loading..."
                  : selectedManagers
                      ?.filter((manager) => manager.boatId === boat._id)
                      ?.map((manager) => manager.name)
                      .join(", ") || "Click Here To Select Manager"}
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
                Select Employee
              </span>
            </div>
            {loadingTasks[boat._id] || employeeLoading ? (
              <p>Loading tasks...</p>
            ) : boatTasks[boat._id]?.length > 0 ? (
              <>
                {boatTasks[boat._id].map((item, index) => (
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
                      {item?.assignTo[0]?.name}
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
                        onClick={() => {
                          setIsEmployeeModalOpen(true);
                          setTaskId(item?._id);
                          setBoatId(boat?._id);
                        }}
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
              <p>No tasks found</p>
            )}
          </div>
        </div>
      ))}
      {isModalOpen && (
        <BoatAccessModal
          boatId={boatId}
          setIsOpen={setIsModalOpen}
          isManagerDetailModalOpen={isManagerDetailModalOpen}
          setIsManagerDetailModalOpen={setIsManagerDetailModalOpen}
          setSelectedManagers={setSelectedManagers}
          setCheckedManagers={setCheckedManagers}
        />
      )}{" "}
      {isManagerDetailModalOpen && (
        <ManagerAccessRightModal
          setIsOpen={setIsManagerDetailModalOpen}
          handleManagerModal={(managers) => handleAssignManager(managers)}
          selectedManagers={selectedManagers}
          setSelectedManagers={setSelectedManagers}
          checkedManagers={checkedManagers}
          boatId={boatId}
        />
        // <SelectAllManager setIsOpen={setIsManagerDetailModalOpen} />
      )}
      {isEmployeeModalOpen && (
        <EmployeeUnAssignModal
          setIsOpen={setIsEmployeeModalOpen}
          isOpen={isEmployeeModalOpen}
          SetPassSelectedEmployee={handleAssignTask}
          boatId={boatId}
          isEmployee={isEmployee}
        />
      )}
      {messageModal && (
        <BoatOrManagerAssignAccessModal
          text={`You have successfully removed access to boat ${boatNames} from manager ${manager} `}
          isOpen={messageModal}
          onClose={() => {
            setMessageModal(!messageModal);
            navigate(-1);
          }}
        />
      )}
      {isPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-[#02203A] rounded-lg p-6 w-[518px] h-[247px] text-center relative">
            {/* Close button */}
            <button
              onClick={() => setIsPopup(false)}
              className="absolute top-2 right-2 text-[#199BD1] px-4 py-2 rounded-md text-xl mb-8"
            >
              ✕
            </button>

            {/* Modal content */}
            <div className="my-4">
              {/* <span className="inline-block bg-[#1A293D] p-3 rounded-full mt-2">
                <svg
                  className="w-12 h-12 text-[#199BD1] font-bold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </span> */}
              <p className="text-[20px]">Disclaimer</p>
            </div>
            <p className="text-white mb-6 text-[16px]">
              All hands on deck! Some tasks are about to go overboard. The
              manager steering the boat(s) no longer has access. Time to toss
              task(s) over to crew members under a captain who's still got the
              wheel!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagerAssignAccessRights;
