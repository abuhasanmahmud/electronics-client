import { createSlice } from "@reduxjs/toolkit";

export const authSlice2 = createSlice({
  name: "auth",
  initialState: {
    user: {},
    isLoading: false,
    err: null,
    isAuthenticated: false,
  },
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});
export const { login, logout } = authSlice2.actions;

export const authMiddleware = (store) => (next) => (action) => {
  if (login.match(action)) {
    // Note: localStorage expects a string
    localStorage.setItem("isAuthenticated", "true");
  } else if (logout.match(action)) {
    localStorage.setItem("isAuthenticated", "false");
  }
  return next(action);
};

export default authSlice2.reducer;
