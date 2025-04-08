import React, { useContext, useState } from "react";
import Papa from "papaparse";
import { FiLoader } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

import EmployeeOnboardSuccess from "../../components/global/EmployeeOnboardSuccess";
import { validateManagers } from "../../data/boatValidation";

const AddEmployeeExternal = () => {
  const { managers } = useContext(GlobalContext);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  // const [formError, setFormError] = useState(null);
  const [showManDropdown, setShowManDropdown] = useState(false);

  const [formError, setFormError] = useState({
    index: 0,
    message: null,
  });

  const [data, setData] = useState([
    {
      name: "",
      email: "",
      jobtitle: "",
      location: "",
      manager: null,
      phone: "",
      password: "Test@123",
    },
  ]);

  const checkForFieldErrors = (array) => {
    const requiredFields = ["name", "email", "jobtitle", "location", "phone"];

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
      } else {
        const newData = [...array];
        if (newData[index].errors) {
          delete newData[index].errors;
        }
        setData(newData);
      }
    });

    return errors;
  };

  const handleRemoveBeforeIndex = (index, message) => {
    setFormError(message);
    // Use filter to remove all items before the index
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };

  const addNewEmployee = () => {
    setData((prevData) => [
      ...prevData,
      {
        name: "",
        email: "",
        jobtitle: "",
        location: "",
        manager: null,
        phone: "",
        password: "Test@123",
      },
    ]);
  };

  const removeForm = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((item) => ({
            name: item.name || "",
            email: item.email || "",
            jobtitle: item.jobtitle || "",
            location: item.location || "",
            manager: item.manager || null,
            phone: item.phone || "",
            password: "Test@123",
          }));
          setData(parsedData);
          // checkForError(parsedData);
        },
      });
    }
  };

  const handleChange = (index, field, value) => {
    setShowManDropdown(false);
    const newData = [...data];
    newData[index][field] = value;
    if (newData[index].errors) {
      delete newData[index].errors;
    }
    setData(newData);

    setFormError({
      index: 0,
      message: null,
    });
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

  const { navigate } = useContext(GlobalContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitEmployeeData = async (e) => {
    e.preventDefault();
    const { validatedForms, isValid } = validateManagers(data);
    const errors = checkForFieldErrors(data);
    if (!isValid || errors?.length > 0) {
      setData(validatedForms);
    }
    try {
      if (isValid) {
        const dataToSubmit = data.map((item) => ({
          ...item,
          phone: item.phone.startsWith("+1") ? item.phone : `+1${item.phone}`,
          password: generateRandomPassword(),
        }));
        setSubmitLoading(true);
        const response = await axios.post("/owner/employees/csv", dataToSubmit);
        if (response.status === 200) {
          setIsEmployeeOpen(true);
        }
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);

      const index = error?.response?.data?.index;
      const message = error?.response?.data?.message;
      setFormError({
        index: index,
        message: message,
      });

      // handleRemoveBeforeIndex(index, message);

      // ErrorToast(error?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <>
      <div className="w-full h-screen bg-[#1A293D] text-white p-4 flex flex-col justify-start items-start overflow-y-auto">
        <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
            <div>
              <h3 className="text-[18px] font-bold leading-[24.3px]">
                Add Employee
              </h3>
              {/* <span className="text-[14px] font-normal leading-[21.6px]">
                Experience the power of simplified fleet management today.
                Whether you are assigning task or tracking boat maintenance,
                <br />{" "}
                <span className="text-[16px] font-bold">
                  The Perfect Boat
                </span>{" "}
                has you covered at every step of the journey.
              </span> */}
            </div>
            <div className="w-72 flex justify-end gap-2 items-center">
              <a
                href="https://api.theperfectboat.com/public/Image/Employee_CSV_Template.csv"
                download
              >
                <button
                  disabled={submitLoading}
                  type="button"
                  className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-xl"
                >
                  Download Template
                </button>
              </a>
              {data?.length == 1 && (
                <button
                  disabled={submitLoading}
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
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
            <form
              onSubmit={submitEmployeeData}
              className="flex flex-col gap-6 w-full h-auto"
            >
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
                    <div className="w-full h-auto flex justify-between items-center">
                      <div>
                        {/* <h3 className="text-[18px] font-bold leading-[24.3px]">
                          Add {index === 0 ? "Employee" : "Another Employee"}
                        </h3> */}
                      </div>
                    </div>
                    {index > 0 && (
                      <div className="w-full flex justify-end">
                        <p
                          onClick={() => removeForm(index)}
                          className="px-1.5 hover:text-red-500 rounded-full text-xl font-bold cursor-pointer"
                        >
                          ✕
                        </p>
                      </div>
                    )}
                    <div className="w-full h-auto flex flex-col justify-start items-start gap-4 ">
                      {formError.index == index && formError.message && (
                        <span className="text-red-600 text-sm font-medium">
                          {formError?.message}
                        </span>
                      )}

                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            {"Name"}
                          </label>
                          <div
                            className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px]
                              ${
                                form?.errors?.name
                                  ? "? focus-within:border-red-500"
                                  : "focus-within:border-[#55C9FA]"
                              }  rounded-xl flex items-center `}
                          >
                            <input
                              name="name"
                              type="text"
                              value={form?.name}
                              onChange={(e) => {
                                const value = e.target.value;
                                const capitalizedValue =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
                                handleChange(index, "name", capitalizedValue);
                              }}
                              className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                              placeholder={"Enter Name"}
                            />
                          </div>
                          {form?.errors?.name && (
                            <p className="text-red-500 text-sm">
                              {form?.errors?.name}
                            </p>
                          )}
                        </div>

                        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            {"Email"}
                          </label>
                          <div
                            className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px]
                              ${
                                form?.errors?.email
                                  ? "? focus-within:border-red-500"
                                  : "focus-within:border-[#55C9FA]"
                              } rounded-xl flex items-center `}
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
                          {form?.errors?.email && (
                            <p className="text-red-500 text-sm">
                              {form?.errors?.email}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            {"Job Title"}
                          </label>
                          <div
                            className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px]
                              ${
                                form?.errors?.jobtitle
                                  ? "? focus-within:border-red-500"
                                  : "focus-within:border-[#55C9FA]"
                              } rounded-xl flex items-center `}
                          >
                            <input
                              name="jobTitle"
                              type="text"
                              value={form?.jobtitle}
                              onChange={(e) => {
                                const value = e.target.value;
                                const capitalizedValue =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
                                handleChange(
                                  index,
                                  "jobtitle",
                                  capitalizedValue
                                );
                              }}
                              className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                              placeholder={"Enter Job Title"}
                            />
                          </div>
                          {form.errors?.jobtitle && (
                            <p className="text-red-500 text-sm">
                              {form.errors?.jobtitle}
                            </p>
                          )}
                        </div>
                        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            {"Location"}
                          </label>
                          <div
                            className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px]
                              ${
                                form?.errors?.location
                                  ? "? focus-within:border-red-500"
                                  : "focus-within:border-[#55C9FA]"
                              } rounded-xl flex items-center `}
                          >
                            <input
                              name="location"
                              type="text"
                              value={form?.location}
                              onChange={(e) => {
                                const value = e.target.value;
                                const capitalizedValue =
                                  value.charAt(0).toUpperCase() +
                                  value.slice(1);
                                handleChange(
                                  index,
                                  "location",
                                  capitalizedValue
                                );
                              }}
                              className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                              placeholder={"Enter Location"}
                            />
                          </div>
                          {form.errors?.location && (
                            <p className="text-red-500 text-sm">
                              {form.errors?.location}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                        <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                          <label className="text-[16px] font-medium leading-[21.6px]">
                            {"Phone Number"}
                          </label>
                          <div
                            className={`w-full h-[52px] bg-[#1A293D] outline-none px-0 focus-within:border-[1px]
                              ${
                                form?.errors?.phone
                                  ? "? focus-within:border-red-500"
                                  : "focus-within:border-[#55C9FA]"
                              }  rounded-xl flex items-center `}
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
                                  if (/^\d{0,10}$/.test(value)) {
                                    handleChange(index, "phone", value);
                                  }
                                }}
                                className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white"
                                placeholder={"Enter Phone Number"}
                              />
                            </div>
                          </div>
                          {form.errors?.phone && (
                            <p className="text-red-500 text-sm">
                              {form.errors?.phone}
                            </p>
                          )}
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
                                      handleChange(
                                        index,
                                        "manager",
                                        manager.email
                                      )
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
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="w-full flex justify-end mt-10 items-center gap-4">
                <button
                  disabled={submitLoading}
                  type="button"
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="w-auto h-[52px] text-[#199BD1] hover:text-[#199BD1]/[0.5] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  {"Skip"}
                </button>
                <button
                  disabled={submitLoading}
                  type="button"
                  onClick={addNewEmployee}
                  className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  {"Add More"}
                </button>
                <button
                  disabled={submitLoading}
                  type="submit"
                  className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
                >
                  <div className="flex items-center">
                    <span className="mr-1">Save</span>
                    {submitLoading && (
                      <FiLoader className="animate-spin text-lg mx-auto" />
                    )}
                  </div>
                </button>
                {isEmployeeOpen && (
                  <EmployeeOnboardSuccess
                    isOpen={isEmployeeOpen}
                    setIsOpen={setIsEmployeeOpen}
                  />
                )}
                {/* {isImportCSVOpen && (
              <ImportCSVModal
              isOpen={isImportCSVOpen}
              onClose={() => setIsImportCSVOpen(false)}
               />
               )} */}
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <table className="bg-black">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Job Title</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className="bg-black">
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                  className="bg-black"
                />
              </td>
              <td>
                <input
                  type="email"
                  value={item.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                  className="bg-black"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.jobTitle}
                  onChange={(e) =>
                    handleChange(index, "jobTitle", e.target.value)
                  }
                  className="bg-black"
                />
              </td>
              <td>
                <input
                  type="text"
                  value={item.image}
                  onChange={(e) => handleChange(index, "image", e.target.value)}
                  className="bg-black"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      {/* {Object.keys(errors).length > 0 && (
        <div>
          <h3>Errors:</h3>
          <ul>
            {Object.entries(errors).map(([index, fields]) => (
              <li key={index}>
                Row {parseInt(index) + 1}: Missing {fields.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </>
  );
};

export default AddEmployeeExternal;
