'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Loader2, Wand2, ChefHat } from 'lucide-react';
import { suggestMeal, type SuggestMealOutput } from '@/ai/flows/suggest-meal-flow';
import { AnimatePresence, motion } from 'framer-motion';
import { Badge } from './ui/badge';

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
                        className="mt-8 max-w-md mx-auto"
                    >
                        <Card className="overflow-hidden text-left shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl mb-2 flex items-center gap-2">
                                    <ChefHat className="h-6 w-6 text-primary" />
                                    {suggestion.name}
                                </CardTitle>
                                <CardDescription>{suggestion.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-3">Key Ingredients:</h4>
                                <motion.div 
                                    className="flex flex-wrap gap-2"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { 
                                            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
                                        }
                                    }}
                                >
                                    {suggestion.ingredients.map((ingredient, i) => (
                                        <motion.div
                                            key={i}
                                            variants={{
                                                hidden: { y: 20, opacity: 0 },
                                                visible: { y: 0, opacity: 1 }
                                            }}
                                        >
                                            <Badge variant="secondary" className="text-sm">{ingredient}</Badge>
                                        </motion.div>
                                    ))}
                                </motion.div>
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
