import BannerCreateForm from "./banner-create.page";
import BannerService from "./banner.service";
import BannerListPage from "./banner-list.page";
import BannerEditForm from "./banner-edit.page";
const bannerSvc = new BannerService();
export default {
  BannerCreateForm,
  bannerSvc,
  BannerListPage,
  BannerEditForm,
};
