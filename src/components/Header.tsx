import Link from "next/link";
import { Utensils } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Utensils className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">CanteenClick</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-primary"
          >
            Menu
          </Link>
          <Link
            href="/dashboard"
            className="transition-colors hover:text-primary"
          >
            My Orders
          </Link>
          <Link
            href="/admin"
            className="transition-colors hover:text-primary"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
