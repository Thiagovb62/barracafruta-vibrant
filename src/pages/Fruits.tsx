import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Search } from "lucide-react";
import { useState, useMemo } from "react";
import laranjaImg from "@/assets/fruits/laranja.jpg";
import morangoImg from "@/assets/fruits/morango.jpg";
import mangaImg from "@/assets/fruits/manga.jpg";
import macaImg from "@/assets/fruits/maca.jpg";
import uvaImg from "@/assets/fruits/uva.jpg";
import abacaxiImg from "@/assets/fruits/abacaxi.jpg";

const mockFruits = [
  { id: 1, name: "Laranja", pricePerKg: 4.50, stock: 50, freshness: "Fresca", classification: "Extra", available: true, image: laranjaImg },
  { id: 2, name: "Morango", pricePerKg: 18.00, stock: 30, freshness: "Fresca", classification: "Primeira", available: true, image: morangoImg },
  { id: 3, name: "Manga", pricePerKg: 6.00, stock: 0, freshness: "Fresca", classification: "Segunda", available: false, image: mangaImg },
  { id: 4, name: "Maçã", pricePerKg: 5.50, stock: 45, freshness: "Fresca", classification: "Primeira", available: true, image: macaImg },
  { id: 5, name: "Uva", pricePerKg: 12.00, stock: 20, freshness: "Fresca", classification: "Extra", available: true, image: uvaImg },
  { id: 6, name: "Abacaxi", pricePerKg: 3.50, stock: 0, freshness: "Fresca", classification: "Terceira", available: false, image: abacaxiImg },
];

export default function Fruits() {
  const [weights, setWeights] = useState<Record<number, string>>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [classificationFilter, setClassificationFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

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

  const filteredFruits = useMemo(() => {
    return mockFruits.filter((fruit) => {
      const matchesSearch = fruit.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClassification = classificationFilter === "all" || fruit.classification === classificationFilter;
      const matchesAvailability = availabilityFilter === "all" || 
        (availabilityFilter === "available" && fruit.available) ||
        (availabilityFilter === "unavailable" && !fruit.available);
      
      return matchesSearch && matchesClassification && matchesAvailability;
    });
  }, [searchTerm, classificationFilter, availabilityFilter]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-center mb-8 text-foreground">
          Frutas Disponíveis
        </h1>

        {/* Filters Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Buscar frutas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Classificação</Label>
              <Select value={classificationFilter} onValueChange={setClassificationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Extra">Extra</SelectItem>
                  <SelectItem value="Primeira">Primeira</SelectItem>
                  <SelectItem value="Segunda">Segunda</SelectItem>
                  <SelectItem value="Terceira">Terceira</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Disponibilidade</Label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="available">Disponíveis</SelectItem>
                  <SelectItem value="unavailable">Indisponíveis</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFruits.map((fruit) => (
            <Card 
              key={fruit.id} 
              className={`border-2 ${fruit.available ? 'border-primary/30' : 'border-muted opacity-60'}`}
            >
              <CardHeader>
                <div className="relative h-48 mb-4 overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={fruit.image} 
                    alt={fruit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
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
