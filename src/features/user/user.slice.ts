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
  updateUser,
} from "../../api/user/user.api";

interface UserState {
  inloggedUser: AuthUser | null;
  user: User | null;
  status: string;
  error: string | undefined;
}

export const initialState: UserState = {
  inloggedUser: null,
  user: null,
  status: "idle",
  error: undefined,
};

export const registerNewUserAPI = createAsyncThunk<
  boolean,
  UserCredential,
  { rejectValue: string }
>("user/addUser", async (userCred) => {
  try {
    const addedUser = await createCredentialUser(userCred);

    if (addedUser && addedUser.uid) {
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
      const fetchedUser = await fetchUserByUid(addedUser);
      return fetchedUser;
    } else {
      return thunkAPI.rejectWithValue("Failed to add user");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUserAPI = createAsyncThunk<
  User,
  { id: string; updatedUser: User }
>("user/updateUser", async ({ id, updatedUser }, { rejectWithValue }) => {
  try {
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
      .addCase(updateUserAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload || null;
      })
      .addCase(updateUserAPI.rejected, (state, action) => {
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
