import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectTaskModal from "../../../components/tasks/modal/SelectTaskModal";

const AssignTaskModal = ({
  isOpen,
  onClose,
  onExistingTaskSelect,
  setTasks,
  setTasksError,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [isSelectTaskModalOpen, setIsSelectTaskModalOpen] = useState(false);

  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOptionChange = (e) => {
    setTasksError("");
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "new") {
      navigate("/add-task");
    } else if (value === "existing") {
      setIsSelectTaskModalOpen(true);
    }
  };

  const passSelectedTask = (values) => {
    setTasks(values);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-[#001229] rounded-lg p-6 w-96 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-[#199BD1] focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <h2 className="text-white text-xl font-semibold mb-2 text-left">
            Assign Task
          </h2>
          <p className="text-white mb-4 text-left">
            Do you want to assign an existing task or create a new task? Please
            select an option below:
          </p>
          <div className="flex flex-col items-start mb-4">
            <label className="text-white mb-2">
              <input
                type="radio"
                name="taskOption"
                value="existing"
                checked={selectedOption === "existing"}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Existing Task
            </label>
            <label className="text-white">
              <input
                type="radio"
                name="taskOption"
                value="new"
                checked={selectedOption === "new"}
                onChange={handleOptionChange}
                className="mr-2"
              />
              Create New Task
            </label>
          </div>
        </div>
      </div>
      {isSelectTaskModalOpen && (
        <SelectTaskModal
          setIsOpen={setIsSelectTaskModalOpen}
          passSelectedTask={(values) => passSelectedTask(values)}
        />
      )}
    </>
  );
};

export default AssignTaskModal;
