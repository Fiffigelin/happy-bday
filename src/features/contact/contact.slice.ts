import {
  CreateContact,
  fetchContactsFromUser,
} from "@/src/api/contact/contact.api";
import { Contact, ContactCredential } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContactState {
  contact: Contact | null;
  contacts: Contact[] | null;
  status: string;
  error: string | undefined;
}

export const initialState: ContactState = {
  contact: null,
  contacts: [],
  status: "idle",
  error: undefined,
};

export const createContactAPI = createAsyncThunk<
  boolean,
  ContactCredential,
  { rejectValue: string }
>("contact/addContact", async (contactCred, { dispatch }) => {
  try {
    console.log("THUNK CONTACT ADDED: ", contactCred);
    const addedContact = await CreateContact(contactCred);

    if (addedContact) {
      dispatch(fetchContactsAPI(contactCred.userId));

      console.log("Contact added");
      return addedContact;
    } else {
      console.log("Adding contact failed");
      return addedContact;
    }
  } catch (error: any) {
    return error.message;
  }
});

export const fetchContactsAPI = createAsyncThunk<Contact[], string>(
  "contact/fetchContacts",
  async (userId, { rejectWithValue }) => {
    try {
      const contacts = await fetchContactsFromUser(userId);
      return contacts;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactsAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.contacts = action.payload || null;
      })
      .addCase(fetchContactsAPI.rejected, (state) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(createContactAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createContactAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
      })
      .addCase(createContactAPI.rejected, (state, action) => {
        console.error("ERROR ADDING CONTACT: ", action.payload);
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const contactReducer = contactSlice.reducer;
