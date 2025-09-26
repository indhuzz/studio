import MenuManagement from "@/components/admin/MenuManagement";

export default function AdminPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline">Menu Management</h1>
                <p className="text-muted-foreground">Add, edit, or remove items from the canteen menu.</p>
            </div>
            <MenuManagement />
        </div>
    );
}
