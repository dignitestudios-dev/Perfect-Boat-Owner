import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { sampleNotifications } from "../../constants/notifications";
import { AuthMockup } from "../../assets/export";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");

  const filterNotifications = () => {
    if (activeTab === "Read") {
      return sampleNotifications.filter((notification) => notification.read);
    } else if (activeTab === "Unread") {
      return sampleNotifications.filter((notification) => !notification.read);
    }
    return sampleNotifications;
  };

  const [notification, setNotification] = useState([]);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [notificationUpdate, setNotificationUpdate] = useState(false);

  const getNotifications = async () => {
    setNotificationLoading(true);
    try {
      const { data } = await axios.get("owner/notification");
      setNotification(data?.data);
    } catch (err) {
    } finally {
      setNotificationLoading(false);
    }
  };
  useEffect(() => {
    getNotifications();
  }, [notificationUpdate]);

  // Calculate unread notifications count
  const unreadCount = notification.filter(
    (notification) => !notification.isRead
  ).length;

  const [filteredNotifications, setFilteredNotifications] = useState([]);

  useEffect(() => {
    setFilteredNotifications(
      notification.filter((notification) => {
        if (activeTab === "Read") return notification?.isRead;
        if (activeTab === "Unread") return !notification?.isRead;
        return true; // for "all" tab
      })
    );
  }, [activeTab, notification]);

  function formatTo12HourTime(isoString) {
    const date = new Date(isoString);

    // Format to 12-hour time with AM/PM
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  function navigator(type, id) {
    if (type == "task") {
      navigate(`/tasks/${id}`);
    } else if (type == "blogs") {
      navigate(`/blogs/${id}`);
    } else {
      return;
    }
  }

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col justify-start items-start gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
          Notifications
        </h1>
        <div className="w-full  border-b-[0.5px] border-white/15 flex  justify-between items-center h-[34px] text-base font-normal text-[#fff]/[50%]">
          <div className="w-auto h-[34px] flex gap-6 justify-start items-center">
            <button
              onClick={() => setActiveTab("All")}
              className={`px-2 h-[34px] ${
                activeTab == "All" &&
                "text-[#199BD1] font-bold  border-b-[3px] border-[#199BD1]"
              } `}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("Read")}
              className={`px-2 h-[34px] ${
                activeTab == "Read" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              Read
            </button>
            <button
              onClick={() => setActiveTab("Unread")}
              className={`px-2 h-[34px] flex justify-between items-center gap-2 ${
                activeTab == "Unread" &&
                "text-[#199BD1]  font-bold border-b-[3px] border-[#199BD1]"
              } `}
            >
              <span>Unread</span>
              <span className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full  text-[9px] flex items-center justify-center">
                {unreadCount}
              </span>
            </button>
          </div>
          <button
            className={`w-[107px] h-[32px] mb-2 text-[11px] font-bold rounded-[10px] text-white bg-[#199BD1]`}
          >
            Clear All
          </button>
        </div>
        {/* <div className="w-full flex items-center justify-between  gap-6">
          <div className="flex items-center">
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "All" ? "text-[#199BD1]" : "text-[#707070]"
                } px-6`}
                onClick={() => setActiveTab("All")}
              >
                All
              </button>
              {activeTab === "All" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "Read" ? "text-[#199BD1]" : "text-[#707070]"
                } px-6`}
                onClick={() => setActiveTab("Read")}
              >
                Read
              </button>
              {activeTab === "Read" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
            <div className="">
              <button
                className={`text-base font-normal ${
                  activeTab === "Unread" ? "text-[#199BD1]" : "text-[#707070]"
                }  flex gap-2 items-center px-6`}
                onClick={() => setActiveTab("Unread")}
              >
                Unread{" "}
                <div className="bg-[#199BD1] text-white w-[18px] h-[18px] rounded-full text-[10px] flex items-center justify-center">
                  15
                </div>
              </button>
              {activeTab === "Unread" ? (
                <div className="w-full h-[0.5px] flex justify-center items-center bg-[#fff]/[0.14]">
                  <div className="bg-[#199BD1] w-full h-[3px] rounded-full mx-auto" />
                </div>
              ) : (
                <div className="bg-[#fff]/[0.14] w-full h-[0.5px] rounded-full" />
              )}
            </div>
          </div>
          {/* <button className="bg-[#199BD1] rounded-full text-[13px] font-semibold text-white py-2.5 w-[118px]">
          Clear All
        </button>
        </div>  */}
        <div className="w-full">
          {filteredNotifications?.map((notification) => (
            <button
              key={notification.id}
              onClick={() => {
                navigator(notification?.type, notification?.typeId);
              }}
              className={`w-full grid grid-cols-1 md:grid-cols-5 notification border-b-[1px] border-white/10 gap-x-4 ${
                notification.read ? "read" : "unread"
              }`}
            >
              <div className="col-span-3 flex gap-2 justify-start items-start py-2 lg:py-4">
                <img
                  src={AuthMockup}
                  alt=""
                  className="w-16 h-16 rounded-full"
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
                <button className="w-[73px] bg-[#199BD126] text-[11px] text-[#199BD1] font-medium rounded-full flex items-center justify-center gap-1 py-2 float-end">
                  <FaTrash />
                  Delete
                </button>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
