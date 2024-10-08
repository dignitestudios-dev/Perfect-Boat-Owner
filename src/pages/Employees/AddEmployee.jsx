import React, { useContext, useRef, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import AssignTaskModal from "../Tasks/AssignTaskModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import axios from "../../axios"; // Ensure axios is imported
import { useForm } from "react-hook-form"; // Import useForm

const AddEmployee = () => {
  const { navigate } = useContext(GlobalContext);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form

  const openManagerModal = () => {
    setIsManagerModalOpen(true);
  };

  const closeManagerModal = () => {
    setIsManagerModalOpen(false);
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  const openImportCSVModal = () => {
    setIsImportCSVModalOpen(true);
  };

  const closeImportCSVModal = () => {
    setIsImportCSVModalOpen(false);
  };

  const handleAddEmployee = async (data) => {
    // Hardcode the password into the data object
    const employeeData = {
      ...data,
      password: "Test@123"
    };
  
    console.log("Data submitted:", employeeData); // Debug log
  
    try {
      const response = await axios.post("/owner/employees", employeeData);
      console.log("Response:", response); // Debug log
      // Reset form or show success message
    } catch (error) {
      console.error("Error adding employee:", error);
      // Handle error (set error message, etc.)
    }
  };
  

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form onSubmit={handleSubmit(handleAddEmployee)} className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">Add Employee</h3>
            <button
              onClick={openImportCSVModal}
              className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5"
            >
              Import CSV
            </button>
          </div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <AddFleetInput 
              label={"Name"} 
              type="text" 
              placeholder="Enter Name" 
              register={register("name", { required: "Please enter your name" })} 
              error={errors.name} 
            />
            <AddFleetInput 
              label={"Email"} 
              type="email" 
              placeholder="Enter Email" 
              register={register("email", { required: "Please enter your email" })} 
              error={errors.email} 
            />
          </div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <AddFleetInput 
                label={"Job Title"} 
                type="text" 
                placeholder="Enter Job Title" 
                register={register("jobtitle", { required: "Please enter your job title" })} 
                error={errors.jobtitle} 
              />
              {/* <AddFleetInput 
                label={"Phone Number"} 
                type="tel" 
                placeholder="Enter Phone Number" 
                register={register("phone", { required: "Please enter your phone number" })} 
                error={errors.phone} 
              /> */}
            </div>
            <AddFleetInput 
              label={"Phone Number"} 
              type="tel" 
              placeholder="Phone Number" 
              register={register("phone", { required: "Please enter your phone number" })} 
              error={errors.password} />
            {/* <AddFleetInput 
              label={"Password"} 
              type="password" 
              placeholder="Enter Password" 
              register={register("password", { required: "Please enter your password" })} 
              error={errors.password} 
            /> */}
          </div>
          <span className="w-full h-[0.5px] bg-white/10"></span>
          <div className="w-full flex flex-col justify-start items-start gap-6"></div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <AddFleetInput
                label={"Assign Managers"}
                type="text"
                placeholder="Click here to assign"
                onClick={openManagerModal}
              />
              <AddFleetInput
                label={"Assign Task"}
                type="text"
                placeholder="Click here to assign"
                onClick={openTaskModal}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            type="submit" // Ensure this is a submit button
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Save"}
          </button>
        </div>
      </form>
      {isManagerModalOpen && (
        <ManagerDetailModal setIsOpen={setIsManagerModalOpen} />
      )}
      {isTaskModalOpen && (
        <AssignTaskModal
          isOpen={isTaskModalOpen}
          onClose={closeTaskModal}
        />
      )}
      {isImportCSVModalOpen && (
        <ImportCSVModal
          isOpen={isImportCSVModalOpen}
          onClose={closeImportCSVModal}
        />
      )}
    </div>
  );
};

export default AddEmployee;
