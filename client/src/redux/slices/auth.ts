import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../configs/axios";
import { User } from "../../types/types";

export const fetchAuth = createAsyncThunk(
  "auth/fetchAuth",
  async (params: { email: string; password: string }) => {
    const { data } = await axios.post("/auth/login", params);
    return data;
  }
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: { login: string; email: string; password: string; isAdmin: boolean }) => {
    const { data } = await axios.post("/auth/register", params);
    return data;
  }
);

export const fetchUpdateMe = createAsyncThunk("auth/fetchUpdateMe", async (params) => {
  const { data } = await axios.patch("/auth/me", params);
  return data;
});

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

interface InitialState {
  data: User | null;
  status: string;
}

const initialState: InitialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchAuth.fulfilled, (state, action: PayloadAction<User>) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchAuthMe.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      state.status = "error";
      state.data = null;
    });
    builder.addCase(fetchRegister.pending, (state, action) => {
      state.status = "loading";
      state.data = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.status = "loaded";
      state.data = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = "error";
      state.data = null;
    });
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
