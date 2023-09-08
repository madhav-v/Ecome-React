// import axios from "axios";
// import { toast } from "react-toastify";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   timeout: 30000,
//   timeoutErrorMessage: "Server Timed out...",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // interceptors
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     console.log(error);
//     if (error.response.status === 401) {
//       // redirect user to login Screen
//       // refresh token
//       // window.location.href = "/login"
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshtoken");
//       localStorage.removeItem("user");
//       toast.warn("Please login first");
//     } else if (error.response.status === 403) {
//       // access denied
//       toast.warning("You do not have previlege to access this panel");
//       window.location.href = "/";
//     } else if (error.response.status === "404") {
//       window.localStorage.href = "/error";
//     } else {
//       throw error.response;
//     }
//     console.error("Reject Interceptor", error);
//   }
// );

// export default axiosInstance;

import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  timeoutErrorMessage: "Server Timed out...",
  headers: {
    "Content-Type": "application/json",
  },
});

// interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        // redirect user to login Screen
        // refresh token
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshtoken");
        localStorage.removeItem("user");
        toast.warn("Please login first");
        window.location.href = "/login";
      } else if (error.response.status === 403) {
        // access denied
        toast.warning("You do not have previlege to access this panel");
        window.location.href = "/";
      } else if (error.response.status === "404") {
        window.localStorage.href = "/error";
      } else {
        throw error.response;
      }
    }
    // console.error("Reject Interceptor", error)
  }
);

export default axiosInstance;
