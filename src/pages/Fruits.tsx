import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

const mockFruits = [
  { id: 1, name: "Laranja", pricePerKg: 4.50, stock: 50, freshness: "Fresca", classification: "Extra", available: true },
  { id: 2, name: "Morango", pricePerKg: 18.00, stock: 30, freshness: "Fresca", classification: "Primeira", available: true },
  { id: 3, name: "Manga", pricePerKg: 6.00, stock: 0, freshness: "Fresca", classification: "Segunda", available: false },
  { id: 4, name: "Maçã", pricePerKg: 5.50, stock: 45, freshness: "Fresca", classification: "Primeira", available: true },
  { id: 5, name: "Uva", pricePerKg: 12.00, stock: 20, freshness: "Fresca", classification: "Extra", available: true },
  { id: 6, name: "Abacaxi", pricePerKg: 3.50, stock: 0, freshness: "Fresca", classification: "Terceira", available: false },
];

export default function Fruits() {
  const [weights, setWeights] = useState<Record<number, string>>({});

  const updateWeight = (id: number, weight: string) => {
    // Allow only numbers and one decimal point
    const validWeight = weight.replace(/[^\d.]/g, '');
    const parts = validWeight.split('.');
    if (parts.length > 2) return; // Prevent multiple decimal points
    
    setWeights(prev => ({
      ...prev,
      [id]: validWeight
    }));
  };

  const calculateTotal = (pricePerKg: number, weight: string) => {
    const weightNum = parseFloat(weight) || 0;
    return (pricePerKg * weightNum).toFixed(2);
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
                  <span className="font-medium">{fruit.stock} kg</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <span className="text-2xl font-bold text-primary">
                    R$ {fruit.pricePerKg.toFixed(2)}/kg
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-3">
                {fruit.available && (
                  <>
                    <div className="w-full space-y-2">
                      <Label htmlFor={`weight-${fruit.id}`} className="text-sm font-medium">
                        Peso (kg)
                      </Label>
                      <Input
                        id={`weight-${fruit.id}`}
                        type="text"
                        value={weights[fruit.id] || ''}
                        onChange={(e) => updateWeight(fruit.id, e.target.value)}
                        placeholder="0.0"
                        className="text-center text-lg"
                      />
                      {weights[fruit.id] && parseFloat(weights[fruit.id]) > 0 && (
                        <div className="text-center">
                          <span className="text-sm text-muted-foreground">Total: </span>
                          <span className="text-lg font-bold text-primary">
                            R$ {calculateTotal(fruit.pricePerKg, weights[fruit.id])}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full" 
                      disabled={!weights[fruit.id] || parseFloat(weights[fruit.id]) <= 0}
                    >
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
