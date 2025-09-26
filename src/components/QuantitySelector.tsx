'use client';

import { useCart } from "@/context/CartContext";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
    itemId: string;
}

export default function QuantitySelector({ itemId }: QuantitySelectorProps) {
    const { updateQuantity, getItemQuantity } = useCart();
    const quantity = getItemQuantity(itemId);

    const handleIncrement = () => {
        updateQuantity(itemId, quantity + 1);
    }
    
    const handleDecrement = () => {
        updateQuantity(itemId, quantity - 1);
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleDecrement}>
                <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-bold text-lg">{quantity}</span>
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={handleIncrement}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
