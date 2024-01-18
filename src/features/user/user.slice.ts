import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, createUser, fetchUsers } from "../../api/user/user.api";

interface UserState {
  user: User | null;
  users: User[] | null;
}

export const initialState: UserState = {
  user: null,
  users: [],
};

export const fetchUsersAPI = createAsyncThunk("user/fetchUsers", async () => {
  return fetchUsers();
});

export const createUserAPI = createAsyncThunk("user/create", async () => {
  createUser();
});

const userSlice = createSlice({
  name: "user",
  initialState: { data: null, status: "idle", error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload! || null;
      })
      .addCase(fetchUsersAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(createUserAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload! || null;
      })
      .addCase(createUserAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const userReducer = userSlice.reducer;
export { fetchUsers };
