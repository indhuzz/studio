'use client';

import { useState } from "react";
import { menuItems as initialMenuItems } from "@/lib/data";
import type { MenuItem } from "@/lib/types";
import { Button } from "../ui/button";
import MenuDataTable from "./MenuDataTable";
import { PlusCircle } from "lucide-react";
import { MenuItemForm } from "./MenuItemForm";


export default function MenuManagement() {
    const [items, setItems] = useState<MenuItem[]>(initialMenuItems);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

    const handleAddItem = () => {
        setEditingItem(null);
        setIsFormOpen(true);
    }

    const handleEditItem = (item: MenuItem) => {
        setEditingItem(item);
        setIsFormOpen(true);
    }

    const handleDeleteItem = (id: string) => {
        setItems(currentItems => currentItems.filter(item => item.id !== id));
    }

    const handleSaveItem = (itemData: Omit<MenuItem, 'id' | 'imageUrl' | 'imageHint'> & { id?: string }) => {
        if (itemData.id) {
            setItems(currentItems => currentItems.map(item =>
                item.id === itemData.id ? { ...item, ...itemData } : item
            ));
        } else {
            const newItem: MenuItem = {
                ...itemData,
                id: `new-${Date.now()}`,
                imageUrl: 'https://picsum.photos/seed/new-item/400/300',
                imageHint: 'new food',
            };
            setItems(currentItems => [...currentItems, newItem]);
        }
        setIsFormOpen(false);
        setEditingItem(null);
    }

    return (
        <div>
            <div className="flex justify-end mb-4">
                <Button onClick={handleAddItem}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Item
                </Button>
            </div>
            <MenuDataTable
                items={items}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
            />
            <MenuItemForm 
                isOpen={isFormOpen}
                setIsOpen={setIsFormOpen}
                item={editingItem}
                onSave={handleSaveItem}
            />
        </div>
    )
}
