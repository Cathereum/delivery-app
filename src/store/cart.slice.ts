import { PayloadAction, createSlice } from "@reduxjs/toolkit";

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
      });
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
