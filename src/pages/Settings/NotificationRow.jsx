import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FiLoader } from "react-icons/fi";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";
const NotificationRow = ({ notification, setNotificationUpdate }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const deleteNotification = async (id) => {
    setDeleteLoading(true);
    try {
      const response = await axios.delete(`/owner/notification/${id}`);
      if (response?.status == 200) {
        setNotificationUpdate((prev) => !prev);
        SuccessToast("Notification deleted successfully.");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      const response = await axios.put(`/owner/notification/read/${id}`);
      if (response?.status == 200) {
        setNotificationUpdate((prev) => !prev);
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    }
  };

  function formatTo12HourTime(isoString) {
    const date = new Date(isoString);

    // Format to 12-hour time with AM/PM
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }
  return (
    <button
      onClick={() => {
        // navigator(notification?.type, notification?.typeId);
        markAsRead(notification?._id);
      }}
      className={`w-full grid grid-cols-1 md:grid-cols-5 notification border-b-[1px] border-white/10 gap-x-4 ${
        notification.read ? "read" : "unread"
      }`}
    >
      <div className="col-span-3 flex gap-2 justify-start items-start py-2 lg:py-4">
        <img
          src={"/logo.png"}
          alt=""
          className="w-16 h-16 bg-[#0276] object-contain rounded-full"
        />
        <div className="w-[90%] flex flex-col justify-start items-start">
          <span className="text-md font-semibold text-white">
            {notification?.title}
          </span>
          <p className="w-full text-left font-normal text-sm text-[#fff]/[0.5]">
            {notification?.description}
          </p>
        </div>
      </div>
      <div className="col-span-1 text-end flex justify-end h-full items-center  py-2 lg:py-4">
        <p className="text-[#199BD1] text-sm font-medium pt-1">
          {formatTo12HourTime(notification?.createdAt)}
        </p>
      </div>
      <div className="col-span-1 text-end h-full flex justify-end items-center py-4">
        <button
          onClick={() => deleteNotification(notification?._id)}
          className="w-[73px] bg-[#199BD126] text-[11px] text-[#199BD1] font-medium rounded-full flex items-center justify-center gap-1 py-2 float-end"
        >
          {deleteLoading ? (
            <FiLoader className="animate-spin text-lg" />
          ) : (
            <FaTrash />
          )}
          Delete
        </button>
      </div>
    </button>
  );
};

export default NotificationRow;
