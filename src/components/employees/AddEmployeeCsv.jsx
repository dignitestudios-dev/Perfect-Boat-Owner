import React, { useContext, useState } from "react";
import { ErrorToast, SuccessToast } from "../global/Toaster";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../contexts/GlobalContext";

const AddEmployeeCsv = ({ data, setData }) => {
  const navigate = useNavigate();
  const { managers } = useContext(GlobalContext);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [showManDropdown, setShowManDropdown] = useState(false);

  const [formError, setFormError] = useState({
    index: 0,
    message: null,
  });

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
    setShowManDropdown(false);
  };

  const handleRemoveBeforeIndex = (index) => {
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };

  function generateRandomPassword(length = 4) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&";
    let password = "Perfect@1";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    // setEmployeePassword(password);
    return password;
  }

  const submitEmployeeData = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const dataToSubmit = data.map((item) => ({
        ...item,
        phone: item.phone.startsWith("+1") ? item.phone : `+1${item.phone}`, // Add +1 only if not already present
        password: generateRandomPassword(),
      }));
      const response = await axios.post("/owner/employees/csv", dataToSubmit);
      if (response.status === 200) {
        SuccessToast("Employees Created Successfully");
        navigate("/employees");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      // if (error?.response?.data?.index > 0) {
      //   const index = error?.response?.data?.index;
      //   handleRemoveBeforeIndex(index);
      // }
      ErrorToast(error?.response?.data?.message);
      setFormError({
        index: error.response?.data?.index,
        message: error?.response?.data?.message,
      });
    } finally {
      setSubmitLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-start gap-6">
      <div className="flex flex-col gap-6 w-full h-auto">
        {data?.map((form, index) => {
          return (
            <div
              key={index}
              className={`w-full flex flex-col justify-start items-start gap-6 ${
                formError.index == index &&
                formError.message &&
                "border border-red-600 p-2 rounded-xl"
              }`}
            >
              {formError.index == index && formError.message && (
                <span className="text-red-600 text-sm font-medium">
                  {formError?.message}
                </span>
              )}
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
                        type="text"
                        value={form?.email}
                        onChange={(e) =>
                          handleChange(index, "email", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Name"}
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
                        maxLength={80}
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
                          onChange={(e) =>
                            handleChange(index, "phone", e.target.value)
                          }
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
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start relative">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Assign Manager"}
                    </label>
                    <div
                      type="button"
                      onClick={() =>
                        setShowManDropdown((prev) =>
                          prev === index ? null : index
                        )
                      }
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <div className="w-full h-full pt-4 bg-transparent outline-none text-white">
                        {form?.manager || "Select Manger"}
                      </div>
                      {/* <input
                              disabled
                              type="email"
                              value={form?.manager}
                              onChange={(e) =>
                                handleChange(index, "manager", e.target.value)
                              }
                              className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                              placeholder={"Enter Email "}
                            /> */}
                      <button
                        type="button"
                        // onClick={() =>
                        //   setShowManDropdown((prev) =>
                        //     prev === index ? null : index
                        //   )
                        // }
                        className="ml-2 text-white"
                      >
                        {showManDropdown === index ? "▲" : "▼"}
                      </button>
                    </div>
                    {showManDropdown === index && (
                      <ul
                        className="absolute z-10 w-full bg-gray-700 text-white border border-gray-500 rounded-md 
                        mt-1 max-h-40 overflow-auto top-[75px]"
                      >
                        {managers?.length > 0 ? (
                          managers?.map((manager) => (
                            <li
                              key={manager._id}
                              onClick={() =>
                                handleChange(index, "manager", manager.email)
                              }
                              className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
                            >
                              {manager.email}
                            </li>
                          ))
                        ) : (
                          <li className="px-3 py-2 text-gray-400">
                            No matching emails
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                  {/* <div className="w-full h-auto flex flex-col gap-1 justify-start items-start"> */}
                  {/* <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Assign Manager"}
                    </label> */}
                  {/* <div
                      className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                    >
                      <input
                        type="text"
                        value={form?.manager}
                        onChange={(e) =>
                          handleChange(index, "manager", e.target.value)
                        }
                        className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                        placeholder={"Enter Manager"}
                      />
                    </div> */}
                  {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.phoneNo}
                            </p>
                          )} */}
                  {/* </div> */}
                </div>
                <span className="w-full mt-4 h-[0.5px] bg-white/10"></span>
              </div>
            </div>
          );
        })}
        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            disabled={submitLoading}
            type="button"
            onClick={submitEmployeeData}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            <div className="flex items-center">
              <span className="mr-1">Save Employee</span>
              {submitLoading && (
                <FiLoader className="animate-spin text-lg mx-auto" />
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeCsv;
