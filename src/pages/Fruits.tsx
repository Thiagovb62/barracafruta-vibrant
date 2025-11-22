import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";

const mockFruits = [
  { id: 1, name: "Laranja", price: 4.50, stock: 50, freshness: "Fresca", classification: "Extra", available: true },
  { id: 2, name: "Morango", price: 8.00, stock: 30, freshness: "Fresca", classification: "Primeira", available: true },
  { id: 3, name: "Manga", price: 6.00, stock: 0, freshness: "Fresca", classification: "Segunda", available: false },
  { id: 4, name: "Maçã", price: 5.00, stock: 45, freshness: "Fresca", classification: "Primeira", available: true },
  { id: 5, name: "Uva", price: 12.00, stock: 20, freshness: "Fresca", classification: "Extra", available: true },
  { id: 6, name: "Abacaxi", price: 7.50, stock: 0, freshness: "Fresca", classification: "Terceira", available: false },
];

export default function Fruits() {
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Frutas Disponíveis
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockFruits.map((fruit) => (
            <Card 
              key={fruit.id} 
              className={`border-2 ${fruit.available ? 'border-primary/30' : 'border-muted opacity-60'}`}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-2xl">{fruit.name}</CardTitle>
                  <Badge variant={fruit.available ? "default" : "secondary"}>
                    {fruit.available ? "Disponível" : "Sem Estoque"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Frescor:</span>
                  <span className="font-medium text-accent">{fruit.freshness}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Classificação:</span>
                  <span className="font-medium">{fruit.classification}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estoque:</span>
                  <span className="font-medium">{fruit.stock} unidades</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-2xl font-bold text-primary">
                    R$ {fruit.price.toFixed(2)}
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {fruit.available && (
                  <>
                    <div className="flex items-center gap-3 w-full">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(fruit.id, -1)}
                        disabled={!quantities[fruit.id]}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={quantities[fruit.id] || 0}
                        onChange={(e) => setQuantities(prev => ({
                          ...prev,
                          [fruit.id]: parseInt(e.target.value) || 0
                        }))}
                        className="text-center"
                        min="0"
                        max={fruit.stock}
                      />
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(fruit.id, 1)}
                        disabled={(quantities[fruit.id] || 0) >= fruit.stock}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button className="w-full" disabled={!quantities[fruit.id]}>
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  </>
                )}
                {!fruit.available && (
                  <Button className="w-full" disabled>
                    Indisponível
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
