import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import heroFruits from "@/assets/hero-fruits.jpg";
import logo from "@/assets/logo.png";

export default function Auth() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"client" | "vendor" | "admin">("client");

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img 
          src={heroFruits} 
          alt="Frutas frescas" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <img src={logo} alt="BarracaFruta" className="h-20 w-20 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-background drop-shadow-lg">
              Já é um dos nossos colaboradores?
            </h1>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md relative">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
          
          <Card className="relative backdrop-blur-sm bg-card/95 border-2 border-primary/20 shadow-2xl">
            <CardContent className="p-8">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup" onClick={() => navigate("/vendor-registration")}>Cadastrar-se</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">E-mail</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Senha</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button className="w-full text-lg font-semibold" size="lg">
                    Entrar
                  </Button>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <Tabs value={role} onValueChange={(v) => setRole(v as typeof role)}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="client">Cliente</TabsTrigger>
                      <TabsTrigger value="vendor">Vendedor</TabsTrigger>
                      <TabsTrigger value="admin">Administrador</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">E-mail</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••"
                    />
                  </div>
                  <Button className="w-full text-lg font-semibold" size="lg">
                    Cadastrar
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
