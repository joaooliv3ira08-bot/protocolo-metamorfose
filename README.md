# Protocolo Metamorfose — Site institucional e de vendas

Plataforma de venda de planos de treino, alimentação e combinado, com checkout
via Pix e liberação de acesso imediata após a confirmação do pagamento.

> **Nota sobre este projeto**: o código foi escrito integralmente à mão neste
> ambiente, que não tem acesso à internet para rodar `npm install`. Isso
> significa que **este build não foi instalado, lintado nem compilado aqui** —
> você (ou o Claude Code, que tem acesso à rede) precisa rodar os passos da
> seção "Instalação" abaixo e corrigir qualquer erro de dependência/versão que
> aparecer nesse primeiro build. A estrutura, as rotas e a lógica estão
> completas e revisadas manualmente, mas trate o primeiro `npm run build`
> como parte do trabalho pendente.

## Tecnologias

- Next.js 14 (App Router) + React 18 + TypeScript estrito
- Tailwind CSS com tokens em variáveis CSS (`app/globals.css`)
- Ícones via `lucide-react`
- Sem banco de dados externo por padrão (ver seção "Pedidos e Pix" abaixo)

## Instalação

```bash
npm install
npm run dev      # http://localhost:3000
```

Outros comandos:

```bash
npm run lint       # ESLint
npm run typecheck  # checagem de tipos TypeScript
npm run build       # build de produção
npm run start        # servir o build de produção
```

Copie `.env.example` para `.env.local` e preencha o que for aplicável:

```bash
cp .env.example .env.local
```

## Estrutura principal

```
app/
  page.tsx                 → Página inicial
  sobre/page.tsx            → Página "Sobre"
  planos/page.tsx            → Listagem de planos + simulador de TMB/TDEE
  planos/[slug]/page.tsx      → Detalhe de cada plano
  checkout/[slug]/page.tsx     → Checkout (dados do comprador)
  checkout/[slug]/CheckoutClient.tsx → Fluxo de geração/confirmação do Pix
  confirmacao/page.tsx          → Página pós-pagamento
  contato/page.tsx               → Formulário de contato + FAQ
  privacidade/, termos/            → Páginas legais (conteúdo provisório)
  api/checkout/route.ts             → Cria pedido + cobrança Pix
  api/checkout/confirm/route.ts      → Confirmação (somente modo dev)
  api/contato/route.ts                → Recebe o formulário de contato
components/
  layout/    → Header, MobileNav, Footer, WhatsAppButton, SkipLink
  sections/   → Hero, ProtocolReadout (elemento visual de assinatura),
                Differentiators, ProcessSteps, PlansPreview, PlanCard, Faq,
                CtaBanner, HealthCalculatorWidget (simulador TMB/TDEE)
  ui/          → Button, Card, Container, SectionTitle, Badge
  forms/        → ContactForm
content/
  site.ts        → TODO ponto único de edição: nome, contatos, planos, FAQ, textos
lib/
  payments/pix.ts  → Camada de integração Pix (documentada, isolada)
  orders-store.ts   → Armazenamento de pedidos EM MEMÓRIA (ver pendências)
  health-calculations.ts → Fórmulas de TMB/TDEE (Mifflin-St Jeor)
  plans-data.ts, format.ts
```

## Personalização rápida

| O que alterar | Onde |
|---|---|
| Nome, tagline, descrição, domínio | `content/site.ts` → `siteConfig` |
| E-mail, WhatsApp, endereço | `content/site.ts` → `contact` |
| Redes sociais | `content/site.ts` → `socialLinks` |
| Textos do hero, CTAs | `content/site.ts` → `heroContent` |
| Diferenciais, processo, FAQ | `content/site.ts` → `differentiators`, `process`, `faq` |
| Planos e preços | `content/site.ts` → `plans` (⚠️ preços atuais são de exemplo) |
| Cores e tipografia | `app/globals.css` (variáveis `:root`) e `tailwind.config.ts` |
| Texto da página "Sobre" | `app/sobre/page.tsx` |
| Textos jurídicos | `app/privacidade/page.tsx`, `app/termos/page.tsx` |
| Botão flutuante do WhatsApp | some automaticamente enquanto `contact.whatsapp` estiver vazio em `content/site.ts` |

## Pedidos e Pix — como funciona hoje e o que falta para produção

- **Modo atual (desenvolvimento)**: `lib/payments/pix.ts` gera uma cobrança
  Pix simulada (nenhuma chamada de rede) e `app/checkout/[slug]/CheckoutClient.tsx`
  exibe um botão "Simular pagamento confirmado" para representar a chegada do
  webhook do provedor.
- **Armazenamento de pedidos**: `lib/orders-store.ts` guarda os pedidos em
  memória do processo Node. Os dados somem a cada reinício do servidor e o
  esquema não é adequado para múltiplas instâncias (ex.: ambientes
  serverless).

### Pendências antes da publicação (obrigatório revisar)

- [ ] **Preços dos planos** em `content/site.ts` são valores de exemplo — substitua pelos reais.
- [ ] **E-mail comercial** (`contato@exemplo.com.br`) é provisório — substitua em `content/site.ts`.
- [ ] **WhatsApp** não foi informado — preencha `contact.whatsapp` (com DDI+DDD, ex. `"5511999999999"`) para que o botão flutuante apareça.
- [ ] **Domínio final** (`protocolometamorfose.com.br`) é uma suposição — confirme o domínio de registro e atualize `siteConfig.domain`/`NEXT_PUBLIC_SITE_URL`.
- [ ] **Texto da página "Sobre"** contém um bloco `TODO` que precisa da apresentação real do responsável.
- [ ] **Política de Privacidade e Termos de Uso** são textos-esqueleto marcados com `TODO` — precisam de revisão jurídica antes da publicação.
- [ ] **Integração real de pagamento Pix**: implementar `createPixCharge()` em `lib/payments/pix.ts` com o provedor escolhido (ex. Mercado Pago) e criar o endpoint de webhook correspondente.
- [ ] **Banco de dados real** para pedidos: substituir `lib/orders-store.ts` por SQLite/PostgreSQL, conforme comentário no próprio arquivo.
- [ ] **Entrega do PDF do plano**: a página de confirmação (`app/confirmacao/page.tsx`) tem um botão de download desativado — conectar ao arquivo real (link assinado com validade, ou área de membros).
- [ ] **Envio de e-mail transacional**: `app/api/contato/route.ts` e a confirmação de compra apenas fazem `console.log`; conectar a um provedor de e-mail usando as variáveis `EMAIL_*` do `.env.example`.
- [ ] **Rate limiting** nos endpoints públicos (`/api/checkout`, `/api/contato`) antes de ir ao ar.
- [ ] **Ativos visuais**: não há logotipo nem fotos reais; o nome é exibido como wordmark tipográfico. Substitua por ativos reais quando disponíveis.
- [ ] **Primeiro build**: rodar `npm install && npm run build` (não executado neste ambiente por falta de acesso à internet) e corrigir eventuais erros de versão de dependências.

## Execução local

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Publicação (próximo passo recomendado)

1. Resolver a lista de pendências acima.
2. Rodar `npm run build` localmente (ou via CI) e corrigir eventuais erros.
3. Publicar em uma plataforma compatível com Next.js App Router (ex. Vercel),
   configurando as variáveis de `.env.example` no painel do provedor.
4. Configurar o domínio final e emitir certificado HTTPS (a maioria das
   plataformas gerenciadas faz isso automaticamente).
5. Configurar o webhook do provedor Pix apontando para o endpoint de
   confirmação de produção (a ser criado conforme os TODOs em `lib/payments/pix.ts`).

## Fluxo de compra (resumo)

1. **Seleção do plano** — `/planos` → `/planos/[slug]`.
2. **Checkout** — `/checkout/[slug]`: formulário com nome, e-mail e CPF (validados no cliente e no servidor via `/api/checkout`).
3. **Geração do Pix** — QR Code e código "copia e cola" simulados em desenvolvimento; valor, destinatário e cronômetro de expiração exibidos.
4. **Confirmação** — em desenvolvimento, via botão manual; em produção, via webhook do provedor chamando o servidor (nunca o cliente).
5. **Liberação de acesso** — redirecionamento para `/confirmacao`, com o link de download a ser conectado ao provedor de entrega definido.
