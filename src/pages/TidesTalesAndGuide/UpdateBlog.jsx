import React, { useContext, useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { GlobalContext } from "../../contexts/GlobalContext";
import { FaBold, FaUnderline, FaStrikethrough } from "react-icons/fa";
import { GrTextAlignLeft, GrTextAlignCenter, GrTextAlignRight } from "react-icons/gr";
import { ImListNumbered } from "react-icons/im";
import { MdFormatListBulleted } from "react-icons/md"; 
import { BiLink, BiUndo, BiRedo, BiChevronDown } from "react-icons/bi";
import { BlogBoat } from "../../assets/export"; // Make sure this path is correct

const UpdateBlog = () => {
  const { navigate } = useContext(GlobalContext);
  const editorRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSize, setSelectedSize] = useState(16); // Default font size

  const handleInput = () => {
    setHtmlContent(editorRef.current.innerHTML);
  };

  const applyStyle = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      applyStyle("createLink", url);
    }
  };

  const changeFontSize = (size) => {
    applyStyle("fontSize", size);
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleDropdownClick = (size) => {
    setSelectedSize(size);
    changeFontSize(size);
    setShowDropdown(false);
  };

  return (
    <div className="h-full overflow-y-auto w-full p-6 flex flex-col gap-4 bg-[#0D1B2A]">
      <div className="w-full bg-[#001229] rounded-[18px] p-6 flex flex-col gap-4">
        {/* Header with Preview and Publish buttons */}
        <div className="w-full flex justify-between items-center mb-4">
          <h2 className="text-white text-[18px] font-bold">Blogs</h2>
          <div className="flex items-center">
            <button
              className="text-[#199BD1] w-[107px] bg-[#1A293D] px-4 py-2 mr-2 rounded-lg"
              onClick={() => navigate('/preview')}
            >
              Preview
            </button>
            <button className="bg-[#199BD1] w-[107px] text-white px-4 py-2 rounded-lg"
              onClick={() => navigate('/postupdateblog')}
            >
              Update
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="w-full flex items-center justify-center mb-4 h-[60px] rounded-xl bg-[#1A293D] px-4 gap-2 relative">
          {/* Custom Toolbar Buttons */}
          <button
            className="text-white px-3 py-2 text-2xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('undo')}
            style={{ fontSize: '35px' }}
          >
            <BiUndo />
          </button>
          <button
            className="text-white px-3 py-2 text-2xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('redo')}
            style={{ fontSize: '35px' }}
          >
            <BiRedo />
          </button>
          <button
            className="text-white px-3 py-2 text-2xl rounded-lg cursor-pointer"
            style={{ fontSize: '35px' }}
          >
            I
          </button>
          {/* Font Size Dropdown */}
          <select
            className="text-white bg-[#1A293D] text-[18px] px-2 py-1 hover:bg-[#324a60] cursor-pointer"
            onChange={(e) => changeFontSize(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>Size</option>
            <option value="1">Small</option>
            <option value="3">Normal</option>
            <option value="5">Large</option>
            <option value="7">Huge</option>
          </select>
          <button
            className="text-white px-3 py-2 text-2xl rounded-lg cursor-pointer"
            style={{ fontSize: '35px' }}
          >
            I
          </button> 
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('bold')}
            style={{ fontSize: '20px' }}
          >
            <FaBold />
          </button>
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('italic')}
            style={{ fontSize: '20px' }}
          >
            /
          </button>
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('underline')}
            style={{ fontSize: '20px' }}
          >
            <FaUnderline />
          </button>
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('strikeThrough')}
            style={{ fontSize: '20px' }}
          >
            <FaStrikethrough />
          </button>
          <button
            className="text-white px-3 py-2 text-2xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            style={{ fontSize: '35px' }}
          >
            I
          </button> 
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={insertLink}
            style={{ fontSize: '30px' }}
          >
            <BiLink />
          </button>
          <button
            className="text-white px-3 py-2 text-2xl rounded-lg cursor-pointer"
            style={{ fontSize: '35px' }}
          >
            I
          </button> 
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('justifyLeft')}
            style={{ fontSize: '20px' }}
          >
            <GrTextAlignLeft />
          </button>
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('justifyCenter')}
            style={{ fontSize: '20px' }}
          >
            <GrTextAlignCenter />
          </button>
          <button
            className="text-white px-3 py-2 text-xl hover:bg-[#324a60] rounded-lg cursor-pointer"
            onClick={() => applyStyle('justifyRight')}
            style={{ fontSize: '20px' }}
          >
            <GrTextAlignRight />
          </button>
        </div>

        {/* Upload Cover Photo Section */}
        {/* <h2 className="text-white text-lg text-[16px]">Upload Cover Photo</h2> */}
        <div className="relative w-full flex flex-col items-center justify-center h-[300px] bg-[#1A293D] rounded-[18px]">
          <img src={BlogBoat} alt="Blog Boat" className="w-full h-full object-cover" />
          <button className="absolute bottom-4 right-4 bg-[#02203A] text-[16px] px-4 py-2 rounded-xl text-[#199BD1]">
            Change Cover Image
          </button>
        </div>

        {/* Title, Subtitle, and Content Section */}
        <div className="mt-4 w-full">
          <input
            type="text"
            placeholder="Title"
            className="w-full text-[28px] placeholder:text-[28px] placeholder:font-bold text-white bg-transparent border-none focus:outline-none mb-2"
          />
          <input
            type="text"
            placeholder="Enter Subtitle"
            className="w-full text-lg placeholder:text-[16px] text-white bg-transparent border-none focus:outline-none mb-4"
          />

          {/* Rich Text Editor */}
          <div
            ref={editorRef}
            contentEditable
            onInput={handleInput}
            className="w-full text-white bg-transparent border-none focus:outline-none min-h-[200px] h-auto mt-8 p-2"
          ></div>

          {/* Display Generated HTML for Debugging (optional) */}
          {/* <div className="mt-4 text-white">
            <h3>Generated HTML:</h3>
            <pre>{htmlContent}</pre>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
