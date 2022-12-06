import { configureStore } from "@reduxjs/toolkit";
import productReduser from "./feature/productSlice";
import productDetailReduser from "./feature/productDetailsSlice";
import authSlice from "./feature/authSlice";
import searchProductSlice from "./feature/searchProductSlice";
import cartSlice from "./feature/cartSlice";
import shippingSlice from "./feature/shippingSlice";
import orderSlice from "./feature/orderSlice";

const store = configureStore({
  reducer: {
    products: productReduser,
    productDetails: productDetailReduser,
    searchProducts: searchProductSlice,
    auth: authSlice,
    cart: cartSlice,
    shippingInfo: shippingSlice,
    order: orderSlice,
  },
  // preloadedState: reHydrateStore(),
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware),

  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;
