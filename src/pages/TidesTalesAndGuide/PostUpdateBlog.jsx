import React, { useState, useContext } from "react";
import BlogUpdatedModal from "./BlogUpdatedModal"; // Import BlogUpdatedModal
import { GlobalContext } from "../../contexts/GlobalContext"; // Adjust the path as needed
import BlogUpdateModal from "./BlogUpdatedModal";

const PostUpdateBlog = () => {
  const [selectedOption, setSelectedOption] = useState('everyone');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { navigate } = useContext(GlobalContext); // Use navigate from GlobalContext

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handlePublish = () => {
    console.log("Publishing for:", selectedOption);
    setIsModalOpen(true); // Open the BlogUpdatedModal
  };

  const handleCancel = () => {
    navigate('/blog/createnewblog'); // Redirect to the desired path
  };

  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 bg-[#0D1B2A]">
      {/* Top Right Button */}
      <div className="flex justify-end mb-6">
        <button
          className="text-[#199BD1] w-[107px] bg-[#1A293D] px-6 py-2 rounded-lg hover:bg-[#147BA1]"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="text-white bg-[#199BD1] ml-2 px-6 py-2 rounded-lg hover:bg-[#147BA1]"
          onClick={handlePublish}
        >
          Update Now
        </button>
      </div>

      {/* Centered Publish Section */}
      <div className="flex justify-center items-center">
        <div className="rounded-[18px] p-6 flex flex-col items-center gap-4 bg-[#0D1B2A]">
          <h2 className="text-white text-[26px] font-semibold text-center">Publish</h2>

          {/* Radio Options */}
          <div className="bg-[#0D1B2A] w-[756px] h-[167px] rounded-[12px] p-6 flex flex-col justify-center gap-4 border-[#D9D9D9] border">
            <span className="text-[16px] text-white">This post is for....</span>
            <div className="flex flex-col">
              <label className="flex">
                <input
                  type="radio"
                  value="everyone"
                  checked={selectedOption === 'everyone'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Everyone</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  value="managers"
                  checked={selectedOption === 'managers'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Only for Managers</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  value="employees"
                  checked={selectedOption === 'employees'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Only for Employees</span>
              </label>
            </div>
          </div>
          <div className="bg-[#0D1B2A] w-[756px] h-[167px] rounded-[12px] p-6 flex flex-col justify-center gap-4 border-[#D9D9D9] border">
            <span className="text-[16px] text-white">Allow comments form....</span>
            <div className="flex flex-col">
              <label className="flex">
                <input
                  type="radio"
                  value="everyone"
                  checked={selectedOption === 'everyone'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Everyone</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  value="managers"
                  checked={selectedOption === 'managers'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Only for Managers</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  value="employees"
                  checked={selectedOption === 'employees'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">Only for Employees</span>
              </label>
              <label className="flex items-center mt-2">
                <input
                  type="radio"
                  value="employees"
                  checked={selectedOption === 'employees'}
                  onChange={handleOptionChange}
                  className="form-radio text-[#199BD1] bg-[#001229] focus:ring-[#199BD1] focus:ring-2 h-5 w-5"
                />
                <span className="ml-3 text-white text-[14px]">No one (Disable Comments)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Updated Modal */}
      <BlogUpdatedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default PostUpdateBlog;
