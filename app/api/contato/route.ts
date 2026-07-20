import { NextRequest, NextResponse } from "next/server";

// Endpoint mínimo de recebimento do formulário de contato.
// TODO (produção): conectar a um provedor de e-mail (ver EMAIL_* em .env.example)
// ou a um serviço de tickets/CRM, e adicionar limite de requisições (rate limit)
// para reduzir abuso deste endpoint público.

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const message = String(body.message || "").trim();

    if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }

    // TODO (produção): enviar e-mail / registrar em banco de dados.
    console.log("Novo contato recebido:", { name, email });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
}
