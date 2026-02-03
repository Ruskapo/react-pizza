import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Асинхронный thunk для получения данных о пиццах
export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params, thunkAPI) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get(
      `https://69344d6a4090fe3bf01f91ec.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

// Начальное состояние слайса пицц
const initialState = {
  items: [],
  status: "loading", // 'loading' | 'success' | 'error'
};

// Создание слайса пицц
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },

  // Обработка дополнительных действий, таких как асинхронные thunks
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = "success";
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = "error";
        state.items = [];
      });
  },
});

// Селектор для получения данных о пиццах из состояния
export const selectPizzaData = (state) => state.pizza;

// Экспорт действий и редьюсера
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
