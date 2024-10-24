import React, { useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import { TbCaretDownFilled } from "react-icons/tb";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import CongratsModal from "./CongratsModal";
import { useForm } from "react-hook-form";
import { FiDownload, FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";

const AddFleet = () => {
  const boatType = ["Yatch", "Sail Boat", "Console Cruiser", "Cabin Cruiser"];

  const navigate = useNavigate()
  const [selectedBoat, setSelectedBoat] = useState("");
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
  const [coverImage, setCoverImage] = useState("")

  const [submitLoading, setSubmitLoading] = useState(false)
  
  const [fleetPictures, setFleetPictures] = useState([0])

  const [passSelectedManager, SetPassSelectedManager] = useState("")
  console.log("🚀 ~ AddFleet ~ passSelectedManager:", passSelectedManager)
  const [passSelectedManagers, SetPassSelectedManagers] = useState([])

  const {watch, setValue, register, handleSubmit, formState: { errors } }= useForm();

  const formsImages = watch("formsImages");

  const handleSelect = (boat) => {
    setSelectedBoat(boat);
  };

  const handleImageSelect = (imageIndex) =>{
    setCoverImage(imageIndex)
  }

  const handleFleetImage =(index,event) => {
    let setIndex = index+1
    if(setIndex === formsImages?.length && setIndex < 5){
      setFleetPictures((prev)=> [...prev, prev?.length])
    }
  }

  const submitBoatData = async (formData) => {
    if(!coverImage){
      ErrorToast("Select cover image");
      return;
    }
    try{
      setSubmitLoading(true)
        const data = new FormData();
        console.log("form =? ", formData)
        data.append('name', formData.name);
        data.append("make", formData.make);
        data.append("size", formData.size);
        data.append("model", formData.model);
        data.append("location", formData.location);
        data.append("boatType", selectedBoat);
        // data.append("boatType", selectedBoat[formIndex]);
        if(passSelectedManagers){
          passSelectedManagers.forEach((manager)=>{
            data.append("managers",manager.id)
          })}

        if (formData.formsImages) {
          formData.formsImages.forEach((fileList,index) => {
              if (fileList.length > 0 && fileList[0]) {
                if(coverImage === index){
                  data.append('cover',fileList[0])
                }
                else{
                  data.append('pictures', fileList[0]);
                }
              }
          });
        }
        const response = await axios.post('/owner/boat', data)

        if (response?.status === 200) {
          console.log("--> ",response?.data)
          setIsCongratsOpen(true);
        }
    }
    catch (error) {
      ErrorToast(error?.response?.data?.message)
      console.log("Error uploading images:", error);
    }
    finally{
      setSubmitLoading(false)
    }
  };

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 overflow-auto">
      <div className="w-full h-auto flex flex-col gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Add Fleet
            </h1>
          </div>
          <button
            className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5"
            onClick={() => setIsImportCSVOpen(true)}
          >
            Import CSV
          </button>
        </div>
        <form onSubmit={handleSubmit(submitBoatData)}>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
            <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        Boat Type
                      </label>
                      <div className="group  w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl hover:rounded-b-none hover:rounded-t-xl relative">
                        <span className="text-gray-400">
                          {selectedBoat || "--Select--"}
                        </span>
                        <span className="text-gray-400">
                          <TbCaretDownFilled className="group-hover:rotate-180 " />
                        </span>
                        <div
                          className="group-hover:flex  flex-col justify-start items-start gap-3 transition-all
                         duration-700 px-5 py-3 hidden absolute -bottom-32 shadow-xl left-0 w-full h-32 max-h-32 bg-[#21344C] rounded-b-2xl "
                        >
                          <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-3">
                            {boatType.map((boat, index) => (
                              <button
                                type="button"
                                key={index}
                                onClick={() => handleSelect(boat)}
                                className={`w-full text-left px-4 py-2 text-gray-300 hover:bg-[#1A293D] ${
                                  selectedBoat === boat
                                    ? "bg-[#1A293D] text-white"
                                    : ""
                                }`}
                              >
                                {boat}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <AddFleetInput
                      label="Name"
                      placeholder="Enter Name"
                      type="text"
                      register={register(`name`, {
                        required: "Name is required",
                      })}
                      error={errors.name}
                    />

                    <AddFleetInput
                      label="Make"
                      placeholder="Enter Make"
                      type="text"
                      register={register(`make`, {
                        required: "Make is required",
                      })}
                      error={errors.make}
                    />
                    {/* <AddFleetInput label={"Name"} />
                    <AddFleetInput label={"Make"} /> */}
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                    <AddFleetInput
                      label="Model"
                      placeholder="Enter Model"
                      type="text"
                      register={register(`model`, {
                        required: "Model is required",
                      })}
                      error={errors.model}
                    />
                    <AddFleetInput
                      label="Size (m)"
                      placeholder="Enter Size"
                      type="number"
                      register={register(`size`, {
                        required: "Size is required",
                      })}
                      error={errors.size}
                    />
                    <AddFleetInput
                      label="Location"
                      placeholder="Enter Location"
                      type="text"
                      register={register(`location`, {
                        required: "Location is required",
                      })}
                      error={errors.location}
                    />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[400px] flex flex-col gap-6">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  Select Manager
                </h3>
                <button
                  type="button"
                  onClick={() => setIsManagerOpen(true)}
                  className="w-full h-[52px] bg-[#1A293D] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  {passSelectedManagers.length > 0 ?(
                    passSelectedManagers ? passSelectedManagers?.map(item=> item.name+","):  "Click Here To Select Manager"
                  ):(
                   passSelectedManager ? passSelectedManager.name : "Click Here To Select Manager"
                  )}
                    
                </button>
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  Upload Pictures
                  <span className="text-[14px] font-normal leading-[24px] mr-1">
                    (Supported Files Type: JPG, PNG, GIF)
                  </span>
                </h3>
                <>
                  <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                    {fleetPictures?.map((_, imageIndex) => {
                      const isSelected = coverImage === imageIndex;
                      return (
                        <div key={imageIndex}>
                          <label
                            htmlFor={`form-image-${imageIndex}`}
                            className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                              text-3xl flex items-center justify-center cursor-pointer"
                          >
                            {formsImages && (
                              <>
                                {formsImages[imageIndex]?.length > 0 &&
                                formsImages[imageIndex][0] ? (
                                  <img src={URL.createObjectURL(formsImages[imageIndex][0])}
                                    alt={`Uploaded preview ${imageIndex}`}
                                    className="w-full h-full object-cover rounded-xl"
                                  />) : (<FiDownload />)}
                              </>
                            )}
                          </label>
                          <input key={imageIndex} name={`formsImages.${imageIndex}`} id={`form-image-${imageIndex}`}
                            accept="image/*" className="hidden" type="file"
                            {...register(`formsImages.${imageIndex}`, { 
                              required: false, onChange: (e) => {handleFleetImage(imageIndex, e)}
                            })}
                          />
                          <div className="w-auto ml-1 mt-1 flex gap-2 justify-start items-center">
                            <input type="radio" checked={isSelected}
                              onChange={() => handleImageSelect(imageIndex)}
                              className="w-3 h-3 rounded-full accent-white outline-none border-none"
                            />
                            <span className="text-[12px] font-medium leading-[16.3px]">
                              Set as cover photo
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
            disabled={submitLoading}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center"><span className="mr-1">Save Fleet</span>{submitLoading &&(
          <FiLoader className="animate-spin text-lg mx-auto" />)}</div>
            </button>
          </div>
        </form>
      </div>

      {/* ManagerDetailModal Component */}
      {isManagerOpen && (
        <ManagerDetailModal
        isMultiple={true}
          setIsOpen={setIsManagerOpen}
          SetPassSelectedManager={SetPassSelectedManager}
          SetPassSelectedManagers={SetPassSelectedManagers}
        />
      )}

      {/* CongratsModal Component */}
      {isCongratsOpen && (
        <CongratsModal
          isOpen={isCongratsOpen}
          onClose={() => {setIsCongratsOpen(false); navigate("/boats")}}
        />
      )}

      {/* ImportCSVModal Component */}
      {isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
    </div>
  );
};

export default AddFleet;
