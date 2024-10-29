import GlobalLayout from "../layouts/GlobalLayout";
import Home from "../pages/Dashboard/Home";
import Tasks from "../pages/Tasks/Tasks";
import AddTask from "../pages/Tasks/AddTask";
import TaskDetail from "../pages/Tasks/TaskDetail";
import TaskCompleted from "../pages/Tasks/TaskCompleted";
import AddEmployee from "../pages/Employees/AddEmployee";
import Employees from "../pages/Employees/Employees";
import AddFleet from "../pages/Fleet/AddFleet";
import AddManager from "../pages/Managers/AddManager";
import Managers from "../pages/Managers/Managers";
import NewTasksRequests from "../pages/Tasks/NewTasksRequests";
import NewTaskRequestPage from "../pages/Tasks/NewTaskRequestPage";
import Boats from "../pages/Fleet/Boats";
import BoatDetail from "../pages/Fleet/BoatDetail";
import TermsOfServices from "../pages/Settings/TermsOfServices";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import Blogs from "../pages/TidesTalesAndGuide/Blogs";
import BlogDetails from "../pages/TidesTalesAndGuide/BlogDetails";
import DeactivatedEmployees from "../pages/Employees/DeactivatedEmployees";
import Notifications from "../pages/Settings/Notifications";
import AssignEmployee from "../pages/Employees/AssignEmployee";
import AssignManager from "../pages/Managers/AssignManager";
import BoatAccess from "../pages/Fleet/BoatAccess";
import BoatAccessRights from "../pages/Fleet/BoatAccessRights";
import CreateNewBlog from "../pages/TidesTalesAndGuide/CreateNewBlog";
import AddManagerpage from "../pages/Managers/AddManagerpage";
import SettingsLayout from "../layouts/SettingsLayout";
// import AddEmployee from "../pages/Employees/AddEmployee";
import UserManagementPage from "../pages/Settings/UserManagementPage";
import ChangePasswordPage from "../pages/Settings/ChangePasswordPage";
import NotificationSettingsPage from "../pages/Settings/NotificationSettingsPage";
import AssignReportedTask from "../pages/Tasks/AssignReportedTask";
import Billing from "../pages/Settings/Billing";
import EditEmployee from "../pages/Employees/EditEmployee";
import EditManager from "../pages/Managers/EditManager";
import SelectPaymentMethod from "../pages/onboarding/SelectPaymentMethod";
import WelcomeAboard from "../pages/onboarding/WelcomeAboard";
import AddEmployeeExternal from "../pages/Employees/AddEmployeeExternal";
import OnboardLayout from "../layouts/OnboardLayout";
import Publish from "../pages/TidesTalesAndGuide/Publish";
import Preview from "../pages/TidesTalesAndGuide/Preview";
import UpdateBlog from "../pages/TidesTalesAndGuide/UpdateBlog";
import PostUpdateBlog from "../pages/TidesTalesAndGuide/PostUpdateBlog";
import DeleteAccountList from "../components/global/DeleteAccountList";
import DeleteManagerAccount from "../components/global/DeleteManagerAccount";
import AddEmployeePlus from "../pages/Employees/AddEmployeePlus";
import SelectPackage from "../pages/onboarding/SelectPackage";
import AddCard from "../pages/onboarding/AddCard";
import Summary from "../pages/onboarding/Summary";
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import CsvUploader from "../pages/Dashboard/CsvUploader";

export const normalRoutes = [
  {
    title: "For Csv",
    url: "/add-csv",
    page: <OnboardLayout page={<CsvUploader />} />,
  },
  {
    title: "Add a Manager External",
    url: "/add-manager-onboard",
    page: <OnboardLayout page={<AddManager />} />,
  },
  {
    title: "Select Package",
    url: "/select-package",
    page: <SelectPackage />,
  },
  {
    title: "Add Card",
    url: "/add-card",
    page: <AddCard />,
  },
  {
    title: "Summary",
    url: "/summary",
    page: <Summary />,
  },
  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },
  {
    title: "Welcome Aboard",
    url: "/welcome-aboard",
    page: <OnboardLayout page={<WelcomeAboard />} />,
  },
  {
    title: "Add a Employee External",
    url: "/add-employee-onboard",
    page: <OnboardLayout page={<AddEmployeeExternal />} />,
  },

  // {
  //   title: "Add a Manager",
  //   url: "/add-manager",
  //   page: <GlobalLayout page={<AddManager />} />,
  // },

  {
    title: "Add a Employee",
    url: "/add-employee",
    page: <GlobalLayout page={<AddEmployee />} />,
  },

  {
    title: "Home",
    url: "/dashboard",
    page: <GlobalLayout page={<Home />} />,
  },
  {
    title: "All Tasks",
    url: "/tasks",
    page: <GlobalLayout page={<Tasks />} />,
  },
  {
    title: "Task Detail",
    url: "/tasks/:id",
    page: <GlobalLayout page={<TaskDetail />} />,
  },
  {
    title: "Add Task",
    url: "/add-task",
    page: <GlobalLayout page={<AddTask />} />,
  },
  {
    title: "New Task Request",
    url: "/new-tasks-request",
    page: <GlobalLayout page={<NewTasksRequests />} />,
  },
  {
    title: "New Task Details",
    url: "/new-tasks-request/:id",
    page: <GlobalLayout page={<NewTaskRequestPage />} />,
  },
  {
    title: "Task Completed",
    url: "/task-completed",
    page: <GlobalLayout page={<TaskCompleted />} />,
  },

  {
    title: "Assign Reported Task",
    url: "/assign-reported-task",
    page: <GlobalLayout page={<AssignReportedTask />} />,
  },

  {
    title: "Managers List",
    url: "/managers",
    page: <GlobalLayout page={<Managers />} />,
  },
  {
    title: "Edit Manager",
    url: "/edit-manager/:id",
    page: <GlobalLayout page={<EditManager />} />,
  },
  {
    title: "Assign Manager",
    url: "/manager/assign-manager",
    page: <GlobalLayout page={<AssignManager />} />,
  },
  {
    title: "AddManagerpage",
    url: "/managers/add",
    page: <GlobalLayout page={<AddManagerpage />} />,
  },

  {
    title: "Assign Employees",
    url: "/employees/assign-employees",
    page: <GlobalLayout page={<AssignEmployee />} />,
  },
  {
    title: "Employee List",
    url: "/employees",
    page: <GlobalLayout page={<Employees />} />,
  },
  {
    title: "Edit Employee",
    url: "/edit-employee/:id",
    page: <GlobalLayout page={<EditEmployee />} />,
  },

  {
    title: "Boat",
    url: "/boats",
    page: <GlobalLayout page={<Boats />} />,
  },
  {
    title: "Add a Fleet",
    url: "/add-fleet",
    page: <GlobalLayout page={<AddFleet />} />,
  },
  {
    title: "Boat Details",
    url: "/boats/:id",
    page: <GlobalLayout page={<BoatDetail />} />,
  },
  {
    title: "Boat Access",
    url: "/boats-access",
    page: <GlobalLayout page={<BoatAccess />} />,
  },
  {
    title: "Boat Access Rights",
    url: "/managers/boats-access-rights",
    page: <GlobalLayout page={<BoatAccessRights />} />,
  },

  {
    title: "Terms Of Services",
    url: "/terms-of-services",
    page: <GlobalLayout page={<TermsOfServices />} />,
  },
  {
    title: "Privacy Policy",
    url: "/privacy-policy",
    page: <GlobalLayout page={<PrivacyPolicy />} />,
  },
  {
    title: "Tides Tales & Guide",
    url: "/blogs",
    page: <GlobalLayout page={<Blogs />} />,
  },
  {
    title: "Blogs Detail",
    url: "/blogs/:id",
    page: <GlobalLayout page={<BlogDetails />} />,
  },
  {
    title: "Inactive Employees",
    url: "/inactive-employees",
    page: <GlobalLayout page={<DeactivatedEmployees />} />,
  },
  {
    title: "Notifications",
    url: "/notifications",
    page: <GlobalLayout page={<Notifications />} />,
  },

  // {
  //   title: "Add Employee",
  //   url: "/employees/add",
  //   page: <GlobalLayout page={<AddEmployee />} />,
  // },

  // {
  //   title: "Add Manager",
  //   url: "/managers/add",
  //   page: <GlobalLayout page={<AddManager/>} />,
  // },
  {
    title: "Create Blog",
    url: "/blog/createnewblog",
    page: <GlobalLayout page={<CreateNewBlog />} />,
  },

  {
    title: "Profile",
    url: "/profile",
    page: (
      <GlobalLayout page={<SettingsLayout page={<UserManagementPage />} />} />
    ),
  },
  {
    title: "Settings",
    url: "/settings/change-password",
    page: (
      <GlobalLayout page={<SettingsLayout page={<ChangePasswordPage />} />} />
    ),
  },
  {
    title: "Settings",
    url: "/settings/billing",
    page: <GlobalLayout page={<SettingsLayout page={<Billing />} />} />,
  },
  {
    title: "Settings",
    url: "/settings/notifications",
    page: (
      <GlobalLayout
        page={<SettingsLayout page={<NotificationSettingsPage />} />}
      />
    ),
  },
  {
    title: "Settings",
    url: "/settings/notifications",
    page: (
      <GlobalLayout
        page={<SettingsLayout page={<NotificationSettingsPage />} />}
      />
    ),
  },

  {
    title: "Select Payment Method",
    url: "/payment-method",
    page: <SelectPaymentMethod />,
  },

  {
    title: "Publish Blog",
    url: "/publish",
    page: <GlobalLayout page={<Publish />} />,
  },
  {
    title: "Preview Blog",
    url: "/preview",
    page: <GlobalLayout page={<Preview />} />,
  },
  {
    title: "Update Blog",
    url: "/updateblog/:id",
    page: <GlobalLayout page={<UpdateBlog />} />,
  },
  {
    title: "Update Blog Post",
    url: "/updatepublish/:id",
    page: <GlobalLayout page={<PostUpdateBlog />} />,
  },
  {
    title: "Deleted Account",
    url: "/delete-account/:id",
    page: <GlobalLayout page={<DeleteAccountList />} />,
  },
  {
    title: "Deleted Manager Account",
    url: "/delete-manager-account/:id",
    page: <GlobalLayout page={<DeleteManagerAccount />} />,
  },
  {
    title: "Add Employee Plus",
    url: "/addemployeeplus",
    page: <GlobalLayout page={<AddEmployeePlus />} />,
  },
];
