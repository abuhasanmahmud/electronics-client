import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const productFeatching = createAsyncThunk("products", async () => {
  const res = await axios.get("http://localhost:4000/api/v1/admin/products");
  return res.data;
});

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    isLoading: false,
    err: null,
  },
  extraReducers: (builder) => {
    builder.addCase(productFeatching.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(productFeatching.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
      state.err = null;
    });
    builder.addCase(productFeatching.rejected, (state, action) => {
      state.products = [];
      state.isLoading = false;
      state.err = action.error.message;
    });
  },
});

export default productSlice.reducer;
