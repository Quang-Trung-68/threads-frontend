import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import { productApi } from "./services/product";
import { authApi } from "./services/auth";

export const store = configureStore({
  reducer: {
    product: productReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productApi.middleware)
      .concat(authApi.middleware),
});
