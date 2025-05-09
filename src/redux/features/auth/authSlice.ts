 
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
 

export type TUser = {
  email: string;
  userName: string;
  iat: number;
  user: TUser,
  exp: number;
  _id?: string;
  role: "admin";
};

type TAuthState = {
  user: null | TUser;
  token: null | string;
};
const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state: TAuthState, action) => {
      const { token, user } = action.payload;
      state.token = token;
      state.user = { ...user };
    },
    logout: (state: TAuthState) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState) => state.auth.user;