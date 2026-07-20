import { NextRequest, NextResponse } from "next/server";
import { isPixDevMode } from "@/lib/payments/pix";
import { getOrder, markOrderPaid } from "@/lib/orders-store";

// Endpoint usado SOMENTE em modo de desenvolvimento para simular a
// confirmação do Pix pela interface (botão "Simular pagamento confirmado").
//
// TODO (produção): remover o uso deste endpoint pelo cliente. A confirmação
// real deve chegar por um webhook do provedor de pagamento, validado no
// servidor, nunca disparada por uma ação do navegador do comprador.

export async function POST(request: NextRequest) {
  if (!isPixDevMode()) {
    return NextResponse.json({ error: "Confirmação manual desabilitada em produção." }, { status: 403 });
  }

  const body = await request.json();
  const orderId = String(body.orderId || "");
  const order = getOrder(orderId);
  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  const updated = markOrderPaid(orderId);
  return NextResponse.json({ order: updated });
}
