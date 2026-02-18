import { RootState } from "../store";


// Селектор для получения данных корзины из состояния Redux
export const selectorCart = (state: RootState) => state.cart;

export const selectorCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);
