import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  count: number;
};

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
