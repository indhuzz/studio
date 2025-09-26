'use client';

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import QuantitySelector from "@/components/QuantitySelector";
import { pickupTimeSlots } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { placeOrder } from "@/lib/actions";
import { Loader2, ShoppingBag } from "lucide-react";
import Link from "next/link";


export default function CheckoutPage() {
    const { cartItems, subtotal, totalItems, clearCart } = useCart();
    const [pickupTime, setPickupTime] = useState<string>('');
    const [isPlacingOrder, setIsPlacingOrder] = useState(false);
    const router = useRouter();
    const { toast } = useToast();

    const handlePlaceOrder = async () => {
        if (!pickupTime) {
            toast({
                title: 'Missing Information',
                description: 'Please select a pickup time.',
                variant: 'destructive',
            });
            return;
        }

        setIsPlacingOrder(true);
        try {
            await placeOrder({ items: cartItems, total: subtotal, pickupTime });
            toast({
                title: 'Order Placed!',
                description: 'Your order has been successfully placed.',
            });
            clearCart();
            sessionStorage.setItem('newOrder', JSON.stringify({ pickupTime, status: 'Pending' }));
            router.push('/dashboard');
        } catch (error) {
            toast({
                title: 'Error',
                description: 'There was a problem placing your order. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsPlacingOrder(false);
        }
    };

    if (totalItems === 0 && !isPlacingOrder) {
        return (
            <div className="container mx-auto py-16 text-center">
                <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
                <h1 className="mt-4 text-3xl font-bold font-headline">Your Cart is Empty</h1>
                <p className="mt-2 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Back to Menu</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold font-headline mb-8">Your Cart</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map(item => (
                        <Card key={item.id} className="flex items-center p-4">
                            <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded-md object-cover" data-ai-hint={item.imageHint}/>
                            <div className="ml-4 flex-grow">
                                <h2 className="font-bold">{item.name}</h2>
                                <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <QuantitySelector itemId={item.id} />
                                <p className="w-20 text-right font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="lg:col-span-1">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Order Summary</CardTitle>
                            <CardDescription>Review your order and select a pickup time.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Taxes & Fees</span>
                                <span>${(subtotal * 0.08).toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${(subtotal * 1.08).toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-2">Select Pickup Time</h3>
                                <Select onValueChange={setPickupTime} value={pickupTime} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a time slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {pickupTimeSlots.map(slot => (
                                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handlePlaceOrder} disabled={isPlacingOrder || !pickupTime}>
                                {isPlacingOrder && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Place Order & Pay
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
