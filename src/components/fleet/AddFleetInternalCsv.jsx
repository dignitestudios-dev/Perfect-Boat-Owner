import React, { useState } from "react";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const AddFleetInternalCsv = ({ data, setData }) => {
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleRemoveBeforeIndex = (index) => {
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };

  const submitFleetData = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const response = await axios.post("/owner/boat/Csv", data);
      if (response.status === 200) {
        SuccessToast("Boats Created Successfully");
        navigate("/boats");
      }
    } catch (error) {
      if (error?.response?.data?.index > 0) {
        const index = error?.response?.data?.index;
        handleRemoveBeforeIndex(index);
      }
      console.error("Error adding employee:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {data?.map((boat, index) => {
          return (
            <div
              key={index}
              className="w-full h-auto flex flex-col gap-6 justify-start items-start"
            >
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
                        placeholder={"Enter Year"}
                      />
                    </div>
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
                  </div>
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Location"}
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
                        placeholder={"Enter Location"}
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    {"Cover Image"}
                  </label>
                  <div className="grid grid-cols-6">
                    <img
                      src={boat?.cover}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
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
            <span className="mr-1">Save Boat</span>
            {submitLoading && (
              <FiLoader className="animate-spin text-lg mx-auto" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default AddFleetInternalCsv;
