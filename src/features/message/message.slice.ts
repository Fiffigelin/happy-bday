import { CreateContact } from "@/src/api/contact/contact.api";
import { BdayImage, MessageCredential } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchContactsAPI } from "../contact/contact.slice";

interface MessageState {
  image: BdayImage | null;
  message: string | null;
  status: string;
  error: string | undefined;
  isMessageSaved: boolean | undefined;
}

export const initialState: MessageState = {
  image: null,
  message: "",
  status: "idle",
  error: undefined,
  isMessageSaved: undefined,
};

export const createMessageAPI = createAsyncThunk<
  boolean,
  MessageCredential,
  { rejectValue: string }
>("message/addMessage", async (messageCred, { dispatch }) => {
  // create api-function that creates a message and make another api-funtion that stores the messageId to the choosen contacts
  // when a message and a message-id to a contact has been added then show a toast that indicates successfull connection
  // create functions for adding messages and getting messages from the database in the blue project
  // create function for adding message-id to a exisiting contact in the blue project

  try {
    console.log("THUNK MESSAGE ADDED: ", messageCred);
    const addedContact = await CreateContact(messageCred);

    if (addedContact) {
      dispatch(fetchContactsAPI(messageCred.userId));
      dispatch(contactSlice.actions.addedContactSuccessful(addedContact));

      console.log("Contact added");
      return addedContact;
    } else {
      console.log("Adding contact failed");
      dispatch(contactSlice.actions.addedContactSuccessful(false));
      return addedContact;
    }
  } catch (error: any) {
    dispatch(contactSlice.actions.addedContactSuccessful(false));
    return error.message;
  }
});

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addedContactSuccessful: (state, action) => {
      state.isMessageSaved = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessageAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMessageAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
      })
      .addCase(createMessageAPI.rejected, (state, action) => {
        console.error("ERROR ADDING CONTACT: ", action.payload);
        state.status = "failed";
        state.error = "Something went wrong!";
      });
  },
});

export const contactReducer = contactSlice.reducer;
