import React, {
  Fragment,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Papa from "papaparse";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import AssignTaskModal from "../../components/tasks/modal/AssignTaskModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import axios from "../../axios"; // Ensure axios is imported
import { useForm } from "react-hook-form"; // Import useForm
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";
import AddEmployeeCsv from "../../components/employees/AddEmployeeCsv";

const AddEmployee = () => {
  const { navigate, setUpdateEmployee } = useContext(GlobalContext);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [employeePassword, setEmployeePassword] = useState("");

  const [isImportCSVModalOpen, setIsImportCSVModalOpen] = useState(false);
  const [passSelectedManager, SetPassSelectedManager] = useState("");
  const [selectedManager, setSelectedManager] = useState(null);
  // const [tasks,setTasks] = useState([])
  // const [tasksError,setTasksError] = useState("")
  const [managerError, setManagerError] = useState(null);

  const [addLoading, setAddLoading] = useState(false);
  const [csvUploaded, setCsvUploaded] = useState(false);

  function generateRandomPassword(length = 4) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&";
    let password = "Perfect@1";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setEmployeePassword(password);
    return password;
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { manager: passSelectedManager?.name },
  });

  useEffect(() => {
    setManagerError(null);
    setValue("manager", passSelectedManager?.name);
    generateRandomPassword();
  }, [passSelectedManager?.name, setValue]);

  const openManagerModal = () => {
    setIsManagerModalOpen(true);
  };

  const closeImportCSVModal = () => {
    setIsImportCSVModalOpen(false);
  };

  const handleAddEmployee = async (data) => {
    // setTasksError("");
    if (!passSelectedManager?.id) {
      setManagerError("Please select manager");
      return;
    }
    // if(!tasks || tasks.length === 0){
    //   setTasksError("At least one task must be assigned")
    //   return
    // }

    try {
      setAddLoading(true);
      const employeeData = {
        ...data,
        phone: data.phone.startsWith("+1") ? data.phone : `+1${data.phone}`,
        password: employeePassword,
        manager: passSelectedManager?.id,
        // tasks: tasks?.map(item=>item?.id)
      };
      const response = await axios.post("/owner/employees", employeeData);
      if (response.status === 200) {
        setUpdateEmployee((prev) => !prev);
        SuccessToast("Employee Created");
        navigate("/employees", "Employee List");
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
      console.error("Error adding employee:", error);
      // Handle error (set error message, etc.)
    } finally {
      setAddLoading(false);
    }
  };

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
      setCsvUploaded(true);
    }
  };

  return (
    <div className="w-full h-auto min-h-screen overflow-y-auto bg-[#1A293D] text-white p-4 pb-20 flex flex-col justify-start items-start">
      <form
        onSubmit={handleSubmit(handleAddEmployee)}
        className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]"
      >
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start ">
          <div className="w-full h-auto flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">
              Add Employee
            </h3>
            <div className="w-72 flex justify-end items-center gap-2">
              <a
                href="https://api.theperfectboat.com/public/Image/Employee_CSV_Template.csv"
                download
              >
                <button
                  disabled={addLoading}
                  type="button"
                  className="bg-[#1A293D] text-[#36B8F3] py-2 px-4 rounded-xl"
                >
                  Download Template
                </button>
              </a>
              {data?.length == 1 && (
                <button
                  disabled={addLoading}
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
            <AddEmployeeCsv data={data} setData={setData} />
          ) : (
            <Fragment>
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <AddFleetInput
                  label={"Name"}
                  type="text"
                  placeholder="Enter Name"
                  register={register("name", {
                    onChange: (e) => {
                      const value = e.target.value;
                      e.target.value =
                        value.charAt(0).toUpperCase() + value.slice(1);
                    },
                    setValueAs: (v) =>
                      String(v[0]).toUpperCase() + String(v).slice(1),
                    required: "Please enter your name.",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: "Please enter a valid name.",
                    },
                  })}
                  error={errors.name}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, "");
                  }}
                />
                <AddFleetInput
                  label={"Email"}
                  type="email"
                  placeholder="Enter Email"
                  register={register("email", {
                    required: "Please enter your email address.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email address.",
                    },
                  })}
                  error={errors.email}
                />
              </div>
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <AddFleetInput
                    label={"Job Title"}
                    type="text"
                    placeholder="Enter Job Title"
                    register={register("jobtitle", {
                      onChange: (e) => {
                        const value = e.target.value;
                        e.target.value =
                          value.charAt(0).toUpperCase() + value.slice(1);
                      },
                      setValueAs: (v) =>
                        String(v[0]).toUpperCase() + String(v).slice(1),
                      required: "Please enter your job title",
                    })}
                    error={errors.jobtitle}
                  />
                </div>
                <AddFleetInput
                  label={"Location"}
                  type="text"
                  placeholder="Enter location"
                  maxLength={80}
                  register={register("location", {
                    onChange: (e) => {
                      const value = e.target.value;
                      e.target.value =
                        value.charAt(0).toUpperCase() + value.slice(1);
                    },
                    setValueAs: (v) =>
                      String(v[0]).toUpperCase() + String(v).slice(1),
                    required: "Please enter a location",
                    minLength: {
                      value: 2,
                      message: "Location must be at least 2 characters long",
                    },
                  })}
                  error={errors.location}
                />
              </div>
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <AddFleetInput
                  label={"Phone Number"}
                  register={register(`phone`, {
                    required: "Please enter your phone number.",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid phone number.",
                    },
                  })}
                  text={"Phone Number"}
                  placeholder={"Type phone number here"}
                  maxLength="10"
                  type={"text"}
                  error={errors?.phone}
                  isPhone={true}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/[^\d]/g, "");
                  }}
                />
              </div>
              <span className="w-full h-[0.5px] bg-white/10"></span>
              <div className="w-full flex flex-col justify-start items-start gap-6"></div>
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      Assign Manager
                    </label>
                    <button
                      disabled={addLoading}
                      type="button"
                      onClick={openManagerModal}
                      className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 
                  focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                    >
                      <span className="w-full text-gray-400 flex justify-start">
                        {passSelectedManager?.name || "Click here to assign"}
                      </span>
                    </button>
                    {managerError && (
                      <p className="text-red-500">{managerError}</p>
                    )}
                  </div>

                  {/* <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">
                  Assign Task
                </label>
                <button
                type="button"
                  onClick={openTaskModal}
                  className="w-full h-[52px] bg-[#1A293D] disabled:text-white/50 outline-none px-3 
                  focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  <span className="w-full text-gray-400 flex justify-start">
                    {tasks.length>0 ? (tasks.map(item=>item?.name+" ,")):("Click here to assign")}
                  </span>
                </button>
              {tasksError && <p className="text-red-500">{tasksError}</p>}
              </div> */}
                </div>
              </div>
            </Fragment>
          )}
        </div>
        {!csvUploaded && (
          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
              disabled={addLoading}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center">
                <span className="mr-1">Save</span>
                {addLoading && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        )}
      </form>
      {isManagerModalOpen && (
        <ManagerDetailModal
          setIsOpen={setIsManagerModalOpen}
          SetPassSelectedManager={SetPassSelectedManager}
          selectedManager={selectedManager}
          setSelectedManager={setSelectedManager}
        />
      )}
      {/* {isTaskModalOpen && (
        <AssignTaskModal isOpen={isTaskModalOpen} onClose={closeTaskModal} setTasks={setTasks} setTasksError={setTasksError} />
      )} */}
      {isImportCSVModalOpen && (
        <ImportCSVModal
          isOpen={isImportCSVModalOpen}
          onClose={closeImportCSVModal}
        />
      )}
    </div>
  );
};

export default AddEmployee;
