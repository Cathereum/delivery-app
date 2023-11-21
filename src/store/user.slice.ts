import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataFromStorage } from "../helpers/storage.service";
import axios, { AxiosError } from "axios";
import { JwtToken } from "../interfaces/jwt.interface";
import { PREFIX } from "../helpers/API";

export const JWT_STORAGE_KEY = "userData";

export interface StorageDataProps {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
}

const initialState: UserState = {
  jwt: getDataFromStorage<StorageDataProps>(JWT_STORAGE_KEY)?.jwt ?? null,
};

export const logIn = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<JwtToken>(`${PREFIX}/auth/login`, {
        email: params.email,
        password: params.password,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.jwt = null;
    },
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
  },
  extraReducers(builder) {
    builder.addCase(logIn.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loginErrorMessage = action.error.message;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
