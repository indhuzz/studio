'use client';

import { useEffect, useState } from 'react';
import { getPersonalizedMealRecommendations } from '@/ai/flows/personalized-meal-recommendations';
import { menuItems } from '@/lib/data';
import type { MenuItem } from '@/lib/types';
import MenuItemCard from './MenuItemCard';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function Recommendations() {
  const [recommendations, setRecommendations] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        const pastOrders = {
          userId: 'user-123',
          orderHistory: ['Classic Burger', 'French Fries'],
        };
        
        const result = await getPersonalizedMealRecommendations(pastOrders);
        const recommendedItems = result.recommendations
          .map(name => menuItems.find(item => item.name === name))
          .filter((item): item is MenuItem => !!item);
        
        setRecommendations(recommendedItems);
      } catch (e) {
        console.error(e);
        setError('Could not fetch recommendations at this time.');
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <h2 className="text-2xl font-bold font-headline mb-4">Recommended For You</h2>
        <div className="flex justify-center items-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Finding your favorites...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold font-headline mb-4 text-center">Recommended For You</h2>
            <Alert variant="destructive" className="max-w-md mx-auto">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        </div>
    )
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="py-8">
      <h2 className="text-3xl font-bold font-headline text-center mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map(item => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
