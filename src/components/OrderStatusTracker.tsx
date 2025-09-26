import { cn } from "@/lib/utils";
import { Check, ChefHat, ShoppingBasket, Hourglass } from "lucide-react";

type Status = 'Pending' | 'Preparing' | 'Ready for Pickup' | 'Completed';

const statuses: { name: Exclude<Status, 'Completed'>, icon: React.ElementType }[] = [
    { name: 'Pending', icon: Hourglass },
    { name: 'Preparing', icon: ChefHat },
    { name: 'Ready for Pickup', icon: ShoppingBasket },
];

export default function OrderStatusTracker({ currentStatus }: { currentStatus: Status }) {
    const currentIndex = statuses.findIndex(s => s.name === currentStatus);

    return (
        <div className="flex items-center justify-between w-full px-4 md:px-8 py-4">
            {statuses.map((status, index) => {
                const isActive = index <= currentIndex;
                const isCurrent = index === currentIndex;
                const isLast = index === statuses.length - 1;

                return (
                    <div key={status.name} className="flex-1 flex items-center">
                        <div className="flex flex-col items-center">
                            <div className={cn(
                                "h-12 w-12 rounded-full flex items-center justify-center border-2 transition-all duration-500",
                                isActive ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border text-muted-foreground"
                            )}>
                                {isActive ? <Check className="h-6 w-6" /> : <status.icon className="h-6 w-6" />}
                            </div>
                            <p className={cn(
                                "mt-2 text-xs md:text-sm font-semibold text-center",
                                isActive ? "text-primary" : "text-muted-foreground",
                                isCurrent && "animate-pulse"
                            )}>
                                {status.name}
                            </p>
                        </div>

                        {!isLast && (
                            <div className="flex-1 h-1 bg-border relative mx-2">
                                <div
                                    className="absolute top-0 left-0 h-full bg-primary transition-all duration-500"
                                    style={{ width: isActive ? '100%' : '0%' }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
