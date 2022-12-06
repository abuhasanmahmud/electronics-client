import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const saveShippingInfo = createAsyncThunk("shipping", async (data) => {
  // console.log("data is ", data);
  const { token } = data;
  // console.log("token", token);
  //   console.log("email pass ", email, password);
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authrization: token,
    },
  };
  const res = await axios.post(
    "http://localhost:4000/api/v1/order/new",

    data,

    config
  );
  //  localStorage.setItem("shipping", JSON.stringify(res.data));
  //   console.log("res", res);
  return res.data;
});

export const shippingSlice = createSlice({
  name: "shipping",
  initialState: {
    shipping: {},
    isLoading: false,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(saveShippingInfo.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(saveShippingInfo.fulfilled, (state, action) => {
      state.shipping = action.payload;
    });
    builder.addCase(saveShippingInfo.rejected, (state, action) => {
      state.err = action.error.message;
    });
  },
});

export default shippingSlice.reducer;
