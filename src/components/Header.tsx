import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "@/components/NavLink";
import logo from "@/assets/logo.png";

const navigation = [
  { name: "Início", path: "/" },
  { name: "Frutas", path: "/fruits" },
  { name: "Carrinho", path: "/cart" },
  { name: "Pedidos", path: "/orders" },
  { name: "Admin", path: "/admin/fruits" },
];

export const Header = () => {
  return (
    <header className="bg-primary py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="BarracaFruta" className="h-12 w-12" />
          <span className="text-2xl font-bold text-primary-foreground">
            BarracaFruta
          </span>
        </NavLink>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary/90">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-secondary">
            <nav className="flex flex-col gap-4 mt-8">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                  activeClassName="text-primary font-bold"
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
