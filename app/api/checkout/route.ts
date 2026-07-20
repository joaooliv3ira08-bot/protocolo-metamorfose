import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getPlanBySlug } from "@/lib/plans-data";
import { createPixCharge } from "@/lib/payments/pix";
import { saveOrder } from "@/lib/orders-store";
import { Order } from "@/types";

// Validação simples de CPF (dígitos verificadores). Suficiente para reduzir
// erros de digitação; não substitui validação de fraude em produção.
function isValidCpf(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, "");
  if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) return false;
  const calc = (len: number) => {
    let sum = 0;
    for (let i = 0; i < len; i++) sum += parseInt(digits[i], 10) * (len + 1 - i);
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };
  return calc(9) === parseInt(digits[9], 10) && calc(10) === parseInt(digits[10], 10);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const planSlug = String(body.planSlug || "");
    const buyerName = String(body.buyerName || "").trim();
    const buyerEmail = String(body.buyerEmail || "").trim();
    const buyerDocument = String(body.buyerDocument || "").trim();

    const plan = getPlanBySlug(planSlug);
    if (!plan) {
      return NextResponse.json({ error: "Plano não encontrado." }, { status: 404 });
    }
    if (buyerName.length < 2) {
      return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyerEmail)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }
    if (!isValidCpf(buyerDocument)) {
      return NextResponse.json({ error: "CPF inválido." }, { status: 400 });
    }

    const order: Order = {
      id: randomUUID(),
      planSlug: plan.slug,
      buyerName,
      buyerEmail,
      buyerDocument,
      amount: plan.price,
      status: "pendente",
      createdAt: new Date().toISOString(),
    };
    saveOrder(order);

    const charge = await createPixCharge({ orderId: order.id, amount: order.amount });

    return NextResponse.json({ order, charge });
  } catch {
    return NextResponse.json({ error: "Não foi possível iniciar o checkout." }, { status: 500 });
  }
}
