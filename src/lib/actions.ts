'use server';

import { CartItem } from "./types";

export async function placeOrder(orderData: { items: CartItem[], total: number, pickupTime: string }) {
  console.log("Placing order on server:", orderData);

  // Simulate network latency
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simulate a potential error
  if (Math.random() > 0.95) {
      throw new Error("Failed to connect to payment gateway.");
  }

  console.log("Order placed successfully!");
  
  return { orderId: `order-${Date.now()}` };
}
