import {
  CreateContact,
  deleteContact,
  fetchContactsFromUser,
  updateContact,
  updateMessageToContact,
} from "@/src/api/contact/contact.api";
import {
  Contact,
  ContactCredential,
  MessageToContact,
  UpdateContact,
} from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ContactState {
  contact: Contact | null;
  contacts: Contact[] | null;
  status: string;
  error: string | undefined;
  isContactCreated: boolean | undefined;
  isMessageAdded: boolean | undefined;
}

export const initialState: ContactState = {
  contact: null,
  contacts: [],
  status: "idle",
  error: undefined,
  isContactCreated: undefined,
  isMessageAdded: undefined,
};

export const createContactAPI = createAsyncThunk<
  boolean,
  ContactCredential,
  { rejectValue: string }
>("contact/addContact", async (contactCred, { dispatch }) => {
  try {
    const addedContact = await CreateContact(contactCred);

    if (addedContact) {
      dispatch(fetchContactsAPI(contactCred.userId));
      dispatch(contactSlice.actions.addedContactSuccessful(addedContact));

      return addedContact;
    } else {
      dispatch(contactSlice.actions.addedContactSuccessful(false));
      return addedContact;
    }
  } catch (error: any) {
    dispatch(contactSlice.actions.addedContactSuccessful(false));
    return error.message;
  }
});

export const updateContactAPI = createAsyncThunk<
  boolean,
  UpdateContact,
  { rejectValue: string }
>("contact/putContact", async (contact, { dispatch }) => {
  try {
    const updatedContact = await updateContact(contact.id, contact);

    if (updatedContact) {
      dispatch(fetchContactsAPI(contact.userId));
      // dispatch(contactSlice.actions.addedContactSuccessful(addedContact));

      return updatedContact;
    } else {
      dispatch(contactSlice.actions.addedContactSuccessful(false));
      return updatedContact;
    }
  } catch (error: any) {
    dispatch(contactSlice.actions.addedContactSuccessful(false));
    return error.message;
  }
});

export const deleteContactsAPI = createAsyncThunk<
  boolean,
  string,
  { rejectValue: string }
>("contact/deleteContact", async (contactId, { rejectWithValue }) => {
  try {
    const response = await deleteContact(contactId);

    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
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

export const putMessageToContact = createAsyncThunk<boolean, MessageToContact>(
  "contact/messageToContact",
  async (updateContacts, { dispatch, rejectWithValue }) => {
    try {
      const response = await updateMessageToContact(updateContacts);
      console.log("Response: ", response);

      dispatch(contactSlice.actions.connectedMessageSuccessful(response));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addedContactSuccessful: (state, action) => {
      state.isContactCreated = action.payload;
    },
    connectedMessageSuccessful: (state, action) => {
      state.isMessageAdded = action.payload;
      console.log("ismessageAdded: ", state.isMessageAdded);
    },
    resetMessageSuccessful: (state, action) => {
      state.isMessageAdded = action.payload;
      console.log("ismessageAdded resetted: ", state.isMessageAdded);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContactsAPI.fulfilled, (state, action) => {
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
        state.status = "succeeded";
      })
      .addCase(createContactAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const contactReducer = contactSlice.reducer;
export const { resetMessageSuccessful } = contactSlice.actions;
