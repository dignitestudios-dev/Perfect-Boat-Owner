import React, { useContext, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats } from "react-icons/tb";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import TaskCompletedModal from "./TaskCompletedModal";

const TaskCompleted = () => {
  const { navigate } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="h-full w-full flex flex-col gap-6 justify-start items-center">
        <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
          <div className="w-full flex justify-between items-center h-12">
            <div className="w-auto flex justify-start items-center gap-2">
              <h3 className="text-[18px] font-bold leading-[24.3px] text-white">Task</h3>
              <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px]">
                In-progress
              </span>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
            <div className="w-full h-auto grid grid-cols-2 gap-12">
              <div className="w-full lg:w-[327px] h-[90px] flex gap-3 justify-start items-center rounded-[12px] bg-[#1A293D] p-2">
                <img
                  src={AuthMockup}
                  alt="taskimage"
                  className="w-[106px] h-[74px] rounded-[12px]"
                />
                <div className="w-auto flex flex-col justify-start items-start">
                  <h3 className="text-[16px] font-medium leading-[21.6px] text-white">
                    Boat Name A
                  </h3>
                  <p className="text-[14px] font-normal text-[#199bd1]">
                    2019/Toyota/Class A
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] leading-[24.3px]">Please add pictures of your boat</h3>
                <p className="text-gray-400 text-xs">(Optional)</p>
              </div>
              <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                <AddFleetImage />
                <AddFleetImage />
                <AddFleetImage />
                <AddFleetImage />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 gap-12 mt-4">
              <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                <label className="text-[16px] font-medium leading-[21.6px]">Add Note</label>
                <textarea
                  type="text"
                  disabled={true}
                  value={
                    "Lorem ipsum dolor sit amet consectetur. Sed tellus sit in diam semper sollicitudin. Non facilisis proin gravida pellentesque tortor orci id. Facilisis neque enim nisi lectus a sed et bibendum. Justo tellus ipsum eu tempus orci sed. Neque consequat sed id mauris quis lorem nisl. Massa orci adipiscing arcu placerat aliquet egestas. Quis purus nunc sodales vitae non semper enim posuere. \n \n Vel ut pulvinar faucibus praesent ut. Purus magna nec integer bibendum mauris commodo dolor id. Bibendum tempus lacus arcu neque felis lorem blandit cursus. Porttitor lorem auctor dolor egestas diam libero. Feugiat condimentum feugiat est quis egestas nibh tellus nulla auctor. Id dignissim consectetur scelerisque quis adipiscing. Nunc tincidunt amet nunc in nunc pellentesque erat aliquam. Donec pharetra scelerisque massa id cursus gravida. Mi est cursus egestas mi a faucibus. Aenean feugiat placerat iaculis semper quis aliquam non amet faucibus. Venenatis in gravida at ut risus nisi dictum condimentum integer. Integer rhoncus sit elementum morbi cras consectetur odio aliquam. Massa fermentum tincidunt sit ut pulvinar. In suspendisse vulputate elementum nisl pharetra imperdiet odio dolor nibh."
                  }
                  className="w-full h-[315px] disabled:text-white/50 resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                ></textarea>
              </div>
            </div>
          </div>
          <span className="w-full h-[0.5px] bg-white/10"></span>
          <div className="w-full flex flex-col justify-start items-start gap-6">
            <div className="w-auto flex justify-start items-start gap-3">
              <IoCalendarOutline className="text-2xl text-white/40" />
              <div className="flex flex-col justify-start items-start">
                <span className="text-[16px] font-bold text-white">Due Date</span>
                <span className="text-[12px] font-normal">12/09/2023</span>
              </div>
            </div>
            <div className="w-auto flex justify-start items-start gap-3">
              <TbCalendarStats className="text-2xl text-white/40" />
              <div className="flex flex-col justify-start items-start">
                <span className="text-[16px] font-bold text-white">Recurring Days</span>
                <span className="text-[12px] font-normal">90 days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end py-4 items-center gap-4">
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Back
          </button>
          <button
            type="button"
            onClick={openModal}
            className="w-full lg:w-[208px] h-[52px] bg-[#1FBA46] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Save
          </button>
        </div>
      </div>

      {/* TaskCompletedModal Component */}
      <TaskCompletedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default TaskCompleted;
