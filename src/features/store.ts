// store.js
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { contactReducer } from "./contact/contact.slice";
import { imageReducer } from "./image/image.slice";
import { messageReducer } from "./message/message.slice";
import { userReducer } from "./user/user.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    image: imageReducer,
    contact: contactReducer,
    message: messageReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
