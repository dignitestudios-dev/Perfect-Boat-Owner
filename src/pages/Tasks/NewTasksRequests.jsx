import React from "react";
import NewTaskTable from "../../components/tasks/NewTasksTable";

const NewTasksRequests = () => {
  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <NewTaskTable />
    </div>
  );
};

export default NewTasksRequests;
