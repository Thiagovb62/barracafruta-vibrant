import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VendorRegistration() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[calc(100vh-80px)]">
        <div className="w-full max-w-2xl relative">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          
          <Card className="relative backdrop-blur-sm bg-card border-2 border-primary/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Cadastro de Vendedor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname">Nome Completo</Label>
                  <Input id="fullname" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="birthdate">Data de Nascimento</Label>
                  <Input id="birthdate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="(00) 00000-0000" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <Label htmlFor="cep">CEP</Label>
                  <Input id="cep" placeholder="00000-000" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="street">Rua</Label>
                  <Input id="street" placeholder="Nome da rua" />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Número</Label>
                  <Input id="number" placeholder="123" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Bairro</Label>
                  <Input id="neighborhood" placeholder="Bairro" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Cidade</Label>
                  <Input id="city" placeholder="Cidade" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" placeholder="Estado" />
              </div>

              <div className="flex justify-center pt-4">
                <Button size="lg" className="px-12 text-lg font-semibold">
                  Cadastrar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
