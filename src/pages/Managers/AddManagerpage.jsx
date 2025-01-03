import React, { useState, useContext, useRef, useEffect } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import EmployeeDetailModal from "../Employees/EmployeeDetailModal";
import { FaCaretDown } from "react-icons/fa";
import BoatRightsModal from "../Fleet/BoatsRightsModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import { useForm } from "react-hook-form"; // Import useForm
import axios from "../../axios"; // Ensure axios is imported
import { ErrorToast } from "../../components/global/Toaster";
import AddEmployeeModal from "../../components/global/AddEmployeeModal";
import BoatSelectModal from "../Fleet/BoatSelectModal";
import { FiLoader } from "react-icons/fi";
import AddManagersCsv from "../../components/managers/AddManagersCsv";
import Papa from "papaparse";

const AddManagerpage = () => {
  const { navigate, setUpdateManager } = useContext(GlobalContext);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isBoatModalOpen, setIsBoatModalOpen] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [isSelectBoatsModalOpen, setIsSelectBoatsModalOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);

  const [passSelectedEmployee, SetPassSelectedEmployee] = useState([]);

  const [submitLoading, setSubmitLoading] = useState(false);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [passSelectedBoat, setPassSelectedBoat] = useState([]);
  const [inputError, setInputError] = useState({});
  const [csvUploaded, setCsvUploaded] = useState(false);
  const [managerPassword, setManagerPassword] = useState("");

  const [data, setData] = useState([
    {
      name: "",
      email: "",
      jobtitle: "",
      location: "",
      phone: "",
      password: "Test@123",
    },
  ]);

  const locationRef = useRef(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { employee: passSelectedEmployee?.name },
  });

  function generateRandomPassword(length = 4) {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!#$%&";
    let password = "Perfec1@";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setManagerPassword(password);
    return password;
  }

  useEffect(() => {
    const employeeNames = passSelectedEmployee
      ?.map((emp) => emp.name)
      .join(", ");
    setValue("employee", employeeNames);
    generateRandomPassword();
  }, [passSelectedEmployee, setValue]);

  // const toggleLocationFilter = () => {
  //   setLocationFilter((prev) => !prev);
  // };

  const handleClickOutside = (event) => {
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setLocationFilter(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // const openEmployeeModal = () => {
  //   setIsEmployeeModalOpen(true);
  // };

  // const closeEmployeeModal = () => {
  //   setIsEmployeeModalOpen(false);
  // };

  const onClose = () => {
    setIsEmployeeOpen(false);
    navigate("/managers");
  };

  // const openBoatModal = () => {
  //   setIsBoatModalOpen(true);
  // };

  // const closeBoatModal = () => {
  //   setIsBoatModalOpen(false);
  // };

  // const openSelectBoatsModal = () => {
  //   setIsSelectBoatsModalOpen(true);
  // };

  // const closeSelectBoatsModal = () => {
  //   setIsSelectBoatsModalOpen(false);
  // };

  const handleAddManager = async (data) => {
    try {
      setSubmitLoading(true);
      const managerData = {
        email: data.email,
        jobtitle: data.jobtitle,
        location: data.location,
        name: data.name,
        password: managerPassword,
        phone: `+1${data.phone}`,
        ...(passSelectedEmployee?.length > 0 && {
          assignEmployees: passSelectedEmployee.map((employee) => employee.id),
        }),
        // accessBoat: passSelectedBoat?.map(item =>item.id),
      };
      const response = await axios.post("/owner/manager", managerData);
      if (response.status === 200) {
        setUpdateManager((prev) => !prev);
        setIsEmployeeOpen(true);
        reset();
      }
    } catch (error) {
      console.error("Error adding manager:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
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
    <div
      className="w-full h-auto min-h-screen overflow-y-auto text-white p-4 
    pb-20 flex flex-col justify-start items-start"
    >
      <form className="w-full" onSubmit={handleSubmit(handleAddManager)}>
        <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-[18px] font-bold leading-[24.3px]">
              Add Manager
            </h3>
            <div className="w-72 flex justify-between items-center">
              <a
                href="https://api.theperfectboat.com/public/Image/Manager_CSV_Template.csv"
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
          {csvUploaded ? (
            <AddManagersCsv data={data} setData={setData} />
          ) : (
            <>
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
                <AddFleetInput
                  label={"Location"}
                  type="text"
                  placeholder="Enter Location"
                  error={errors.location}
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
                />
              </div>
              <span className="w-full h-[0.5px] bg-white/10"></span>
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <div
                  onClick={() => setIsEmployeeModalOpen(true)}
                  className="flex flex-col gap-4"
                >
                  <AddFleetInput
                    label={"Assign Employee(s)"}
                    type="text"
                    placeholder="Click here to assign"
                    register={register("employee")}
                    error={errors.employee}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229] mt-6">
        <div className="w-full h-auto flex justify-between items-center">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Access Boats{" "}
            <span className="text-[12px] font-normal text-white/50"></span>
            <button
            type="button"
            className="text-[#199BD1] text-sm underline"
            onClick={openSelectBoatsModal}
          >
            {passSelectedBoat.length?"Change":"Add"}
          </button>

          </h3>
        </div>

        <div className="w-full h-auto flex justify-between items-center">
          <div className="flex w-1/2 lg:w-[395px] h-[32px] justify-start items-start text-white/80 text-[13px] rounded-[8px] relative">
            <p>Manager Name have access to all boats by default</p>
          </div>

          <button
          type="button"
            className="h-[35px] w-[70px] flex items-center gap-1 rounded-full justify-center bg-[#1A293D] text-[#199BD1] text-[11px] font-bold"
            onClick={openBoatModal}
          >
            View All
          </button>
        </div>

        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full grid grid-cols-4 text-[11px] font-medium leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">Name</span>
            <span className="w-full flex justify-start items-center">
              Email
            </span>
            <span className="w-full flex justify-start items-center">
              Job Title
            </span>
            <span className="w-full flex justify-start items-center relative">
              <button
              type="button"
                onClick={toggleLocationFilter}
                className="flex items-center gap-1"
              >
                Location
                <FaCaretDown />
              </button>
              <div
                ref={locationRef}
                className={`absolute top-6 left-0 w-[164px] h-auto rounded-md bg-[#1A293D] transition-all duration-300 z-[1000] ${
                  locationFilter ? "scale-100" : "scale-0"
                } flex flex-col gap-3 shadow-lg p-3 justify-start items-start`}
              >
                {["East California Dock", "West Dock", "South Dock"].map(
                  (location, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-start items-start gap-2"
                    >
                      <input
                        type="checkbox"
                        className="w-3 h-3 accent-[#199BD1]"
                      />
                      <span className="text-white/50 text-[11px] font-medium leading-[14.85px]">
                        {location}
                      </span>
                    </div>
                  )
                )}
              </div>
            </span>
          </div>
          {passSelectedBoat?.map((boat,index)=>(
            <div key={index} className="w-full h-10 grid grid-cols-4 border-b border-[#fff]/[0.14] py-1 text-[11px]
             font-medium leading-[14.85px] text-white justify-start items-center">
            <span className="w-full flex justify-start items-center">
              {boat.type}
            </span>
            <span className="w-full flex justify-start items-center">
            {boat.name} 
            </span>
            <span className="w-full flex justify-start items-center">
              {boat.make}
            </span>
            <span className="w-full flex justify-start items-center">
              {boat.location}
            </span>
          </div>
          ))}
          
        </div>
      </div> */}

        {!csvUploaded && (
          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
              disabled={submitLoading}
              type="submit" // Ensure this is a submit button
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center">
                <span className="mr-1">Save</span>
                {submitLoading && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        )}
      </form>
      {isEmployeeModalOpen && (
        <EmployeeDetailModal
          setIsOpen={setIsEmployeeModalOpen}
          isOpen={isEmployeeModalOpen}
          SetPassSelectedEmployee={SetPassSelectedEmployee}
          setInputError={setInputError}
          isMultiple={true}
        />
      )}
      {isBoatModalOpen && (
        <BoatRightsModal
          isOpen={isBoatModalOpen}
          setIsOpen={setIsBoatModalOpen}
        />
      )}
      {isSelectBoatsModalOpen && (
        <BoatSelectModal
          isOpen={isSelectBoatsModalOpen}
          setIsOpen={setIsSelectBoatsModalOpen}
          SetPassSelectedBoat={setPassSelectedBoat}
          isMultiple={true}
          setInputError={setInputError}
        />
      )}
      {isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
      <AddEmployeeModal
        isOpen={isEmployeeOpen}
        setIsOpen={setIsEmployeeOpen}
        createManager={true}
        onClose={onClose}
      />
    </div>
  );
};

export default AddManagerpage;
