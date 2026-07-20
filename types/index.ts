export interface Order {
  id: string;
  planSlug: string;
  buyerName: string;
  buyerEmail: string;
  buyerDocument: string;
  amount: number;
  status: "pendente" | "pago" | "expirado" | "cancelado";
  createdAt: string;
  paidAt?: string;
}

export interface PixCharge {
  orderId: string;
  qrCodeText: string; // "copia e cola"
  amount: number;
  expiresAt: string;
}
