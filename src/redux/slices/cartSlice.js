import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние корзины
const initialState = {
  items: [],
  totalPrice: 0,
};

// Слайс для корзины
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Добавление товара в корзину с проверкой на существование
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      // Пересчет общей цены
      state.totalPrice = state.items.reduce((sum, obj) => {
        return obj.price * obj.count + sum;
      }, 0);
    },

    // Уменьшение количества товара в корзине по ID
    minusItem(state, action) {
      state.items = state.items.filter((obj) => obj.count !== 0)
      const findItem = state.items.find((obj) => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },

    // Удаление товара из корзины по ID
    removeItem(state, action) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

// Селектор для получения данных корзины из состояния Redux
export const selectorCart = (state) => state.cart;
export const selectorCartItemById = (id) => (state) =>
  state.cart.items.find((obj) => obj.id === id);

// Экспорт действий и редьюсера
export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
