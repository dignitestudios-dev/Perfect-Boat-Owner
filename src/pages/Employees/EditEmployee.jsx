import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { FaRegEdit, FaCaretDown } from "react-icons/fa"; // Import dropdown icon
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import ResetPassModal from "../../components/onboarding/ResetPassModal";
import AssignedModal from "../../components/tasks/modal/AssignedModal";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ResendModal from "../onboarding/ResendModal";
import DeletedModal from "../../components/global/DeletedModal";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useForm } from "react-hook-form";
import { getUnixDate } from "./../../data/DateFormat";

const Dropdown = ({ options, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="text-left w-full flex justify-start items-center gap-1"
        onClick={handleToggle}
      >
        {label}
        <FaCaretDown />
      </button>
      {isOpen && (
        <ul className="absolute z-10 bg-[#1A293D] text-white/50 text-[11px] rounded-[8px] mt-1 p-2 w-48">
          {options.map((option, index) => (
            <li
              key={index}
              className="py-1 px-2 hover:bg-[#199BD1] cursor-pointer flex items-center gap-2"
            >
              <input
                type="checkbox"
                className="form-checkbox h-3 w-3 text-[#199BD1]"
              />
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EditEmployee = () => {
  const { navigate } = useContext(GlobalContext);
  const navigateTo = useNavigate();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] = useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isDeletedModalOpen, setIsDeletedModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const employeeName = "*Employee Name*";
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [employee, setEmployee] = useState("");
  const [passSelectedManager, SetPassSelectedManager] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { manager: passSelectedManager?.name },
  });

  const handleViewAllClick = () => {
    setIsAssignedModalOpen(true); // Open AssignedModal instead of navigating
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassClick = () => {
    setIsModalOpen(true);
  };

  const handleResetModal = () => {
    setIsResendModalOpen(true); // Open ResendModal
  };

  const handleChangeClick = () => {
    setIsManagerDetailModalOpen(true); // Open ManagerDetailModal
  };

  const handleEditTaskClick = (taskId) => {
    navigateTo(`/edit-task/${taskId}`);
  };

  const handleDeleteClick = () => {
    setIsDeletedModalOpen(true);
  };

  const handleUpdateEmployee = async (data) => {

    try {
      setSubmitLoading(true);

      const updatedEmployeeData = {
        ...data,
        manager: passSelectedManager?.id,
        password: "Test@123",
        tasks: employee?.tasks?.map((item) => item?.id),
      };

      const response = await axios.put(
        `/owner/employees/${id}`,
        updatedEmployeeData
      );
      if (response.status === 200) {
        SuccessToast("Employee Updated");
        navigate("/employees", "Employee List");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.error("Error updating employee:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const getEmployeeData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/owner/employees/${id}`);
      if (response.status === 200) {
        const data = response?.data?.data;
        console.log("🚀 ~ getEmployeeData ~ data:", data);
        setEmployee(response?.data?.data?.employee);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getEmployeeData();
    }
  }, [id]);

  useEffect(() => {
    setValue("name", employee?.name);
    setValue("email", employee?.email);
    setValue("jobtitle", employee?.jobtitle);
    setValue("location", employee?.location);
    setValue("phone", employee?.phoneNumber);
    SetPassSelectedManager({
      name: employee?.manager?.name,
      id: employee?.manager?._id,
    });
  }, [employee, setValue]);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {isLoading ? (
        <div className="w-full h-[90dvh] flex justify-center items-center">
          <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
        </div>
      ) : (
        <form
          className="w-full h-full"
          onSubmit={handleSubmit(handleUpdateEmployee)}
        >
          <div className="w-full h-auto bg-[#1A293D] text-white flex flex-col justify-start items-start">
            <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
              <div className="w-full h-auto flex flex-col lg:flex-row justify-between items-center gap-3">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  {isEditing ? `Edit ${employee.name}` : employeeName}
                </h3>
                <div className="flex gap-4 ml-auto">
                  {isEditing ? (
                    <div></div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 text-[#199BD1] font-medium bg-[#002240] px-4 py-2 rounded-lg"
                    >
                      Edit Details
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleViewAllClick}
                    className="flex items-center gap-2 text-white font-medium bg-[#199BD1] hover:bg-[#002240] px-4 py-2 rounded-lg"
                  >
                    Assign New Task
                  </button>
                </div>
              </div>

              <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
                <div className="w-full flex flex-col justify-start items-start gap-6">
                  <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Name"
                        type="text"
                        placeholder="Enter Name"
                        register={register("name", {
                          required: "Please enter your name",
                        })}
                        error={errors.name}
                      />
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Email"
                        type="email"
                        placeholder="Enter Email"
                        register={register("email", {
                          required: "Please enter your email",
                        })}
                        error={errors.email}
                      />
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Job Title"
                        type="text"
                        placeholder="Enter Job Title"
                        register={register("jobtitle", {
                          required: "Please enter your job title",
                        })}
                        error={errors.jobtitle}
                      />
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Location"
                        type="text"
                        placeholder="Enter Location"
                        register={register("location", {
                          required: "Please enter your location",
                        })}
                        error={errors.location}
                      />
                    </div>
                    <div className="w-full h-auto grid grid-cols-2 gap-12">
                      <AddFleetInput
                        isDisabled={!isEditing}
                        label="Phone Number"
                        type="text"
                        placeholder="Enter Phone Number"
                        register={register("phone", {
                          required: "Please enter your phone number.",
                          pattern: {
                            value: /^\+?[0-9]{11}$/,
                            message: "Please enter a valid phone number.",
                          },
                        })}
                        error={errors.phone}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-6 justify-start items-start mt-14 py-6 border-t-[1px] border-white/10">
                <div className="w-full flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-[18px] font-bold leading-[24.3px]">
                      Resend Password
                    </h3>
                    <button
                      type="button"
                      className="text-[14px] font-medium text-[#199bd1]"
                      onClick={handleResetModal} // Update to open ResendModal
                    >
                      Resend
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetPassClick}
                    className="text-[14px] text-md font-medium text-[#199BD1] items-end bg-[#199bd1]/[0.2] h-10 rounded-full w-[130px]"
                  >
                    Reset Password
                  </button>
                </div>

                <div className="w-auto flex flex-col justify-start items-start gap-3">
                  <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                    <span className="text-white/50">Email:</span>
                    <span>{employee?.email}</span>
                  </div>
                  <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                    <span className="text-white/50">Password:</span>
                    <span>*************</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-auto flex  items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Assigned Manager{" "}
              </h3>
              <button
                type="button"
                onClick={handleChangeClick} // Update to handle opening ManagerDetailModal
                className="text-[14px] font-medium text-[#199bd1]"
              >
                Change
              </button>
            </div>

            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
                <span className="w-full flex justify-start items-center">
                  Employee Name
                </span>
                <span className="w-full flex justify-start items-center">
                  Email
                </span>
                <span className="w-full flex justify-start items-center">
                  Job Title
                </span>
                <span className="w-full flex justify-start items-center">
                  Location
                </span>
              </div>
              <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                <span className="w-full flex justify-start items-center">
                  {employee?.manager?.name}
                </span>
                <span className="w-full flex justify-start items-center">
                  {employee?.manager?.email}
                </span>
                <span className="w-full flex justify-start items-center">
                  {employee?.manager?.jobtitle}
                </span>
                <span className="w-full flex justify-start items-center ">
                  {employee?.manager?.location}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-auto flex justify-between items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                Assigned Tasks{" "}
              </h3>
              <button
                type="button"
                onClick={handleViewAllClick}
                className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
              >
                View All
              </button>
            </div>

            <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
              <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
                <span className="w-full flex justify-start items-center">
                  Boat Name
                </span>
                <div className="w-full flex justify-start items-center">
                  <Dropdown
                    label="Task Type"
                    options={["Inspection", "Maintenance", "Repair"]}
                  />
                </div>
                <span className="w-full flex justify-start items-center">
                  Due Date
                </span>
                <span className="w-full flex justify-start items-center">
                  Recurring Days
                </span>
                <div className="w-full flex justify-start items-center">
                  <Dropdown
                    label="Status"
                    options={["Pending", "In Progress", "Completed"]}
                  />
                </div>
                <span className="w-full flex justify-start items-center">
                  Action
                </span>
              </div>
              {employee?.tasks?.map((task, index) => (
                <div className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                  <span className="w-full flex justify-start items-center">
                    {task?.name}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {task?.type}
                  </span>
                  <span className="w-full flex justify-start items-center">
                    {getUnixDate(task?.dueDate)}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    {task?.recurringDays}
                  </span>
                  <span className="w-full flex justify-start items-center ">
                    <span className="w-auto h-[27px] rounded-full flex items-center justify-center bg-[#FFCC00]/[0.12] text-[#FFCC00] px-2">
                      {task?.status}
                    </span>
                  </span>
                  <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                    <span
                      className="flex justify-start items-center"
                      onClick={() => handleEditTaskClick(task?._id)}
                    >
                      <FaRegEdit />
                    </span>
                    <span className="flex justify-start items-center">
                      <RiDeleteBinLine />
                    </span>
                  </div>
                </div>
              ))}
              {/* Add more rows as needed */}
            </div>
          </div>

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            {isEditing ? (
              <>
                <button
                  disabled={submitLoading}
                  type="submit"
                  className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  <div className="flex items-center">
                    <span className="mr-1">Save</span>
                    {submitLoading && (
                      <FiLoader className="animate-spin text-lg mx-auto" />
                    )}
                  </div>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center
             justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                Back
              </button>
            )}
          </div>
        </form>
      )}
      <ResetPassModal id={id} isOpen={isModalOpen} onClose={handleCloseModal} />

      {isAssignedModalOpen && (
        <AssignedModal
          tasksList={employee?.tasks}
          handleViewAllClick={handleViewAllClick} // Pass the function if needed in the modal
          setIsOpen={setIsAssignedModalOpen}
        />
      )}

      {isManagerDetailModalOpen && (
        <ManagerDetailModal
          setIsOpen={setIsManagerDetailModalOpen} // Pass the function to close the modal
        />
      )}

      {isResendModalOpen && (
        <ResendModal
          id={id}
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)}
        />
      )}

      <DeletedModal
        isOpen={isDeletedModalOpen}
        onClose={() => setIsDeletedModalOpen(false)}
      />
    </div>
  );
};

export default EditEmployee;
