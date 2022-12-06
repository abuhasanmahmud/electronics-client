import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const orderItems = createAsyncThunk("order", async (data) => {
  try {
    //     console.log("token", token);
    const { id, token } = data;
    const res = await axios.post("http://localhost:4000/api/v1/orders/me", {
      token: token,
      id: id,
    });
    //     console.log("res", res.data);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orderItem: [],
    isLoading: false,
    err: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(orderItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(orderItems.fulfilled, (state, action) => {
      state.isLoading = false;
      state.err = null;
      state.orderItem = action.payload;
    });
    builder.addCase(orderItems.rejected, (state, action) => {
      state.isLoading = false;
      state.err = action.payload;
      state.orderItem = [];
    });
  },
});

export default orderSlice.reducer;
