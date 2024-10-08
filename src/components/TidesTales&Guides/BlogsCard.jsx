import React, { useContext, useState } from "react";
import { GlobalContext } from "../../contexts/GlobalContext";
import { GoKebabHorizontal } from "react-icons/go";

const BlogsCard = ({ setDeleteModalOpen, blog }) => {
  console.log("blog~~ ", blog)
  const { navigate } = useContext(GlobalContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleDotsClick = (event) => {
    event.stopPropagation();
    setDropdownVisible((prev) => !prev);
  };

  const handleEditClick = (event) => {
    event.stopPropagation();
    navigate("/updateblog");
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    setDeleteModalOpen(true);
  };

  return (
    <div
      onClick={() => navigate(`/blogs/${blog._id}`, "Tides, Tales & Guides")}
      className="w-full h-[334px] flex flex-col justify-start items-start rounded-[16px] shadow-md bg-[#1A293D] relative"
    >
      <div className="relative w-full h-[220px] rounded-t-[16px] overflow-hidden">
        <img
          src={blog?.cover} 
          alt="blog_image"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-3">
          <button onClick={handleDotsClick} className="text-white text-lg">
            <GoKebabHorizontal className="rotate-90" />
          </button>
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-32 bg-[#1A293D] text-white rounded-md shadow-lg">
              <button
                onClick={handleEditClick}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
              >
                Edit
              </button>
              <button
                onClick={handleDeleteClick}
                className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-[calc(100%-220px)] flex flex-col gap-2 justify-start items-start p-4">
        <span className="text-[10px] font-medium text-[#199BD1]">
          Author | {new Date(blog.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>

        <div className="relative w-full flex flex-col justify-start items-start gap-2">
          
          
            <div >
              <h1 className="text-[16px] font-bold leading-[21.6px] text-white">
                {blog?.title}
              </h1>
              <p className="text-[12px] font-normal leading-[16.2px] text-white/50">
                {blog?.story[0]?.paragraph?.substring(0, 100)}...
              </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsCard;
