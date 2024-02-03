import { addUserToDB } from "@/src/api/auth/auth.api";
import { UserCredential } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  User,
  createUser,
  deleteUser,
  fetchUserById,
  fetchUsers,
  updateUser,
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

export const addUserAsync = createAsyncThunk<
  void,
  UserCredential,
  { rejectValue: string }
>("user/addUser", async (userCred, thunkAPI) => {
  try {
    const addedUser = await addUserToDB(userCred);

    if (addedUser && addedUser.uid) {
      console.log("UID in thunk: ", addedUser.uid);

      await createUser(addedUser);
    } else {
      return thunkAPI.rejectWithValue("failed to add user");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

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

export const updateUserAPI = createAsyncThunk<
  User,
  { id: string; updatedUser: User }
>("user/updateUser", async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    console.log("UPDATE USER THUNK!");
    const user: User = await updateUser(id, updatedUser);
    return user;
  } catch (error) {
    return rejectWithValue(error || "Failed to update user");
  }
});

// export const createUserAPI = createAsyncThunk<UserCredential, void>(
//   "user/create",
//   async (_, { rejectWithValue }) => {
//     try {
//       console.log("CREATE USER THUNK!");
//       const newUser = await createUser();

//       console.log("USER IN THUNK: ", newUser.name, newUser.id);
//       return newUser;
//     } catch (error) {
//       return rejectWithValue(error || "Failed to create user");
//     }
//   }
// );

export const deleteUserAPI = createAsyncThunk<{ id: string }, string>(
  "user/delete",
  async (id, { rejectWithValue }) => {
    try {
      console.log("DELETE USER THUNK!");
      await deleteUser(id);

      return { id };
    } catch (error) {
      return rejectWithValue(error || "Failed to delete user");
    }
  }
);

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
        state.user = action.payload || null;
      })
      .addCase(fetchUserByIdAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(updateUserAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.user = action.payload || null;
      })
      .addCase(updateUserAPI.rejected, (state, action) => {
        console.error("ERROR UPDATING USER: ", action.payload);
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      // .addCase(createUserAPI.fulfilled, (state, action) => {
      //   console.log("CREATED USER: ", action.payload.id);
      //   state.status = "succeeded";
      //   state.user = action.payload! || null;
      // })
      // .addCase(createUserAPI.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = "Something went wrong!";
      // })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.error = "Something went wrong!";
      })
      .addCase(addUserAsync.rejected, (state, action) => {
        state.error = "You already has a account on this application!";
      });
  },
});

export const userReducer = userSlice.reducer;
export { fetchUsers };
