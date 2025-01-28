import React, { useState } from "react";
import Papa from "papaparse";
import { LuArrowRightLeft } from "react-icons/lu";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
const AssignEmployeeInternal = () => {
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

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
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
            <div className="w-72 flex justify-between items-center">
              <a
                href="https://api.theperfectboat.com/public/Image/Assign_Employee_CSV_Template.csv"
                download
              >
                <button
                  type="button"
                  className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-xl"
                >
                  Download Template
                </button>
              </a>
              <button
                type="button"
                className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-sm font-medium leading-5"
                onClick={() => {
                  document.getElementById("input").click();
                }}
              >
                Import CSV
              </button>
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
                <React.Fragment>
                  <div
                    key={index}
                    className="w-full h-auto grid grid-cols-11 gap-4 relative"
                  >
                    <div className="w-full h-auto flex flex-col col-span-5 gap-1 justify-start items-start">
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
                          className="w-full h-full bg-transparent outline-none text-white placeholder:text-gray-400 autofill:bg-transparent autofill:text-white autofill:bg-transparent autofill:text-white"
                          placeholder={"Employee Email"}
                        />
                      </div>
                      {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.email}
                            </p>
                          )} */}
                    </div>
                    <div className="col-span-1 w-full  flex justify-center text-2xl text-[#565656] items-center pt-4 ">
                      <LuArrowRightLeft />
                    </div>
                    <div className="w-full h-auto flex flex-col col-span-5 gap-1 justify-start items-start">
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
                      </div>
                      {/* {errors.length && (
                            <p className="text-red-500 text-sm">
                              {errors?.forms[index]?.email}
                            </p>
                          )} */}
                    </div>
                  </div>
                  <span className="w-full h-[0.5px] mt-4 bg-white/10"></span>
                </React.Fragment>
              );
            })}

            <div className="w-full flex justify-end items-center">
              <button
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
