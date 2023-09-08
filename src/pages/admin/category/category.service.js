import HttpService from "../../../services/http.service";

class CategoryService extends HttpService {
  createCategory = async (data) => {
    try {
      let respone = await this.postRequest("/v1/category", data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listAllCategories = async (perpage = 10, page = 1) => {
    try {
      let respone = await this.getRequest(
        "/v1/category?perPage=" + perpage + "&page=" + page,
        { auth: true }
      );
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listAllHomeCategories = async (perpage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        "/v1/category/list/home?perPage=" + perpage + "&page=" + page,
        { auth: true }
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  deleteCategoryById = async (id) => {
    try {
      let respone = await this.deleteRequest("/v1/category/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  getCategoryById = async (id) => {
    try {
      let respone = await this.getRequest("/v1/category/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  updateCategory = async (data, id) => {
    try {
      let respone = await this.putRequest("/v1/category/" + id, data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
}
export default CategoryService;
