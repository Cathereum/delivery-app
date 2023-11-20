import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  jwt: string | null;
}

const initialState: UserState = {
  jwt: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state) => {
      state.jwt = "asfghjk";
    },
    logOut: (state) => {
      state.jwt = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
