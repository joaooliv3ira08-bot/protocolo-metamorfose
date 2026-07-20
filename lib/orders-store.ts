// ============================================================================
// ARMAZENAMENTO DE PEDIDOS — IMPLEMENTAÇÃO MÍNIMA EM MEMÓRIA
// ============================================================================
// Esta implementação guarda os pedidos apenas em memória do processo Node,
// o que é suficiente para desenvolvimento e demonstração, mas NÃO é
// adequado para produção: os dados são perdidos a cada reinício do servidor
// e não funcionam em ambientes com múltiplas instâncias (ex.: serverless).
//
// TODO (produção): substituir este módulo por um banco de dados real
// (SQLite para começar simples, ou PostgreSQL/MySQL para escalar), com
// esquema tipado e migrações. Sugestão de tabelas:
//   plans(slug, name, price_cents, ...)
//   orders(id, plan_slug, buyer_name, buyer_email, buyer_document, amount_cents,
//          status, created_at, paid_at)
// ============================================================================

import { Order } from "@/types";

const orders = new Map<string, Order>();

export function saveOrder(order: Order) {
  orders.set(order.id, order);
}

export function getOrder(id: string): Order | undefined {
  return orders.get(id);
}

export function markOrderPaid(id: string): Order | undefined {
  const order = orders.get(id);
  if (!order) return undefined;
  const updated: Order = { ...order, status: "pago", paidAt: new Date().toISOString() };
  orders.set(id, updated);
  return updated;
}
