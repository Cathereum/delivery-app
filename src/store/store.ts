import { configureStore } from "@reduxjs/toolkit";
import userSlice, { JWT_STORAGE_KEY } from "./user.slice";
import { saveDataToStorage } from "../helpers/storage.service";
import cartSlice, { USER_CART_STORAGE_KEY } from "./cart.slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

store.subscribe(() => {
  saveDataToStorage(JWT_STORAGE_KEY, { jwt: store.getState().user.jwt });
  saveDataToStorage(USER_CART_STORAGE_KEY, {
    items: store.getState().cart.items,
  });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
