import React, { useState } from "react";
import { HiOutlineUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const ImportCSVModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      alert("Please select a valid CSV file.");
    }
  };

  const handleUpload = () => {
    if (file) {
      onClose();
    } else {
      alert("No file selected.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center bg-[#000] bg-opacity-50">
      <div className="relative bg-[#001229] rounded-lg shadow-lg w-full max-w-md p-6 text-center">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-800"
          aria-label="Close modal"
        >
          <IoMdClose className="w-6 h-6" />
        </button>

        {/* Upload Icon */}
        <HiOutlineUpload className="mx-auto mb-4 text-[#36B8F3] w-16 h-16" />

        <h1 className="mb-4 text-xl text-white font-bold">Upload CSV File</h1>

        {/* Custom styled file input */}
        <label className="cursor-pointer inline-flex flex-col items-center justify-center w-full px-6 py-4 mb-4 text-white bg-[#001229] rounded-lg shadow-md hover:bg-gray-700 border-dashed border-2 border-[#36B8F3]">
          <HiOutlineUpload className="mb-2 w-8 h-8" />
          <span className="text-base">Choose File</span>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {file && (
          <p className="mb-4 text-sm text-white">Selected file: {file.name}</p>
        )}

        <button
          onClick={handleUpload}
          className="w-full py-2 px-4 bg-[#36B8F3] hover:bg-[#1a73e8] text-white rounded-lg"
        >
          Upload CSV
        </button>
      </div>
    </div>
  );
};

export default ImportCSVModal;
