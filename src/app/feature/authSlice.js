import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk("auth", async (data) => {
  const { email, password } = data.data;
  //   console.log("email pass ", email, password);

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await axios.post(
    "http://localhost:4000/api/v1/login",
    {
      email,
      password,
    },
    config
  );
  localStorage.setItem("auth", JSON.stringify(res.data));
  //   console.log("res", res);
  return res.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {},
    isLoading: false,
    err: null,
  },
  reducers: {
    logout: (state) => {
      state.user = {};
      localStorage.removeItem("auth");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.err = null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.user = {};
      state.isLoading = false;
      state.err = action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;

//all state save local storeage
// export const localStorageMiddleware = ({ getState }) => {
//   return (next) => (action) => {
//     const result = next(action);
//     localStorage.setItem("state", JSON.stringify(getState()));
//     return result;
//   };
// };

// export const reHydrateStore = () => {
//   if (localStorage.getItem("state") !== null) {
//     return JSON.parse(localStorage.getItem("state"));
//     // re-hydrate the store
//   }
// };

export default authSlice.reducer;
