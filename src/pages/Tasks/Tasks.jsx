import React, { useState, useEffect } from "react";
import TasksContainer from "../../components/tasks/TasksContainer";
import axios from "../../axios";

const Tasks = () => {
  const [TaskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = async () => {
    setLoading(true);
    setError(null); 
    try {
      const { data } = await axios.get("/owner/task", {
        // headers: {
        //   'Cache-Control': 'no-cache',  // Invalidate cache
        //   'Pragma': 'no-cache',
        //   'Expires': '0'
        // }
      });
      console.log("🚀 ~ getTasks ~ data:", data);
      setTaskData(data?.data || []);  // Set task data from API
    } catch (err) {
      console.error("Error fetching Task data:", err);
      setError("Failed to fetch Task. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      {loading && <p className="text-white">Loading Tasks...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <TasksContainer data={TaskData} loading={loading} />
    </div>
  );
};

export default Tasks;
