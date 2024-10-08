import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import { BlogBoat } from "../../assets/export";
import DateModal from "../../components/tasks/DateModal";

const Preview = () => {
  const [isScheduling, setIsScheduling] = useState(false); // State to toggle between publish and schedule view
  const [isDateModalOpen, setIsDateModalOpen] = useState(false); // State to control date modal visibility
  const [title, setTitle] = useState("");
  
  const navigate = useNavigate(); // Initialize the navigate function

  const handleScheduleClick = () => {
    setIsScheduling(true);
    setIsDateModalOpen(true); // Open the date modal
  };

  const handleClose = () => {
    navigate("/blog/createnewblog"); // Navigate to the /blog/createnewblog route when X is clicked
  };

  return (
    <div className="h-full w-full p-6 flex flex-col gap-4 bg-[#0D1B2A] text-white">
      {/* Header */}
      <div className="w-full flex justify-between items-center">
        <h2 className="text-white text-[24px]">See Preview</h2>
        <button 
          className="text-[24px] bg-[#02203A] rounded-xl text-[#199BD1]"
          onClick={handleClose} // Trigger handleClose on click
        >
          <FiX />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex justify-between mt-4">
        <div className="relative w-[60%] rounded-[18px]">
          {/* Background Image */}
          <div
            className="relative h-[300px] w-full rounded-[18px] bg-cover bg-center"
            style={{
              backgroundImage: `url(${BlogBoat})`,
            }}
          ></div>
        </div>

        {/* Right section with buttons and publisher info */}
        <div className="w-[35%] flex flex-col justify-between">
          {!isScheduling ? (
            <div>
              <p className="text-[16px] text-left mb-8">
                Publishing to: <span className="font-bold">Alex Deli</span>
              </p>
              <button className="bg-[#199BD1] text-white px-6 py-2 rounded-lg h-[32px] mb-4 mr-2">
                Publish Now
              </button>
              <button
                className="text-[#199BD1] px-6 py-2 rounded-lg h-[32px]"
                onClick={handleScheduleClick} // Call handleScheduleClick when button is clicked
              >
                Schedule For Later
              </button>
            </div>
          ) : (
            <div>
              <p className="text-[16px] text-left mb-8">
                Publishing to: <span className="font-bold">Alex Deli</span>
              </p>
              <div className="text-left mb-4 font-bold text-[12px]">
                <p>
                  Schedule A Time To Publish{" "}
                  <span className="text-[#199BD1] cursor-pointer ml-2" onClick={handleScheduleClick}>
                    Change
                  </span>
                </p>
                <p className="text-[12px] font-normal mt-2">30/11/2023 01:08 AM</p>
              </div>
              <button className="bg-[#199BD1] text-white px-6 py-2 rounded-lg h-[32px] mb-4 mr-2">
                Schedule To Publish
              </button>
              <button
                className="text-[#199BD1] px-6 py-2 rounded-lg h-[32px]"
                onClick={() => setIsScheduling(false)}
              >
                Cancel Scheduling
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Title and Description */}
      <div className="w-full mt-4">
        <h2 className="text-white text-[28px] font-bold">
          Sailing Serenity: A Windward Voyage Into Maritime Bliss
        </h2>
        <p className="text-white text-[16px]">
          Discover The Tranquil Tales That Unfold Beyond The Horizon
        </p>
      </div>

      {/* Title Input */}
      <div className="w-full mt-4">
        <input
          type="text"
          placeholder="Tell your story..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-[28px] placeholder:text-[28px] placeholder:font-bold text-white bg-transparent border-none focus:outline-none mb-2"
        />
      </div>

      {/* Date Modal */}
      <DateModal isOpen={isDateModalOpen} setIsOpen={setIsDateModalOpen} />
    </div>
  );
};

export default Preview;
