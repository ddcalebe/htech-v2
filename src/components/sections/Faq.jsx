import { whatsappLink } from "../../config/contact";

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

/**
 * fromColor: cor da seção que vem antes do FAQ. O fundo do FAQ começa nessa cor
 * e vai clareando até o cinza claro (#f5f5f5). Ex.: "#171717" (Clientes) ou "var(--color-condo)" (Condomínios).
 */
export default function Faq({ fromColor = "#171717" }) {
  return (
    <section
      id="faq"
      className="text-[#0B1F5E] pt-50 pb-20"
      style={{
        // Transição suave da cor da seção anterior (fromColor) para o cinza claro (paradas em curva, sem "faixa" no meio)
      background:
        `linear-gradient(to bottom in oklch, ${fromColor} 0, color-mix(in oklch, ${fromColor} 92%, #f5f5f5) 60px, color-mix(in oklch, ${fromColor} 75%, #f5f5f5) 130px, color-mix(in oklch, ${fromColor} 50%, #f5f5f5) 200px, color-mix(in oklch, ${fromColor} 25%, #f5f5f5) 270px, color-mix(in oklch, ${fromColor} 8%, #f5f5f5) 330px, #f5f5f5 380px, #f5f5f5 100%)`,
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-80 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        {/* Esquerda: título e chamada (aparece ao rolar) */}
        <div className="reveal lg:sticky lg:top-28 lg:self-start">
          <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0A84FF]">FAQ</span>
          <h2 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">Perguntas frequentes</h2>
          <p className="mt-4 max-w-sm text-[#0B1F5E]/80">
            Não encontrou o que procurava? Fale com a nossa equipe e tire suas dúvidas direto com um especialista.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#0A84FF] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0B1F5E]"
          >
            Fale com a gente
          </a>
        </div>

        {/* Direita: perguntas (abre e fecha sem JavaScript, com <details>).
            Aparecem ao rolar, uma depois da outra (80ms de diferença entre cada) */}
        <div className="flex flex-col gap-3">
          <style>{`
            /* Abrir e fechar a pergunta com a altura crescendo suave
               (navegadores mais novos; nos outros abre direto, só com o efeito da resposta) */
            .faq-item { interpolate-size: allow-keywords; }
            .faq-item::details-content {
              block-size: 0;
              overflow: hidden;
              transition: block-size 0.45s cubic-bezier(0.2, 0.7, 0.2, 1), content-visibility 0.45s allow-discrete;
            }
            .faq-item[open]::details-content { block-size: auto; }

            /* A resposta sobe um pouco e aparece, no mesmo ritmo da animação de rolagem do site */
            .faq-item[open] .faq-answer { animation: faq-answer 0.5s cubic-bezier(0.2, 0.7, 0.2, 1) both; }
            @keyframes faq-answer {
              from { opacity: 0; transform: translateY(-8px); }
              to { opacity: 1; transform: none; }
            }

            @media (prefers-reduced-motion: reduce) {
              .faq-item::details-content { transition: none; }
              .faq-item[open] .faq-answer { animation: none; }
            }
          `}</style>

          {faqs.map((item, i) => (
            <details
              key={item.question}
              style={{ "--reveal-delay": `${150 + i * 80}ms` }}
              className="faq-item reveal group rounded-xl border border-[#0B1F5E]/10 bg-white transition-colors hover:border-[#0A84FF]/30 open:border-[#0A84FF]/25 open:shadow-lg open:shadow-[#0B1F5E]/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0A84FF]">{item.type}</span>
                  <span className="text-lg font-semibold leading-snug">{item.question}</span>
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0A84FF] text-white">
                  <PlusIcon />
                </span>
              </summary>

              <p className="faq-answer px-5 pb-5 leading-relaxed text-[#0B1F5E]/80">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}