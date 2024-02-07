import {
  createCredentialUser,
  signInCredentialUser,
} from "@/src/api/auth/auth.api";
import { AuthUser, LoginUser, User, UserCredential } from "@/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  fetchUserByUid,
  // fetchUsers,
  updateUser,
} from "../../api/user/user.api";

interface UserState {
  inloggedUser: AuthUser | null;
  user: User | null;
  users: User[] | null;
  status: string;
  error: string | undefined;
}

export const initialState: UserState = {
  inloggedUser: null,
  user: null,
  users: [],
  status: "idle",
  error: undefined,
};

// export const registerNewUserAPI = createAsyncThunk<
//   string,
//   UserCredential,
//   { rejectValue: string }
// >("user/addUser", async (userCred, thunkAPI) => {
//   try {
//     const addedUser = await createCredentialUser(userCred);

//     if (addedUser && addedUser.uid) {
//       console.log("UID in thunk: ", addedUser.uid);

//       const result = await createUser(addedUser);
//       if (result.uid) {
//         return thunkAPI.fulfillWithValue("Register successfull!");
//       }
//     } else {
//       return thunkAPI.rejectWithValue("failed to add user");
//     }
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(error.message);
//   }
// });

export const registerNewUserAPI = createAsyncThunk<
  boolean,
  UserCredential,
  { rejectValue: string }
>("user/addUser", async (userCred) => {
  try {
    const addedUser = await createCredentialUser(userCred);

    if (addedUser && addedUser.uid) {
      console.log("UID in thunk: ", addedUser.uid);

      const result = await createUser(addedUser);
      return result;
    }
  } catch (error: any) {
    return error.message;
  }
});

export const loginRegisteredUserAPI = createAsyncThunk<
  User,
  LoginUser,
  { rejectValue: string }
>("user/login-user", async (userCred, thunkAPI) => {
  try {
    const addedUser = await signInCredentialUser(userCred);

    if (addedUser) {
      console.log("UID in thunk: ", addedUser);

      const fetchedUser = await fetchUserByUid(addedUser);
      return fetchedUser;
    } else {
      return thunkAPI.rejectWithValue("Failed to add user");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const fetchUsersAPI = createAsyncThunk<UserCredential[], void>(
//   "user/fetchUsers",
//   async (_, { rejectWithValue }) => {
//     try {
//       const users = await fetchUsers();
//       return users;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

// export const fetchUserByIdAPI = createAsyncThunk<User, string>(
//   "user/fetchUserId",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const user: User = await fetchUserByUid(userId);
//       return user;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

export const updateUserAPI = createAsyncThunk<
  User,
  { id: string; updatedUser: User }
>("user/updateUser", async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
    console.log("UPDATE USER THUNK!");
    const user = await updateUser(id, updatedUser);
    return user;
  } catch (error) {
    return rejectWithValue(error || "Failed to update user");
  }
});

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
  reducers: {
    logOutUser: (state) => {
      state.user = null;
    },
    setActiveUser: (state, action: PayloadAction<AuthUser | undefined>) => {
      if (action.payload) {
        state.inloggedUser = {
          uid: action.payload.uid,
          email: action.payload.email,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUsersAPI.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchUsersAPI.fulfilled, (state, action) => {
      //   console.log("Action payload: ", action.payload);
      //   state.status = "succeeded";
      //   state.users = action.payload || [];
      // })
      // .addCase(fetchUsersAPI.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = "Something went wrong!";
      // })
      // .addCase(fetchUserByIdAPI.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchUserByIdAPI.fulfilled, (state, action) => {
      //   console.log("Action payload: ", action.payload);
      //   state.status = "succeeded";
      //   state.user = action.payload || null;
      // })
      // .addCase(fetchUserByIdAPI.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = "Something went wrong!";
      // })
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
      .addCase(registerNewUserAPI.fulfilled, (state) => {
        state.error = "Something went wrong!";
      })
      .addCase(registerNewUserAPI.rejected, (state) => {
        state.error = "You already has a account on this application!";
      })
      .addCase(loginRegisteredUserAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(loginRegisteredUserAPI.rejected, (state) => {
        state.error = "You already has a account on this application!";
      });
  },
});

export const userReducer = userSlice.reducer;
export const { logOutUser, setActiveUser } = userSlice.actions;
// export { fetchUsers };
