import React from "react";
import { MdAccessTime } from "react-icons/md";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
import { useNavigate } from "react-router-dom";

const DeleteBlog = ({ isOpen, onClose, id }) => {
  const navigate = useNavigate();
  const handleDeletion = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(`/owner/blog/${id}`);
      if (response.status === 200) {
        // Update the blogsData to remove the deleted blog
        SuccessToast("Blog deleted successfully");
        navigate("/blogs");
        onClose();
      }
    } catch (error) {
      ErrorToast(error?.response?.data?.message);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
      <div className="relative bg-[#1A293D] rounded-lg shadow-md w-[380px] h-[218px] flex flex-col p-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl font-bold text-[#199BD1] hover:text-gray-800"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[18px] text-white font-bold text-left mt-[-22px] mb-2">
            Delete Blog
          </p>
          <p className="text-[16px] text-white text-left">
            Are you sure you want to delete this blog? This action cannot be
            undone
          </p>
        </div>

        {/* Container for buttons aligned to the bottom right */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            type="button"
            className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]"
          >
            No
          </button>
          <button
            onClick={(e) => {
              handleDeletion(e);
            }}
            type="button"
            className="text-[#199BD1] font-bold py-2 px-4 rounded-lg text-[16px]"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;
