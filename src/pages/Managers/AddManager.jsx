import React, { useContext, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddEmployeeModal from "../../components/global/AddEmployeeModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";


const AddManager = () => {
  const { navigate } = useContext(GlobalContext);
  const [submitLoading,setSubmitLoading] = useState(true);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);

  const [forms, setForms] = useState([0]);
  const {getValues, register, handleSubmit, formState: { errors } }= useForm();

  const addForm = () => { setForms((prev) => [...prev, prev.length])};

  const submitManagerData = async (data) => {
    console.log("🚀 ~  ~ data:", data)
    try {
      setSubmitLoading(true)
      forms.forEach(async (formIndex) => {
        const obj = {
          name: data.forms[formIndex].name,
          email: data.forms[formIndex].email,
          phone: data.forms[formIndex].phoneNumber,
          jobtitle: data.forms[formIndex].jobTitle,
          password: "Test@123"
        }
        const response = await axios.post("/owner/manager", obj);
        console.log("🚀 ~ ~ response:", response)
        if(response.status === 200){
          setIsEmployeeOpen(true);
        }
      })
      
    } catch (error) {
      console.error("Error adding employee:", error);
    } finally{
      setSubmitLoading(false)
    }
  }

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 flex flex-col justify-start items-start overflow-y-auto">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Managers
            </h1>
            <span className="text-[14px] font-normal leading-[21.6px]">
              Experience the power of simplified fleet management today. Whether
              you are assigning task or tracking boat maintenance,
              <br />{" "}
              <span className="text-[16px] font-bold">
                The Perfect Boat
              </span>{" "}
              has you covered at every step of the journey.
            </span>
          </div>
          <button className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-sm font-medium leading-5" onClick={() => setIsImportCSVOpen(true)}>
            Import CSV
          </button>
        </div>
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
        <form className="w-full" onSubmit={handleSubmit(submitManagerData)}>
        
        {forms.map((form, index) => {
            return (
              <div
                key={index}
                className="w-full flex flex-col justify-start items-start gap-6"
              >
                <div className="w-full h-auto flex justify-between items-center">
                  <div>
                    <h3 className="text-[18px] font-bold leading-[24.3px]">
                      Add {index === 0 ? "Manager" : "Another Manager"}
                    </h3>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-col justify-start items-start gap-4 ">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput
                      label="Name"
                      placeholder="Enter Name"
                      type="text"
                      register={register(`forms.${index}.name`, {
                        required: "Name is required",
                      })}
                      error={errors.length && errors?.forms[index]?.name}
                    />
                    <AddFleetInput
                      label="Email"
                      placeholder="Enter Email"
                      type="text"
                      register={register(`forms.${index}.email`, {
                        required: "Email is required",
                      })}
                      error={errors.length && errors?.forms[index]?.email}
                    />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput
                      label="Job Title"
                      placeholder="Enter Job Title"
                      type="text"
                      register={register(`forms.${index}.jobTitle`, {
                        required: "Job Title is required",
                      })}
                      error={errors.length && errors?.forms[index]?.jobTitle}
                    />
                    <AddFleetInput
                      label="Location"
                      placeholder="Enter Location"
                      type="text"
                      register={register(`forms.${index}.location`, {
                        required: "Location is required",
                      })}
                      error={errors.length && errors?.forms[index]?.location}
                    />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput label="Location" placeholder="Enter Location" type="text"
                      register={register(`forms.${index}.location`, { required: "Location is required", })}
                      error={errors.length && errors?.forms[index]?.location}
                    />
                    <AddFleetInput
                      label={"Phone Number"}
                      register={register(`forms.${index}.phoneNumber`, {required: "Please enter your phone number.",
                        pattern: {
                          value: /^\+?[0-9]{11}$/,
                          message: "Please enter a valid phone number.",
                        },})}
                      text={"Phone Number"}
                      placeholder={"Type phone number here"}
                      type={"text"}
                      error={errors.length && errors?.forms[index]?.phoneNumber}
                      onInput={(e) => {
                        e.target.value = e.target.value.replace(/(?!^\+)[^\d]/g, ""); // Allow only digits
                      }}
                    />
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
              onClick={addForm}
              className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Add More"}
            </button>
            <button
            disabled={submitLoading}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center"><span className="mr-1">Save Manager</span>{submitLoading &&(
          <FiLoader className="animate-spin text-lg mx-auto" />)}</div>
            </button>
            <AddEmployeeModal
              isOpen={isEmployeeOpen}
              setIsOpen={setIsEmployeeOpen}
            />
            {isImportCSVOpen && (
              <ImportCSVModal
              isOpen={isImportCSVOpen}
              onClose={() => setIsImportCSVOpen(false)}
               />
               )}
          </div>
        
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddManager;
