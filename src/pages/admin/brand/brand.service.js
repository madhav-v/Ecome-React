import HttpService from "../../../services/http.service";

class BrandService extends HttpService {
  createBrand = async (data) => {
    try {
      let respone = await this.postRequest("/v1/brand", data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  getBrandDetail = async (slug) => {
    try {
      let respone = await this.getRequest("/v1/brand/" + slug + "/detail");
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listAllBrands = async (perpage = 10, page = 1) => {
    try {
      let respone = await this.getRequest(
        "/v1/brand?perPage=" + perpage + "&page=" + page,
        { auth: true }
      );
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listAllHomeBrands = async (perpage = 10, page = 1) => {
    try {
      let response = await this.getRequest(
        "/v1/brand/list/home?perPage=" + perpage + "&page=" + page
      );
      return response;
    } catch (exception) {
      throw exception;
    }
  };
  deleteBrandById = async (id) => {
    try {
      let respone = await this.deleteRequest("/v1/brand/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  getBrandById = async (id) => {
    try {
      let respone = await this.getRequest("/v1/brand/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  updateBrand = async (data, id) => {
    try {
      let respone = await this.putRequest("/v1/brand/" + id, data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
}
export default BrandService;
