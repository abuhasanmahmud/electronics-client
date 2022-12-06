import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getProductDetails = createAsyncThunk("productDetails", async (id) => {
  const res = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
  return res.data;
});

export const productDetailSlice = createSlice({
  name: "productDetails",
  initialState: {
    productDetails: {},
    isLoading: false,
    err: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productDetails = action.payload;
      state.err = null;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.isLoading = false;
      state.productDetails = {};
      state.err = action.error.message;
    });
  },
});

export default productDetailSlice.reducer;
