export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  price: number;
  imageUrl: string;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
