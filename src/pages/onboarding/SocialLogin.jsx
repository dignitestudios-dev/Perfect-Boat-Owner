import React, { useContext, useState } from "react";
import axios from "../../axios";
import {
  app,
  auth,
  googleProvider,
  appleProvider,
} from "../../firebase/firebase";
import { FacebookAuthProvider } from "firebase/auth";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { FiLoader } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SocialLogin = () => {
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [idToken, setIdToken] = useState(null);
  const { login } = useContext(AuthContext);

  const handleAppleLogin = async () => {
    try {
      setAppleLoading(true);
      const result = await signInWithPopup(auth, appleProvider);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`auth/social/logIn`, {
              role: "owner",
              firebaseIdToken: token,
              // fcmToken:"",
            })
            .then(
              (response) => {
                login(response?.data);
                if (response?.data?.data?.token) {
                  if (response?.data?.data?.isSubscribed === true) {
                    navigate("/welcome-aboard");
                  } else {
                    navigate("/select-package");
                  }
                }
              },
              (error) => {
                console.log(error);
                if (
                  error?.response?.status == 401 &&
                  error?.response?.data?.message == "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                }
                setAppleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setAppleLoading(false);
      //   setError("Cannot open apple signin modal.");
    }
  };

  const handleFacebookLogin = async () => {
    try {
      setFacebookLoading(true);
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`/auth/social/logIn`, {
              role: "owner",
              firebaseIdToken: token,
              // fcmToken:"",
            })
            .then(
              (response) => {
                login(response?.data);
                if (response?.data?.data?.token) {
                  if (response?.data?.data?.isSubscribed === true) {
                    navigate("/welcome-aboard");
                  } else {
                    navigate("/select-package");
                  }
                }
              },
              (error) => {
                console.log(error);
                if (
                  error?.response?.status == 401 &&
                  error?.response?.data?.message == "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                }
                setFacebookLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setFacebookLoading(false);
      //   setError("Cannot open apple signin modal.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      if (result) {
        const token = await result?.user?.getIdToken();
        if (token) {
          axios
            .post(`/auth/social/logIn`, {
              role: "owner",
              firebaseIdToken: token,
              // fcmToken:"",
            })
            .then(
              (response) => {
                login(response?.data);
                // just for now
                sessionStorage.setItem("token", response?.data?.data?.token);
                if (response?.data?.data?.token) {
                  if (response?.data?.data?.isSubscribed === true) {
                    navigate("/welcome-aboard");
                  } else {
                    navigate("/select-package");
                  }
                }
              },
              (error) => {
                console.log(error);
                if (
                  error?.response?.status == 401 &&
                  error?.response?.data?.message == "No such user found"
                ) {
                  setIdToken(token);
                  setShowModal(true);
                }
                setGoogleLoading(false);
              }
            );
        }
      }
    } catch (err) {
      setGoogleLoading(false);
      //   setError("Cannot open google signin modal.");
    }
  };

  return (
    <div className="w-full h-auto flex flex-col gap-1 justify-center items-start pt-2">
      <div className="w-full lg:w-[434px] flex justify-center items-center">
        <div className="grid grid-cols-3 gap-3 lg:gap-10">
          {googleLoading ? (
            <div
              className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D] text-white text-2xl 
                flex items-center justify-center mx-1"
            >
              <FiLoader className="text-white text-[32px] animate-spin mx-auto" />
            </div>
          ) : (
            <div
              onClick={handleGoogleLogin}
              className="md:w-[108.31px] w-[90px] h-[88px] rounded-[16px] bg-[#1A293D] hover:bg-[#233751]
                 text-white text-2xl flex items-center justify-center mr-2"
            >
              <FaGoogle />
            </div>
          )}
          {facebookLoading ? (
            <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D] text-white text-2xl flex items-center justify-center">
              <FiLoader className="text-white text-[32px] animate-spin mx-auto" />
            </div>
          ) : (
            <div
              onClick={handleFacebookLogin}
              className="md:w-[108.31px] w-[90px] h-[88px] rounded-[16px] bg-[#1A293D] hover:bg-[#233751]
               text-white text-3xl flex items-center justify-center mx-2"
            >
              <FaFacebookF />
            </div>
          )}
          {appleLoading ? (
            <div className="w-[108.31px] h-[88px] rounded-[16px] bg-[#1A293D] text-white text-2xl flex items-center justify-center">
              <FiLoader className="text-white text-[32px] animate-spin mx-auto" />
            </div>
          ) : (
            <div
              onClick={handleAppleLogin}
              className="md:w-[108.31px] w-[90px] h-[88px] rounded-[16px] bg-[#1A293D] hover:bg-[#233751]
               text-white text-3xl flex items-center justify-center ml-4"
            >
              <FaApple />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;
