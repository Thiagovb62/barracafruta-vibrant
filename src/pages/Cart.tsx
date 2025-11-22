import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const mockCartItems = [
  { id: 1, name: "Laranja Premium", quantity: 5, unitPrice: 4.50 },
  { id: 2, name: "Morango Orgânico", quantity: 3, unitPrice: 8.00 },
  { id: 3, name: "Maçã Fuji", quantity: 8, unitPrice: 5.00 },
];

export default function Cart() {
  const [items, setItems] = useState(mockCartItems);
  const [discount, setDiscount] = useState("0");

  const updateQuantity = (id: number, delta: number) => {
    setItems(items.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
  const discountAmount = subtotal * (parseInt(discount) / 100);
  const total = subtotal - discountAmount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8">Carrinho de Compras</h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="border-2 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        R$ {item.unitPrice.toFixed(2)} / unidade
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right min-w-[100px]">
                      <p className="font-bold text-lg text-primary">
                        R$ {(item.quantity * item.unitPrice).toFixed(2)}
                      </p>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="lg:col-span-1">
            <Card className="border-2 border-primary/20 sticky top-6">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Desconto</h3>
                  <RadioGroup value={discount} onValueChange={setDiscount}>
                    {['5', '10', '15', '20', '25'].map((value) => (
                      <div key={value} className="flex items-center space-x-2">
                        <RadioGroupItem value={value} id={`discount-${value}`} />
                        <Label htmlFor={`discount-${value}`} className="cursor-pointer">
                          {value}%
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-accent">
                    <span>Desconto ({discount}%):</span>
                    <span>- R$ {discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2 border-t">
                    <span>Total:</span>
                    <span className="text-primary">R$ {total.toFixed(2)}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg">
                  Finalizar Pedido
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
