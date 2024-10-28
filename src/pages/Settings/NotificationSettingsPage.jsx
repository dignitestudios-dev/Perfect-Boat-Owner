import React, { useEffect, useState } from "react";
import axios from "../../axios";

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
    } finally {
      setSettingLoading(false);
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
          <button className="bg-[#119bd1] text-white px-4 py-2 rounded-lg text-sm font-medium">
            Save Changes
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-start justify-between">
          <div className="w-full flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              Task Management
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Receive notifications related to tasks. Stay updated on the tasks
              accomplished.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              Boats Alert
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Stay in loop with updates on changes in boat details and location.
              keep in sight.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              Maintinence Alert
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Receive notifications about upcoming boat maintinence tasks.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              System Updates
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Get notified about platform updates and new features. Ensure
              smooth sailing with the latest tools.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              Billing Updates
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Receive billing-related updates and reminders{" "}
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              Security Alerts
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Receive instant alerts in case of security breaches or critical
              events. Safety first!
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">
              New Task Request
            </h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Get instant notifications when your team members submit new task
              request.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">Text</h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Pause text notifications and enjoy uninterupted moments.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
        <div className="w-full flex items-start justify-between">
          <div className="flex flex-col">
            <h1 className="text-[16px] font-medium leading-[21.6px]">Email</h1>
            <p className="text-xs text-[#fff]/[0.5]">
              Pause email notifications and reclaim your inbox for moments of
              calm.
            </p>
          </div>
          <div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" value="" className="sr-only peer" />
              <div className="relative w-[32.94px] h-[18.53px] bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.7px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[14.82px] after:w-[14.82px] after:transition-all dark:border-gray-600 peer-checked:bg-[#028EE6]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;
