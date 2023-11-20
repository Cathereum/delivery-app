import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getDataFromStorage } from "../helpers/storage.service";

export const JWT_STORAGE_KEY = "userData";

export interface StorageDataProps {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: getDataFromStorage<StorageDataProps>(JWT_STORAGE_KEY)?.jwt ?? null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    logOut: (state) => {
      state.jwt = null;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
