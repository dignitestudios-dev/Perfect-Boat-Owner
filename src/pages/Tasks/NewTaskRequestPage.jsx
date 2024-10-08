import React, { useContext, useState } from "react";
import AddFleetInput from "../../components/fleet/AddFleetInput";
import { AuthMockup } from "../../assets/export";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { GlobalContext } from "../../contexts/GlobalContext";
import DeletedModal from "../../components/global/DeletedModal";




const NewTaskRequestPage = () => {
  const { navigate } = useContext(GlobalContext);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);


  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Perform delete action here
    
    closeDeleteModal();
  };

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full flex justify-between items-center h-12">
          <div className="w-auto flex flex-col gap-3 justify-start items-start ">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              New Task Request
            </h3>
            <span className="text-[16px] font-medium leading-[21.3px] text-white">
              Issue Reported
            </span>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
            <div className="w-full flex text-[16px] font-normal leading-[21.6px] text-white/50 flex-col justify-start items-start gap-4">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Explicabo tempora officia ab saepe esse asperiores. Officiis odio
              voluptatibus aspernatur repellat aliquam, quam odit pariatur
              fugiat, unde officia dignissimos amet tenetur adipisci dolore
              maiores id molestiae qui! Neque fugiat ducimus obcaecati facilis
              consequuntur. Reprehenderit dolor ipsum veritatis natus maxime
              <br />
              <br />
              ullam ut aperiam porro, vitae sint at, soluta facere minima, culpa
              beatae delectus blanditiis atque dolorum. Praesentium distinctio
              sequi deserunt magni natus incidunt molestias necessitatibus nobis
              libero earum. Officiis aliquam ipsa quasi aspernatur nihil
              deserunt, quia tempore harum quibusdam rem enim, odio accusantium
              facilis, fugit maiores dignissimos sed inventore. Tempora ipsam
              dicta, minus magni totam molestiae doloribus suscipit. Ducimus, et
              optio eum perspiciatis, totam distinctio nemo libero voluptate
              illo quam hic nostrum ad, alias consequuntur commodi! Ex molestiae
              est odit tempora impedit dolore vero voluptate rem sequi unde,
              <br />
              <br />
              reprehenderit consequatur laboriosam ipsa nisi rerum nam cumque.
              Illum voluptatum consequuntur, maxime, magni neque accusamus
              pariatur corrupti quisquam animi cum, temporibus mollitia quasi
              porro excepturi laborum eaque vitae! Corrupti soluta dolorum
              nostrum consequuntur culpa fugit sed reiciendis. Maxime deleniti
              porro tenetur voluptatibus perferendis reiciendis ex accusantium,
              inventore facere officiis, impedit cumque neque eligendi
              exercitationem esse reprehenderit itaque ea rerum molestias
              dolores numquam! Aliquid, architecto.
            </div>

            <div className="w-full flex flex-col pt-4 border-t-[1px] border-[#fff]/[0.14] justify-start items-start gap-4">
              <h3 className="text-[16px] font-medium leading-[21.3px]">
                Images of the Reported Issue
              </h3>
              <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="w-auto flex justify-between items-center gap-2">
          <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
            Previously Assigned Tasks{" "}
          </h3>
        </div>

        <div className="w-full flex flex-col gap-1 justify-start items-start">
          <div className="w-full h-6 grid grid-cols-6 text-[13px] font-medium  border-b border-[#fff]/[0.14] leading-[14.85px] text-white/50 justify-start items-start">
            <span className="w-full flex justify-start items-center">
              Task Type
            </span>
            <span className="w-full flex justify-start items-center">
              Due Date
            </span>
            <span className="w-full flex justify-start items-center">
              Recurring Days
            </span>
            <span className="w-full flex justify-start items-center">
              Assigned To
            </span>
            <span className="w-full flex justify-start items-center">
              Status
            </span>
            <span className="w-full flex justify-start items-center">
              Action
            </span>
          </div>
          <button
            className="w-full h-10 grid grid-cols-6  py-1 text-[13px] font-medium leading-[14.85px] text-white justify-start items-center"
          >
            <span className="w-full flex justify-start items-center"             onClick={() => navigate("/tasks/1", "All Tasks")}
            >
              Full Inspection
            </span>
            <span className="w-full flex justify-start items-center"             onClick={() => navigate("/tasks/1", "All Tasks")}
            >
              12-02-2024
            </span>
            <span className="w-full flex justify-start items-center"             onClick={() => navigate("/tasks/1", "All Tasks")}
            >
              90 days
            </span>
            <span className="w-full flex justify-start items-center"             onClick={() => navigate("/tasks/1", "All Tasks")}
            >
              *Employee Name*
            </span>
            <span className="text-[11px] bg-[#36B8F3]/[0.12] rounded-full text-[#36B8F3] font-medium leading-[14.85px] flex justify-center items-center w-[70px] h-[27px] ">
              In-Progress
            </span>
            <div className="w-full flex text-[15px] text-white/40 justify-start items-center gap-2">
              <span className=" flex justify-start items-center ">
                <FaRegEdit />
              </span>
              <span className=" flex justify-start items-center ">
              <RiDeleteBinLine onClick={openDeleteModal}
                  />
              </span>
            </div>
          </button>
        </div>
      </div>

      <div className="w-full h-auto flex flex-col gap-4 p-4 lg:p-6 rounded-[18px] bg-[#001229]">
        <div className="w-full flex justify-between items-center h-12">
          <div className="w-auto flex justify-start items-center gap-2">
            <h3 className="text-[18px] font-bold leading-[24.3px] text-white">
              Boat Details
            </h3>
          </div>
        </div>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-8 lg:gap-16">
          <div className="w-full h-auto flex flex-col gap-6 justify-start items-start">
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <div className="w-full h-auto flex flex-col justify-start items-start gap-8">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                  <AddFleetInput
                    label={"Name"}
                    state={"Boat A"}
                    disabled={true}
                  />

                  <div className="w-full h-auto flex flex-col gap-1 justify-end items-start">
                    <label className="text-[16px] font-medium leading-[21.6px]">
                      {"Model/Make/Size"}
                    </label>
                    <div className="group transition-all duration-500 w-full h-[52px] bg-[#1A293D] outline-none flex justify-between items-center  px-3 focus:border-[1px] focus:border-[#55C9FA] rounded-xl  relative">
                      <span className="text-gray-400">2019/Toyotaa/Class A</span>
                    </div>
                  </div>
                </div>
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-12">
                  <AddFleetInput
                    label={"Task Type"}
                    state={"Task type goes here"}
                    disabled={true}
                  />
                  <AddFleetInput
                    label={"Task"}
                    state={"Task goes here"}
                    disabled={true}
                  />
                  <AddFleetInput
                    label={"Location"}
                    state={"Location goes here"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col justify-start items-start gap-4">
              <h3 className="text-[18px] font-bold leading-[24.3px]">Photos</h3>
              <div className="w-full h-auto flex flex-wrap justify-start items-start gap-4">
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
                <div className="w-full md:w-[175px] h-[147px] rounded-xl bg-[#1A293D] text-3xl flex items-center justify-center">
                  <img
                    src={AuthMockup}
                    alt="boatimage"
                    className="w-full h-full rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-10 items-center gap-4">
        <button
          onClick={() => navigate("/assign-reported-task", "New Task Request")}
          className="w-full lg:w-[208px] h-[52px] bg-[#199BD1] text-white rounded-[12px] flex items-center justify-center text-[16px] font-bold leading-[21.6px] tracking-[-0.24px]"
        >
          {"Assign Reported Task"}
        </button>
      </div>
      <DeletedModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default NewTaskRequestPage;
