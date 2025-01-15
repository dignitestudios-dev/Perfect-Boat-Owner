import React, { useContext, useState } from "react";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import ManagerBoatsCsvModal from "./ManagerBoatsCsvModal";
import ManagerBoatsCsvInput from "./ManagerBoatsCsvInput";
import { GlobalContext } from "../../contexts/GlobalContext";

const AddManagersCsv = ({ data, setData }) => {
  const { boats } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [passSelectedBoat, SetPassSelectedBoat] = useState([]);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [inputIndex, setInputIndex] = useState(0);

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleRemoveBeforeIndex = (index) => {
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };

  const submitManagerData = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = data.map((item) => ({
        ...item,
        phone: item.phone.startsWith("+1") ? item.phone : `+1${item.phone}`, // Add +1 only if not already present
      }));
      setSubmitLoading(true);
      const response = await axios.post("/owner/manager/csv", dataToSubmit);
      if (response.status === 200) {
        SuccessToast("Managers Created Successfully");
        navigate("/managers");
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
    <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
      <div className="flex flex-col gap-6 w-full h-auto">
        {data?.map((form, index) => {
          return (
            <div
              key={index}
              className="w-full flex flex-col justify-start items-start gap-6"
            >
              <div className="w-full h-auto flex flex-col justify-start items-start gap-4 ">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Name"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="text"
                        value={form?.name}
                        onChange={(e) =>
                          handleChange(index, "name", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Name"}
                      />
                    </div>
                    {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.name}
                            </p>
                          )} */}
                  </div>

                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Email"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="email"
                        value={form?.email}
                        onChange={(e) =>
                          handleChange(index, "email", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400
                               autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Email"}
                      />
                    </div>
                    {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.email}
                            </p>
                          )} */}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Job Title"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="text"
                        value={form?.jobtitle}
                        onChange={(e) =>
                          handleChange(index, "jobtitle", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Job Title"}
                      />
                    </div>
                    {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.jobTitle}
                            </p>
                          )} */}
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
                        value={form?.location}
                        onChange={(e) =>
                          handleChange(index, "location", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Location"}
                      />
                    </div>
                    {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.location}
                            </p>
                          )} */}
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Phone Number"}
                    </label>
                    <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-0 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <div
                        className={`w-full h-full flex items-center justify-center rounded-[12px] relative`}
                      >
                        <span
                          className="mr-2 w-14 rounded-l-[12px] flex justify-center items-center bg-[#16202e]
                          text-md font-medium text-white h-full"
                          style={{
                            color: "#6B7373",
                          }}
                        >
                          +1
                        </span>

                        <input
                          type="text"
                          value={form?.phone}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Allow only digits and restrict to 10 digits
                            if (/^[0-9]{0,10}$/.test(value)) {
                              handleChange(index, "phone", value);
                            }
                          }}
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                          placeholder={"Enter Phone Number"}
                        />
                      </div>
                    </div>
                    {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.phoneNo}
                            </p>
                          )} */}
                  </div>
                  <div>
                    <ManagerBoatsCsvInput
                      passSelectedBoat={
                        data[index].boats ||
                        setData((prevData) => {
                          const updatedData = [...prevData];
                          updatedData[index] = {
                            ...updatedData[index],
                            boats: boats?.map((data) => data?._id),
                          };
                          return updatedData;
                        })
                      }
                      setIsBoatModalOpen={setIsBoatModalOpen}
                      setInputIndex={setInputIndex}
                      index={index}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            onClick={submitManagerData}
            disabled={submitLoading}
            type="button"
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Save Manager</span>
              {submitLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>
      </div>
      {isBoatModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000]">
          <ManagerBoatsCsvModal
            data={data}
            inputIndex={inputIndex}
            isOpen={isBoatModalOpen}
            setIsOpen={setIsBoatModalOpen}
            setData={setData}
          />
        </div>
      )}
    </div>
  );
};

export default AddManagersCsv;
