import { menuItems } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MenuItemCard from '@/components/MenuItemCard';
import { Separator } from '@/components/ui/separator';
import Recommendations from '@/components/Recommendations';

export default function Home() {
  const breakfastItems = menuItems.filter(item => item.category === 'Breakfast');
  const lunchItems = menuItems.filter(item => item.category === 'Lunch');
  const snackItems = menuItems.filter(item => item.category === 'Snacks');

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight font-headline lg:text-5xl">
          Today's Menu
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Quick, easy, and delicious. Order ahead and skip the line.
        </p>
      </div>

      <Recommendations />
      <Separator className="my-12" />

      <Tabs defaultValue="Lunch" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-1/2 mx-auto">
          <TabsTrigger value="Breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="Lunch">Lunch</TabsTrigger>
          <TabsTrigger value="Snacks">Snacks</TabsTrigger>
        </TabsList>
        <TabsContent value="Breakfast">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {breakfastItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Lunch">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {lunchItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="Snacks">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {snackItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
