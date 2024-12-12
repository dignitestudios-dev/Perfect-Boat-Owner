import { GrHomeRounded, GrUserManager } from "react-icons/gr";
import { GoHome } from "react-icons/go";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { HiOutlineDocumentPlus } from "react-icons/hi2";
import { FiUsers } from "react-icons/fi";
import { TbSailboat } from "react-icons/tb";
import { IoIosGitPullRequest } from "react-icons/io";
import { LuArrowRightLeft, LuUserMinus } from "react-icons/lu";
import { TiDocumentText } from "react-icons/ti";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

export const sidebarArr = [
  {
    title: "Home",
    url: "/dashboard",
    icon: <GoHome />,
  },
  {
    title: "All Tasks",
    url: "/tasks",
    icon: <HiOutlineClipboardDocumentList />,
  },
  {
    title: "Assign Tasks",
    url: "/add-task",
    icon: <HiOutlineDocumentPlus />,
  },
  {
    title: "Managers",
    url: "/managers",
    icon: <GrUserManager />,
    submenu: [
      {
        title: "All Managers",
        url: "/managers",
      },
      {
        title: "Assign Employees",
        url: "/employees/assign-employees",
      },
      {
        title: "Boats Access Rights",
        url: "/managers/boats-access-rights",
      },
      {
        title: "Add Managers",
        url: "/managers/add",
      },
    ],
  },
  {
    title: "Employees",
    url: "/employees",
    icon: <FiUsers />,
    submenu: [
      {
        title: "All Employees",
        url: "/employees",
      },
      {
        title: "Assign Manager",
        url: "/manager/assign-manager",
      },
      {
        title: "Add Employee",
        url: "/add-employee",
      },
    ],
  },
  {
    title: "Assign Employee",
    url: "/assign-employee/csv",
    icon: <LuArrowRightLeft />,
  },
  {
    title: "Boats",
    url: "/boats",
    icon: <TbSailboat />,
    submenu: [
      {
        title: "All Boats",
        url: "/boats",
      },
      {
        title: "Boats Access",
        url: "/boats-access",
      },
    ],
  },
  {
    title: "New Task Request",
    url: "/new-tasks-request",
    icon: <IoIosGitPullRequest />,
  },
  {
    title: "Inactive Users",
    url: "/inactive-employees",
    icon: <LuUserMinus />,
  },
  {
    title: "Tides, Tales & Guides",
    url: "/blogs",
    icon: <TiDocumentText />,
  },
  {
    title: "Settings",
    url: "/profile",
    icon: <IoSettingsOutline />,
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
    icon: <MdOutlinePrivacyTip />,
  },
  {
    title: "Terms Of Services",
    url: "/terms-of-services",
    icon: <IoIosCheckmarkCircleOutline />,
  },
];
