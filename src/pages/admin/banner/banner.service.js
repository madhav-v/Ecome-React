import HttpService from "../../../services/http.service";

class BannerService extends HttpService {
  createBanner = async (data) => {
    try {
      let respone = await this.postRequest("/v1/banner", data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listAllBanners = async (perpage = 10, page = 1) => {
    try {
      let respone = await this.getRequest(
        "/v1/banner?perPage=" + perpage + "&page=" + page,
        { auth: true }
      );
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  deleteBannerById = async (id) => {
    try {
      let respone = await this.deleteRequest("/v1/banner/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  getBannerById = async (id) => {
    try {
      let respone = await this.getRequest("/v1/banner/" + id, {
        auth: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  updateBanner = async (data, id) => {
    try {
      let respone = await this.putRequest("/v1/banner/" + id, data, {
        auth: true,
        file: true,
      });
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
  listHomePageBannerData = async () => {
    try {
      let respone = await this.getRequest("/v1/banner/list/home");
      return respone;
    } catch (exception) {
      throw exception;
    }
  };
}
export default BannerService;
