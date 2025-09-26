'use client';

import OrderStatusTracker from "@/components/OrderStatusTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type OrderState = {
    pickupTime: string;
    status: 'Pending' | 'Preparing' | 'Ready for Pickup' | 'Completed';
}

export default function DashboardPage() {
    const [currentOrder, setCurrentOrder] = useState<OrderState | null>(null);

    useEffect(() => {
        const newOrderData = sessionStorage.getItem('newOrder');
        if (newOrderData) {
            try {
                const order = JSON.parse(newOrderData);
                setCurrentOrder(order);

                // Simulate order progression
                const t1 = setTimeout(() => {
                    setCurrentOrder(o => o ? { ...o, status: 'Preparing' } : null);
                }, 5000); 

                const t2 = setTimeout(() => {
                    setCurrentOrder(o => o ? { ...o, status: 'Ready for Pickup' } : null);
                }, 15000);

                sessionStorage.removeItem('newOrder');
                
                return () => {
                    clearTimeout(t1);
                    clearTimeout(t2);
                }
            } catch (error) {
                console.error("Failed to parse order data from sessionStorage", error);
            }
        }
    }, []);

    const handleCompleteOrder = () => {
        setCurrentOrder(o => o ? { ...o, status: 'Completed' } : null);
    }
    
    if (!currentOrder || currentOrder.status === 'Completed') {
        return (
            <div className="container mx-auto py-16 text-center">
                <UtensilsCrossed className="mx-auto h-24 w-24 text-muted-foreground" />
                <h1 className="mt-4 text-3xl font-bold font-headline">No Active Orders</h1>
                <p className="mt-2 text-muted-foreground">You don't have any orders being prepared right now.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Place a New Order</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8">
            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl">Your Order Status</CardTitle>
                        <CardDescription>
                            Pickup scheduled for: <span className="font-bold text-primary">{currentOrder.pickupTime}</span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <OrderStatusTracker currentStatus={currentOrder.status} />
                        {currentOrder.status === 'Ready for Pickup' && (
                             <div className="text-center mt-8">
                                <p className="text-lg font-semibold">Your order is ready for pickup!</p>
                                <Button className="mt-4" onClick={handleCompleteOrder}>Mark as Picked Up</Button>
                             </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
