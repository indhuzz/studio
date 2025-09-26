'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { MenuItem } from "@/lib/types";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect } from "react";
import { Switch } from "../ui/switch";

const formSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3, { message: "Name must be at least 3 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
    price: z.coerce.number().min(0, { message: "Price cannot be negative." }),
    category: z.enum(['Breakfast', 'Lunch', 'Snacks']),
    isOutOfStock: z.boolean().default(false),
})

type MenuItemFormProps = {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    item: MenuItem | null;
    onSave: (data: z.infer<typeof formSchema>) => void;
}

export function MenuItemForm({ isOpen, setIsOpen, item, onSave }: MenuItemFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            price: 0,
            category: 'Lunch',
            isOutOfStock: false,
        },
    })

    useEffect(() => {
        if (item) {
            form.reset(item);
        } else {
            form.reset({
                name: '',
                description: '',
                price: 0,
                category: 'Lunch',
                isOutOfStock: false,
            });
        }
    }, [item, form, isOpen]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        onSave(values);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="font-headline">{item ? 'Edit Menu Item' : 'Add New Item'}</DialogTitle>
                    <DialogDescription>
                        {item ? 'Make changes to the item here.' : 'Add a new item to the menu.'} Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl><Input placeholder="Avocado Toast" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl><Textarea placeholder="A short, appetizing description..." {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl><Input type="number" step="0.01" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Breakfast">Breakfast</SelectItem>
                                        <SelectItem value="Lunch">Lunch</SelectItem>
                                        <SelectItem value="Snacks">Snacks</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="isOutOfStock" render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                <div className="space-y-0.5">
                                    <FormLabel>Out of Stock</FormLabel>
                                </div>
                                <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            </FormItem>
                        )} />
                        <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
