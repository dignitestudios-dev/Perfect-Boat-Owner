import React, { Fragment, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import { FiDownload, FiLoader } from "react-icons/fi";
import { TbCaretDownFilled } from "react-icons/tb";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import AddManagerModal from "../../components/global/AddManagerModal";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { FaTrashAlt } from "react-icons/fa";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { boatType } from "../../data/TaskTypeData";
import FleetExternalCsv from "../../components/fleet/FleetExternalCsv";
import Papa from "papaparse";

const WelcomeAboard = () => {
  const [selectedBoat, setSelectedBoat] = useState([]);

  const [formImage, setFormImage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [forms, setForms] = useState([0]);

  const [csvUploaded, setCsvUploaded] = useState(false);

  const [data, setData] = useState([
    {
      boatType: "",
      name: "",
      make: "",
      model: "",
      size: "",
      location: "",
      cover: "",
      // pictures: "",
    },
  ]);

  const {
    watch,
    getValues,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const isImages = watch("forms.0.images.0");
  // console.log("🚀 ~ WelcomeAboard ~ isImages:", isImages)

  const addForm = () => {
    setForms((prev) => [...prev, prev.length]);
  };
  const removeForm = (index) => {
    if (index > 0) {
      setForms((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const handleSelect = (boat, idx) => {
    const updatedBoats = [...selectedBoat];
    updatedBoats[idx] = boat;
    setSelectedBoat(updatedBoats);
    setIsOpen(false); // Close dropdown after selection
  };

  const currentYear = new Date().getFullYear();
  const minYear = 1970;
  const maxYear = currentYear + 1;

  const [coverImages, setCoverImages] = useState("");
  const [coverError, setCoverError] = useState(Array(forms.length).fill(null));

  const handleImageSelect = (formIndex, imageIndex) => {
    setCoverError(Array(forms.length).fill(null));
    setCoverImages((prevCoverImages) => ({
      ...prevCoverImages,
      [formIndex]: imageIndex, // Set the specific image index for this form
    }));
  };

  const handleRemoveImage = (formIndex, imageIndex) => {
    const currentImages = getValues(`forms.${formIndex}.images`) || [];

    const updatedImages = currentImages.filter(
      (_, index) => index !== imageIndex
    );

    setValue(`forms.${formIndex}.images`, updatedImages, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false); // State for new modal
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);

  const submitBoatData = async (formData) => {
    setLoading(true);
    const successfulForms = [];
    const formErrors = {};

    try {
      // Use `for...of` loop to handle async code correctly
      for (const formIndex of forms) {
        const data = new FormData();
        // console.log("form =? images ? ", formData.forms[formIndex].images);
        data.append("name", formData.forms[formIndex].name);
        data.append("make", formData.forms[formIndex].make);
        data.append("size", formData.forms[formIndex].size);
        data.append("location", formData.forms[formIndex].location);
        data.append("boatType", selectedBoat[formIndex]);
        data.append("model", formData.forms[formIndex].model);

        // Handle cover image validation
        if (coverImages[formIndex] === undefined) {
          formErrors[formIndex] = "Please select a cover image.";
          setCoverError((prevErrors) => {
            const newErrors = [...prevErrors];
            newErrors[formIndex] = formErrors[formIndex];
            return newErrors;
          });
          continue; // Skip this form if there's an error
        }

        // Handle other images
        if (formData.forms[formIndex].images) {
          formData.forms[formIndex].images.forEach((fileList, imageIndex) => {
            if (fileList.length > 0 && fileList[0]) {
              if (coverImages[formIndex] === imageIndex) {
                data.append("cover", fileList[0]);
              } else {
                data.append("pictures", fileList[0]);
              }
            } else {
              if (coverImages[formIndex] === imageIndex) {
                formErrors[formIndex] = "Please upload a cover image.";
                setCoverError((prevErrors) => {
                  const newErrors = [...prevErrors];
                  newErrors[formIndex] = formErrors[formIndex];
                  return newErrors;
                });
              }
            }
          });
        }

        if (formErrors[formIndex]) {
          // setForms((prevForms) =>
          //   prevForms.filter((_, index) => successfulForms.includes(index))
          // );
          return;
        } else {
          try {
            const response = await axios.post("/owner/boat", data);
            if (response.status === 200) {
              successfulForms.push(formIndex);
              if (formIndex + 1 === forms.length) {
                setIsAddManagerOpen(true); // Open modal if it's the last form
              }
            }
          } catch (error) {
            ErrorToast(error?.response?.data?.message);
          }
        }
      }

      // if (successfulForms.length > 0) {
      //   setForms((prevForms) =>
      //     prevForms.filter((_, index) => !successfulForms.includes(index))
      //   );
      // }
    } catch (error) {
      console.log("error outside loop", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false); // Stop loader after all forms are processed
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
            model: item.model || "",
            location: item.location || "",
            size: item.size || "",
            cover: item.cover || "",
            // pictures: item.pictures || "",
          }));
          setData(parsedData);
          // checkForError(parsedData);
        },
      });
      setCsvUploaded(true);
    }
  };

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 overflow-auto">
      <div className="w-full h-auto flex flex-col gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Welcome Aboard
            </h1>
            <span className="text-[14px] font-normal leading-[21.6px]">
              Experience the power of simplified fleet management today. Whether
              you are assigning task or tracking boat maintenance,
              <br />{" "}
              <span className="text-[16px] font-bold">
                The Perfect Boat
              </span>{" "}
              has you covered at every step of the journey.
            </span>
          </div>
          <button
            type="button"
            className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-sm font-medium leading-5"
            onClick={() => {
              document.getElementById("input").click();
            }}
          >
            Import CSV
          </button>

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
            <FleetExternalCsv
              data={data}
              setData={setData}
              setIsAddManagerOpen={setIsAddManagerOpen}
            />
          </>
        ) : (
          <form onSubmit={handleSubmit(submitBoatData)}>
            <div className="pt-2 pb-6">
              <p className="text-[20px] font-semibold leading-[21.6px]">
                Add Fleet
              </p>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
              {forms?.map((form, idx) => (
                <div
                  key={idx}
                  className="w-full h-auto flex flex-col gap-6 justify-start items-start"
                >
                  <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start gap-3 lg:gap-12">
                        <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            Boat Type
                          </label>
                          <div className="group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl hover:rounded-b-none hover:rounded-t-xl relative">
                            <span className="text-white">
                              {selectedBoat.length > 0
                                ? selectedBoat[idx]
                                : "--Select--"}
                            </span>
                            <span className="text-gray-400">
                              <TbCaretDownFilled className="group-hover:rotate-180 " />
                            </span>
                            <div
                              className="group-hover:flex z-20 flex-col justify-start items-start gap-3 transition-all
                         duration-700 px-5 py-3 hidden absolute top-12 shadow-xl left-0 w-full h-48 max-h-48 bg-[#21344C] rounded-b-2xl "
                            >
                              <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-1">
                                {boatType?.map((boat, index) => (
                                  <button
                                    type="button"
                                    key={index}
                                    onClick={() => handleSelect(boat, idx)}
                                    className={`w-full text-left px-4 py-2 text-gray-300 hover:bg-[#1A293D] hover:rounded-lg ${
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
                          label="Name"
                          placeholder="Enter Boat Name"
                          type="text"
                          register={register(`forms.${idx}.name`, {
                            required: "Name is required",
                          })}
                          error={errors?.forms?.[idx]?.name}
                        />

                        <AddFleetInput
                          label="Make"
                          placeholder="Enter Make"
                          type="text"
                          register={register(`forms.${idx}.make`, {
                            required: "Make is required",
                          })}
                          error={errors?.forms?.[idx]?.make}
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start  gap-3 lg:gap-12">
                        <AddFleetInput
                          label="Year"
                          placeholder="Year"
                          type="text"
                          register={register(`forms.${idx}.model`, {
                            required: "Year is required",
                            validate: {
                              // Custom validation for numeric year format and within range
                              isValidYear: (value) =>
                                /^\d{4}$/.test(value) ||
                                "Year must be a 4-digit number",
                              withinRange: (value) =>
                                (value >= minYear && value <= maxYear) ||
                                `Please enter a year between ${minYear} and ${maxYear}`,
                            },
                          })}
                          error={errors?.forms?.[idx]?.model}
                        />
                        <AddFleetInput
                          label="Size (ft)"
                          placeholder="Enter Size"
                          type="text"
                          maxLength={4}
                          register={register(`forms.${idx}.size`, {
                            required: "Size is required",
                            pattern: {
                              value: /^[1-9][0-9]{0,3}$/,
                              message:
                                "Size must be positive and 4 digits long",
                            },
                          })}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /(?!^\+)[^\d]/g,
                              ""
                            );
                          }}
                          error={errors?.forms?.[idx]?.size}
                        />
                        <AddFleetInput
                          label="Location"
                          placeholder="Enter Location"
                          type="text"
                          register={register(`forms.${idx}.location`, {
                            required: "Location is required",
                            minLength: {
                              value: 2,
                              message:
                                "Location must be at least 2 characters long",
                            },
                          })}
                          error={errors?.forms?.[idx]?.location}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div className="w-full md:w-[400px] flex flex-col gap-6">
                <h3 className="text-[18px] font-bold leading-[24.3px]">Select Manager</h3>
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="w-full h-[52px] bg-[#1A293D] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  Click Here To Select Manager
                </button>
              </div> */}

                  <div className="w-full flex flex-col justify-start items-start gap-4">
                    <>
                      <h3 className="text-[18px] font-bold leading-[24.3px]">
                        Upload Pictures{" "}
                        <span className="text-[14px] font-normal leading-[24px]">
                          (Supported Files Type: JPG, PNG, GIF)
                        </span>
                      </h3>
                      <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                        {[...Array(5)].map((_, imageIndex) => {
                          const formsImage = watch(
                            `forms.${idx}.images.${imageIndex}`
                          );
                          // console.log("formsImages---", formsImage[idx], " ?? ", formsImage)
                          // const imageError = errors?.forms?.[idx]?.images?.[imageIndex];

                          return (
                            <div key={imageIndex}>
                              <div className="relative w-full h-[147px] rounded-xl flex flex-col items-center justify-center gap-2">
                                <label
                                  htmlFor={`form-${idx}-image-${imageIndex}`}
                                  className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                            text-3xl flex items-center justify-center cursor-pointer"
                                >
                                  {formsImage && formsImage.length > 0 ? (
                                    <img
                                      src={URL.createObjectURL(formsImage[0])}
                                      alt={`Uploaded preview ${imageIndex}`}
                                      className="w-full h-full object-cover rounded-xl"
                                    />
                                  ) : (
                                    <FiDownload />
                                  )}
                                  <input
                                    type="file"
                                    className="hidden"
                                    id={`form-${idx}-image-${imageIndex}`}
                                    accept="image/*"
                                    key={imageIndex}
                                    name={`forms.${idx}.images.${imageIndex}`}
                                    {...register(
                                      `forms.${idx}.images.${imageIndex}`,
                                      {
                                        required:
                                          idx === forms.length - 1 &&
                                          imageIndex === 0
                                            ? "Image is required"
                                            : false,
                                        onChange: (e) => {
                                          setCoverError(
                                            Array(forms.length).fill(null)
                                          );
                                        },
                                      }
                                    )}
                                  />
                                </label>
                                {errors?.forms?.[idx]?.images?.[imageIndex] ? (
                                  <p>image is required </p>
                                ) : (
                                  <></>
                                )}
                                {/* {errors?.forms?.[idx]?.images?.imageIndex && (
                                  <p>image is required </p>
                                )} */}
                                <div className="absolute top-1 right-2 bg-white p-1 rounded-full">
                                  <FaTrashAlt
                                    className="text-black cursor-pointer text-[15px]"
                                    onClick={() =>
                                      handleRemoveImage(idx, imageIndex)
                                    }
                                  />
                                </div>
                              </div>
                              {/* {imageError && ( <p className="text-red-500 text-sm">{imageError.message} </p>)} */}
                              <div className="w-auto mt-2 ml-1 flex gap-2 justify-start items-center">
                                <input
                                  checked={coverImages[idx] === imageIndex}
                                  type="radio"
                                  onChange={() =>
                                    handleImageSelect(idx, imageIndex)
                                  }
                                  className={`w-3 h-3 rounded-full accent-white outline-none border-none 
                                   ${
                                     coverImages[idx] === imageIndex && "hidden"
                                   } `}
                                />
                                {coverImages[idx] === imageIndex ? (
                                  <span className="text-slate-600 text-[10px] mr-4 bg-white rounded-full px-1">
                                    ✔
                                  </span>
                                ) : (
                                  <span className="text-transparent text-[10px]">
                                    ✔
                                  </span>
                                )}
                                <span className="text-[12px] font-medium leading-[16.3px]">
                                  {" "}
                                  Set as cover photo{" "}
                                </span>
                              </div>
                              {coverError[idx] && (
                                <p className="text-red-500 text-sm">
                                  {coverError[idx]}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mt-10 items-center gap-4">
              <button
                type="button"
                onClick={addForm}
                className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                Add Another Boat
              </button>
              <button
                disabled={loading}
                type="submit"
                className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
              >
                <div className="flex items-center">
                  <span className="mr-1">Save Fleet</span>
                  {loading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* ManagerDetailModal Component */}
      {/* {isManagerOpen && <ManagerDetailModal setIsOpen={setIsManagerOpen} />} */}

      {/* AddManagerModal Component */}
      {isAddManagerOpen && (
        <AddManagerModal
          isOpen={isAddManagerOpen}
          setIsOpen={setIsAddManagerOpen}
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

export default WelcomeAboard;
