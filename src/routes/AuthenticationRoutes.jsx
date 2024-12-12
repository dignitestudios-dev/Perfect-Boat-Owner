import { Navigate } from "react-router-dom";
import AddCard from "../pages/onboarding/AddCard";
import ForgotPassword from "../pages/onboarding/ForgotPassword";
import Login from "../pages/onboarding/Login";
import OnboardVerifyOtp from "../pages/onboarding/OnboardVerifyOtp";
import SelectPackage from "../pages/onboarding/SelectPackage";
import Signup from "../pages/onboarding/Signup";
import Summary from "../pages/onboarding/Summary";
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import VerifyOtp from "../pages/onboarding/VerifyOtp";
import PageNotFound from "../pages/PageNotFound";

export const AuthenticationRoutes = [
  {
    title: "Signup",
    url: "/signup",
    page: <Signup />,
  },
  {
    title: "Verify Otp Onboard",
    url: "/onboard-verify-otp",
    page: <OnboardVerifyOtp />,
  },

  {
    title: "Login",
    url: "/login",
    page: <Login />,
  },
  {
    title: "Forgot Password",
    url: "/forgot-password",
    page: <ForgotPassword />,
  },
  {
    title: "Verify Otp",
    url: "/verify-otp",
    page: <VerifyOtp />,
  },
  {
    title: "Update Password",
    url: "/update-password",
    page: <UpdatePassword />,
  },
  {
    title: "Not found",
    url: "*",
    page: <Navigate to="/404" />,
  },
  {
    title: "Not found",
    url: "/404",
    page: <PageNotFound />,
  },
];
