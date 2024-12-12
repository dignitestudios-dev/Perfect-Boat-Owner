import React, { useContext, useState } from "react";
import Papa from "papaparse";
import { FiLoader } from "react-icons/fi";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import AddEmployeeModal from "../../components/global/AddEmployeeModal";
import EmployeeOnboardSuccess from "../../components/global/EmployeeOnboardSuccess";

const AddEmployeeExternal = () => {
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
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
  const [error, setError] = useState({});
  const handleRemoveBeforeIndex = (index) => {
    // Use filter to remove all items before the index
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };
  const checkForErrors = (parsedData) => {
    const newErrors = parsedData.reduce((acc, item, index) => {
      const errorFields = [];
      if (!item.name) errorFields.push("name");
      if (!item.email) errorFields.push("email");
      if (!item.jobtitle) errorFields.push("jobtitle");
      if (!item.phoneNumber) errorFields.push("phone");
      if (!item.location) errorFields.push("location");

      // if (!item.image) errorFields.push("image");

      if (errorFields.length > 0) {
        acc[index] = errorFields;
      }
      return acc;
    }, {});

    setError(newErrors);
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
            phone: item.phoneNumber || "",
            password: "Test@123",
          }));
          setData(parsedData);
          // checkForError(parsedData);
        },
      });
    }
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const { navigate } = useContext(GlobalContext);
  const [submitLoading, setSubmitLoading] = useState(false);

  const submitEmployeeData = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = data.map((item) => ({
        ...item,
        phone: item.phone.startsWith("+1") ? item.phone : `+1${item.phone}`, // Add +1 only if not already present
      }));
      setSubmitLoading(true);
      const response = await axios.post("/owner/employees/csv", dataToSubmit);
      if (response.status === 200) {
        setIsEmployeeOpen(true);
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
    <>
      <div className="w-full h-screen bg-[#1A293D] text-white p-4 flex flex-col justify-start items-start overflow-y-auto">
        <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
            <div>
              <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
                Employee
              </h1>
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
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
            <form
              onSubmit={submitEmployeeData}
              className="flex flex-col gap-6 w-full h-auto"
            >
              {data?.map((form, index) => {
                return (
                  <div
                    key={index}
                    className="w-full flex flex-col justify-start items-start gap-6"
                  >
                    <div className="w-full h-auto flex justify-between items-center">
                      <div>
                        <h3 className="text-[18px] font-bold leading-[24.3px]">
                          Add {index === 0 ? "Employee" : "Another Employee"}
                        </h3>
                      </div>
                    </div>
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
                              name="name"
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
                              name="jobTitle"
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
                              name="location"
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
                                  if (/^\d{0,10}$/.test(value)) {
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
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="w-full flex justify-end mt-10 items-center gap-4">
                {/* <button
              type="button"
              onClick={() => {
                navigate("/add-employee");
              }}
              className="w-auto h-[52px] text-[#fff]/[0.5] hover:text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Skip"}
            </button> */}
                <button
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
