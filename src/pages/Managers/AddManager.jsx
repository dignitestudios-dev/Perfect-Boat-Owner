import React, { useContext, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { GlobalContext } from "../../contexts/GlobalContext";
import AddEmployeeModal from "../../components/global/AddEmployeeModal";
import ImportCSVModal from "../../components/global/ImportCSVModal";


const AddManager = () => {
  const { navigate } = useContext(GlobalContext);
  const [isEmployeeOpen, setIsEmployeeOpen] = useState(false);
  const [i, setI] = useState(1);
  const [arr, setArr] = useState([i]);
  const [isImportCSVOpen, setIsImportCSVOpen] = useState(false);


  return (
    <div className="w-full h-screen bg-[#1A293D] text-white p-4 flex flex-col justify-start items-start overflow-y-auto">
      <div className="w-full flex flex-col justify-start items-start gap-6 p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full h-auto flex flex-col lg:flex-row justify-between gap-3 lg:items-center">
          <div>
            <h1 className="text-[28px] font-bold text-white leading-[37.8px]">
              Managers
            </h1>
            <span className="text-[14px] font-normal leading-[21.6px]">
              Experience the power of simplified fleet management today. Whether
              you are assigning task or tracking boat maintenance,
              <br />{" "}
              <span className="text-[16px] font-bold">
                The Perfect Boat
              </span>{" "}
              has you covered at every step of the journey.
            </span>
          </div>
          <button className="bg-[#199BD1] w-[107px] h-[35px] rounded-xl text-white flex items-center justify-center text-sm font-medium leading-5" onClick={() => setIsImportCSVOpen(true)}>
            Import CSV
          </button>
        </div>
        <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
          {arr?.map((item, key) => {
            return (
              <div
                key={key}
                className="w-full flex flex-col justify-start items-start gap-6"
              >
                <div className="w-full h-auto flex justify-between items-center">
                  <div>
                    <h3 className="text-[18px] font-bold leading-[24.3px]">
                      Add {key === 0 ? "Manager" : "Another Manager"}
                    </h3>
                  </div>
                </div>
                <div className="w-full h-auto flex flex-col justify-start items-start gap-4 ">
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput label={"Name"} />
                    <AddFleetInput label={"Email"} />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput label={"Job Title"} />
                    <AddFleetInput label={"Location"} />
                  </div>
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                    <AddFleetInput label={"Phone Number"} />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full flex justify-end mt-10 items-center gap-4">
            <button
              type="button"
              onClick={() => {
                navigate("/add-employee");
              }}
              className="w-auto h-[52px] text-[#fff]/[0.5] hover:text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Skip"}
            </button>
            <button
              type="button"
              onClick={() => {
                setI(i + 1);
                setArr([...arr, i + 1]);
              }}
              className="w-full lg:w-[208px] h-[52px] bg-[#02203A] text-[#199BD1] rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Add More"}
            </button>
            <button
              onClick={() => {
                setIsEmployeeOpen(true);
              }}
              className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
            >
              {"Save Manager"}
            </button>
            <AddEmployeeModal
              isOpen={isEmployeeOpen}
              setIsOpen={setIsEmployeeOpen}
            />

{isImportCSVOpen && (
        <ImportCSVModal
          isOpen={isImportCSVOpen}
          onClose={() => setIsImportCSVOpen(false)}
        />
      )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManager;
