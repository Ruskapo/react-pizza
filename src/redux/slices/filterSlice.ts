import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortpropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  TITLE_DESC = "title",
  TITLE_ASC = "-title",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortpropertyEnum;
};

export interface FilterState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}

// Начальное состояние фильтров
export const initialState: FilterState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: SortpropertyEnum.RATING_DESC,
  },
};

// Слайс для фильтров
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    // Установка категории
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    // Установка значения поиска
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    // Установка сортировки
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    // Установка текущей страницы
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    // Установка нескольких фильтров одновременно
    setFilters(state, action: PayloadAction<FilterState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
    },
  },
});

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

export default filterSlice.reducer;
