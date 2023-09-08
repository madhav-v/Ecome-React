import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Auth } from "../pages/auth/register";

export const getLoggedInUser = createAsyncThunk(
  "user/getLoggedInUser",
  async (data = null, thunkAPI) => {
    try {
      let userData = await Auth.authSvc.getLoggedInUser();
      if (userData.status) {
        return userData.result;
      } else {
        throw userData;
      }
    } catch (exception) {
      throw exception;
    }
  }
);

const UserSlicer = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    // events
    setLoggedInuser: (state, action) => {
      state.loggedInUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
    builder.addCase(getLoggedInUser.rejected, (state, action) => {
      state.loggedInUser = null;
    });
  },
});

export const { setLoggedInuser } = UserSlicer.actions;
export default UserSlicer.reducer;
