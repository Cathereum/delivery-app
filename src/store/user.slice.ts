import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataFromStorage } from "../helpers/storage.service";
import axios from "axios";
import { JwtToken } from "../interfaces/jwt.interface";
import { PREFIX } from "../helpers/API";

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

export const logIn = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post<JwtToken>(`${PREFIX}/auth/login`, {
      email: params.email,
      password: params.password,
    });
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.jwt = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(
      logIn.fulfilled,
      (state, action: PayloadAction<JwtToken>) => {
        state.jwt = action.payload.access_token;
      }
    );
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
