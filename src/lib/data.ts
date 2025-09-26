import { MenuItem } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const findImage = (id: string) => {
    const img = PlaceHolderImages.find(p => p.id === id);
    if (!img) {
        return {
            imageUrl: "https://picsum.photos/seed/placeholder/400/300",
            imageHint: "food placeholder"
        }
    }
    return { imageUrl: img.imageUrl, imageHint: img.imageHint };
};

export const menuItems: MenuItem[] = [
  { id: 'b1', name: 'Avocado Toast', description: 'Toasted sourdough with fresh avocado, chili flakes, and a squeeze of lime.', price: 8.50, category: 'Breakfast', ...findImage('breakfast1') },
  { id: 'b2', name: 'Pancakes & Berries', description: 'Fluffy buttermilk pancakes served with mixed berries and maple syrup.', price: 10.00, category: 'Breakfast', ...findImage('breakfast2') },
  { id: 'b3', name: 'Breakfast Burrito', description: 'Scrambled eggs, cheese, and sausage wrapped in a warm tortilla.', price: 9.00, category: 'Breakfast', ...findImage('breakfast3'), isOutOfStock: true },
  { id: 'l1', name: 'Chicken Caesar Salad', description: 'Grilled chicken, romaine lettuce, croutons, and Caesar dressing.', price: 12.50, category: 'Lunch', ...findImage('lunch1') },
  { id: 'l2', name: 'Classic Burger', description: 'Beef patty, lettuce, tomato, and our special sauce on a sesame bun.', price: 14.00, category: 'Lunch', ...findImage('lunch2') },
  { id: 'l3', name: 'Margherita Pizza', description: 'Classic pizza with tomato, mozzarella, and fresh basil.', price: 15.00, category: 'Lunch', ...findImage('lunch3') },
  { id: 's1', name: 'French Fries', description: 'Crispy golden french fries with a side of ketchup.', price: 5.00, category: 'Snacks', ...findImage('snack1') },
  { id: 's2', name: 'Chocolate Chip Cookie', description: 'A warm, gooey, freshly baked chocolate chip cookie.', price: 3.00, category: 'Snacks', ...findImage('snack2') },
  { id: 's3', name: 'Fruit Smoothie', description: 'A refreshing blend of mixed fruits and yogurt.', price: 7.00, category: 'Snacks', ...findImage('snack3') },
];

export const pickupTimeSlots = [
  "8:00 AM - 8:15 AM",
  "8:15 AM - 8:30 AM",
  "8:30 AM - 8:45 AM",
  "8:45 AM - 9:00 AM",
  "12:00 PM - 12:15 PM",
  "12:15 PM - 12:30 PM",
  "12:30 PM - 12:45 PM",
  "12:45 PM - 1:00 PM",
  "1:00 PM - 1:15 PM",
];
