import { createSlice } from "@reduxjs/toolkit";

// Начальное состояние фильтров
const initialState = {
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

// Слайс для фильтров
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Установка категории
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    // Установка сортировки
    setSort(state, action) {
      state.sort = action.payload;
    },
    // Установка текущей страницы
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    // Установка нескольких фильтров одновременно
    setFilters(state, action) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

// Экспорт действий и редьюсера
export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;
