import { CartItem } from "../redux/cart/types";

// Пересчет общей цены
export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};
