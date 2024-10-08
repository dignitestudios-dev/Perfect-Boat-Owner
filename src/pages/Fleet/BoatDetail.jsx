  import React, { useContext, useState } from "react";
  import { GlobalContext } from "../../contexts/GlobalContext";
  import { FaRegEdit } from "react-icons/fa";
  import { FaRegTrashCan } from "react-icons/fa6";
  import { RiDeleteBinLine } from "react-icons/ri";
  import { TbCaretDownFilled } from "react-icons/tb";
  import { FaTrashAlt } from 'react-icons/fa'; // Make sure to import the trash icon
  import AddFleetInput from "../../components/fleet/AddFleetInput";
  import AddFleetImage from "../../components/fleet/AddFleetImage";
  import { AuthMockup } from "../../assets/export";
  // import ViewAllTasksModal from "../../components/tasks/ViewAllTasksModal";
  import ServiceHistoryModal from "../Fleet/ServiceHistoryModal"; // Adjust the path as necessary
  import ManagerListModal from "../Managers/ManagerListModal";
  import TaskSelectModal from "../Tasks/TaskSelectModal";
  import { MdOutlineDateRange } from "react-icons/md";
  import DateModal from "../../components/tasks/DateModal";
  import DeletedModal from "../../components/global/DeletedModal";


  const BoatDetail = () => {
    const { navigate } = useContext(GlobalContext);
    const [isEditing, setIsEditing] = useState(false); // New state for edit mode
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [locationFilter, setLocationFilter] = useState(false);
    const [jobFilter, setjobFilter] = useState(false);
    const locationRef = React.useRef(null);
    const jobRef = React.useRef(null);
    const [isServiceHistoryModalOpen, setServiceHistoryModalOpen] = useState(false);
    const [isMangerModalOpen, setIsManagerModalOpen] = useState(false); // State for Employee Modal
  const [boatType, setBoatType] = useState("Boat XYZ");
  const [showBoatTypeDropdown, setShowBoatTypeDropdown] = useState(false);
  const [showSubheadingDropdown, setShowSubheadingDropdown] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // Add state for DateModal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  
  


  const boatTypes = ["Boat XYZ", "Boat ABC", "Boat 123"];

    // const selectOption = (type, option) => {
    //   if (type === "boatType") {
    //     setBoatType(option);
    //     setShowBoatTypeDropdown(false);
    //   } else if (type === "subheading") {
    //     setSubheading(option);
    //     setShowSubheadingDropdown(false);
    //   }
    // };

    const toggleDropdown = (type) => {
      if (type === "boatType") {
        setShowBoatTypeDropdown(!showBoatTypeDropdown);
      } else if (type === "subheading") {
        setShowSubheadingDropdown(!showSubheadingDropdown);
      }
    };


    const toggleLocationFilter = () => {
      setLocationFilter((prev) => !prev);
    };

    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setLocationFilter(false);
      }
    };

    const togglejobFilter = () => {
      setjobFilter((prev) => !prev);
    };

    const handleClickOutsides = (event) => {
      if (jobRef.current && !jobRef.current.contains(event.target)) {
        setjobFilter(false);
      }
    };
    const handleDateModalOpen = () => {
      setIsDateModalOpen(true); // Open DateModal
    };

    const openDeleteModal = () => {
      setIsDeleteModalOpen(true);
    };
  
    const closeDeleteModal = () => {
      setIsDeleteModalOpen(false);
    };
  
    const handleDeleteConfirm = () => {
      // Perform delete action here
      
      closeDeleteModal();
    };



    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    return (
      <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
  <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
    <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center h-12">
      <div className="w-full md:w-auto flex justify-start items-center gap-2">
        <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px] text-white">
          Boat Details
        </h3>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={() => setServiceHistoryModalOpen(true)}
          className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 rounded-[10px] text-[#36B8F3] text-[14px] md:text-[13px] font-medium"
        >
          <span>Service History</span>
        </button>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 bg-[#1A293D] rounded-[10px] text-[#36B8F3] text-[14px] md:text-[13px] font-medium"
        >
          <span>Edit Details</span>
        </button>
        <button
          onClick={() => navigate("/add-task", "All Tasks")}
          className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 bg-[#36B8F3] rounded-[10px] text-[#fff] text-[14px] md:text-[13px] font-medium"
        >
          <span className="text-lg">+</span>
          <span>Add New Task</span>
        </button>
      </div>
    </div>
    <div className="w-full h-auto flex flex-col gap-4 md:gap-8 lg:gap-12">
      <div className="w-full flex flex-col gap-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-12">
          {isEditing ? (
            <>
              <AddFleetInput label={"Name"} state={"Boat A"} disabled={false} className="text-lg md:text-xl lg:text-2xl" />
              <div className="relative">
                    <label className="text-[16px] font-medium leading-[21.6px]">Boat Type</label>
                    <button
                      onClick={() => toggleDropdown("boatType")}
                      className="w-full bg-[#1A293D] h-[50px] px-2 flex justify-between items-center text-white rounded-[10px] border border-[#1A293D]"
                    >
                      <span>{boatType}</span>
                      <TbCaretDownFilled />
                    </button>
                    {showBoatTypeDropdown && (
                      <ul className="absolute w-full bg-[#1A293D] rounded-[10px] mt-1">
                        {boatTypes.map((type) => (
                          <li
                            key={type}
                            onClick={() => selectOption("boatType", type)}
                            className="px-2 py-1 cursor-pointer hover:bg-[#1A293D]/50"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
              {/* <AddFleetInput label={"Subheading"} state={"2019/Toyotaa/Class A"} disabled={false} className="text-lg md:text-xl lg:text-2xl" /> */}
              <AddFleetInput label={"Location"} state={"Orlando Florida"} disabled={false} className="text-lg md:text-xl lg:text-2xl" />
              <AddFleetInput label={"New Field 1"} state={"Value 1"} disabled={false} className="text-lg md:text-xl lg:text-2xl" />
              <AddFleetInput label={"New Field 2"} state={"Value 2"} disabled={false} className="text-lg md:text-xl lg:text-2xl" />
              <AddFleetInput label={"New Field 3"} state={"Value 3"} disabled={false} className="text-lg md:text-xl lg:text-2xl" />
            </>
          ) : (
            <>
              <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:w-[1100px] gap-3 lg:gap-12">
                <AddFleetInput label={"Name"} state={"Boat A"} disabled={true} className="text-lg md:text-xl lg:text-2xl" />
                <AddFleetInput label={"Boat Type"} state={"Boat XYZ"} disabled={true} className="text-lg md:text-xl lg:text-2xl" />
                <AddFleetInput label={"Model/Make/Size"} state={"2019/Toyotaa/Class A"} disabled={true} className="text-lg md:text-xl lg:text-2xl" />
                <AddFleetInput label={"Location"} state={"Orlando Florida"} disabled={true} className="text-lg md:text-xl lg:text-2xl" />
              </div>
            </>
          )}
        </div>

        <div className="w-full flex flex-col gap-4">
          <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px]">Upload Photos Here</h3>
          <p className="text-white/50 text-[12px] md:text-[13px]">Enhance the boat profile by uploading high-quality pictures. Showcase its features, design, and condition with images</p>
          {/* {isEditing && (
            <p className="text-white/50 text-[12px] md:text-[13px]">Additional details about the photos can be added here.</p>
          )} */}
        </div>
        <div className="w-full h-auto flex flex-wrap gap-4">
          {["Photo 1", "Photo 2", "Photo 3", "Photo 4"].map((photo, index) => (
            <div key={index} className="w-full md:w-[175px] flex flex-col justify-center items-center gap-2">
              <div className="relative w-full h-[147px] rounded-xl flex flex-col items-center justify-center gap-2">
                <img src={AuthMockup} alt={`boatimage${index}`} className="w-full h-full rounded-xl absolute top-0 left-0 object-cover" />
                {isEditing && (
                  <div className="absolute top-1 right-2 bg-white p-1 rounded-full">
                    <FaTrashAlt className="text-black cursor-pointer text-[15px]" />
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center gap-2 mt-2">
                  <input type="radio" name="photoRadio" className="accent-[#199BD1]" />
                  <p className="text-white/50 text-[11px] md:text-[12px]">Select as cover photo</p>
                </div>
              )}
            </div>
    ))}
  </div>
          </div>
        </div>
      </div>

  {/* Boat Access Table */}
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              Boat Access
              <span className="text-[12px] font-normal text-white/50"></span>
              
            </h3>
          </div>

          <div className="w-full h-auto flex justify-between items-center">
            <div className="flex w-1/2 lg:w-[295px] h-[32px] justify-start items-start rounded-[8px] relative">
              <p>Manager Name have access to all boats by default</p>
            </div>

            <button
                    onClick={() => setIsManagerModalOpen(true)} // Open the Employee Modal
                    className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
                    >
                                  View All

                    {/* Display text or employee name here */}
                    {/* Assign Employee */}
                  </button>
          </div>

          <div className="w-full flex flex-col gap-1 justify-start items-start">
            <div className="w-full grid grid-cols-4 text-[13px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">Name</span>
              <span className="w-full flex justify-start items-center">Email</span>
              <span className="w-full flex justify-start items-center relative">
  <button
    onClick={togglejobFilter}
    className="flex items-center gap-1"
  >
    Job Title
    <TbCaretDownFilled />
  </button>
  <div
    ref={jobRef}
    className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
      jobFilter ? "scale-100" : "scale-0"
    } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
  >
    {["Job Title 1", "Job Title 2", "Job Title 3"].map((jobTitle, index) => (
      <div key={index} className="w-full flex justify-start items-start gap-2">
        <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
          {jobTitle}
        </span>
      </div>
    ))}
  </div>
</span>
            
              
              
              <span className="w-full flex justify-start items-center relative">
                <button
                  onClick={toggleLocationFilter}
                  className="flex items-center gap-1"
                >
                  Location
                  <TbCaretDownFilled />
                </button>
                <div
                  ref={locationRef}
                  className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                    locationFilter ? "scale-100" : "scale-0"
                  } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
                >
                  {["East California Dock", "West Dock", "South Dock"].map((location, index) => (
                    <div key={index} className="w-full flex justify-start items-start gap-2">
                      <input type="checkbox" className="w-3 h-3 accent-[#199BD1]" />
                      <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                        {location}
                      </span>
                    </div>
                  ))}
                </div>
              </span>
            </div>
            {/* Existing data rows */}
            <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">Mike Smith</span>
              <span className="w-full flex justify-start items-center">mikesmith@gmail.com</span>
              <span className="w-full flex justify-start items-center">Dock Guard</span>
              <span className="w-full flex justify-start items-center">East California Dock</span>
            </div>
            <div className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center">
              <span className="w-full flex justify-start items-center">John Doe</span>
              <span className="w-full flex justify-start items-center">johndoe@gmail.com</span>
              <span className="w-full flex justify-start items-center">Manager</span>
              <span className="w-full flex justify-start items-center">West Dock</span>
            </div>
          </div>
        </div>

        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-auto flex justify-between items-center gap-2">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              Assigned Tasks{" "}
            </h3>
            <button
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
              onClick={handleDateModalOpen} // Handle click to open DateModal
            >
             <MdOutlineDateRange className="mr-1 text-lg" />
             Due Date
            </div>
              <span className="w-full flex justify-start items-center">
                Recurring Days
              </span>
              <span className="w-full flex justify-start items-center">
                Status
              </span>
              <span className="w-full flex justify-start items-center">
                Action
              </span>
            </div>
            <button
              className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
            >
              <span className="w-full flex justify-start items-center" onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Boat A
              </span>
              <span className="w-full flex justify-start items-center" onClick={() => navigate("/tasks/1", "All Tasks")}>
                Full Inspection
              </span>
              <span className="w-full flex justify-start items-center" onClick={() => navigate("/tasks/1", "All Tasks")}>
                12-02-2024
              </span>
              <span className="w-full flex justify-start items-center " onClick={() => navigate("/tasks/1", "All Tasks")}>
                90 days
              </span>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] " onClick={() => navigate("/tasks/1", "All Tasks")}>
                In-Progress
              </span>
              <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                <span className=" flex justify-start items-center ">
                  <FaRegEdit />
                </span>
                <span className=" flex justify-start items-center ">
                  <RiDeleteBinLine onClick={openDeleteModal}
                  />
                </span>
              </div>
            </button>
            <button
              className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
            >
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Boat A
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Full Inspection
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                12-02-2024
              </span>
              <span className="w-full flex justify-start items-center "               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                90 days
              </span>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
                In-Progress
              </span>
              <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                <span className=" flex justify-start items-center ">
                  <FaRegEdit />
                </span>
                <span className=" flex justify-start items-center ">
                <RiDeleteBinLine onClick={openDeleteModal}
                  />                </span>
              </div>
            </button>
            <button
              className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
            >
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Boat A
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Full Inspection
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                12-02-2024
              </span>
              <span className="w-full flex justify-start items-center "               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                90 days
              </span>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
                In-Progress
              </span>
              <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                <span className=" flex justify-start items-center ">
                  <FaRegEdit />
                </span>
                <span className=" flex justify-start items-center ">
                <RiDeleteBinLine onClick={openDeleteModal}
                  />                </span>
              </div>
            </button>
            <button
              className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
            >
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Boat A
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Full Inspection
              </span>
              <span className="w-full flex justify-start items-center"               onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                12-02-2024
              </span>
              <span className="w-full flex justify-start items-center "              onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                90 days
              </span>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
                In-Progress
              </span>
              <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                <span className=" flex justify-start items-center ">
                  <FaRegEdit />
                </span>
                <span className=" flex justify-start items-center ">
                <RiDeleteBinLine onClick={openDeleteModal}
                  />                </span>
              </div>
            </button>
            <button
              className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
            >
              <span className="w-full flex justify-start items-center"        onClick={() => navigate("/tasks/1", "All Tasks")}
              >
                Boat A
              </span>
              <span className="w-full flex justify-start items-center">
                Full Inspection
              </span>
              <span className="w-full flex justify-start items-center">
                12-02-2024
              </span>
              <span className="w-full flex justify-start items-center ">
                90 days
              </span>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
                In-Progress
              </span>
              <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                <span className=" flex justify-start items-center ">
                  <FaRegEdit />
                </span>
                <span className=" flex justify-start items-center ">
                <RiDeleteBinLine onClick={openDeleteModal}
                  />                
                </span>
              </div>
            </button>
          </div>
          {/* <ViewAllTasksModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} /> */}
          {isModalOpen && (
        <TaskSelectModal
          setIsOpen={setIsModalOpen}
        />
      )}
          <ServiceHistoryModal
    isOpen={isServiceHistoryModalOpen}
    onClose={() => setServiceHistoryModalOpen(false)}
  />

  {isMangerModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
              <ManagerListModal
                isOpen={isMangerModalOpen}
                setIsOpen={setIsManagerModalOpen}
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            onClick={() => navigate(-1, "Employees")}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Back"}
          </button>
        </div>
        <DateModal isOpen={isDateModalOpen} setIsOpen={setIsDateModalOpen} />
        <DeletedModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
      </div>
    );
  };

  export default BoatDetail;
