import {
  createMessage,
  fetchMessagesFromUser,
} from "@/src/api/message/message.api";
import { BdayImage, Message, MessageCredential } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MessageState {
  image: BdayImage | null;
  message: Message | null;
  messages: Message[] | [];
  status: string;
  error: string | undefined;
  isMessageSaved: boolean | undefined;
}

export const initialState: MessageState = {
  image: null,
  message: null,
  messages: [],
  status: "idle",
  error: undefined,
  isMessageSaved: undefined,
};

export const createMessageAPI = createAsyncThunk<
  Message,
  MessageCredential,
  { rejectValue: string }
>("message/addMessage", async (messageCred, { dispatch }) => {
  // create api-function that creates a message and make another api-funtion that stores the messageId to the choosen contacts ✅
  // when a message and a message-id to a contact has been added then show a toast that indicates successfull connection
  // create functions for adding messages and getting messages from the database in the blue project ✔️
  // create function for adding message-id to a exisiting contact in the blue project

  try {
    console.log("THUNK MESSAGE ADDED: ", messageCred);
    const addedMessage = await createMessage(messageCred);

    console.log("MESSAGE THUNK: ", addedMessage);

    if (addedMessage) {
      dispatch(fetchMessagesAPI(messageCred.userId));
      dispatch(messageSlice.actions.addedMessageSuccessful(true));
      console.log("Message added");
      return addedMessage;
    } else {
      console.log("Adding message failed");
      dispatch(messageSlice.actions.addedMessageSuccessful(false));
      return addedMessage;
    }
  } catch (error: any) {
    dispatch(messageSlice.actions.addedMessageSuccessful(false));
    return error.message;
  }
});

export const fetchMessagesAPI = createAsyncThunk<Message[], string>(
  "contact/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      const messages = await fetchMessagesFromUser(userId);
      return messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addedMessageSuccessful: (state, action) => {
      console.log("isMessageSaved: ", action.payload);
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
        state.message = action.payload;
      })
      .addCase(createMessageAPI.rejected, (state, action) => {
        console.error("ERROR ADDING CONTACT: ", action.payload);
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(fetchMessagesAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessagesAPI.fulfilled, (state, action) => {
        console.log("Action payload: ", action.payload);
        state.status = "succeeded";
        state.messages = action.payload || null;
      })
      .addCase(fetchMessagesAPI.rejected, (state) => {
        state.status = "failed fetch";
        state.error = "Something went wrong!";
      });
  },
});

export const messageReducer = messageSlice.reducer;
