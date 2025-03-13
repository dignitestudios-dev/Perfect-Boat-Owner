import React, { useState } from "react";
import BlogsCard from "./BlogsCard";
import { FaRegEdit } from "react-icons/fa";
import DeleteBlog from "../../pages/TidesTalesAndGuide/DeleteBlog";
import { useNavigate } from "react-router-dom";

export const BlogsContainer = ({ data, loading, onDeleteBlog }) => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null); // Store the blog ID to be deleted

  const handleWriteClick = () => {
    navigate("/blog/createnewblog");
  };

  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedBlogId(null);
  };

  const handleDeleteBlog = () => {
    if (selectedBlogId) {
      onDeleteBlog(selectedBlogId); // Call the delete function with the selected blog ID
      closeDeleteModal();
    }
  };

  return (
    <div className="h-auto w-full flex flex-col justify-start items-center font-satoshi">
      <div className="w-full h-[237px] rounded-t-[18px] flex flex-col gap-1 items-center justify-center bg-gradient text-white">
        <h2 className="text-[36px] font-bold leading-[48.6px]">
          Tides, Tales & Guides
        </h2>
        <p className="text-[20px] font-medium leading-[27px] text-center">
          Set Sail Through Stories: Where Every Wave Carries A Tale
        </p>
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4 p-4 lg:p-6 rounded-b-[18px] bg-[#001229]">
        <div className="w-full flex justify-end items-center">
          <button
            className="flex justify-center items-center gap-2 bg-[#199BD1] hover:bg-[#199BD1] text-white rounded-[12px] py-2 px-4"
            onClick={handleWriteClick}
          >
            <FaRegEdit />
            <span className="capitalize text-[13px] font-semibold">Write</span>
          </button>
        </div>

        {/* Show loading message while loading */}
        {loading && <div>Loading...</div>}

        {/* Show message if no blogs available */}
        {data?.length === 0 && !loading && (
          <div className="text-gray-500">No blogs available.</div>
        )}

        <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Map through the data array and pass individual blog objects to BlogsCard */}
          {data?.map((blog, index) => (
            <BlogsCard key={index} blog={blog} />
          ))}
        </div>

        {/* Render DeleteBlog modal with onConfirm to handle deletion */}
        {/* <DeleteBlog isOpen={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={handleDeleteBlog} /> */}
      </div>
    </div>
  );
};
