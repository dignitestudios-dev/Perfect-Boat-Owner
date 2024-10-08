import React, { useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import AddFleetImage from "../../components/fleet/AddFleetImage";
import { TbCaretDownFilled } from "react-icons/tb";
import ManagerDetailModal from "../Managers/ManagerDetailModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";
import CongratsModal from "./CongratsModal";

const AddFleet = () => {
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isCongratsOpen, setIsCongratsOpen] = useState(false);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);
  const [i, setI] = useState(1);
  const [arr, setArr] = useState([i]);

  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 overflow-auto">
      <div className="w-full h-auto flex flex-col gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Add Fleet
            </h1>
          </div>
          <button
            className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-[11px] font-bold leading-5"
            onClick={() => setIsImportCSVOpen(true)}
          >
            Import CSV
          </button>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
          {arr?.map((item, key) => (
            <div
              key={item}
              className="w-full h-auto flex flex-col gap-6 justify-start items-start"
            >
              <div className="w-full flex flex-col justify-start items-start gap-4">
                <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                    <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                      <label className="text-[16px] font-medium leading-[21.6px]">
                        Boat Type
                      </label>
                      <div className="group transition-all duration-500 w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl hover:rounded-b-none hover:rounded-t-xl relative">
                        <span className="text-gray-400">--Select--</span>
                        <span className="text-gray-400">
                          <TbCaretDownFilled className="group-hover:rotate-180 " />
                        </span>

                        <div className="group-hover:flex flex-col justify-start items-start gap-3 transition-all duration-500 px-5 py-3 hidden absolute -bottom-32 shadow-xl left-0 w-full h-32 max-h-32 bg-[#1A293D] rounded-b-2xl border border-gray-700">
                          <div className="w-full h-full overflow-y-auto flex flex-col justify-start items-start gap-3">
                            <span className="text-gray-300">Boat A</span>
                            <span className="text-gray-300">Boat B</span>
                            <span className="text-gray-300">Boat C</span>
                            <span className="text-gray-300">Boat D</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <AddFleetInput label={"Name"} />
                    <AddFleetInput label={"Make"} />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-12">
                    <AddFleetInput label={"Model"} />
                    <AddFleetInput label={"Size (m)"} />
                    <AddFleetInput label={"Location"} />
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[400px] flex flex-col gap-6">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  Select Manager
                </h3>
                <button
                  onClick={() => setIsManagerOpen(true)}
                  className="w-full h-[52px] bg-[#1A293D] text-white outline-none px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl"
                >
                  Click Here To Select Manager
                </button>
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4">
                <h3 className="text-[18px] font-bold leading-[24.3px]">
                  Upload Pictures{" "}
                  <span className="text-[14px] font-normal leading-[24px]">
                    (Supported Files Type: JPG, PNG, GIF)
                  </span>
                </h3>
                <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                  <AddFleetImage />
                  <AddFleetImage />
                  <AddFleetImage />
                  <AddFleetImage />
                  <AddFleetImage />
                  <AddFleetImage />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-end mt-10 items-center gap-4">
          <button
            type="button"
            onClick={() => {
              setI(i + 1);
              setArr([...arr, i + 1]);
            }}
            className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Add Another Boat
          </button>
          <button
            onClick={() => {
              setIsCongratsOpen(true);
            }}
            className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
          >
            Save Fleet
          </button>
        </div>
      </div>

      {/* ManagerDetailModal Component */}
      {isManagerOpen && <ManagerDetailModal setIsOpen={setIsManagerOpen} />}

      {/* CongratsModal Component */}
      {isCongratsOpen && (
        <CongratsModal
          isOpen={isCongratsOpen}
          onClose={() => setIsCongratsOpen(false)}
        />
      )}

      {/* ImportCSVModal Component */}
      {isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
    </div>
  );
};

export default AddFleet;
