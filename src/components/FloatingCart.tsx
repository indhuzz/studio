'use client';

import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function FloatingCart() {
  const { totalItems, subtotal } = useCart();

  return (
    <div className={cn(
      "fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 transition-transform duration-300 transform",
      totalItems > 0 ? "scale-100" : "scale-0"
    )}>
      <Link href="/checkout">
        <div className="flex items-center justify-center gap-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 p-4 cursor-pointer">
          <div className="relative">
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
              {totalItems}
            </span>
          </div>
          <div className="flex flex-col items-start font-headline">
            <span className="text-sm">View Cart</span>
            <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
