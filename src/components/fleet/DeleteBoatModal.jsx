import React, { useState } from "react";
import { IoMdWarning } from "react-icons/io";
import axios from "../../axios"; // Adjust import path as necessary
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { FiLoader } from "react-icons/fi";

const DeleteBoatModal = ({ isOpen, onClose, _id, refreshTasks }) => {
  const [deleteLoad, setDeleteLoad] = useState(false);

  // Function to handle the deletion API call
  const handleDelete = async () => {
    setDeleteLoad(true);
    try {
      const response = await axios.delete(`/owner/task/${_id}`);
      SuccessToast("Deleted successfully");

      refreshTasks(); //
      onClose(); //
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setDeleteLoad(false);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-[#02203A] rounded-lg shadow-md w-full max-w-md">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-[#199BD1] hover:text-gray-900"
          aria-label="Close modal"
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="p-6 text-center">
          <IoMdWarning className="mx-auto mb-4 text-yellow-500 w-14 h-14" />
          <h2 className="mb-2 text-xl font-semibold text-white">
            Are you sure?
          </h2>
          <p className="mb-4 text-white">
            Do you really want to delete this boat? This action cannot be
            undone.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#1A293D] hover:bg-gray-900 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={deleteLoad}
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              <div className="flex items-center">
                <span className="mr-1">Delete</span>
                {deleteLoad && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBoatModal;

const DeletedModal = ({ isOpen, onClose, _id, refreshTasks }) => {};

// export default DeletedModal;
