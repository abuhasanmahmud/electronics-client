import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getSearchProducts = createAsyncThunk("searchProducts", async (query) => {
  //   console.log(query);
  const { page, keyword, category, price } = query;
  //   console.log("price", price);
  const res = await axios.get(
    `http://localhost:4000/api/v1/products?page=${page}&keyword=${keyword}&price[gte]=${price}`
  );
  if (category) {
    const res = await axios.get(
      `http://localhost:4000/api/v1/products?page=${page}&keyword=${keyword}&category=${category}`
    );
    return res.data;
  }
  return res.data;
});

export const searchProductSlice = createSlice({
  name: "searchProducts",
  initialState: {
    products: [],
    isLoading: false,
    err: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getSearchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getSearchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.err = null;
    });
    builder.addCase(getSearchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.products = [];
      state.err = action.error.message;
    });
  },
});

export default searchProductSlice.reducer;
