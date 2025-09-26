'use client';

import Image from 'next/image';
import type { MenuItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/context/CartContext';
import QuantitySelector from './QuantitySelector';
import { Badge } from './ui/badge';

type MenuItemCardProps = {
  item: MenuItem;
};

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const { addToCart, getItemQuantity } = useCart();
  const quantityInCart = getItemQuantity(item.id);

  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={400}
          height={300}
          data-ai-hint={item.imageHint}
          className="object-cover w-full h-48"
        />
        {item.isOutOfStock && (
          <Badge variant="destructive" className="absolute top-2 right-2">Out of Stock</Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2">{item.name}</CardTitle>
        <CardDescription>{item.description}</CardDescription>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-between">
        <p className="text-lg font-bold font-headline text-primary">${item.price.toFixed(2)}</p>
        {quantityInCart > 0 ? (
          <QuantitySelector itemId={item.id} />
        ) : (
          <Button onClick={() => addToCart(item)} disabled={item.isOutOfStock}>
            Add to Cart
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
