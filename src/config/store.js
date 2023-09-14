import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.reducer";
import productReducer from "../reducers/product.reducer";

const store = configureStore({
  reducer: {
    User: userReducer,
    cart: productReducer
  },
});

export default store;
