import CategoryCreateForm from "./category-create.page";
import CategoryService from "./category.service";
import CategoryListPage from "./category-list.page";
import CategoryEditForm from "./category-edit.page";
const categorySvc = new CategoryService();
export default {
  CategoryCreateForm,
  categorySvc,
  CategoryListPage,
  CategoryEditForm,
};
