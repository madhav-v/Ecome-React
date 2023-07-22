import axiosInstance from "../../../config/axios.config";
class AuthService {
  login = async (credentials) => {
    try {
      let response = await axiosInstance.post("/v1/auth/login", credentials);
      return response;
    } catch (error) {
      throw error;
    }
  };

  register = async (data) => {
    try {
      let response = await axiosInstance.post("/v1/auth/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (exception) {
      throw exception;
    }
  };

  getUserByToken = async (token) => {
    try {
      let response = await axiosInstance.post(
        "/v1/auth/activate/" + token,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (exception) {
      console.log(
        "🚀 ~ file: auth.service.js:37 ~ AuthService ~ getUserByToken= ~ exception:",
        exception
      );

      throw exception;
    }
  };

  getLoggedInUser = async () => {
    try {
      let token = localStorage.getItem("accessToken");
      if (!token) {
        throw "Token not set..";
      }
      let userInfo = await axiosInstance.get("/v1/auth/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      return userInfo;
    } catch (error) {
      throw error;
    }
  };

  forgetPassword = async (email) => {
    try {
      const response = await axiosInstance.post(
        "/v1/auth/forget-password",
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  resetPassword = async (userEmail, newPassword) => {
    try {
      const response = await axiosInstance.post(
        "/v1/auth/password-reset",
        { email: userEmail, newPassword },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status) {
        return response.data; // Assuming the backend returns relevant data upon successful password reset
      } else {
        throw new Error(response.data.msg); // Throw an error with the error message from the API response
      }
    } catch (error) {
      throw error; // You can handle error responses or custom error messages here
    }
  };
}

export default AuthService;
