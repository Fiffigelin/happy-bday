import {
  createMessage,
  fetchMessageFromContact,
  fetchMessagesFromUser,
} from "@/src/api/message/message.api";
import { BdayImage, Message, MessageCredential } from "@/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MessageState {
  image: BdayImage | null;
  message: Message | null;
  selectedMessage: Message | null;
  messages: Message[] | [];
  status: string;
  error: string | undefined;
  isMessageSaved: boolean | undefined;
}

export const initialState: MessageState = {
  image: null,
  message: null,
  selectedMessage: null,
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
  try {
    console.log("THUNK MESSAGE: ", messageCred);
    const addedMessage = await createMessage(messageCred);

    if (addedMessage) {
      dispatch(fetchMessagesAPI(messageCred.userId));
      dispatch(messageSlice.actions.addedMessageSuccessful(true));
      return addedMessage;
    } else {
      dispatch(messageSlice.actions.addedMessageSuccessful(false));
    }
  } catch (error: any) {
    dispatch(messageSlice.actions.addedMessageSuccessful(false));
    return error.message;
  }
});

export const fetchMessagesAPI = createAsyncThunk<Message[], string>(
  "message/fetchMessages",
  async (userId, { rejectWithValue }) => {
    try {
      console.log("userid: ", userId);
      const messages = await fetchMessagesFromUser(userId);
      console.log("thunk messages: ", messages);
      return messages;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchMessageFromContactAPI = createAsyncThunk<Message, string>(
  "message/fetchMessage",
  async (contactMessageId, { rejectWithValue }) => {
    try {
      console.log("Kommer hit!");
      const message: Message = await fetchMessageFromContact(contactMessageId);
      return message;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    addedMessageSuccessful: (state, action) => {
      state.isMessageSaved = action.payload;
    },
    resetMessage: (state, action) => {
      state.message = action.payload;
    },
    setSelectedMessage: (state, action) => {
      console.log("messageId: ", action.payload);
      const messageId = action.payload;
      console.log("messages: ", state.messages);
      const message = state.messages?.find((msg) => msg.id === messageId);
      console.log("message: ", message);
      if (message) {
        state.selectedMessage = message;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessageAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMessageAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
      })
      .addCase(createMessageAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = "Something went wrong!";
      })
      .addCase(fetchMessagesAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessagesAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload || null;
      })
      .addCase(fetchMessagesAPI.rejected, (state) => {
        state.status = "failed fetch";
        state.error = "Something went wrong!";
      })
      .addCase(fetchMessageFromContactAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessageFromContactAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload || null;
      })
      .addCase(fetchMessageFromContactAPI.rejected, (state) => {
        state.status = "failed fetch";
        state.error = "Something went wrong!";
      });
  },
});

export const messageReducer = messageSlice.reducer;
export const { addedMessageSuccessful, resetMessage, setSelectedMessage } =
  messageSlice.actions;
