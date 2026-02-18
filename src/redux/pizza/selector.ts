import { RootState } from "../store";


// Селектор для получения данных о пиццах из состояния
export const selectPizzaData = (state: RootState) => state.pizza;

