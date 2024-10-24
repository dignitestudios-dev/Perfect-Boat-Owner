import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaRegEdit } from "react-icons/fa";

import { RiDeleteBinLine } from "react-icons/ri";
import { TbCaretDownFilled } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa"; // Make sure to import the trash icon
import AddFleetInput from "../../components/fleet/AddFleetInput";

// import ViewAllTasksModal from "../../components/tasks/ViewAllTasksModal";
import ServiceHistoryModal from "../Fleet/ServiceHistoryModal"; // Adjust the path as necessary
// import ManagerListModal from "../Managers/ManagerListModal";
import TaskSelectModal from "../../components/tasks/modal/TaskSelectModal";
import { MdOutlineDateRange } from "react-icons/md";
import DateModal from "../../components/tasks/DateModal";
import DeletedModal from "../../components/global/DeletedModal";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { getUnixDate } from "../../data/DateFormat";
import { FiDownload, FiLoader } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

import ManagerDetailModal from "../Managers/ManagerDetailModal";

const statusColors = {
  "newtask": "#FF007F",
  "overdue": "#FF3B30",
  "default": "#FFCC00", 
  "in-progress":"#36B8F3",
  "completed":"#1FBA46"
};

const BoatDetail = () => {
  const boatType = ["Yatch", "Sail Boat", "Console Cruiser", "Cabin Cruiser"];

  const { navigate } = useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [jobFilter, setjobFilter] = useState(false);
  const locationRef = React.useRef(null);
  const jobRef = React.useRef(null);
  const [isServiceHistoryModalOpen, setServiceHistoryModalOpen] = useState(false);
  const [isMangerModalOpen, setIsManagerModalOpen] = useState(false); 

  const [showBoatTypeDropdown, setShowBoatTypeDropdown] = useState(false);
  const [showSubheadingDropdown, setShowSubheadingDropdown] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  // const { boat } = location.state || {};

  const [boatsData, setBoatsData] = useState([]);

  const [displayArray, setDisplayArray] = useState([]);

  const [picturesArray, setPicturesArray] = useState([null,null,null,null,null])

  const [selectedBoat, setSelectedBoat] = useState(boatsData?.boatType || "");
  const [formsImages, setFormsImages] = useState([]);
  
  const [coverImage, setCoverImage] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false)
  const [loadingBoats, setLoadingBoats] = useState(false)

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: boatsData?.boat?.name || "",
      make: boatsData?.boat?.make || "",
      model: boatsData?.boat?.model || "",
      size: boatsData?.boat?.size || "",
      location: boatsData?.boat?.location || "",
      boatsType: boatsData?.boat?.boatType || "",
    },
  });

  const getBoats = async () => {
    setLoadingBoats(true);
    try {
      const { data } = await axios.get(`/owner/boat/${id}`);
      setBoatsData(data?.data);
      const displayArray = await data?.data?.boat.images ? [data?.data?.boat?.cover, ...data?.data?.boat?.images] : [data?.data?.boat?.cover];
      setDisplayArray(displayArray);
      setFormsImages(displayArray)
    } catch (err) {
    } finally {
      setLoadingBoats(false);
    }
  };

  // If this is edit mode, populate the form fields with the boat data
  useEffect(() => {
    getBoats()
  }, [ ]);

  useEffect(()=>{
    if (boatsData) {
      setValue("name", boatsData?.boat?.name);
      setValue("make", boatsData?.boat?.make);
      setValue("model", boatsData?.boat?.model);
      setValue("size", boatsData?.boat?.size);
      setValue("location", boatsData?.boat?.location);
      setFormsImages(boatsData?.boat?.images || [{}]);
      setSelectedBoat(boatsData?.boat?.boatType)
    }
  },[boatsData,setValue])

  const handleImageUpdate = async (event,index) =>{
    const file = event.files[0];
    setPicturesArray(prev => {
      const updatedImages = [...prev];
      updatedImages[index] = file; 
      return updatedImages; 
  });

    const base64String = await convertImageToBase64(file);
    const base64WithPrefix = `data:${file.type};base64,${base64String}`;
    
    setDisplayArray(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages[index] = base64WithPrefix; 
      return updatedImages; 
  });
  }

  const handleNewImageUpload = async (event,index) => {
    const file = event.target.files[0];
  
    if (file) {
      setPicturesArray(prev => {
        const updatedImages = [...prev];
        updatedImages[index] = file; 
        return updatedImages; 
    });
      const base64String = await convertImageToBase64(file);
      const base64WithPrefix = `data:${file.type};base64,${base64String}`;
      setDisplayArray(prevImages => [...prevImages, base64WithPrefix]);
    }
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(",")[1];   
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };


  const handleImageDelete = (index) => {
    // Remove the image at the specified index
    setDisplayArray(prevImages => prevImages.filter((_, i) => i !== index));
    setPicturesArray(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const selectCoverImage = (coverImageUrl) =>{
    setBoatsData((prevData) => ({
      ...prevData,
      boat: {
        ...prevData.boat,
        cover: coverImageUrl,
      },
    }));
    setCoverImage(coverImageUrl)
  }

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const submitBoatData = async (formData) => {
    setSubmitLoading(true)
    try{
      const nonNullPictures = picturesArray.filter(picture => picture !== null);
        const data = new FormData();
        console.log("form =? ", formData)
        data.append('name', formData.name);
        data.append("make", formData.make);
        data.append("size", formData.size);
        data.append("model", formData.model);
        data.append("location", formData.location);
        data.append("boatType", selectedBoat);
        nonNullPictures.forEach(picture => {
          data.append("pictures", picture);
        });

        if (formsImages) {
          formsImages?.forEach((file,index) => {
              if (file[0].length > 0 && file[0]) {
                if(coverImage === index) { data.append('cover',file)}
                else { data.append('updatedImages', file);}
              }
          });
        }
        const response = await axios.put(`/owner/boat/${id}`, data)

        if (response?.status === 200) {
          console.log("--> ",response?.data)
          SuccessToast("Updated Success")
          setIsEditing(false)
        }
    }
    catch (error) {
      ErrorToast(error?.response?.data?.message)
      console.log("Error uploading images:", error);
    }
    finally{
      setSubmitLoading(false)
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {loadingBoats?(
        <div className="w-full h-[90dvh] flex justify-center items-center">
          <FiLoader className="text-[30px] animate-spin text-lg mx-auto"/>
        </div>
      ):(
        <form
        className="w-full h-auto flex flex-col gap-4 p-4"
        onSubmit={handleSubmit(submitBoatData)}
      >
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full h-auto flex flex-col md:flex-row justify-between items-center">
            <div className="w-full md:w-auto flex justify-start items-center gap-2">
              <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px] text-white">
                Boat Details
              </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <button
                type="button"
                onClick={() => setServiceHistoryModalOpen(true)}
                className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 rounded-[10px] text-[#36B8F3] text-[14px] md:text-[13px] font-medium"
              >
                <span>Service History</span>
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 bg-[#1A293D] rounded-[10px] text-[#36B8F3] text-[14px] md:text-[13px] font-medium"
              >
                <span>Edit Details</span>
              </button>
              <button
                type="button"
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
                    <AddFleetInput
                      label="Name"
                      placeholder="Enter Name"
                      type="text"
                      register={register(`name`, {
                        required: "Name is required",
                      })}
                      error={errors.name}
                    />
                    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        Boat Type
                      </label>
                      <div className="group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl hover:rounded-b-none hover:rounded-t-xl relative">
                        <span className="text-gray-400">
                          {selectedBoat || "--Select--"}
                        </span>
                        <span className="text-gray-400">
                          <TbCaretDownFilled className="group-hover:rotate-180 " />
                        </span>
                        <div
                          className="group-hover:flex  flex-col justify-start items-start gap-3 transition-all
                         duration-700 px-5 py-3 hidden absolute -bottom-32 shadow-xl left-0 w-full h-32 max-h-32 bg-[#21344C] rounded-b-2xl "
                        >
                          <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-3">
                            {boatType.map((boat, index) => (
                              <button
                                type="button"
                                key={index}
                                onClick={() => setSelectedBoat(boat)}
                                className={`w-full text-left px-4 py-2 text-gray-300 hover:bg-[#1A293D] ${
                                  selectedBoat === boat
                                    ? "bg-[#1A293D] text-white"
                                    : ""
                                }`}
                              >
                                {boat}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <AddFleetInput
                      label="Make"
                      placeholder="Enter Make"
                      type="text"
                      register={register(`make`, {
                        required: "Make is required",
                      })}
                      error={errors.make}
                    />
                    <AddFleetInput
                      label="Model"
                      placeholder="Enter Model"
                      type="text"
                      register={register(`model`, {
                        required: "Model is required",
                      })}
                      error={errors.model}
                    />
                    <AddFleetInput
                      label="Size (m)"
                      placeholder="Enter Size"
                      type="number"
                      register={register(`size`, {
                        required: "Size is required",
                      })}
                      error={errors.size}
                    />
                    <AddFleetInput
                      label="Location"
                      placeholder="Enter Location"
                      type="text"
                      register={register(`location`, {
                        required: "Location is required",
                      })}
                      error={errors.location}
                    />
                  </>
                ) : (
                  <>
                    <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:w-[1100px] gap-3 lg:gap-12">
                      <AddFleetInput
                        label={"Name"}
                        state={"Boat A"}
                        disabled={true}
                        className="text-lg md:text-xl lg:text-2xl"
                        register={register(`name`, {
                          required: "Name is required",
                        })}
                      />
                      <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                        <label className="text-[16px] font-medium leading-[21.6px]">
                          Boat Type
                        </label>
                        <div
                          className="group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3
                       focus:border-[1px] focus:border-[#55C9FA] rounded-xl relative"
                        >
                          <span className="text-gray-400">
                            {selectedBoat || "--Select--"}
                          </span>
                          <span className="text-gray-400">
                            <TbCaretDownFilled className=" " />
                          </span>
                          {/* <div
                          className="group-hover:flex  flex-col justify-start items-start gap-3 transition-all
                         duration-700 px-5 py-3 hidden absolute -bottom-32 shadow-xl left-0 w-full h-32 max-h-32
                          bg-[#21344C] rounded-b-2xl "
                        >
                          <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-3">
                            {boatType.map((boat, index) => (
                              <button
                              disabled
                                type="button"
                                key={index}
                                onClick={() => setSelectedBoat(boat)}
                                className={`w-full text-left px-4 py-2 text-gray-300 hover:bg-[#1A293D] ${
                                  selectedBoat === boat
                                    ? "bg-[#1A293D] text-white"
                                    : ""
                                }`}
                              >
                                {boat}
                              </button>
                            ))}
                          </div>
                        </div> */}
                        </div>
                      </div>
                      <AddFleetInput
                        label={"Model/Make/Size"}
                        state={"2019/Toyotaa/Class A"}
                        disabled={true}
                        className="text-lg md:text-xl lg:text-2xl"
                        register={register(`make`, {
                          required: "Make is required",
                        })}
                      />
                      <AddFleetInput
                        label={"Location"}
                        state={"Orlando Florida"}
                        disabled={true}
                        className="text-lg md:text-xl lg:text-2xl"
                        register={register(`location`, {
                          required: "Location is required",
                        })}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="w-full flex flex-col gap-4">
                <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px]">
                  Upload Photos Here
                </h3>
                <p className="text-white/50 text-[12px] md:text-[13px]">
                  Enhance the boat profile by uploading high-quality pictures.
                  Showcase its features, design, and condition with images
                </p>
                {/* {isEditing && (
            <p className="text-white/50 text-[12px] md:text-[13px]">Additional details about the photos can be added here.</p>
          )} */}
              </div>
              {!isEditing && (
                <div className="w-full h-auto flex flex-wrap gap-4">
                  {displayArray?.length > 0 ? (
                    <>
                      {displayArray?.map((photo, index) => {
                        return (
                          <div
                            key={index}
                            className="w-full md:w-[175px] flex flex-col justify-center items-center gap-2"
                          >
                            <div className="relative w-full h-[147px] rounded-xl flex flex-col items-center justify-center gap-2">
                              <img
                                src={photo}
                                alt={`boatimage${index}`}
                                className="w-full h-full rounded-xl absolute top-0 left-0 object-cover"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <p>No image record found</p>
                  )}
                </div>
              )}

              {isEditing && (
                <div className="w-full h-auto flex flex-wrap gap-4">
                  {displayArray?.map((photo, index) => {
                    return (
                      <div
                        key={index}
                        className="w-full md:w-[175px] flex flex-col justify-center items-center gap-2"
                      >
                        <div className="relative w-full h-[147px] rounded-xl flex flex-col items-center justify-center gap-2">
                          <label
                            htmlFor={`form-image-${index}`}
                            className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                      text-3xl flex items-center justify-center cursor-pointer"
                          >
                            <img
                              src={
                                photo.startsWith("data:image/") ? photo : photo
                              }
                              alt={`boatimage${index}`}
                              className="w-full h-full rounded-xl absolute top-0 left-0 object-cover"
                            />
                            <input
                              key={index}
                              name={`formsImages.${index}`}
                              id={`form-image-${index}`}
                              accept="image/*"
                              type="file"
                              className="hidden"
                              onChange={(e) =>
                                handleImageUpdate(e.target, index)
                              }
                            />
                          </label>
                          <div className="absolute top-1 right-2 bg-white p-1 rounded-full">
                            <FaTrashAlt
                              className="text-black cursor-pointer text-[15px]"
                              onClick={() => {
                                handleImageDelete(index);
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <input
                            checked={photo === boatsData?.boat?.cover}
                            onChange={() => selectCoverImage(photo)}
                            type="radio"
                            name="photoRadio"
                            className="accent-[#199BD1]"
                          />
                          <p className="text-white/50 text-[11px] md:text-[12px]">
                            Select as cover photo
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <>
                  {displayArray?.length < 5 && (
                    <div className="w-full md:w-[175px] h-[147px] flex items-center justify-center">
                      <label
                        htmlFor="upload-new-image"
                        className="cursor-pointer"
                      >
                        <FiDownload className="text-white text-4xl" />
                        <input
                          type="file"
                          id="upload-new-image"
                          className="hidden"
                          accept="image/*"
                          onChange={(e)=>handleNewImageUpload(e, displayArray?.length)}
                        />
                      </label>
                    </div>
                  )}
                  </>
                </div>
              )}
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
              type="button"
              onClick={() => setIsManagerModalOpen(true)}
              className="text-[14px] font-medium bg-[#199bd1]/[0.2] h-8 rounded-full w-[70px] text-[#199bd1]"
            >
              View All
              {/* Display text or employee name here */}
              {/* Assign Employee */}
            </button>
          </div>

          <div className="w-full flex flex-col gap-1 justify-start items-start">
            <div className="w-full grid grid-cols-4 text-[13px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
              <span className="w-full flex justify-start items-center">
                Name
              </span>
              <span className="w-full flex justify-start items-center">
                Email
              </span>
              <span className="w-full flex justify-start items-center relative">
                <button
                  type="button"
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
                  {["Job Title 1", "Job Title 2", "Job Title 3"].map(
                    (jobTitle, index) => (
                      <div
                        key={index}
                        className="w-full flex justify-start items-start gap-2"
                      >
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                          {jobTitle}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </span>

              <span className="w-full flex justify-start items-center relative">
                <button
                  type="button"
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
                  {["East California Dock", "West Dock", "South Dock"].map(
                    (location, index) => (
                      <div
                        key={index}
                        className="w-full flex justify-start items-start gap-2"
                      >
                        <input
                          type="checkbox"
                          className="w-3 h-3 accent-[#199BD1]"
                        />
                        <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                          {location}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </span>
            </div>
            {boatsData?.boatAccess?.length > 0 ? (
              <>
                {boatsData?.boatAccess?.map((manager, index) => {
                  if (index < 4) {
                    return (
                      <div
                        key={index}
                        className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
                      >
                        <span className="w-full flex justify-start items-center">
                          {manager?.name}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {manager?.email}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {manager?.jobtitle || "---"}
                        </span>
                        <span className="w-full flex justify-start items-center">
                          {manager?.location || "---"}
                        </span>
                      </div>
                    );
                  }
                })}
              </>
            ) : (
              <p>No record found</p>
            )}
          </div>
        </div>

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
            {boatsData?.task?.length > 0 ? (
              <>
                {boatsData?.task?.map((item, index) => (
                  <button
                    type="button"
                    className="w-full h-10 grid grid-cols-6 border-b border-[#fff]/[0.14] py-1 text-[13px] 
              font-medium leading-[14.85px] text-white justify-start items-center"
                  >
                    <span
                      className="w-full flex justify-start items-center"
                      // onClick={() => navigate("/tasks/1", "All Tasks")}
                    >
                      {item?.task}
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
                      {item?.status}
                    </span>
                    <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
                      <span className=" flex justify-start items-center ">
                        <FaRegEdit />
                      </span>
                      <span className=" flex justify-start items-center ">
                        <RiDeleteBinLine onClick={openDeleteModal} />
                      </span>
                    </div>
                  </button>
                ))}
              </>
            ) : (
              <p>No record found</p>
            )}
          </div>
          {/* <ViewAllTasksModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} /> */}
          {isModalOpen && (
            <TaskSelectModal
              setIsOpen={setIsModalOpen}
              tasksList={boatsData?.task}
            />
          )}
          <ServiceHistoryModal
            isOpen={isServiceHistoryModalOpen}
            onClose={() => setServiceHistoryModalOpen(false)}
          />

          {isMangerModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
              <ManagerDetailModal
                boatAccess={boatsData?.boatAccess}
                isOpen={isMangerModalOpen}
                setIsOpen={setIsManagerModalOpen}
              />
            </div>
          )}
        </div>
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1, "Employees")}
            className="w-full lg:w-[208px] h-[52px] bg-[#001229] text-[#199BD1] rounded-[12px] 
          flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            {"Back"}
          </button>
          {isEditing && (
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
          )}
        </div>
      </form>
      )}
      
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
