import React, { useContext, useState } from "react";
import Papa from "papaparse";
import { LuArrowRightLeft } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";
const AssignEmployeeInternal = () => {
  const { employees, managers } = useContext(GlobalContext);

  const [showEmpDropdown, setShowEmpDropdown] = useState(false);
  const [showManDropdown, setShowManDropdown] = useState(false);

  const [formError, setFormError] = useState({
    index: 0,
    message: null,
  });
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      manager: "",
      employee: "",
    },
  ]);

  const assignNewEmployee = () => {
    setData((prevData) => [
      ...prevData,
      {
        manager: "",
        employee: "",
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
            manager: item.manager || "",
            employee: item.employee || "",
          }));
          setData(parsedData);
        },
      });
      // setCsvUploaded(true);
    }
  };

  const [submitLoading, setSubmitLoading] = useState(false);

  const handleRemoveBeforeIndex = (index) => {
    const filteredData = data?.filter((item, idx) => idx >= index);
    setData(filteredData);
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      setSubmitLoading(true);
      const response = await axios.post(
        "/owner/manager/csv/employees/assign",
        data
      );
      if (response.status === 200) {
        SuccessToast("Managers Assigned to Employees.");
        navigate("/employees");
      }
    } catch (error) {
      setFormError({
        index: error.response?.data?.index,
        message: error?.response?.data?.message,
      });

      // handleRemoveBeforeIndex(index);
      console.error("Error adding employee:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleChange = (index, field, value) => {
    setShowEmpDropdown(false);
    setShowManDropdown(false);

    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
    setFormError({
      index: 0,
      message: null,
    });
  };

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form
        onSubmit={submitData}
        className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]"
      >
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">
              Assign Employees
            </h3>
            <div className="w-72 flex justify-end gap-2 items-center">
              <a
                href="https://api.theperfectboat.com/public/Image/Assign_Employee_CSV_Template.csv"
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
          <div className="w-full flex flex-col justify-start items-start gap-2">
            {data?.map((form, index) => {
              return (
                <React.Fragment key={index}>
                  {formError.index == index && formError.message && (
                    <p className="text-red-600 text-sm font-medium">
                      {formError?.message}
                    </p>
                  )}
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
                  <div
                    key={index}
                    className={`w-full h-auto grid grid-cols-11 gap-4 relative ${
                      formError.index == index &&
                      formError.message &&
                      "border border-red-600 p-2 rounded-xl"
                    }`}
                  >
                    <div className="w-full h-auto flex flex-col col-span-5 gap-1 justify-start items-start relative">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        {"Employee"}
                      </label>
                      <div
                        className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                      >
                        <input
                          type="text"
                          value={form?.employee}
                          onChange={(e) =>
                            handleChange(index, "employee", e.target.value)
                          }
                          onFocus={() => setShowEmpDropdown(index)}
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white autofill:bg-transparent autofill:text-white"
                          placeholder={"Employee Email"}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowEmpDropdown((prev) =>
                              prev === index ? null : index
                            )
                          }
                          className="ml-2 text-white"
                        >
                          {showEmpDropdown === index ? "▲" : "▼"}
                        </button>
                      </div>
                      {showEmpDropdown === index && (
                        <ul
                          className="absolute z-10 w-full bg-gray-700 text-white border border-gray-500 rounded-md 
                        mt-1 max-h-40 overflow-auto top-[75px]"
                        >
                          {employees?.length > 0 ? (
                            employees?.map((emp) => (
                              <li
                                key={emp._id}
                                onClick={() =>
                                  handleChange(index, "employee", emp.email)
                                }
                                className="px-3 py-2 hover:bg-gray-600 cursor-pointer"
                              >
                                {emp.email}
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
                    <div className="col-span-1 w-full  flex justify-center text-2xl text-[#565656] items-center pt-4 ">
                      <LuArrowRightLeft />
                    </div>
                    <div className="w-full h-auto flex flex-col col-span-5 gap-1 justify-start items-start relative">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        {"Manager"}
                      </label>
                      <div
                        className={`w-full h-[52px] bg-[#1A293D] outline-none px-3 focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-xl flex items-center `}
                      >
                        <input
                          type="text"
                          value={form?.manager}
                          onChange={(e) =>
                            handleChange(index, "manager", e.target.value)
                          }
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white autofill:bg-transparent autofill:text-white"
                          placeholder={"Manager's Email"}
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowManDropdown((prev) =>
                              prev === index ? null : index
                            )
                          }
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
                  </div>
                  <span className="w-full h-[0.5px] mt-4 bg-white/10"></span>
                </React.Fragment>
              );
            })}

            <div className="w-full flex justify-end items-center">
              <button
                disabled={submitLoading}
                type="button"
                onClick={assignNewEmployee}
                className="w-28 h-10 rounded-full flex items-center justify-center bg-[#199BD1] text-white text-sm font-medium"
              >
                Add
              </button>
            </div>
          </div>
          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
              disabled={submitLoading}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center">
                <span className="mr-1">
                  Assign {data?.length > 1 ? "All" : ""}
                </span>
                {submitLoading && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignEmployeeInternal;
