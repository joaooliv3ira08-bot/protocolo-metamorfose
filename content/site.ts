// ============================================================================
// CONTEÚDO CENTRAL DO SITE — edite este arquivo para atualizar textos,
// contatos, links sociais e dados institucionais em todo o site.
// Ver seção "Personalização rápida" no README para instruções detalhadas.
// ============================================================================

export const siteConfig = {
  name: "Protocolo Metamorfose",
  shortName: "Metamorfose",
  tagline: "Treino e nutrição sob medida, entregues com precisão de dados",
  description:
    "Planos de treino e alimentação personalizados, montados a partir dos seus dados metabólicos reais e liberados imediatamente após o pagamento via Pix.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://protocolometamorfose.com.br",
  domain: "protocolometamorfose.com.br", // TODO: confirmar domínio final de registro
  locale: "pt-BR",
  region: "Online (atendimento em todo o Brasil)",
};

export const contact = {
  // TODO: nenhum destes dados foi informado — substitua pelos reais antes da publicação.
  email: "contato@exemplo.com.br", // TODO: e-mail comercial real
  whatsapp: "5515998189827", // DDI 55 + DDD 15 + número
  whatsappDisplay: "(15) 99818-9827",
  phone: "", // TODO
  address: "", // TODO (se houver endereço físico)
};

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/jotahhatetraining", handle: "@jotahhatetraining" },
  { label: "TikTok", href: "https://www.tiktok.com/@jotahh.fit", handle: "@jotahh.fit" },
];

export const nav = [
  { label: "Início", href: "/" },
  { label: "Planos", href: "/planos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export const heroContent = {
  eyebrow: "Coaching de treino e nutrição baseado em dados",
  headline: "Seu protocolo de treino e alimentação, calculado para o seu corpo",
  subheadline:
    "Planos individuais de treino, alimentação ou os dois combinados — montados a partir do seu TMB e TDEE reais, não de tabelas genéricas. Pague com Pix e receba acesso imediato.",
  primaryCta: { label: "Ver planos disponíveis", href: "/planos" },
  secondaryCta: { label: "Como funciona o método", href: "#processo" },
  metrics: [
    { label: "Liberação após Pix", value: "Imediata" },
    { label: "Base de cálculo", value: "TMB / TDEE" },
    { label: "Formato de entrega", value: "Plano em PDF" },
  ],
};

export const differentiators = [
  {
    title: "Planos calculados, não copiados",
    description:
      "Cada protocolo parte do seu gasto calórico basal e total (TMB/TDEE), ajustado ao seu objetivo — não é uma planilha padrão reaplicada para todo mundo.",
  },
  {
    title: "Acesso imediato após o Pix",
    description:
      "Assim que o pagamento é confirmado, o link do seu plano é liberado na hora — sem espera, sem etapas manuais.",
  },
  {
    title: "Abordagem tecnológica",
    description:
      "Ferramentas próprias de cálculo e acompanhamento tornam o processo mais rápido e mais preciso do que planilhas genéricas de internet.",
  },
];

export const process = [
  {
    step: "Escolha do plano",
    description: "Você escolhe entre Treino, Alimentação ou o Combinado, de acordo com o seu objetivo.",
  },
  {
    step: "Dados e cálculo",
    description: "Reunimos seus dados (peso, altura, rotina, objetivo) para calcular TMB, TDEE e distribuição de macros.",
  },
  {
    step: "Pagamento via Pix",
    description: "Checkout simplificado: você paga por Pix e o pagamento é confirmado em poucos instantes.",
  },
  {
    step: "Liberação do protocolo",
    description: "Seu plano é liberado imediatamente para download, pronto para começar.",
  },
];

export type PlanType = "treino" | "alimentacao" | "combinado";

export interface Plan {
  slug: string;
  type: PlanType;
  name: string;
  shortDescription: string;
  description: string;
  benefits: string[];
  includes: string[];
  // TODO: valores provisórios de exemplo — substitua pelos preços reais antes de publicar.
  price: number;
  priceLabel: string;
  isProvisionalPrice: boolean;
  featured?: boolean;
}

export const plans: Plan[] = [
  {
    slug: "plano-de-treino",
    type: "treino",
    name: "Plano de Treino",
    shortDescription: "Treino individualizado a partir do seu histórico e objetivo.",
    description:
      "Um plano de treino construído para o seu nível atual, seus dias disponíveis e o seu objetivo — hipertrofia, emagrecimento ou performance. A estrutura de séries, cargas de referência e progressão é organizada em ciclos, não em uma ficha única e estática.",
    benefits: [
      "Divisão de treino adequada aos seus dias disponíveis",
      "Progressão de carga planejada por ciclo",
      "Ajustado ao seu nível de experiência",
    ],
    includes: [
      "Plano de treino em PDF, organizado por dia/semana",
      "Orientações de execução dos principais exercícios",
      "Estrutura de progressão para as semanas seguintes",
    ],
    price: 97,
    priceLabel: "R$ 97",
    isProvisionalPrice: true,
  },
  {
    slug: "plano-de-alimentacao",
    type: "alimentacao",
    name: "Plano de Alimentação",
    shortDescription: "Cardápio calculado a partir do seu TMB e TDEE reais.",
    description:
      "Plano alimentar com as calorias e macronutrientes calculados a partir do seu gasto metabólico basal (TMB) e do seu gasto energético total (TDEE) — não de uma tabela genérica de calorias por peso corporal.",
    benefits: [
      "Cálculo individual de TMB e TDEE",
      "Distribuição de macronutrientes adequada ao seu objetivo",
      "Sugestões de substituição de alimentos",
    ],
    includes: [
      "Plano alimentar em PDF",
      "Memória de cálculo (TMB, TDEE, macros)",
      "Lista de substituições por grupo alimentar",
    ],
    price: 97,
    priceLabel: "R$ 97",
    isProvisionalPrice: true,
  },
  {
    slug: "plano-combinado",
    type: "combinado",
    name: "Plano Combinado",
    shortDescription: "Treino e alimentação juntos, com desconto sobre o valor separado.",
    description:
      "Treino e alimentação desenhados em conjunto, com a mesma base de dados e o mesmo objetivo — para que o volume de treino e a estratégia calórica conversem entre si.",
    benefits: [
      "Treino e alimentação com o mesmo objetivo como base",
      "Economia em relação à compra separada",
      "Acompanhamento único do seu protocolo completo",
    ],
    includes: [
      "Plano de treino em PDF",
      "Plano alimentar em PDF",
      "Memória de cálculo completa (TMB, TDEE, macros)",
    ],
    price: 167,
    priceLabel: "R$ 167",
    isProvisionalPrice: true,
    featured: true,
  },
];

export const faq = [
  {
    question: "Como recebo meu plano após o pagamento?",
    answer:
      "Assim que o pagamento via Pix é confirmado, você é redirecionado para a página de confirmação com o link de download do seu plano em PDF. O mesmo link também pode ser enviado por e-mail, conforme configuração informada no checkout.",
  },
  {
    question: "Os planos são realmente individuais?",
    answer:
      "Sim. Os cálculos de TMB, TDEE e distribuição de macronutrientes usam os dados que você informa (peso, altura, idade, rotina e objetivo) como base — o plano não é um modelo único replicado para todos os clientes.",
  },
  {
    question: "Posso comprar o treino e a alimentação separadamente?",
    answer:
      "Sim. Você pode adquirir o Plano de Treino, o Plano de Alimentação ou o Plano Combinado, que reúne os dois com um valor melhor do que a soma dos planos avulsos.",
  },
  {
    question: "O que acontece se o pagamento não for confirmado?",
    answer:
      "Se o Pix não for identificado dentro do prazo exibido no checkout, a cobrança expira automaticamente e nenhum valor é debitado. Você pode gerar um novo Pix a qualquer momento.",
  },
  {
    question: "Como falo com o suporte em caso de dúvida?",
    answer:
      "Use o formulário da página de Contato ou os canais informados no rodapé do site. Respondemos pelos mesmos canais o mais rápido possível.",
  },
];

export const legalNotice =
  "Os textos das páginas legais (Política de Privacidade e Termos de Uso) estão marcados como conteúdo provisório e precisam de revisão jurídica antes da publicação.";
