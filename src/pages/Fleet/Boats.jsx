import React, { useContext, useEffect, useState } from "react";
import BoatsTable from "../../components/fleet/BoatsTable";
import axios from "../../axios";
import { GlobalContext } from "../../contexts/GlobalContext";

const Boats = () => {
  const {boats, loadingBoats} = useContext(GlobalContext)

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <BoatsTable data={boats} loading={loadingBoats} />
    </div>
  );
};

export default Boats;
