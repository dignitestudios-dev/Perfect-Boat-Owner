import React, { useContext, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import DeleteBlog from "./DeleteBlog";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const BlogDetails = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { state } = useLocation();

  const [deleteId, setDeleteId] = useState(null);

  const handleDotsClick = (event) => {
    event.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleEditClick = (id, blog) => {
    navigate(`/updateblog/${id}`, { state: blog });
  };

  const handleDeleteClick = (id) => {
    setIsDeleteModalOpen(true);
    setDeleteId(id);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-4 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 rounded-[18px] bg-[#001229]">
        <div className="w-full h-[299px] relative rounded-t-[18px]">
          <img
            src={`${state?.cover}`}
            alt="blogimage"
            className="w-full h-full object-contain bg-[#081629] rounded-t-[18px]"
          />
          <button
            onClick={() => navigate("/blogs", "Tides, Tales & Guides")}
            className="w-[40px] h-[40px] absolute top-3 left-3 rounded-full bg-[#199BD1]/[0.46] text-white text-2xl flex items-center justify-center"
          >
            <IoIosArrowRoundBack />
          </button>
        </div>

        <div className="w-full h-auto flex flex-col justify-start items-start p-2 lg:p-6">
          <div className="w-full h-auto flex flex-col border-b-[1px] border-white/10 justify-start items-start pt-2 pb-12 gap-4 relative">
            <div className="w-full flex items-center justify-between relative">
              <span className="text-[10px] font-medium text-[#199BD1]">
                {state?.isAdmin ? "Admin" : "Owner"} |{" "}
                {moment(state?.createdAt).format("MM-DD-YYYY")}
              </span>
              <span className="font-satoshi text-[12px] font-normal text-white/50 mr-[140px]">
                {state?.imageTitle}
              </span>
              <button onClick={handleDotsClick} className="text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v.01M12 12v.01M12 18v.01"
                  />
                </svg>
              </button>
              {dropdownVisible && (
                <div className="absolute right-0 top-[calc(100%+0.5rem)] mt-2 w-32 bg-[#1A293D] text-white rounded-md shadow-lg">
                  <button
                    onClick={() => handleEditClick(state?._id, state)}
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(state?._id)}
                    className="block w-full text-left px-4 py-2 text-xs hover:bg-[#000]/10"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <h2 className="font-satoshi text-[28px] font-bold text-white leading-[37.7px]">
              {state?.title}
            </h2>
            <span className="font-satoshi text-[16px] font-normal leading-[21.6px] text-white/80">
              {state?.subTitle}
            </span>
          </div>

          <div className="font-satoshi w-full h-auto flex justify-start items-start py-6">
            <div
              className={`w-full ${
                state?.story.length < 2500 ? "h-[150px]" : "h-auto"
              } relative`}
              dangerouslySetInnerHTML={{ __html: state?.story }}
            />
          </div>

          {/* <div className="w-full flex flex-col mt-10 justify-start items-start gap-3">
            <h3 className="text-[20px] font-medium leading-[27px]">
              Explore More Maritime Musings
            </h3>
            <div className="w-auto flex justify-start items-start gap-4">
              <div className="w-[401px] h-[93px] rounded-[12px] bg-[#1A293D] flex gap-3 justify-start items-center">
                <img
                  src={AuthMockup}
                  alt="blog_image"
                  className="w-[125px] h-full rounded-[12px]"
                />
                <div className="w-auto flex flex-col gap-2 pr-2 justify-start items-start">
                  <span className="text-[10px] font-medium text-[#199BD1]">
                    Author name | December 20th, 2023
                  </span>
                  <h2 className="text-[16px] font-medium text-white leading-[21.7px]">
                    Sailing Serenity: A Windward Voyage Into Maritime Bliss
                  </h2>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* DeleteBlog Modal */}
      <DeleteBlog
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        id={deleteId}
      />
    </div>
  );
};

export default BlogDetails;
