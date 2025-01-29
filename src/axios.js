import axios from "axios";
import Cookies from "js-cookie";

export const baseUrl = "https://api.theperfectboat.com";

const instance = axios.create({
  baseURL: baseUrl,
});

instance.interceptors.request.use((request) => {
  let token = Cookies.get("token");
  request.headers = {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer ${token}`,
  };
  return request;
});

instance.interceptors.response.use(
  (response) => {
    if (response) {
      return response;
    }
  },
  function (error) {
    // *For unAuthorized
    if (error.response.status === 401 || error.response.status === 403) {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");

      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
