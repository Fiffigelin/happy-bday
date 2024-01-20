import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  User,
  createUser,
  fetchUserById,
  fetchUsers,
} from "../../api/user/user.api";

interface UserState {
  user: User | null;
  users: User[] | null;
  status: string;
  error: string | undefined;
}

export const initialState: UserState = {
  user: null,
  users: [],
  status: "idle",
  error: undefined,
};

export const fetchUsersAPI = createAsyncThunk<User[], void>(
  "user/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const users = await fetchUsers();
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchUserByIdAPI = createAsyncThunk<User, string>(
  "user/fetchUserId",
  async (userId: string, { rejectWithValue }) => {
    try {
      const user: User = await fetchUserById(userId);
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createUserAPI = createAsyncThunk("user/create", async () => {
  createUser();
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.users = action.payload || [];
      })
      .addCase(fetchUsersAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(fetchUserByIdAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByIdAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.user = action.payload || [];
      })
      .addCase(fetchUserByIdAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(createUserAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload! || null;
      })
      .addCase(createUserAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const userReducer = userSlice.reducer;
export { fetchUsers };
