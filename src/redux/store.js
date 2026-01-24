import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import filterReducer from "./slices/filterSlice";
import pizzaReducer from "./slices/PizzaSlice";

// Конфигурация и создание хранилища Redux
export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});
