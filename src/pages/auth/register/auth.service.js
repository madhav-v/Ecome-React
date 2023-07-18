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
}

export default AuthService;
