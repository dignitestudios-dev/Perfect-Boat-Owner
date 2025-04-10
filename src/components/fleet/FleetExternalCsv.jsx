import React, { useContext, useEffect, useState } from "react";
import { ErrorToast } from "../global/Toaster";
import { FiDownload, FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { GlobalContext } from "../../contexts/GlobalContext";

const FleetExternalCsv = ({ data, setData, setIsAddManagerOpen }) => {
  console.log("🚀 ~ FleetExternalCsv ~ data:", data);
  const { setUpdateBoat } = useContext(GlobalContext);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState({});

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const checkForFieldErrors = (array) => {
    const requiredFields = [
      "name",
      "make",
      "size",
      "location",
      "boatType",
      "model",
      // "cover",
    ];

    // Array to store error details
    const errors = [];

    // Iterate through each object in the array
    array.forEach((item, index) => {
      const missingFields = [];

      // Check each required field
      requiredFields.forEach((field) => {
        // Check if the field is missing or invalid (empty string, null, undefined, or empty array)
        if (
          !item[field] ||
          item[field] === "" ||
          item[field] === null ||
          (Array.isArray(item[field]) && item[field].length === 0)
        ) {
          missingFields.push(field); // Add the field name to the missingFields array
        }
      });

      // If there are missing fields, store the index and fields
      if (missingFields.length > 0) {
        errors.push({ index, missingFields });
      }
    });

    return errors;
  };

  // const handleRemoveBeforeIndex = (index) => {
  //   const filteredData = data?.filter((item, idx) => idx >= index);
  //   setData(filteredData);
  // };

  const [errorObj, setErrorObj] = useState([]);

  const submitFleetData = async (e) => {
    e.preventDefault();

    if (checkForFieldErrors(data)?.length > 0) {
      setErrorObj(checkForFieldErrors(data));
    } else {
      setErrorObj([]);
      try {
        setSubmitLoading(true);
        const response = await axios.post("/owner/boat/Csv", data);
        if (response.status === 200) {
          // SuccessToast("Managers Created Successfully");
          setUpdateBoat((prev) => !prev);
          setIsAddManagerOpen(true);
        }
      } catch (error) {
        if (error?.response?.data?.index > 0) {
          const index = error?.response?.data?.index;
          // handleRemoveBeforeIndex(index);
        }
        console.error("Error adding employee:", error);
        ErrorToast(error?.response?.data?.message);
      } finally {
        setSubmitLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log(errorObj);
  }, [errorObj]);

  const handleUploadedImage = async (e, index) => {
    setImageLoading((prev) => ({ ...prev, [index]: true }));
    const file = e.target.files[0];

    if (!file) return;

    // Create FormData object
    const formData = new FormData();
    formData.append("image", file);
    formData.append("index", index);

    try {
      const response = await axios.post("/owner/boat/upload/image", formData);
      if (response?.status === 200) {
        // eslint-disable-next-line no-unsafe-optional-chaining
        const { fileAddress } = response?.data?.data;
        setData((prevData) => {
          const newData = [...prevData];
          newData[index]["cover"] = fileAddress;
          return newData;
        });
      }
    } catch (error) {
      console.log("🚀 ~ handleUploadedImage ~ error:", error);
      ErrorToast(error.response.data.message);
    } finally {
      setImageLoading((prev) => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {data?.map((boat, index) => {
          const error = errorObj?.find((err) => err?.index === index);

          return (
            <div
              key={index}
              className={`w-full h-auto flex flex-col bg-transparent gap-6 justify-start items-start`}
            >
              {/* <div className="w-full h-auto flex justify-between items-center"></div> */}
              <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
                <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start gap-3 lg:gap-12">
                    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        {"Boat Type"}
                      </label>
                      <div
                        className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                      >
                        <input
                          type="text"
                          value={boat?.boatType}
                          onChange={(e) =>
                            handleChange(index, "boatType", e.target.value)
                          }
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                          placeholder={"Enter Boat Type"}
                        />
                      </div>
                      {error?.missingFields?.includes("boatType") ? (
                        <p className="text-red-700 text-sm font-medium">
                          Invalid boat type
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        {"Boat Name / Hull Number"}
                      </label>
                      <div
                        className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                      >
                        <input
                          type="text"
                          value={boat?.name}
                          onChange={(e) =>
                            handleChange(index, "name", e.target.value)
                          }
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                          placeholder={"Enter Boat Name"}
                        />
                      </div>
                      {error?.missingFields?.includes("name") ? (
                        <p className="text-red-700 text-sm font-medium">
                          Invalid boat name /hull number
                        </p>
                      ) : null}
                    </div>
                    <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        {"Make"}
                      </label>
                      <div
                        className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                      >
                        <input
                          type="text"
                          value={boat?.make}
                          onChange={(e) =>
                            handleChange(index, "make", e.target.value)
                          }
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                          placeholder={"Enter Boat Make"}
                        />
                      </div>
                    </div>
                    {error?.missingFields?.includes("make") ? (
                      <p className="text-red-700 text-sm font-medium">
                        Invalid boat make
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 justify-start items-start gap-3 lg:gap-12">
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Year"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="text"
                        value={boat?.model}
                        onChange={(e) =>
                          handleChange(index, "model", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Boat Model"}
                      />
                    </div>
                    {error?.missingFields?.includes("model") ? (
                      <p className="text-red-700 text-sm font-medium">
                        Valid year required
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Size"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="number"
                        value={boat?.size}
                        onChange={(e) =>
                          handleChange(index, "size", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Boat Size"}
                      />
                    </div>
                    {error?.missingFields?.includes("size") ? (
                      <p className="text-red-700 text-sm font-medium">
                        Invalid boat size
                      </p>
                    ) : null}
                  </div>
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Location / Customer Name"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="text"
                        value={boat?.location}
                        onChange={(e) =>
                          handleChange(index, "location", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Location/Customer Name"}
                      />
                    </div>
                  </div>
                  {error?.missingFields?.includes("location") ? (
                    <p className="text-red-700 text-sm font-medium">
                      Invalid location
                    </p>
                  ) : null}
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Cover Image"}
                  </label>
                  <div className="relative">
                    <label
                      className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                                text-3xl flex items-center justify-center cursor-pointer"
                    >
                      {boat?.cover ? (
                        <img
                          src={boat?.cover}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      ) : (
                        <>
                          {imageLoading[index] ? (
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
                        onChange={(e) => handleUploadedImage(e, index)}
                      />
                    </label>
                  </div>
                  {/* <div className="grid grid-cols-6">
                    <img
                      src={boat?.cover}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    {boat?.cover?.includes("drive.google.com") ? (
                      <iframe
                        src={boat?.cover}
                        className="w-full h-full object-cover rounded-xl"
                        allow="autoplay"
                      ></iframe>
                    ) : (
                      <img
                        src={boat?.cover}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    )}
                  </div> */}
                  {error?.missingFields?.includes("cover") ? (
                    <p className="text-red-700 text-sm font-medium">
                      Cover image is required
                    </p>
                  ) : null}
                </div>

                {/* <div className="w-full flex flex-col justify-start items-start gap-4">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  {"Boat Images"}
                </label>
                <div className="grid grid-cols-6">
                  <img
                    src={boat?.cover}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </div> */}
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-end mt-10 items-center gap-4">
        <button
          onClick={submitFleetData}
          disabled={submitLoading}
          type="button"
          className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        >
          <div className="flex items-center">
            <span className="mr-1">Save Fleet</span>
            {submitLoading && (
              <FiLoader className="animate-spin text-lg mx-auto" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default FleetExternalCsv;
