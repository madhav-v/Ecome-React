import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.reducer";

const store = configureStore({
  reducer: {
    User: userReducer,
  },
});

export default store;
