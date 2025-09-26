'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Wand2 } from 'lucide-react';
import { suggestMeal, type SuggestMealOutput } from '@/ai/flows/suggest-meal-flow';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

export default function MealSuggestion() {
    const [suggestion, setSuggestion] = useState<SuggestMealOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getSuggestion = async () => {
        setIsLoading(true);
        setError(null);
        setSuggestion(null);
        try {
            const result = await suggestMeal();
            setSuggestion(result);
        } catch (e) {
            console.error(e);
            setError('Could not get a suggestion at this time. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="py-8 text-center">
            <h2 className="text-3xl font-bold font-headline mb-4">Feeling Adventurous?</h2>
            <p className="text-muted-foreground mb-6">Let our AI chef suggest something new for you!</p>
            <Button onClick={getSuggestion} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Conjuring...
                    </>
                ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Suggest a New Meal
                    </>
                )}
            </Button>

            <AnimatePresence>
                {suggestion && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -50, scale: 0.9 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="mt-8 max-w-sm mx-auto"
                    >
                        <Card className="overflow-hidden text-left">
                            <CardHeader>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <Image
                                        src={suggestion.image}
                                        alt={suggestion.name}
                                        width={400}
                                        height={300}
                                        className="object-cover w-full h-48 rounded-t-lg"
                                    />
                                </motion.div>
                            </CardHeader>
                            <CardContent>
                                <CardTitle className="font-headline text-xl mb-2">{suggestion.name}</CardTitle>
                                <CardDescription>{suggestion.description}</CardDescription>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <p className="mt-4 text-destructive">{error}</p>
            )}
        </div>
    );
}
