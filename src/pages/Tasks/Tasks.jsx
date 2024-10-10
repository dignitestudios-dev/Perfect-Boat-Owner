import React, { useState, useEffect } from "react";
import TasksContainer from "../../components/tasks/TasksContainer";
import axios from "../../axios";

const Tasks = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <TasksContainer />
    </div>
  );
};

export default Tasks;
