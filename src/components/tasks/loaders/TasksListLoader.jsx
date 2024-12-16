import React from "react";

const TasksListLoader = () => {
  return (
    <>
      {Array(6)
        .fill()
        .map((_, index) => (
          <div
            key={index}
            className="w-full h-[162px] flex justify-start items-start rounded-l-[6px] rounded-r-[16px] bg-[#1A293D] animate-pulse"
          >
            <div className="w-[6px] h-full rounded-l-[6px] bg-gray-600"></div>
            <div className="w-[calc(100%-6px)] h-full py-4 px-6 flex flex-col gap-2 justify-start items-start relative">
              {/* Title and Status */}
              <div className="w-full h-auto flex justify-between items-center">
                <div className="w-[150px] h-[27px] bg-gray-700 rounded-md"></div>
                <span className="w-[70px] h-[27px] rounded-full bg-gray-600"></span>
              </div>

              {/* Task Type, Created By, Assigned To */}
              <div className="w-auto flex flex-col justify-start items-start gap-1">
                <span className="w-[180px] h-[21px] bg-gray-700 rounded-md"></span>
                <span className="w-[140px] h-[21px] bg-gray-700 rounded-md"></span>
                <span className="w-[160px] h-[21px] bg-gray-700 rounded-md"></span>
              </div>

              {/* Bottom Buttons */}
              <div className="absolute bottom-2 left-3 w-[calc(100%-1.5rem)] flex justify-between items-center">
                <div className="w-auto flex gap-2 justify-start items-center">
                  <span className="w-[80px] h-[27px] bg-gray-600 rounded-full"></span>
                  <span className="w-[100px] h-[27px] bg-gray-600 rounded-full"></span>
                </div>
                <span className="w-[24px] h-[24px] bg-gray-600 rounded-full"></span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default TasksListLoader;
