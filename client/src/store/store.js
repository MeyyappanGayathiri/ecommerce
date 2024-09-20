import { configureStore } from "@reduxjs/toolkit";
import shopProductsSlice from "./shop/products-slice";

const store = configureStore({
  reducer: {

    shopProducts: shopProductsSlice,
  
  },
});

export default store;
