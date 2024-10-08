import React, { useEffect, useState } from "react";
import BoatsTable from "../../components/fleet/BoatsTable";
import axios from "../../axios";

const Boats = () => {
  const [boatsData, setBoatsData] = useState([]);
  console.log("🚀 ~ Boats ~ boatsData:", boatsData);
  const [loading, setLoading] = useState(false);

  const getBoats = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get("/owner/boat");
      setBoatsData(data?.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBoats();
  }, []);

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <BoatsTable data={boatsData} loading={loading} />
    </div>
  );
};

export default Boats;
