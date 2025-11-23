import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";
import heroFruits from "@/assets/hero-fruits.jpg";
import { ShoppingCart, Package, Leaf } from "lucide-react";

const fruits = ["🍊", "🍓", "🍇", "🥝", "🍑", "🍒", "🍍", "🥭"];

export default function Home() {
  const [fallingFruits, setFallingFruits] = useState<Array<{ id: number; emoji: string; left: number }>>([]);

  const createFallingFruit = () => {
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomLeft = Math.random() * 80 + 10; // 10% to 90% from left
    const newFruit = {
      id: Date.now() + Math.random(),
      emoji: randomFruit,
      left: randomLeft,
    };
    
    setFallingFruits(prev => [...prev, newFruit]);
    
    // Remove fruit after animation completes
    setTimeout(() => {
      setFallingFruits(prev => prev.filter(f => f.id !== newFruit.id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Falling fruits */}
      {fallingFruits.map(fruit => (
        <div
          key={fruit.id}
          className="fixed text-6xl pointer-events-none z-50 animate-fruit-fall"
          style={{ left: `${fruit.left}%`, top: "-100px" }}
        >
          {fruit.emoji}
        </div>
      ))}
      
      <Header />
      
      <div className="relative h-[500px] overflow-hidden">
        <img 
          src={heroFruits} 
          alt="Frutas frescas e coloridas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                BarracaFruta
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow">
                Frutas frescas, direto do produtor para você!
              </p>
              <div className="flex justify-center">
                <NavLink to="/auth">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg border-2 border-white bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white hover:text-primary shadow-lg"
                    onClick={createFallingFruit}
                  >
                    Fazer Login
                  </Button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">
          Como Funciona
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Leaf className="h-10 w-10 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Frutas Frescas</h3>
            <p className="text-muted-foreground">
              Selecionamos as melhores frutas com frescor garantido
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <ShoppingCart className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Compra Fácil</h3>
            <p className="text-muted-foreground">
              Escolha suas frutas favoritas e adicione ao carrinho
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
            <p className="text-muted-foreground">
              Receba suas frutas frescas direto em casa
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
