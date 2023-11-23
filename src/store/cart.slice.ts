import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDataFromStorage } from "../helpers/storage.service";

export const USER_CART_STORAGE_KEY = "userCart";

export type CartItem = {
  id: number;
  count: number;
};

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: getDataFromStorage<CartState>(USER_CART_STORAGE_KEY)?.items ?? [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<number>) => {
      const existItem = state.items.find((item) => item.id === action.payload);
      if (!existItem) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items.map((i) => {
        if (i.id === action.payload) {
          i.count++;
        }
        return i;
      });
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items.map((i) => {
        if (i.id === action.payload && i.count > 1) {
          i.count--;
        }
        return i;
      });
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
