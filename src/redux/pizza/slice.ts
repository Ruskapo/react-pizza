import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, PizzaSliceState, SearchPizzaParams, Status } from "./types";

// Асинхронный thunk для получения данных о пиццах
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { order, sortBy, category, search, currentPage } = params;
    const { data } = await axios.get<Pizza[]>(
      `https://69344d6a4090fe3bf01f91ec.mockapi.io/items?page=${currentPage}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

// Начальное состояние слайса пицц
const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOAGING, // 'loading' | 'success' | 'error'
};

// Создание слайса пицц
const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },

  // Обработка дополнительных действий, таких как асинхронные thunks
  extraReducers: (builder) => {
    builder

      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOAGING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

// Экспорт действий и редьюсера
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
