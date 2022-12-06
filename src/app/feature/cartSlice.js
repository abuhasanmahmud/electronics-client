import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
  },

  reducers: {
    addToCart(state, action) {
      // console.log("state", state);
      const item = action.payload.product;
      const quantity = action.payload.quantity;
      const itemIndex = state.cartItems?.findIndex((i) => i._id === item?._id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += quantity;
        state.cartTotalQuantity = state.cartTotalQuantity + quantity;
      } else {
        const productItem = {
          ...action.payload.product,
          cartQuantity: quantity,
          product: action.payload.product._id,
          image: action.payload.product.images[0].url,
          // image: action.payload?.product?.img[0]?.url,
        };
        state.cartItems.push(productItem);
        state.cartTotalQuantity = state.cartTotalQuantity + quantity;
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeToCart(state, action) {
      const item = action.payload;
      console.log("remove item", item, state);
      state.cartItems.map((cartItem) => {
        if (cartItem._id === item._id) {
          const nextCartItem = state.cartItems.filter((item) => item._id !== cartItem._id);
          state.cartItems = nextCartItem;
        }
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    emptyCart(state, action) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, removeToCart, emptyCart } = cartSlice.actions;

export default cartSlice.reducer;
