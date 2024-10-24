import AddCard from "../pages/onboarding/AddCard";
import ForgotPassword from "../pages/onboarding/ForgotPassword";
import Login from "../pages/onboarding/Login";
import OnboardVerifyOtp from "../pages/onboarding/OnboardVerifyOtp";
import SelectPackage from "../pages/onboarding/SelectPackage";
import Signup from "../pages/onboarding/Signup";
import Summary from "../pages/onboarding/Summary";
import UpdatePassword from "../pages/onboarding/UpdatePassword";
import VerifyOtp from "../pages/onboarding/VerifyOtp";

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
];
