import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { TbCaretDownFilled } from "react-icons/tb";
import { FaTrashAlt } from "react-icons/fa"; // Make sure to import the trash icon
import AddFleetInput from "../../components/fleet/AddFleetInput";

import ServiceHistoryModal from "../Fleet/ServiceHistoryModal"; // Adjust the path as necessary

import DateModal from "../../components/tasks/DateModal";
import DeletedModal from "../../components/global/DeletedModal";
import { useLocation, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { FiDownload, FiLoader } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ManagerListModal from "../Managers/ManagerListModal";
import BoatAccessTable from "../../components/fleet/BoatAccessTable";
import AssignedTasksTable from "../../components/fleet/AssignedTasksTable";
import AssignedModal from "../../components/tasks/modal/AssignedModal";
import BoatAccessModal from "./BoatAccessModal";
import { CiTrash } from "react-icons/ci";
import moment from "moment";

const BoatDetail = () => {
  const today = moment("01-01-2024");
  const [dueDate, setDueDate] = useState({});
  const [inputError, setInputError] = useState({});

  const { navigate, boatDropDown, setUpdateBoat, setUpdateDropDown } =
    useContext(GlobalContext);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [jobFilter, setjobFilter] = useState(false);
  const locationRef = React.useRef(null);
  const jobRef = React.useRef(null);
  const [isServiceHistoryModalOpen, setServiceHistoryModalOpen] =
    useState(false);
  const [isMangerModalOpen, setIsManagerModalOpen] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  // const { boat } = location.state || {};

  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [isManagerDetailModalOpen, setIsManagerDetailModalOpen] =
    useState(false);
  const [passManagersList, SetPassManagersList] = useState([]);

  const [boatsData, setBoatsData] = useState([]);

  const [displayArray, setDisplayArray] = useState([]);

  const [picturesArray, setPicturesArray] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [selectedCoverImage, setSelectedCoverImage] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);

  const [selectedBoat, setSelectedBoat] = useState(boatsData?.boatType || "");
  const [formsImages, setFormsImages] = useState([]);

  const [coverImage, setCoverImage] = useState(null);
  const [coverImageIndex, setCoverImageIndex] = useState(null);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [loadingBoats, setLoadingBoats] = useState(false);
  const [newLocation, setNewLocation] = useState(false);

  const currentYear = new Date().getFullYear();
  const minYear = 1970;
  const maxYear = currentYear + 1;

  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState(false);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
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
      setCoverImage(data?.data?.boat?.cover);
      const displayArray = (await data?.data?.boat?.images)
        ? // eslint-disable-next-line no-unsafe-optional-chaining
          [data?.data?.boat?.cover, ...data?.data?.boat?.images]
        : [data?.data?.boat?.cover];
      setDisplayArray(displayArray);
      setFormsImages(displayArray);
    } catch (err) {
      console.log("🚀 ~ getBoats ~ err:", err);
    } finally {
      setLoadingBoats(false);
    }
  };

  // If this is edit mode, populate the form fields with the boat data
  useEffect(() => {
    getBoats();
  }, []);

  useEffect(() => {
    if (boatsData) {
      setValue("name", boatsData?.boat?.name);
      setValue("make", boatsData?.boat?.make);
      setValue("model", boatsData?.boat?.model);
      setModel(boatsData?.boat?.model);
      setValue("size", boatsData?.boat?.size);
      setValue("location", boatsData?.boat?.location);
      setNewLocation(boatsData?.boat?.location);
      // setFormsImages(boatsData?.boat?.images || [{}]);
      setSelectedBoat(boatsData?.boat?.boatType);
    }
  }, [boatsData, setValue]);

  // useEffect(() => {
  //   if (passManagersList?.length > 0) {
  //     const handleAssignManager = async () => {
  //       try {
  //         const obj = {
  //           managers: passManagersList?.map((item) => item?.id),
  //         };
  //         const response = await axios.put(`/owner/boat/${id}/access`, obj);
  //         if (response.status === 200) {
  //           // setIsManagerDetailModalOpen(false)
  //           SetPassManagersList(null);
  //           SuccessToast("Boat access assigned");
  //           getBoats();
  //         }
  //       } catch (err) {
  //         console.log("🚀 ~ handleAssignEmployees ~ err:", err);
  //         SetPassManagersList(null);
  //         ErrorToast(err?.response?.data?.message);
  //       } finally {
  //       }
  //     };
  //     handleAssignManager();
  //   }
  // }, []);

  const handleModelChange = (event) => {
    const inputYear = event.target.value;

    // Ensure input is a number
    if (/^\d{0,4}$/.test(inputYear)) {
      setModel(inputYear);

      // Check if year is within the allowed range
      if (inputYear && (inputYear < minYear || inputYear > maxYear)) {
        setModelError(`Please enter a year between ${minYear} and ${maxYear}.`);
      } else {
        setModelError(false);
      }
    }
  };

  const handleImageUpdate = async (event, index) => {
    const file = event.files[0];
    setPicturesArray((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = file;
      return updatedImages;
    });

    setPicturesArray((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = file;
      return updatedImages;
    });

    const base64String = await convertImageToBase64(file);
    const base64WithPrefix = `data:${file.type};base64,${base64String}`;

    setDisplayArray((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages[index] = base64WithPrefix;
      return updatedImages;
    });
  };

  const handleNewImageUpload = async (event, index) => {
    const file = event.target.files[0];

    if (file) {
      setPicturesArray((prev) => {
        const updatedImages = [...prev];
        updatedImages[index] = file;
        return updatedImages;
      });
      const base64String = await convertImageToBase64(file);
      const base64WithPrefix = `data:${file.type};base64,${base64String}`;
      setDisplayArray((prevImages) => [...prevImages, base64WithPrefix]);
    }
    setSelectedCoverImage((prev) => {
      const updatedImages = [...prev];
      updatedImages[index] = file;
      return updatedImages;
    });
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
    if (index > 0) {
      setDisplayArray((prevImages) => prevImages.filter((_, i) => i !== index));
      setPicturesArray((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
      setFormsImages((prevImages) => prevImages.filter((_, i) => i !== index));
      setSelectedCoverImage((prevImages) =>
        prevImages.filter((_, i) => i !== index)
      );
    }
  };

  const selectCoverImage = (coverImageUrl, index) => {
    const isBase64 = coverImageUrl.startsWith("data:image");
    setBoatsData((prevData) => ({
      ...prevData,
      boat: {
        ...prevData.boat,
        cover: coverImageUrl,
      },
    }));
    setCoverImage(coverImageUrl);
    if (isBase64) {
      setCoverImageIndex(index);
    } else {
      setCoverImageIndex(null);
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
    setSubmitLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("make", formData.make);
      data.append("size", formData.size);
      // data.append("model", formData.model);
      data.append("model", model);
      data.append("location", formData.location);
      data.append("boatType", selectedBoat);
      picturesArray.forEach((picture, index) => {
        if (picture && index !== coverImageIndex) {
          data.append("pictures", picture);
        }
      });

      if (
        coverImageIndex !== null &&
        coverImageIndex < selectedCoverImage.length
      ) {
        data.append("cover", selectedCoverImage[coverImageIndex]);
      }

      if (formsImages) {
        formsImages?.forEach((item, index) => {
          if (!coverImageIndex) {
            if (coverImage === item) {
              data.append("updatedCovers", item);
            } else {
              data.append("updatedImages[]", item);
            }
          } else {
            data.append("updatedImages[]", item);
          }
        });
      }
      const response = await axios.put(`/owner/boat/${id}`, data);

      if (response?.status === 200) {
        SuccessToast("Updated Success");
        setUpdateBoat((prev) => !prev);
        setUpdateDropDown((prev) => !prev);
        setIsEditing(false);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.log("Error uploading images:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleAssignManager = async (managers) => {
    try {
      setLoadingBoats(true);
      const obj = {
        managers: managers?.map((item) => item?.id),
      };
      const response = await axios.put(`/owner/boat/${id}/access`, obj);
      if (response.status === 200) {
        // setIsManagerDetailModalOpen(false)
        // setPassSelectedManagers(null)
        // setIsManagerSuccess(true)
        SuccessToast("Boat access assigned");
        getBoats();
      }
    } catch (err) {
      console.log("🚀 ~ handleAssignEmployees ~ err:", err);
      // SetPassSelectedManagers(null)
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoadingBoats(false);
    }
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {loadingBoats ? (
        <div className="w-full h-[90dvh] flex justify-center items-center">
          <FiLoader className="text-[30px] animate-spin text-lg mx-auto" />
        </div>
      ) : (
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
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full md:w-[150px] lg:w-[118px] h-[40px] md:h-[35px] flex justify-center items-center gap-2 bg-[#1A293D] rounded-[10px] text-[#36B8F3] text-[14px] md:text-[13px] font-medium"
                  >
                    <span>Edit Details</span>
                  </button>
                )}

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
                        label="Boat Name / Hull Number"
                        placeholder="Boat Name / Hull Number"
                        type="text"
                        register={register(`name`, {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Boat Name is required",
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
                         duration-700 px-5 py-3 hidden absolute top-12 shadow-xl left-0 w-full h-48 max-h-48 bg-[#21344C] rounded-b-2xl "
                          >
                            <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-1">
                              {boatDropDown?.map((boat, index) => (
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
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Make is required",
                        })}
                        error={errors.make}
                      />
                      {/* <AddFleetInput
                        label="Model"
                        placeholder="Enter Model"
                        type="text"
                        register={register(`model`, {
                          required: "Model is required",
                        })}
                        error={errors.model}
                      /> */}
                      <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                        <label className="text-[16px] font-medium leading-[21.6px]">
                          Year
                        </label>
                        <div
                          className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center ${
                            modelError && "border-red-500"
                          }`}
                        >
                          <input
                            type="text"
                            id="year"
                            value={model}
                            onChange={handleModelChange}
                            placeholder="YYYY"
                            className="w-full h-full bg-transparent autofill:bg-transparent autofill:text-white outline-none text-white placeholder:text-gray-400"
                          />
                        </div>
                        {modelError && (
                          <p className="text-red-500 text-sm">{modelError}</p>
                        )}
                      </div>
                      <AddFleetInput
                        label="Size (ft)"
                        placeholder="Enter Size"
                        type="text"
                        register={register(`size`, {
                          required: "Size is required",
                          pattern: {
                            value: /^[1-9][0-9]{0,3}(\.[0-9]+)?$/,
                            message: "Size must be positive",
                          },
                        })}
                        maxLength={4}
                        onInput={(e) => {
                          e.target.value = e.target.value
                            .replace(/[^0-9.]/g, "")
                            .replace(/(\..*?)\..*/g, "$1");
                        }}
                        error={errors.size}
                      />
                      <AddFleetInput
                        label="Location / Customer Name"
                        placeholder="Enter Location/Customer Name"
                        type="text"
                        register={register(`location`, {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Location is required",
                        })}
                        error={errors.location}
                      />
                    </>
                  ) : (
                    <>
                      <div className="w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 lg:w-[1100px] gap-3 lg:gap-12">
                        <AddFleetInput
                          isDisabled={!isEditing}
                          label="Boat Name / Hull Number"
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
                          isDisabled={!isEditing}
                          label={"Year/Make/Size"}
                          state={"2019/Toyotaa/Class A"}
                          disabled={true}
                          className="text-lg md:text-xl lg:text-2xl"
                          register={register(`make`, {
                            required: "Make is required",
                          })}
                        />
                        {/* <AddFleetInput
                          isDisabled={!isEditing}
                          label={"Location / Customer Name"}
                          state={"Orlando Florida"}
                          disabled={true}
                          className="text-lg md:text-xl lg:text-2xl"
                          register={register(`location`, {
                            required: "Location is required",
                          })}
                        /> */}
                        <div className="w-full h-auto flex flex-col gap-1 justify-center items-start">
                          <label className="text-[16px] font-medium">
                            {"Location / Customer Name"}
                          </label>
                          <div
                            className="w-full max-h-[200px] flex items-center py-3.5 px-2.5 resize-none bg-[#1A293D] outline-none 
               focus:border-[1px] focus:border-[#55C9FA] rounded-xl text-left  "
                          >
                            {newLocation}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {isEditing ? (
                  <div className=" flex flex-col gap-4 mt-2 w-[600px] ">
                    <hr className="mt-6 h-[1px] border-t-0 bg-white/20" />
                    <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px]">
                      Upload Photos Here
                    </h3>
                    <p className="text-white/90 text-[12px] md:text-[14px]">
                      Enhance the boat profile by uploading high-quality
                      pictures. Showcase its features, design, and condition
                      with images
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-4">
                    <h3 className="text-[16px] md:text-[18px] font-bold leading-[24.3px]">
                      Photos
                    </h3>
                  </div>
                )}

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
                                  photo.startsWith("data:image/")
                                    ? photo
                                    : photo
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

                            <div className="absolute top-2 right-2 bg-[#ffffff9f] p-1 rounded-full">
                              <CiTrash
                                className="text-black cursor-pointer text-[16px] "
                                onClick={() => {
                                  handleImageDelete(index);
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <input
                              checked={photo === boatsData?.boat?.cover}
                              onChange={() => selectCoverImage(photo, index)}
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
                        <div className="w-full md:w-[175px] h-[147px] flex items-center justify-center rounded-xl bg-[#1A293D]">
                          <label
                            htmlFor="upload-new-image"
                            className="cursor-pointer "
                          >
                            <FiDownload className="text-white text-4xl" />
                            <input
                              type="file"
                              id="upload-new-image"
                              className="hidden"
                              accept="image/*"
                              onChange={(e) =>
                                handleNewImageUpload(e, displayArray?.length)
                              }
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
          <BoatAccessTable
            setIsBoatModalOpen={setIsBoatModalOpen}
            isEditing={isEditing}
            boatsData={boatsData}
            setIsManagerModalOpen={setIsManagerModalOpen}
          />

          <AssignedTasksTable
            setIsModalOpen={setIsModalOpen}
            handleDateModalOpen={handleDateModalOpen}
            boatsData={boatsData}
            openDeleteModal={openDeleteModal}
            getBoats={getBoats}
            dueDate={dueDate}
          />

          {/* <ViewAllTasksModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} /> */}
          {/* {isModalOpen && (
            <TaskSelectModal
              setIsOpen={setIsModalOpen}
              tasksList={boatsData?.task}
            />
          )} */}

          {isModalOpen && (
            <AssignedModal
              tasksList={boatsData?.task}
              setIsOpen={setIsModalOpen}
              getEmployeeData={() => getBoats()}
              loading={loadingBoats}
            />
            // <ViewAssignedTaskModal setIsOpen={setIsModalOpen}
            // employeeTasks={boatsData?.task} getEmployeeData={()=>getBoats()} loading={loadingBoats} />
          )}
          <ServiceHistoryModal
            id={id}
            isOpen={isServiceHistoryModalOpen}
            onClose={() => setServiceHistoryModalOpen(false)}
          />

          {isMangerModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
              <ManagerListModal
                boatAccess={boatsData?.boatAccess}
                setIsOpen={setIsManagerModalOpen}
              />
            </div>
          )}

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            {isEditing ? (
              <div className="w-full flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="w-full lg:w-[208px] h-[52px] bg-[#001229] text-[#199BD1] rounded-[12px] 
          flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  {"Back"}
                </button>
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
              </div>
            ) : (
              <button
                type="button"
                onClick={() => navigate(-1, "Employees")}
                className="w-full lg:w-[208px] h-[52px] bg-[#001229] text-[#199BD1] rounded-[12px] 
          flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                {"Back"}
              </button>
            )}
          </div>
        </form>
      )}

      <DateModal
        isOpen={isDateModalOpen}
        setIsOpen={setIsDateModalOpen}
        setDueDate={setDueDate}
        setInputError={setInputError}
        minDate={today.toDate()}
      />
      <DeletedModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
        minDate={today.toDate()}
      />

      {isBoatModalOpen && (
        <ManagerDetailModal
          boatId={id}
          setIsOpen={setIsBoatModalOpen}
          isManagerDetailModalOpen={isManagerDetailModalOpen}
          setIsManagerDetailModalOpen={setIsManagerDetailModalOpen}
          SetPassSelectedManagers={SetPassManagersList}
          isMultiple={true}
          selectedManagers={selectedManagers}
          setSelectedManagers={setSelectedManagers}
          boatAccess={boatsData?.boatAccess}
          handleManagerModal={(managers) => handleAssignManager(managers)}
          isBoat={true}
        />
      )}
    </div>
  );
};

export default BoatDetail;
