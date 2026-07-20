// ============================================================================
// CAMADA DE INTEGRAÇÃO PIX
// ============================================================================
// Este módulo isola toda a lógica de geração e confirmação de cobranças Pix
// do restante da aplicação. Em desenvolvimento (NEXT_PUBLIC_PIX_DEV_MODE=true
// ou MERCADOPAGO_ACCESS_TOKEN ausente), as funções abaixo retornam dados
// simulados e a confirmação de pagamento é disparada manualmente pela
// interface (ver app/checkout/[slug]/CheckoutClient.tsx).
//
// PARA PRODUÇÃO:
// 1. Defina MERCADOPAGO_ACCESS_TOKEN (ou as credenciais do provedor escolhido)
//    em variáveis de ambiente — nunca no código-fonte.
// 2. Implemente createPixCharge() chamando a API real do provedor (ex.:
//    Mercado Pago /v1/payments com payment_method_id "pix").
// 3. Implemente um endpoint de webhook (app/api/webhooks/pix/route.ts) que
//    receba a notificação do provedor, valide a assinatura
//    (MERCADOPAGO_WEBHOOK_SECRET) e atualize o status do pedido.
// 4. Nunca confie apenas na resposta do cliente para liberar acesso — a
//    liberação deve ocorrer somente após a confirmação do webhook no servidor.
// ============================================================================

import { PixCharge } from "@/types";

const isDevMode =
  process.env.NEXT_PUBLIC_PIX_DEV_MODE === "true" ||
  !process.env.MERCADOPAGO_ACCESS_TOKEN;

export function isPixDevMode(): boolean {
  return isDevMode;
}

export async function createPixCharge(params: {
  orderId: string;
  amount: number;
}): Promise<PixCharge> {
  if (isDevMode) {
    // Simulação local — nenhuma chamada de rede é feita.
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    return {
      orderId: params.orderId,
      amount: params.amount,
      expiresAt,
      qrCodeText: `00020126SIMULADO-DEV-${params.orderId}-${params.amount}5204000053039865802BR5913PROTOCOLO METAMORFOSE6008SAO PAULO62070503***6304DEV`,
    };
  }

  // TODO (produção): substituir pela chamada real ao provedor de pagamento.
  throw new Error(
    "Integração Pix de produção não configurada. Defina MERCADOPAGO_ACCESS_TOKEN e implemente createPixCharge()."
  );
}

export async function checkPixStatus(orderId: string): Promise<"pendente" | "pago" | "expirado"> {
  if (isDevMode) {
    // Em desenvolvimento, o status é controlado pelo botão de simulação na UI,
    // não por esta função.
    return "pendente";
  }

  // TODO (produção): consultar o status real junto ao provedor, ou depender
  // exclusivamente do webhook para atualizar o pedido no banco de dados.
  throw new Error("Consulta de status Pix de produção não configurada.");
}
