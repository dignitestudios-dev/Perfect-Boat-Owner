import React, { useContext, useState } from "react";
import { FiLoader } from "react-icons/fi";
import { TbCaretDownFilled } from "react-icons/tb";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import AddManagerModal from "../../components/global/AddManagerModal";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { boatType } from "../../data/TaskTypeData";
import FleetExternalCsv from "../../components/fleet/FleetExternalCsv";
import Papa from "papaparse";
import { FleetInput } from "../../components/onboarding/FleetInput";
import FleetImages from "../../components/onboarding/FleetImages";
import { validateForms } from "../../data/boatValidation";
import { GlobalContext } from "../../contexts/GlobalContext";

const WelcomeAboard = () => {
  const { setUpdateBoat } = useContext(GlobalContext);

  const [forms, setForms] = useState([
    {
      boatType: "",
      name: "",
      make: "",
      year: "",
      size: "",
      location: "",
    },
  ]);

  const [selectedBoat, setSelectedBoat] = useState([]);
  const [coverImage, setCoverImage] = useState([0]);
  const [imagesBox, setImagesBox] = useState([[0]]);
  const [imagesArray, setImagesArray] = useState([[]]);

  const [uploadImages, setUploadImages] = useState([[]]);

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const addForm = () => {
    setForms((prev) => [
      ...prev,
      {
        boatType: "",
        name: "",
        make: "",
        year: "",
        size: "",
        location: "",
      },
    ]);
    setCoverImage((prev) => [...prev, 0]);
    setImagesBox((prev) => [...prev, [0]]);
    setImagesArray((prev) => [...prev, []]);
  };

  const removeForm = (formIndexToRemove) => {
    if (formIndexToRemove > 0) {
      const filteredData = forms?.filter(
        (item, idx) => idx !== formIndexToRemove
      );
      setForms(filteredData);
      const filteredBoat = selectedBoat.filter(
        (_, idx) => idx !== formIndexToRemove
      );
      setSelectedBoat(filteredBoat);

      const filteredImagesArray = imagesArray.filter(
        (_, idx) => idx !== formIndexToRemove
      );
      const updatedImagesArray = filteredImagesArray.map((subArray, idx) => {
        return subArray.filter((_, itemIdx) => itemIdx !== formIndexToRemove);
      });
      setImagesArray(updatedImagesArray);
    }
  };

  const handleSelect = (boat, idx) => {
    const updatedBoats = [...selectedBoat];
    updatedBoats[idx] = boat;
    setSelectedBoat(updatedBoats);
    setIsOpen(false); // Close dropdown after selection
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[idx] = {
        ...updatedForms[idx],
        boatType: boat,
        errors: { ...updatedForms[idx].errors, ["boatType"]: undefined },
      };
      return updatedForms;
    });
  };

  const currentYear = new Date().getFullYear();
  const minYear = 1970;
  const maxYear = currentYear + 1;

  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false); // State for new modal
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);

  const handleRemoveBeforeIndex = (index, error) => {
    const filteredData = forms?.filter((item, idx) => idx >= index);
    setForms(filteredData);
    const filteredBoat = selectedBoat.filter((_, idx) => idx >= index);
    setSelectedBoat(filteredBoat);

    const filteredImagesArray = imagesArray.filter((_, idx) => idx >= index);
    const updatedImagesArray = filteredImagesArray.map((subArray, idx) => {
      return subArray.filter((_, itemIdx) => itemIdx >= index);
    });
    setImagesArray(updatedImagesArray);

    const filteredUploadImages = uploadImages.filter((_, idx) => idx >= index);
    const updatedUploadImages = filteredUploadImages.map((subArray, idx) => {
      return subArray.filter((_, itemIdx) => itemIdx >= index);
    });
    setUploadImages(updatedUploadImages);

    const filteredImagesBox = imagesBox.filter((_, idx) => idx >= index);
    const updatedImagesBox = filteredImagesBox.map((subArray, idx) => {
      return subArray.filter((_, itemIdx) => itemIdx >= index);
    });
    setImagesBox(updatedImagesBox);

    if (error?.response?.data?.message.includes("Cover")) {
      setForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[0] = {
          ...updatedForms[0],
          errors: {
            ...updatedForms[0].errors,
            ["cover"]: "Select/Upload Cover Image",
          },
        };
        return updatedForms;
      });
    }
  };

  const submitBoatData = async (e) => {
    e.preventDefault();
    const { validatedForms, isValid } = validateForms(forms);
    if (!isValid) {
      setForms(validatedForms);
    }
    if (uploadImages[0].length === 0) {
      setForms((prevForms) => {
        const updatedForms = [...prevForms];
        updatedForms[0] = {
          ...updatedForms[0],
          errors: {
            ...updatedForms[0].errors,
            ["cover"]: "Select/Upload Cover Image",
          },
        };
        return updatedForms;
      });
      return;
    }
    try {
      setLoading(true);
      if (isValid) {
        for (const formIndex in forms) {
          const data = new FormData();
          data.append("name", forms[formIndex]?.name);
          data.append("make", forms[formIndex].make);
          data.append("size", forms[formIndex].size);
          data.append("location", forms[formIndex].location);
          data.append("boatType", forms[formIndex].boatType);
          data.append("model", forms[formIndex].year);
          uploadImages[formIndex]?.forEach((fileList, imageIndex) => {
            if (fileList) {
              if (coverImage[formIndex] === imageIndex) {
                data.append("cover", fileList);
              } else {
                data.append("pictures", fileList);
              }
            }
          });
          try {
            const response = await axios.post("/owner/boat", data);
            if (response?.status === 200) {
              if (parseInt(formIndex) + 1 === forms?.length) {
                setIsAddManagerOpen(true);
                setUpdateBoat((prev) => !prev);
              }
            }
          } catch (error) {
            console.log("🚀 ~ submitBoatData ~ error:", error);
            if (formIndex > 0) {
              const index = formIndex;
              handleRemoveBeforeIndex(index, error);
            } else {
              if (error?.response?.data?.message.includes("Cover")) {
                setForms((prevForms) => {
                  const updatedForms = [...prevForms];
                  updatedForms[formIndex] = {
                    ...updatedForms[formIndex],
                    errors: {
                      ...updatedForms[formIndex].errors,
                      ["cover"]: "Select/Upload Cover Image",
                    },
                  };
                  return updatedForms;
                });
              }
            }
            ErrorToast(error?.response?.data?.message);
            return;
          }
        }
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (formIndex, key, e) => {
    const value = e.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        [key]: capitalizedValue,
        errors: { ...updatedForms[formIndex].errors, [key]: undefined },
      };
      return updatedForms;
    });
  };

  const handleNumeric = (formIndex, key, e) => {
    const value = e.target.value; // Validate and update year
    if (key === "year") {
      handleYearValidation(formIndex, key, value);
    } else {
      handleOtherValidation(formIndex, key, value);
    }
  };

  const handleYearValidation = (formIndex, key, value) => {
    if (!/^\d{0,4}$/.test(value)) {
      return;
    }
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = { ...updatedForms[formIndex], [key]: value };
      return updatedForms;
    });
    if (value.length === 4) {
      const year = parseInt(value, 10);
      if (year >= minYear && year <= maxYear) {
        updateFormState(formIndex, key, year, undefined);
      } else {
        setError(
          formIndex,
          key,
          `Please enter a year between ${minYear} and ${maxYear}`
        );
      }
    }
  };
  const handleOtherValidation = (formIndex, key, value) => {
    if (value > 0 || value === "") {
      updateFormState(formIndex, key, value, undefined);
    } else {
      setError(formIndex, key, "Enter a number greater than 0");
    }
  };

  const updateFormState = (formIndex, key, value, error) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        [key]: value,
        errors: { ...updatedForms[formIndex].errors, [key]: error },
      };
      return updatedForms;
    });
  };
  const setError = (formIndex, key, error) => {
    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      updatedForms[formIndex] = {
        ...updatedForms[formIndex],
        errors: { ...updatedForms[formIndex].errors, [key]: error },
      };
      return updatedForms;
    });
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
            name: item["boat_name/hull_number"] || "",
            make: item.make || "",
            model: item.year || "",
            location: item["location/customer_name"] || "",
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
          <div className="w-72 flex justify-end gap-2 items-center">
            <a
              href="https://api.theperfectboat.com/public/Image/Boat_CSV_Template.csv"
              download
            >
              <button
                disabled={loading}
                type="button"
                className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-xl"
              >
                Download Template
              </button>
            </a>
            {data?.length == 1 && !csvUploaded && (
              <button
                disabled={loading}
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
            <FleetExternalCsv
              data={data}
              setData={setData}
              setIsAddManagerOpen={setIsAddManagerOpen}
            />
          </>
        ) : (
          <form onSubmit={submitBoatData}>
            <div className="pt-2 pb-6">
              <p className="text-[20px] font-semibold leading-[21.6px]">
                Add Fleet
              </p>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
              {forms?.map((form, formIndex) => (
                <div
                  key={formIndex}
                  className="w-full h-auto flex flex-col gap-6 justify-start items-start"
                >
                  {formIndex > 0 && (
                    <div className="w-full flex justify-end">
                      <p
                        onClick={() => removeForm(formIndex)}
                        className="px-1.5 hover:text-red-500 rounded-full text-xl font-bold cursor-pointer"
                      >
                        ✕
                      </p>
                    </div>
                  )}
                  <div className="w-full flex flex-col justify-start items-start gap-4">
                    <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start gap-3 lg:gap-12">
                        <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            Boat Type
                          </label>
                          <div
                            className={`group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center
                           px-3 focus:border-[1px] rounded-xl hover:rounded-b-none hover:rounded-t-xl
                          relative ${
                            forms[formIndex]?.errors?.boatType
                              ? "? focus:border-red-500"
                              : "focus:border-[#55C9FA]"
                          }  `}
                          >
                            <span className="text-white">
                              {selectedBoat?.length > formIndex
                                ? selectedBoat[formIndex]
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
                                    disabled={loading}
                                    type="button"
                                    key={index}
                                    onClick={() =>
                                      handleSelect(boat, formIndex)
                                    }
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
                          {forms[formIndex]?.errors?.boatType && (
                            <p className="text-red-500 text-sm">
                              {forms[formIndex]?.errors?.boatType}
                            </p>
                          )}
                        </div>
                        <FleetInput
                          label="Boat Name / Hull Number"
                          placeholder="Enter Boat Name / Hull Number"
                          type="text"
                          value={forms[formIndex].name}
                          onChange={(e) => handleChange(formIndex, "name", e)}
                          error={forms[formIndex]?.errors?.name}
                        />

                        <FleetInput
                          label="Make"
                          placeholder="Enter Make"
                          type="text"
                          value={forms[formIndex].make}
                          onChange={(e) => handleChange(formIndex, "make", e)}
                          error={forms[formIndex]?.errors?.make}
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start  gap-3 lg:gap-12">
                        <FleetInput
                          label="Year"
                          placeholder="Year"
                          type="text"
                          maxLength={4}
                          value={forms[formIndex].year}
                          onChange={(e) => handleNumeric(formIndex, "year", e)}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /(?!^\+)[^\d]/g,
                              ""
                            );
                          }}
                          error={forms[formIndex]?.errors?.year}
                        />
                        <FleetInput
                          label="Size (ft)"
                          placeholder="Enter Size"
                          type="text"
                          maxLength={4}
                          value={forms[formIndex].size}
                          onChange={(e) => handleNumeric(formIndex, "size", e)}
                          onInput={(e) => {
                            e.target.value = e.target.value.replace(
                              /[^0-9.]/g,
                              ""
                            );
                            const parts = e.target.value.split(".");
                            if (parts.length > 2) {
                              e.target.value =
                                parts[0] + "." + parts.slice(1).join("");
                            }
                          }}
                          error={forms[formIndex]?.errors?.size}
                        />
                        <FleetInput
                          label="Location / Customer Name"
                          placeholder="Enter Location/Customer Name"
                          type="text"
                          value={forms[formIndex].location}
                          onChange={(e) =>
                            handleChange(formIndex, "location", e)
                          }
                          error={forms[formIndex]?.errors?.location}
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
                  <FleetImages
                    error={forms[formIndex]?.errors?.image}
                    formIndex={formIndex}
                    coverImage={coverImage}
                    setForms={setForms}
                    setCoverImage={setCoverImage}
                    setUploadImages={setUploadImages}
                    setImagesArray={setImagesArray}
                    imagesBox={imagesBox}
                    setImagesBox={setImagesBox}
                    imagesArray={imagesArray}
                  />
                  {forms[formIndex]?.errors?.cover && (
                    <p className="text-red-500 text-sm -mt-2">
                      {forms[formIndex]?.errors?.cover}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="w-full flex justify-end mt-10 items-center gap-4">
              <button
                disabled={loading}
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
