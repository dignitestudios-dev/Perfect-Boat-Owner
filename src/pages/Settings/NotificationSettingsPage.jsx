import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";
import { ErrorToast, SuccessToast } from "../../components/global/Toaster";

const NotificationSettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [settingsLoading, setSettingLoading] = useState(false);
  const [settingsUpdate, setSettingsUpdate] = useState(false);

  const getSettings = async () => {
    setSettingLoading(true);
    try {
      const { data } = await axios.get("/owner/notification/setting");
      setSettings(data?.data);
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setSettingLoading(false);
    }
  };

  const handleToggle = (index) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting, i) =>
        i === index
          ? {
              ...setting,
              [Object.keys(setting)[1]]: !setting[Object.keys(setting)[1]],
            }
          : setting
      )
    );
  };
  const [updateLoading, setUpdateLoading] = useState(false);
  const handleSaveChanges = async () => {
    setUpdateLoading(true);
    try {
      await axios.put("/owner/notification/setting", settings);
      setSettingsUpdate((prev) => !prev); // Trigger re-fetch to ensure updates
      setUpdateLoading(false);
      SuccessToast("Updated");
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
      console.error("Error saving settings:", err);
      setUpdateLoading(false);
    }
  };

  useEffect(() => {
    getSettings();
  }, [settingsUpdate]);
  return (
    <div className="w-full flex flex-col gap-6 px-5 pb-5 md:px-0">
      <div className="w-full flex justify-start items-start">
        <div className="flex w-full justify-between items-start">
          <div>
            <h1 className="text-[24px] font-bold leading-[32.4px]">
              Notifications
            </h1>
            <p className="text-xsm leading-[20px] text-gray-500 mt-2">
              Tailor your voyage notifications to perfection. Stay informed with
              alerts that matter most on
              <br /> your Nautical Journey.
            </p>
          </div>
          <button
            onClick={handleSaveChanges}
            className="bg-[#119bd1] text-white px-4 flex items-center justify-center py-2 rounded-lg text-sm font-medium"
          >
            Save
            {updateLoading && (
              <FiLoader className="animate-spin text-lg ml-1" />
            )}
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        {settingsLoading ? (
          <p>Loading...</p>
        ) : (
          settings.map((setting, index) => (
            <div
              key={index}
              className="w-full flex items-start justify-between"
            >
              <div className="flex flex-col">
                <h1 className="text-[16px] font-medium leading-[21.6px]">
                  {setting.title}
                </h1>
                <p className="text-xs text-[#fff]/[0.5]">
                  {`Manage notifications for ${setting.title.toLowerCase()}.`}
                </p>
              </div>
              <div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={setting[Object.keys(setting)[1]] || false}
                    onChange={() => handleToggle(index)}
                    className="sr-only peer"
                  />
                  <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
                </label>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
