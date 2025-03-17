import React, { useContext, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import { TbCaretDownFilled } from "react-icons/tb";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import CongratsModal from "./CongratsModal";
import { useForm } from "react-hook-form";
import { FiDownload, FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";
import { boatType } from "../../data/TaskTypeData";
import { GlobalContext } from "../../contexts/GlobalContext";
import Papa from "papaparse";
import AddFleetInternalCsv from "../../components/fleet/AddFleetInternalCsv";
import { CiTrash } from "react-icons/ci";

const AddFleet = () => {
  const { boatDropDown, setUpdateDropDown, setUpdateBoat } =
    useContext(GlobalContext);

  const navigate = useNavigate();
  const [selectedBoat, setSelectedBoat] = useState("");

  const [selectedBoatErr, setSelectedBoatErr] = useState(null);
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
  const [coverImage, setCoverImage] = useState(0);
  const [imagesBox, setImagesBox] = useState([0]);

  const [imagesArray, setImagesArray] = useState([]);
  const [uploadImages, setUploadImages] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [selectedManagers, setSelectedManagers] = useState([]);

  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [passSelectedManagers, SetPassSelectedManagers] = useState([]);

  const [csvUploaded, setCsvUploaded] = useState(false);

  const [data, setData] = useState([
    {
      boatType: "",
      name: "",
      make: "",
      model: "2003",
      size: "",
      location: "",
      cover: "",
      pictures: "",
    },
  ]);

  const {
    watch,
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSelect = (boat) => {
    setSelectedBoatErr(null);
    setSelectedBoat(boat);
  };

  const currentYear = new Date().getFullYear();
  const minYear = 1970;
  const maxYear = currentYear + 1;

  const [model, setModel] = useState("");
  const [modelError, setModelError] = useState(false);

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

  const submitBoatData = async (formData) => {
    // if (!coverImage && coverImage === 0) {
    //   ErrorToast("Select cover image");
    //   return;
    // }
    if (!selectedBoat) {
      setSelectedBoatErr("Select boat type");
      return;
    }
    if (modelError) {
      ErrorToast("Enter valid model");
      return;
    }
    try {
      setSubmitLoading(true);
      const data = new FormData();
      data.append("name", formData.name);
      data.append("make", formData.make);
      data.append("size", formData.size);
      data.append("model", model);
      data.append("location", formData.location);
      data.append("boatType", selectedBoat);
      // data.append("boatType", selectedBoat[formIndex]);
      if (passSelectedManagers) {
        const managerIds = passSelectedManagers.map((manager) => manager.id);
        managerIds.forEach((id) => {
          data.append("managers[]", id);
        });
      }

      if (imagesArray) {
        uploadImages?.forEach((files, index) => {
          if (files) {
            if (coverImage === index) {
              data.append("cover", files);
            } else {
              data.append("pictures", files);
            }
          }
        });
      }
      const response = await axios.post("/owner/boat", data);

      if (response?.status === 200) {
        setIsCongratsOpen(true);
        setUpdateDropDown((prev) => !prev);
        setUpdateBoat((prev) => !prev);
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.log("Error uploading images:", error);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results?.data?.map((item) => ({
            boatType: item.boatType || "",
            name: item.name || "",
            make: item.make || "",
            model: item.year || "2025",
            location: item["location/customer_name"] || "",
            size: item.size || "",
            // cover: item.cover || "",
            // pictures: item.pictures || "",
          }));
          setData(parsedData);
          // checkForError(parsedData);
        },
      });
      setCsvUploaded(true);
    }
  };

  const handleRemoveImage = (imageIndex) => {
    const updatedImages = imagesArray?.filter(
      (_, index) => index !== imageIndex
    );
    setImagesArray(updatedImages);

    const newImages = uploadImages?.filter((_, index) => index !== imageIndex);
    setUploadImages(newImages);

    if (imagesBox.length > 1) {
      setImagesBox((prev) => prev.slice(0, -1));
    }
    if (imageIndex === coverImage) {
      setCoverImage(0);
    }
  };

  const handleUploadedImage = async (e, index) => {
    const file = e.target.files[0];
    const files = Array.from(e.target.files);

    if (files.length > 1) {
      const image = files;
      setImageLoading(true);
      const images = await Promise.all(
        files.map(async (file) => {
          const base64String = await convertImageToBase64(file);
          return `data:${file.type};base64,${base64String}`;
        })
      );
      setImageLoading(false);
      setUploadImages((prev) => {
        const updatedImages = [...prev];
        if (!updatedImages[index]) updatedImages[index] = [];
        image.forEach((image, idx) => {
          if (updatedImages.length < 5) {
            updatedImages[idx] = image;
            return updatedImages;
          }
        });
        return updatedImages;
      });

      setImagesArray((prev) => {
        const updatedImages = [...prev];
        if (!updatedImages[index]) updatedImages[index] = [];
        images.forEach((image, idx) => {
          if (updatedImages.length < 5) {
            updatedImages[idx] = image;
            return updatedImages;
          }
        });
        return updatedImages;
      });

      setImagesBox((prev) => {
        const updatedBox = [...prev];
        if (!updatedBox[index]) updatedBox[index] = [];
        images.forEach((_, idx) => {
          if (updatedBox.length < 5) {
            updatedBox?.push(updatedBox.length);
          }
        });
        return updatedBox;
      });
    } else {
      if (file) {
        const image = file;
        setUploadImages((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = image;
          return updatedImages;
        });
        const base64String = await convertImageToBase64(file);
        const base64WithPrefix = `data:${file.type};base64,${base64String}`;
        setImagesArray((prev) => {
          const updatedImages = [...prev];
          updatedImages[index] = base64WithPrefix;
          return updatedImages;
        });
        if (imagesBox.length < 5) {
          setImagesBox((prev) => [...prev, prev.length]);
        }
      }
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

  const handleCoverSelect = (index) => {
    setCoverImage(index);
  };

  const handleAddMore = () => {
    setIsCongratsOpen(false);
    reset();
    setCoverImage("");
    setImagesBox([0]);

    setImagesArray([]);
    setUploadImages([]);

    setSubmitLoading(false);
    setSelectedManagers([]);

    SetPassSelectedManager("");
    SetPassSelectedManagers([]);
    setModel("");
    setModelError(false);
  };

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 overflow-auto">
      <div className="w-full h-auto flex flex-col gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Add Fleet
            </h1>
          </div>
          <div className="w-72 flex justify-end gap-2 items-center">
            <a
              href="https://api.theperfectboat.com/public/Image/Boat_CSV_Template.csv"
              download
            >
              <button
                type="button"
                className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-xl"
              >
                Download Template
              </button>
            </a>
            {data?.length == 1 && !csvUploaded && (
              <button
                type="button"
                className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-sm font-medium leading-5"
                onClick={() => {
                  document.getElementById("input").click();
                }}
              >
                Import CSV
              </button>
            )}
          </div>
          <input
            type="file"
            id="input"
            className="hidden"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        {csvUploaded ? (
          <>
            <AddFleetInternalCsv data={data} setData={setData} />
          </>
        ) : (
          <form onSubmit={handleSubmit(submitBoatData)}>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
              <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 items-start justify-start gap-3 lg:gap-12">
                      <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                        <label className="text-[16px] font-medium leading-[21.6px]">
                          Boat Type
                        </label>
                        <div className="group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl hover:rounded-b-none hover:rounded-t-xl relative">
                          <span
                            className={`${
                              selectedBoat ? "text-white" : "text-gray-400"
                            }`}
                          >
                            {selectedBoat || "--Select--"}
                          </span>
                          <span className="text-gray-400">
                            <TbCaretDownFilled className="group-hover:rotate-180 " />
                          </span>
                          <div
                            className="group-hover:flex z-20 flex-col justify-start items-start gap-3 transition-all
                         duration-700 px-5 py-3 hidden absolute top-12 shadow-xl left-0 w-full h-48 max-h-48 bg-[#21344C] rounded-b-2xl "
                          >
                            <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-1">
                              {boatDropDown?.map((boat, index) => (
                                <button
                                  type="button"
                                  key={index}
                                  onClick={() => handleSelect(boat)}
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
                        {selectedBoatErr && (
                          <p className="text-red-500">{selectedBoatErr}</p>
                        )}
                      </div>

                      <AddFleetInput
                        label="Boat Name / Hull Number"
                        placeholder="Enter Boat Name / Hull Number"
                        type="text"
                        register={register(`name`, {
                          onChange: (e) => {
                            const value = e.target.value;
                            e.target.value =
                              value.charAt(0).toUpperCase() + value.slice(1);
                          },
                          setValueAs: (v) =>
                            String(v[0]).toUpperCase() + String(v).slice(1),
                          required: "Boat Name / Hull Number is required",
                        })}
                        error={errors.name}
                      />

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
                      {/* <AddFleetInput label={"Name"} />
                    <AddFleetInput label={"Make"} /> */}
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 items-start justify-start gap-3 lg:gap-12">
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
                          minLength: {
                            value: 2,
                            message:
                              "Location must be at least 2 characters long",
                          },
                        })}
                        error={errors.location}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-[400px] flex flex-col gap-6">
                  <h3 className="text-[18px] font-bold leading-[24.3px]">
                    Select Manager
                  </h3>
                  <button
                    type="button"
                    onClick={() => setIsManagerOpen(true)}
                    className="w-full h-[52px] bg-[#1A293D] text-left text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
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

                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <h3 className="text-[18px] font-bold leading-[24.3px]">
                    Upload Pictures
                    {/* <span className="text-[14px] font-normal leading-[24px] mr-1">
                      (Supported Files Type: JPG, PNG, GIF)
                    </span> */}
                  </h3>

                  <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                    {imagesBox?.map((_, index) => {
                      const isSelected = coverImage === index;
                      return (
                        <div key={index}>
                          <div className="relative">
                            <label
                              className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                                text-3xl flex items-center justify-center cursor-pointer"
                            >
                              {imagesArray[index] ? (
                                <img
                                  src={imagesArray[index]}
                                  className="w-full h-full object-cover rounded-xl"
                                />
                              ) : (
                                <>
                                  {imageLoading ? (
                                    <FiLoader className="animate-spin mx-auto" />
                                  ) : (
                                    <FiDownload />
                                  )}
                                </>
                              )}

                              <input
                                name={`formsImages`}
                                accept="image/jpeg, image/png, image/bmp, image/webp"
                                className="hidden"
                                type="file"
                                multiple
                                onChange={(e) => handleUploadedImage(e, index)}
                              />
                            </label>

                            {imagesArray[index] ? (
                              <div className="absolute top-3 right-3 bg-[#ffffff9f] p-1 rounded-full">
                                <CiTrash
                                  className="text-black cursor-pointer text-[15px]"
                                  onClick={() => handleRemoveImage(index)}
                                />
                              </div>
                            ) : (
                              <></>
                            )}
                          </div>
                          <div className="w-auto ml-1 mt-1 flex gap-2 justify-start items-center">
                            <input
                              type="radio"
                              checked={isSelected}
                              onChange={() => handleCoverSelect(index)}
                              className="w-3 h-3 rounded-full accent-white outline-none border-none"
                            />
                            <span className="text-[12px] font-medium leading-[16.3px]">
                              Set as cover photo
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-end mt-10 items-center gap-4">
              <button
                disabled={submitLoading}
                type="submit"
                className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                <div className="flex items-center">
                  <span className="mr-1">Save Boat</span>
                  {submitLoading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ManagerDetailModal Component */}
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

      {/* CongratsModal Component */}
      {isCongratsOpen && (
        <CongratsModal
          isOpen={isCongratsOpen}
          onClose={() => {
            setIsCongratsOpen(false);
            navigate("/boats");
          }}
          addMore={handleAddMore}
        />
      )}

      {/* ImportCSVModal Component */}
      {isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
    </div>
  );
};

export default AddFleet;
