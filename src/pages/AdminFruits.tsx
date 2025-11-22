import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function AdminFruits() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle className="text-3xl text-center">
                Cadastrar Nova Fruta
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Área exclusiva para administradores
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fruitName">Nome da Fruta</Label>
                  <Input id="fruitName" placeholder="Ex: Laranja Lima" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expirationDays">Validade (dias)</Label>
                  <Input id="expirationDays" type="number" placeholder="7" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="classification">Classificação</Label>
                  <Select>
                    <SelectTrigger id="classification">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extra">Extra</SelectItem>
                      <SelectItem value="primeira">De Primeira</SelectItem>
                      <SelectItem value="segunda">De Segunda</SelectItem>
                      <SelectItem value="terceira">De Terceira</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 flex items-end">
                  <div className="flex items-center space-x-2 pb-2">
                    <Switch id="fresh" />
                    <Label htmlFor="fresh" className="cursor-pointer">
                      Fruta Fresca
                    </Label>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Valor (R$)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="5.50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantidade</Label>
                  <Input id="quantity" type="number" placeholder="100" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição (Opcional)</Label>
                <Input id="description" placeholder="Informações adicionais sobre a fruta" />
              </div>

              <div className="flex justify-center pt-4">
                <Button size="lg" className="px-12 text-lg font-semibold">
                  Cadastrar Fruta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
