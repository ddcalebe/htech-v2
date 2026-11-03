// ⚠️ PERGUNTAS E RESPOSTAS DE EXEMPLO: revisar antes de publicar.
// O que está entre [colchetes] depende das regras de vocês (prazos, contrato, suporte) e precisa ser preenchido.
const faqs = [
  {
    type: "Empresas",
    question: "Como funciona a implantação do CRM?",
    answer:
      "Fazemos uma conversa inicial para entender seus canais de atendimento, configuramos o CRM com as suas integrações e treinamos a equipe. Em média, a implantação leva [prazo].",
  },
  {
    type: "Empresas",
    question: "Consigo atender WhatsApp, Instagram e Messenger no mesmo lugar?",
    answer:
      "Sim. Todas as conversas chegam na mesma tela, com o histórico de cada cliente, e podem ser distribuídas entre os atendentes da equipe.",
  },
  {
    type: "Empresas",
    question: "Qual a diferença entre o Chatbot e o Agente de IA?",
    answer:
      "O Chatbot segue um roteiro de perguntas e respostas programadas. O Agente de IA entende mensagens escritas livremente, áudios e arquivos, responde de forma natural e passa para um atendente quando necessário.",
  },
  {
    type: "Condomínios",
    question: "Precisa trocar a fiação do prédio para usar a interfonia sem fio?",
    answer:
      "Não. A chamada do interfone toca direto no celular do morador, sem passar fiação nova pelo condomínio.",
  },
  {
    type: "Condomínios",
    question: "O que acontece se a internet do condomínio cair?",
    answer: "[Explicar como o controle de acesso e a portaria funcionam sem internet.]",
  },
  {
    type: "Todos",
    question: "Existe contrato de fidelidade?",
    answer: "[Explicar as condições de contrato e cancelamento.]",
  },
  {
    type: "Todos",
    question: "Como funciona o suporte?",
    answer: "[Canais de suporte, horários de atendimento e prazo de resposta.]",
  },
];

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      className="h-5 w-5 shrink-0 transition-transform duration-300 group-open:rotate-45"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function Faq() {
  return (
    <section
      id="faq"
      className="text-[#0B1F5E]"
      style={{
        // Transição suave: do preto da seção anterior ao azul-claro em 380px,
        // começando e terminando devagar, com as cores misturadas em oklch (sem o meio acinzentado)
        background:
          "linear-gradient(to bottom in oklch, #171717 0, " +
          "color-mix(in oklch, #171717 92%, #5AB0FF) 60px, " +
          "color-mix(in oklch, #171717 75%, #5AB0FF) 130px, " +
          "color-mix(in oklch, #171717 50%, #5AB0FF) 200px, " +
          "color-mix(in oklch, #171717 25%, #5AB0FF) 270px, " +
          "color-mix(in oklch, #171717 8%, #5AB0FF) 330px, " +
          "#5AB0FF 380px, #5AB0FF 100%)",
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-80 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        {/* Esquerda: título e chamada */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0B2BC4]">FAQ</span>
          <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Perguntas frequentes</h2>
          <p className="mt-4 max-w-sm text-[#0B1F5E]/80">
            Não encontrou o que procurava? Fale com a nossa equipe e tire suas dúvidas direto com um especialista.
          </p>
          <a
            href="#contato"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#0B2BC4] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0B1F5E]"
          >
            Fale com a gente
          </a>
        </div>

        {/* Direita: perguntas (abre e fecha sem JavaScript, com <details>) */}
        <div className="flex flex-col gap-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-white/50 bg-white/40 shadow-sm shadow-[#0B1F5E]/5 transition-colors open:bg-white/70"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0B2BC4]">{item.type}</span>
                  <span className="text-lg font-semibold leading-snug">{item.question}</span>
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0B2BC4] text-white">
                  <PlusIcon />
                </span>
              </summary>

              <p className="px-5 pb-5 leading-relaxed text-[#0B1F5E]/80">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}