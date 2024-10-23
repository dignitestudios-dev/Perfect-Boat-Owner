import React, { useContext, useEffect, useState } from "react";
import ManagersTableBig from "../../components/managers/ManagersTableBig";
import axios from "../../axios";
import { ErrorToast } from "../../components/global/Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";

const Managers = () => {
  const {managers, loadingManagers} = useContext(GlobalContext)

  return (
    <div className="h-full overflow-y-auto w-full p-2 lg:p-6 flex flex-col gap-6 justify-start items-start">
      <ManagersTableBig data={managers} loading={loadingManagers} />
    </div>
  );
};

export default Managers;
