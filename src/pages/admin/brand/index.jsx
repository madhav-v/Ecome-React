import BrandCreateForm from "./brand-create.page";
import BrandService from "./brand.service";
import BrandListPage from "./brand-list.page";
import BrandEditForm from "./brand-edit.page";
const brandSvc = new BrandService();
export default {
  BrandCreateForm,
  brandSvc,
  BrandListPage,
  BrandEditForm,
};
