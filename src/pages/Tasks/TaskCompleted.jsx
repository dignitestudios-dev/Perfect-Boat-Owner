import React, { useContext, useState } from "react";
import { TiPencil } from "react-icons/ti";
import { IoCalendarOutline } from "react-icons/io5";
import { TbCalendarStats } from "react-icons/tb";
import { GlobalContext } from "../../contexts/GlobalContext";
import { AuthMockup } from "../../assets/export";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import TaskCompletedModal from "../../components/tasks/modal/TaskCompletedModal";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FiDownload, FiLoader } from "react-icons/fi";
import { getUnixDate } from "../../data/DateFormat";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";

const statusColors = {
  newtask: "#FF007F",
  overdue: "#FF3B30",
  default: "#FFCC00",
  inprogress: "#36B8F3",
  completed: "#1FBA46",
};

const statusColorsbg = {
  newtask: "#FF69B41F",
  overdue: "#FF3B301F",
  default: "#FFCC001F",
  inprogress: "#36B8F31F",
  completed: "#1FBA461F",
  upcomingtask: "#FF007F1F",
};

const STATUS_ENUM = {
  newtask: "New Task",
  inprogress: "In-Progress",
  recurring: "Recurring",
  overdue: "Overdue",
  completed: "Completed",
  upcomingtask: "Upcoming Task",
};

const TaskCompleted = () => {
  const { navigate } = useContext(GlobalContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const taskDetail = location.state || {};

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formsImages = watch("formsImages", []);

  const [fleetPictures, setFleetPictures] = useState([0]);
  const [submitLoading, setSubmitLoading] = useState(false);

  const handleFleetImage = (index, event) => {
    let setIndex = index + 1;
    if (setIndex === formsImages?.length && setIndex < 5) {
      setFleetPictures((prev) => [...prev, prev?.length]);
    }
  };

  const getFormattedStatus = (status) => {
    return STATUS_ENUM[status] || status;
  };

  const submitBoatData = async (formData) => {
    try {
      setSubmitLoading(true);
      const data = new FormData();
      data.append("note", formData.note);
      if (taskDetail?.reoccuring === true) {
        data.append("recurring", true);
        data.append("reoccuringDays", taskDetail?.reoccuringDays);
      } else {
        data.append("recurring", false);
      }
      if (formData.formsImages) {
        formData.formsImages.forEach((fileList, index) => {
          if (fileList.length > 0 && fileList[0]) {
            data.append("pictures", fileList[0]);
          }
        });
      }

      const response = await axios.post(
        `/owner/task/${taskDetail?._id}/report`,
        data
      );
      if (response.status === 200) {
        setIsModalOpen(true);
      }
    } catch (err) {
      console.log("🚀 ~ openModal ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="h-full w-full flex flex-col gap-6 justify-start items-center">
        <form className="w-full" onSubmit={handleSubmit(submitBoatData)}>
          <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
            <div className="w-full flex justify-between items-center h-12">
              <div className="w-auto flex justify-start items-center gap-2">
                <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
                  Task
                </h3>
                <span
                  className="w-[100px] capitalize h-[27px] rounded-full
            bg-[#FFCC00]/[0.12] text-[11px] font-medium leading-[14.85px] flex items-center justify-center"
                  style={{
                    color:
                      statusColors[task?.task?.status] ||
                      statusColors["default"],
                    backgroundColor:
                      statusColorsbg[task?.task?.status] ||
                      statusColorsbg["default"],
                  }}
                >
                  {getFormattedStatus(taskDetail?.status)}
                </span>
              </div>
            </div>
            <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
              <div className="w-full h-auto grid grid-cols-2 gap-12">
                <div className="w-full lg:w-[327px] h-[90px] flex gap-3 justify-start items-center rounded-[12px] bg-[#1A293D] p-2">
                  <img
                    src={taskDetail?.boat?.images[0] || AuthMockup}
                    alt="taskimage"
                    className="w-[106px] h-[74px] rounded-[12px]"
                  />
                  <div className="w-auto flex flex-col justify-start items-start">
                    <h3 className="text-[16px] font-medium leading-[21.6px] text-white">
                      {taskDetail?.boat?.name}
                    </h3>
                    <p className="text-[14px] font-normal text-[#199bd1]">
                      {taskDetail?.boat?.model}/{taskDetail?.boat?.make}/
                      {taskDetail?.boat?.size}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-[18px] leading-[24.3px]">
                    Please add pictures of your boat
                  </h3>
                  <p className="text-gray-400 text-xs">(Optional)</p>
                </div>

                <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                  {fleetPictures?.map((_, imageIndex) => (
                    <div key={imageIndex}>
                      <label
                        htmlFor={`form-image-${imageIndex}`}
                        className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D]
                          text-3xl flex items-center justify-center cursor-pointer"
                      >
                        {formsImages.length > 0 &&
                        formsImages[imageIndex]?.length > 0 ? (
                          <img
                            src={URL.createObjectURL(
                              formsImages[imageIndex][0]
                            )}
                            alt={`Uploaded preview ${imageIndex}`}
                            className="w-full h-full object-cover rounded-xl"
                          />
                        ) : (
                          <FiDownload />
                        )}
                      </label>
                      <input
                        key={imageIndex}
                        name={`formsImages.${imageIndex}`}
                        id={`form-image-${imageIndex}`}
                        accept="image/*"
                        className="hidden"
                        type="file"
                        {...register(`formsImages.${imageIndex}`, {
                          required: false,
                          onChange: (e) => {
                            handleFleetImage(imageIndex, e);
                          },
                        })}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full grid grid-cols-1 gap-12 mt-4">
                <div className="w-full h-auto flex flex-col gap-1 justify-start items-start">
                  <label className="text-[16px] font-medium leading-[21.6px]">
                    Add Note
                  </label>
                  <textarea
                    type="text"
                    {...register("note", {
                      onChange: (e) => {
                        const value = e.target.value;
                        e.target.value =
                          value.charAt(0).toUpperCase() + value.slice(1);
                      },
                      setValueAs: (v) =>
                        String(v[0]).toUpperCase() + String(v).slice(1),
                      required: "Please enter a note",
                    })}
                    className="w-full h-[315px] disabled:text-white/50 resize-none bg-[#1A293D] outline-none p-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                  ></textarea>
                  {errors.note && (
                    <p className="text-red-500 text-sm">
                      {errors?.note?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <span className="w-full h-[0.5px] bg-white/10"></span>
            <div className="w-full flex flex-col justify-start items-start gap-6">
              <div className="w-auto flex justify-start items-start gap-3">
                <IoCalendarOutline className="text-2xl text-white/40" />
                <div className="flex flex-col justify-start items-start">
                  <span className="text-[16px] font-bold text-white">
                    Due Date
                  </span>
                  <span className="text-[12px] font-normal">
                    {getUnixDate(taskDetail?.dueDate)}
                  </span>
                </div>
              </div>
              {taskDetail?.reoccuring && (
                <div className="w-auto flex justify-start items-start gap-3">
                  <TbCalendarStats className="text-2xl text-white/40" />
                  <div className="flex flex-col justify-start items-start">
                    <span className="text-[16px] font-bold text-white">
                      Recurring Days
                    </span>
                    <span className="text-[12px] font-normal">
                      {taskDetail?.reoccuringDays} days
                    </span>
                  </div>
                </div>
              )}
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
              disabled={submitLoading}
              type="submit"
              className="w-full lg:w-[208px] h-[52px] bg-[#1FBA46] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              <div className="flex items-center">
                <span className="mr-1">Save</span>
                {submitLoading && (
                  <FiLoader className="animate-spin text-lg mx-auto" />
                )}
              </div>
            </button>
          </div>
        </form>
      </div>

      {/* TaskCompletedModal Component */}
      <TaskCompletedModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default TaskCompleted;
