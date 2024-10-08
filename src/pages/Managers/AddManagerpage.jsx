import React, { useState, useContext, useRef, useEffect } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal"; 
import { FaCaretDown } from "react-icons/fa";
import BoatRightsModal from "../Fleet/BoatsRightsModal";
import SelectBoatsModal from "../Fleet/SelectBoatsModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import { useForm } from "react-hook-form"; // Import useForm
import axios from "../../axios"; // Ensure axios is imported

const AddManagerpage = () => {
  const { navigate } = useContext(GlobalContext);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [isSelectBoatsModalOpen, setIsSelectBoatsModalOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);

  const locationRef = useRef(null);
  const { register, handleSubmit, formState: { errors } } = useForm(); // Initialize react-hook-form

  const toggleLocationFilter = () => {
    setLocationFilter((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setLocationFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openEmployeeModal = () => {
    setIsEmployeeModalOpen(true);
  };

  const closeEmployeeModal = () => {
    setIsEmployeeModalOpen(false);
  };

  const openBoatModal = () => {
    setIsBoatModalOpen(true);
  };

  const closeBoatModal = () => {
    setIsBoatModalOpen(false);
  };

  const openSelectBoatsModal = () => {
    setIsSelectBoatsModalOpen(true);
  };

  const closeSelectBoatsModal = () => {
    setIsSelectBoatsModalOpen(false);
  };

  const handleAddManager = async (data) => {
    // Include the hardcoded password in the data object
    const managerData = {
      ...data,
      password: "Test@123"
    };
  
    console.log("Data submitted:", managerData); // Debug log
  
    try {
      const response = await axios.post("/owner/manager", managerData); // Adjust the endpoint as necessary
      console.log("Response:", response); // Debug log
      // Reset form or show success message
    } catch (error) {
      console.error("Error adding manager:", error);
      // Handle error (set error message, etc.)
    }
  };
  


  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form onSubmit={handleSubmit(handleAddManager)} className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full flex flex-col justify-start items-start gap-6">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">Add Manager</h3>
            <button
              className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5"
              onClick={() => setIsImportCSVOpen(true)}
            >
              Import CSV
            </button>
          </div>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <AddFleetInput
              label={"Name"}
              type="text"
              placeholder="Enter Name"
              register={register("name", { required: "Please enter your name" })} // Register with validation
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

              <AddFleetInput
                label={"Phone Number"}
                type="tel"
                placeholder="Enter Phone Number"
                register={register("phone", { required: "Please enter your phone number" })}
                error={errors.phone}
              />
            </div>
            <AddFleetInput
              label={"Location"}
              type="text"
              placeholder="Enter Location"
              register={register("location", { required: "Please enter a location" })}
              error={errors.location}
            />
          </div>
          <span className="w-full h-[0.5px] bg-white/10"></span>
          <div className="w-full h-auto grid grid-cols-2 gap-12">
            <div className="flex flex-col gap-4">
              <AddFleetInput
                label={"Assign Employee"}
                type="text"
                placeholder="Click here to assign"
                onClick={openEmployeeModal}
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
      {isEmployeeModalOpen && (
        <EmployeeDetailModal setIsOpen={setIsEmployeeModalOpen} />
      )}
      {isBoatModalOpen && (
        <BoatRightsModal
          isOpen={isBoatModalOpen}
          setIsOpen={setIsBoatModalOpen}
        />
      )}
      {isSelectBoatsModalOpen && (
        <SelectBoatsModal
          isOpen={isSelectBoatsModalOpen}
          setIsOpen={setIsSelectBoatsModalOpen}
        />
      )}
      {isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
    </div>
  );
};

export default AddManagerpage;
