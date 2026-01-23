import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import filterReducer from "./slices/filterSlice";

// Конфигурация и создание хранилища Redux
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
  },
});
