import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, CartSliceState } from "./types";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { getCartLocalStorage } from "../../utils/getCartLocalStorage";

const { items, totalPrice } = getCartLocalStorage();

// Начальное состояние корзины
const initialState: CartSliceState = {
  items,
  totalPrice,
};

// Слайс для корзины
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину с проверкой на существование
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    // Уменьшение количества товара в корзине по ID
    minusItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.count !== 0);
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },

    // Удаление товара из корзины по ID
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Экспорт действий и редьюсера
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;

