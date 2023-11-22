import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STORAGE_KEY } from "./user.slice";
import { saveDataToStorage } from "../helpers/storage.service";
import cartSlice from "./cart.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveDataToStorage(JWT_STORAGE_KEY, { jwt: store.getState().user.jwt });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
