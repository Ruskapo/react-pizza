
import { RootState } from "../store";
import { filterSlice } from "./slice";

// Селекторы для получения данных из состояния
export const selectorFilter = (state: RootState) => state.filter;
export const selectorSort = (state: RootState) => state.filter.sort;

// Экспорт действий и редьюсера
export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;
