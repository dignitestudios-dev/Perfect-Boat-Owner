import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
const AddFleetImage = ({ key, name, type, index, imagePreview, onImageUpload }) => {

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file, index); // Pass the file and index to parent
    }
  };

  return (
    <div className="w-[47%] md:w-[30%] lg:w-[175px] h-auto text-white flex flex-col justify-start items-start gap-2">
      <label
        htmlFor={`imageUpload-${index}`} // Make the ID unique for each field
        className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center cursor-pointer"
      >
        {imagePreview ? (
          <img
          key={key} name={name} type={type}
            src={imagePreview}
            alt="Uploaded preview"
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <FiDownload />
        )}
      </label>
      <input
        id={`imageUpload-${index}`} // Unique ID for each input field
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="w-auto ml-1 flex gap-2 justify-start items-center">
        <input
          type="radio"
          className="w-3 h-3 rounded-full accent-white outline-none border-none"
        />
        <span className="text-[12px] font-medium leading-[16.3px]">
          Set as cover photo
        </span>
      </div>
    </div>
  );
};

export default AddFleetImage;
