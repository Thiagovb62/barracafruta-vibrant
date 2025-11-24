import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, FileDown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockOrders = [
  { 
    id: 1001, 
    vendor: "João Silva", 
    date: "2025-01-15", 
    status: "Entregue", 
    total: 127.50,
    items: 12
  },
  { 
    id: 1002, 
    vendor: "Maria Santos", 
    date: "2025-01-18", 
    status: "Em Transporte", 
    total: 89.00,
    items: 8
  },
  { 
    id: 1003, 
    vendor: "Pedro Costa", 
    date: "2025-01-20", 
    status: "Processando", 
    total: 215.80,
    items: 18
  },
  { 
    id: 1004, 
    vendor: "Ana Oliveira", 
    date: "2025-01-21", 
    status: "Entregue", 
    total: 156.30,
    items: 15
  },
];

const statusColors: Record<string, "default" | "secondary" | "destructive"> = {
  "Entregue": "default",
  "Em Transporte": "secondary",
  "Processando": "secondary",
};

export default function Orders() {
  const handleDownloadAllOrders = () => {
    const today = new Date().toLocaleDateString('pt-BR');
    toast({
      title: "Download iniciado",
      description: `Baixando histórico completo de pedidos do dia ${today}`,
    });
    // Aqui seria implementada a lógica real de download
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Histórico de Pedidos</h1>
          <Button onClick={handleDownloadAllOrders} variant="default" size="lg">
            <FileDown className="h-5 w-5 mr-2" />
            Baixar Histórico Completo
          </Button>
        </div>

        <div className="grid gap-4 max-w-4xl mx-auto">
          {mockOrders.map((order) => (
            <Card key={order.id} className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">Pedido #{order.id}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Vendedor: <span className="font-medium text-foreground">{order.vendor}</span>
                    </p>
                  </div>
                  <Badge variant={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p className="font-medium">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Itens</p>
                    <p className="font-medium">{order.items} unidades</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="font-bold text-xl text-primary">R$ {order.total.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver Detalhes
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
