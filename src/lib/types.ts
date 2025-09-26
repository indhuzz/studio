export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  category: 'Breakfast' | 'Lunch' | 'Snacks';
  isOutOfStock?: boolean;
};

export type CartItem = {
  quantity: number;
} & MenuItem;

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  pickupTime: string;
  status: 'Pending' | 'Preparing' | 'Ready for Pickup';
  orderTime: Date;
};
