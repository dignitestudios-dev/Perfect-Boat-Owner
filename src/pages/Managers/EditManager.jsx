import React, { useContext, useState, useRef, useEffect } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { FaRegEdit, FaCaretDown } from "react-icons/fa"; // Import dropdown icon
import { RiDeleteBinLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import ResetPassModal from "../../components/onboarding/ResetPassModal"; // Adjust the import path as needed
import AssignedModal from "../../components/tasks/modal/AssignedModal";
import ManagerDetailModal from "../Managers/ManagerDetailModal"; // Adjust the import path as needed
import ResendModal from "../onboarding/ResendModal";
import BoatsRightsModal from "../Fleet/BoatsRightsModal";
import AssignEmployeeDetailModal from "../Employees/AssignEmployeeDetailModal";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import axios from "../../axios";
import ManagerDetailLoader from "../../components/managers/ManagerDetailLoader";
import { FiLoader } from "react-icons/fi";

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

const EditManager = () => {
  const { navigate } = useContext(GlobalContext);
  const navigateTo = useNavigate();

  const location = useLocation();
  const { state } = location;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAssignedModalOpen, setIsAssignedModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);
  const [isResendModalOpen, setIsResendModalOpen] = useState(false);
  const [isAssignDetailModalOpen, setIsAssignDetailModalOpen] = useState(false);
  const [isResetPassModalOpen, setIsResetPassModalOpen] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [managerName, setManagerName] = useState("*Manager Name*");
  const [managerId, setManagerId] = useState("");
  const [employeesList, setEmployeesList] = useState([]);
  const [passSelectedEmployee, SetPassSelectedEmployee] = useState("");
  const [boatList, setBoatList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleViewAllClick = () => {
    setIsAssignedModalOpen(true); // Open AssignedModal instead of navigating
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassClick = () => {
    setIsResetPassModalOpen(true);
  };

  const handleResendModal = () => {
    setIsResendModalOpen(true); // Open ResendModal
  };

  const handleChangeClick = () => {
    // setIsManagerDetailModalOpen(true); // Open ManagerDetailModal
    setManagerName("Manager Name");
    setIsEditable(true);
  };

  const handleViewBoatsClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Prefill the form with values from the `state`
    if (state) {
      setManagerName(state.name);
      setManagerId(state._id);
      setValue("name", state.name);
      setValue("email", state.email);
      setValue("jobtitle", state.jobtitle);
      setValue("location", state.location);
      setValue("phone", state.phoneNumber);
      getDataById();
    }
  }, [state, setValue]);

  const getDataById = async () => {
    setLoading(true);
    try {
      const [employeeResponse, boatResponse] = await Promise.all([
        axios.get(`/owner/manager/${state._id}/employees`),
        axios.get(`/owner/manager/${state._id}/boat`),
      ]);

      if (employeeResponse.data.success) {
        console.log("employee", employeeResponse.data?.data);
        setEmployeesList(employeeResponse.data?.data);
        let employeeData = employeeResponse.data?.data.map((item) => ({
          id: item._id,
          name: item.name,
        }));

        SetPassSelectedEmployee(employeeData);
      }

      if (boatResponse.data.success) {
        setBoatList(boatResponse.data?.data);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message || "Something went wrong");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      const managerData = {
        email: data.email,
        jobtitle: data.jobtitle,
        location: data.location,
        name: data.name,
        password: "Test@123",
        phone: data.phone,
        assignEmployees: passSelectedEmployee.map((item) => item.id),
      };
      const response = await axios.put(
        `/owner/manager/${state._id}`,
        managerData
      );
      if (response?.status === 200) {
        setIsEditable(false);
        SuccessToast("Updated Successfully");
      }
    } catch (error) {
      console.error("Error adding manager:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full h-auto bg-[#1A293D] text-white flex flex-col justify-start items-start">
          <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
            <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
              <div className="flex flex-col lg:flex-row items-start lg:gap-[720px] justify-between sm:gap-3">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  {managerName}
                </h3>
              </div>
              {isEditable ? (
                <div></div>
              ) : (
                <div className="flex lg:justify-end lg:ml-auto gap-4">
                  <button
                    type="button"
                    className="flex items-center gap-2 text-[#199BD1] font-medium bg-[#002240] px-4 py-2 rounded-lg"
                    onClick={handleChangeClick}
                  >
                    Edit Details
                  </button>
                </div>
              )}
            </div>
            <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
              <div className="w-full flex flex-col justify-start items-start gap-6">
                <div className="w-full h-auto flex flex-col justify-start items-start gap-6">
                  <div className="w-full h-auto grid grid-cols-2 gap-12 mb-4">
                    <AddFleetInput
                      label={"Name"}
                      type="text"
                      placeholder="Enter Name"
                      register={register("name", {
                        required: "Please enter your name",
                      })}
                      error={errors.name}
                      isDisabled={!isEditable}
                    />
                    <AddFleetInput
                      label={"Email"}
                      type="email"
                      placeholder="Enter Email"
                      register={register("email", {
                        required: "Please enter your email",
                      })}
                      error={errors.email}
                      isDisabled={!isEditable}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2 gap-12 mb-4">
                    <AddFleetInput
                      label={"Job Title"}
                      type="text"
                      placeholder="Enter Job Title"
                      register={register("jobtitle", {
                        required: "Please enter your job title",
                      })}
                      error={errors.jobtitle}
                      isDisabled={!isEditable}
                    />
                    <AddFleetInput
                      label={"Location"}
                      type="text"
                      placeholder="Enter Location"
                      register={register("location", {
                        required: "Please enter a location",
                      })}
                      error={errors.location}
                      isDisabled={!isEditable}
                    />
                  </div>
                  <div className="w-full h-auto grid grid-cols-2 gap-12 mb-2">
                    <AddFleetInput
                      label={"Phone Number"}
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
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(
                          /(?!^\+)[^\d]/g,
                          ""
                        );
                      }}
                      isDisabled={!isEditable}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-6 justify-start items-start mt-14 py-6 border-t-[1px] border-white/10">
              <div className="w-full flex justify-between items-center">
                <div className="w-auto flex gap-2 justify-start items-center">
                  <h3 className="text-[18px] font-bold leading-[24.3px]">
                    Resend Password
                  </h3>
                  <button
                    type="button"
                    className="text-[14px] font-medium text-[#199bd1]"
                    onClick={handleResendModal}
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
                  <span>{state?.email}</span>
                </div>
                <div className="flex justify-start items-center gap-2 text-white text-[16px] font-normal leading-[21.6px]">
                  <span className="text-white/50">Password:</span>
                  <span>*********</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-auto flex justify-between items-center gap-2">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              Assign Employees{" "}
            </h3>
            <button
              type="button"
              onClick={() => setIsAssignDetailModalOpen(true)}
              className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199BD1]"
            >
              View All
            </button>
          </div>

          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
              <span className="w-full flex justify-start items-center">
                Employee Name
              </span>

              <span className="w-full flex justify-start items-center">
                Email
              </span>
              <div className="w-full flex justify-start items-center">
                <Dropdown
                  label="Job Title"
                  options={["Doc Manager", "Doc Manager", "Doc Manager"]}
                />
              </div>

              <div className="w-full flex justify-start items-center">
                <Dropdown
                  label="Location"
                  options={[
                    "East California Dock",
                    "East California Dock",
                    "East California Dock",
                  ]}
                />
              </div>
            </div>
            {loading ? (
              <ManagerDetailLoader />
            ) : (
              <>
                {employeesList?.map((employ, index) => (
                  <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
                    <span className="w-full flex justify-start items-center">
                      {employ?.name || "--"}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employ?.email || "--"}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {employ?.jobtitle || "---"}
                    </span>
                    <span className="w-full flex justify-start items-center ">
                      {employ?.location || "---"}
                    </span>
                    <span className="w-full flex justify-start items-center "></span>
                  </div>
                ))}
              </>
            )}
            {/* Add more rows as needed */}
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-auto flex justify-between items-center gap-2">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              Access Boats{" "}
            </h3>
            <button
              type="button"
              onClick={handleViewBoatsClick}
              className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199BD1]"
            >
              View All
            </button>
          </div>

          <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
            <p className="mb-2 text-md">
              {managerName} has access to all boats by default
            </p>
            <div className="w-full h-6 grid grid-cols-4 text-[13px] font-medium border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-center">
              <span className="w-full flex justify-start items-center">
                Type
              </span>

              <span className="w-full flex justify-start items-center">
                Name
              </span>
              <span className="w-full flex justify-start items-center">
                Model/Make/Size
              </span>

              <div className="w-full flex justify-start items-center">
                <Dropdown
                  label="Location"
                  options={[
                    "East California Dock",
                    "East California Dock",
                    "East California Dock",
                  ]}
                />
              </div>
            </div>
            {loading ? (
              <ManagerDetailLoader />
            ) : (
              <>
                {boatList?.map((boat, index) => (
                  <div
                    key={index}
                    className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span className="w-full flex justify-start items-center">
                      {boat?.boatType}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {boat?.name}
                    </span>
                    <span className="w-full flex justify-start items-center">
                      {boat?.make}, {boat?.model}, {boat?.size}
                    </span>
                    <span className="w-full flex justify-start items-center ">
                      {boat?.location}
                    </span>
                    <span className="w-full flex justify-start items-center "></span>
                  </div>
                ))}
              </>
            )}

            {/* Add more rows as needed */}
          </div>
        </div>

        <div className="w-full flex justify-end mt-10 items-center gap-4">
          {isEditable ? (
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
      <ResetPassModal
        id={managerId}
        isOpen={isResetPassModalOpen}
        onClose={() => setIsResetPassModalOpen(false)}
      />

      {isAssignedModalOpen && (
        <AssignedModal
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
          id={managerId}
          isOpen={isResendModalOpen}
          onClose={() => setIsResendModalOpen(false)} // Close ResendModal
        />
      )}

      {isAssignDetailModalOpen && (
        <AssignEmployeeDetailModal setIsOpen={setIsAssignDetailModalOpen} />
      )}

      <BoatsRightsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default EditManager;
