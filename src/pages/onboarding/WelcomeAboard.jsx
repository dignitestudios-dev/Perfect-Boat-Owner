import React, { Fragment, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import { FiDownload } from "react-icons/fi";
import { TbCaretDownFilled } from "react-icons/tb";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import AddManagerModal from "../../components/global/AddManagerModal";
import { useForm } from "react-hook-form";
import axios from "../../axios";

const WelcomeAboard = () => {
  
  const boatType = ["Yatch", "Sail Boat", "Console Cruiser", "Cabin Cruiser"];
  const [selectedBoat, setSelectedBoat] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [forms, setForms] = useState([0]);
  const {watch, getValues, register, handleSubmit, formState: { errors } }= useForm();
  const forms1 = watch("forms.0.images");
  console.log("formsImages---", forms1)
  const [fleetPictures, setFleetPictures] = useState([0])

  const handleFleetImage =(idx,index,event) => {
    let setIndex = index+1
    if(setIndex === forms1?.length && setIndex < 5){
      setFleetPictures((prev)=> [...prev, prev?.length])
    }
  }

  const addForm = () => { setForms((prev) => [...prev, prev.length])};
    const removeForm = (index) => {
        if(index > 0){
            setForms((prev) => prev.filter((_, i) => i !== index));
        }
      };

  const handleSelect = (boat,idx) => {
    const updatedBoats = [...selectedBoat];
    updatedBoats[idx] = boat
    setSelectedBoat(updatedBoats);
    setIsOpen(false); // Close dropdown after selection
  };

  const handleImageSelect = (arrayIndex,imageIndex) =>{
    console.log("arr=> ",arrayIndex, "img=> ",imageIndex)
  }
  const [coverImage, setCoverImage] = useState("");

  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    const newPreviews = URL.createObjectURL(file);
    setCoverImage(newPreviews)
  }

  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isAddManagerOpen, setIsAddManagerOpen] = useState(false); // State for new modal
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);


  const submitBoatData = async (formData) => {
    
    try{
      forms.forEach(async (formIndex) => {
        const data = new FormData();
        console.log("form =? ", formData.forms[formIndex].name)
        data.append('name', formData.forms[formIndex].name);
        data.append("make", formData.forms[formIndex].make);
        data.append("size", formData.forms[formIndex].size);
        data.append("location", formData.forms[formIndex].location);
        data.append("boatType", selectedBoat[formIndex]);
        data.append("model", formData.forms[formIndex].model);

        if (formData.forms[formIndex].images) {
          formData.forms[formIndex].images.forEach((file) => {
              if (file) {
                  data.append('images', file[0]); 
              }
          });
        }
        const response = await axios.post('/owner/boat', data)
        if (response.status === 200) {
          console.log("--> ",response?.data)
        }
      })
    }
    catch (error) {
      console.log("Error uploading images:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 overflow-auto">
      <div className="w-full h-auto flex flex-col gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Welcome Aboard
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
          <button
            className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5"
            onClick={() => setIsImportCSVOpen(true)}
          >
            Import CSV
          </button>
        </div>
        <form onSubmit={handleSubmit(submitBoatData)}>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
          {forms.map((form, idx) => (
              <div
                key={idx}
                className="w-full h-auto flex flex-col gap-6 justify-start items-start"
              >
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
                                  onClick={() => handleSelect(boat, idx)}
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
                      <AddFleetInput label="Name" placeholder="Enter Name" type="text"
                        register={register(`forms.${idx}.name`, { required: "Name is required",})}
                        error={errors.name}
                      />

                      <AddFleetInput label="Make" placeholder="Enter Make" type="text"
                        register={register(`forms.${idx}.make`, {required: "Make is required", })}
                        error={errors.make}
                      />
                    </div>
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                      <AddFleetInput label="Model" placeholder="Enter Model" type="text"
                        register={register(`forms.${idx}.model`, { required: "Model is required",})}
                        error={errors.model}
                      />
                      <AddFleetInput label="Size (m)" placeholder="Enter Size" type="text"
                        register={register(`forms.${idx}.size`, { required: "Size is required",})}
                        error={errors.size}
                      />
                      <AddFleetInput
                        label="Location" placeholder="Enter Location" type="text"
                        register={register(`forms.${idx}.location`, { required: "Location is required",})}
                        error={errors.location}
                      />
                    </div>
                  </div>
                </div>

                {/* <div className="w-full md:w-[400px] flex flex-col gap-6">
                <h3 className="text-[18px] font-bold leading-[24.3px]">Select Manager</h3>
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="w-full h-[52px] bg-[#1A293D] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  Click Here To Select Manager
                </button>
              </div> */}

                <div className="w-full flex flex-col justify-start items-start gap-4">
                  <>
                    <h3 className="text-[18px] font-bold leading-[24.3px]">
                      Upload Pictures{" "}
                      <span className="text-[14px] font-normal leading-[24px]">
                        (Supported Files Type: JPG, PNG, GIF)
                      </span>
                    </h3>
                    <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                    {[...Array(3)].map((_, imageIndex) => (
                      <div key={imageIndex}>
                          <label 
                          htmlFor="cover-image"
                            className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                            text-3xl flex items-center justify-center cursor-pointer"
                          >
                            {formsImages && (
                              <>
                                {formsImages[idx]?.length > 0 &&
                                formsImages[imageIndex][0] ? (
                                  <img src={URL.createObjectURL(formsImages[imageIndex][0])}
                                    alt={`Uploaded preview ${imageIndex}`}
                                    className="w-full h-full object-cover rounded-xl"
                                  />) : (<FiDownload />)}
                              </>
                            )}
                          </label>
                          <input type="file" className="hidden" id="cover-image"
                          accept="image/*" onChange={(e)=>handleCoverImage(e)}
                          key={imageIndex} name={`forms.${idx}.images.${imageIndex}`}
                          {...register(`forms.${idx}.images.${imageIndex}`, { required: false,
                            onChange: (e) => {handleFleetImage(idx,imageIndex, e)}
                           })}/>
                          <div className="w-auto ml-1 flex gap-2 justify-start items-center">
                            <input type="radio"
                            onChange={() => handleImageSelect(idx,imageIndex)} 
                            className="w-3 h-3 rounded-full accent-white outline-none border-none"/>
                            <span className="text-[12px] font-medium leading-[16.3px]"> Set as cover photo </span>
                          </div>
                        </div>
                      ))}
                    </div>

                  </>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
              type="button"
              onClick={addForm}
              className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              Add Another Boat
            </button>
            <button
              // onClick={() => {
              //   setIsAddManagerOpen(true);
              // }}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              Save Fleet
            </button>
          </div>
        </form>
      </div>

      {/* ManagerDetailModal Component */}
      {isManagerOpen && <ManagerDetailModal setIsOpen={setIsManagerOpen} />}

      {/* AddManagerModal Component */}
      {isAddManagerOpen && (
        <AddManagerModal
          isOpen={isAddManagerOpen}
          setIsOpen={setIsAddManagerOpen}
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

export default WelcomeAboard;
