import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataFromStorage } from "../helpers/storage.service";
import axios, { AxiosError } from "axios";
import { JwtToken } from "../interfaces/jwt.interface";
import { PREFIX } from "../helpers/API";
import { Profile } from "../interfaces/profile.interface";
import { RootState } from "./store";

export const JWT_STORAGE_KEY = "userData";

export interface UserState {
  jwt: string | null;
  loginErrorMessage?: string;
  registerErrorMessage?: string;
  profile?: Profile;
}

const initialState: UserState = {
  jwt: getDataFromStorage<UserState>(JWT_STORAGE_KEY)?.jwt ?? null,
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

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<JwtToken>(`${PREFIX}/auth/register`, {
        email: params.email,
        password: params.password,
        name: params.name,
      });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data.message);
      }
    }
  }
);

export const getProfile = createAsyncThunk<Profile, void, { state: RootState }>(
  "user/getProfile",
  async (_, thunkApi) => {
    const jwt = thunkApi.getState().user.jwt;
    const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
      headers: { Authorization: `Bearer ${jwt}` },
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
    clearLoginError: (state) => {
      state.loginErrorMessage = undefined;
    },
    clearRegisterError: (state) => {
      state.registerErrorMessage = undefined;
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
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.access_token;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerErrorMessage = action.error.message;
    });
    builder.addCase(getProfile.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.profile = action.payload;
    });
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
