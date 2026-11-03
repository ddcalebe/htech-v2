import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../cards/ProductCard";
import CardConnector from "../ui/CardConnector";
import IntegrationsHub from "../ui/IntegrationsHub";
import ChatShowcase from "../ui/ChatShowcase";
import useGridLogo from "../../hooks/useGridLogo";
import laptop from "../../assets/services/crm-laptop.png";
import tablet from "../../assets/services/crm-tablet.png";
import phone from "../../assets/services/crm-phone.png";
import pabxImage from "../../assets/services/pabx.png";

const crm = {
  badge: "Para empresas",
  title: "CRM",
  subtitle: "Atendimento multicanal WEB e Mobile",
  ctaLabel: "Solicitar demonstração grátis",
  features: [
    { title: "Todos os contatos em um só lugar:", text: "histórico de conversas, dados do cliente e etapa de negociação centralizados." },
    { title: "Funil de vendas organizado:", text: "acompanhar cada oportunidade, do primeiro contato ao fechamento." },
    { title: "Automação de follow-up:", text: "mensagens e lembretes automáticos enviados para cada cliente." },
    { title: "Atendimento multicanal:", text: "WhatsApp, Instagram, Messenger, etc., tudo na mesma tela." },
    { title: "Relatórios e métricas:", text: "quantos atendimentos, taxa de conversão, desempenho da equipe." },
  ],
  laptopImage: laptop,
  phoneImage: phone,
  tabletImage: tablet,
};

// Chatbot (esquerda) e Agente de IA (direita), mostrados como conversas de exemplo.
// As conversas são só ilustração: pode trocar os textos à vontade.
const included = [
  {
    title: "Chatbot",
    icon: "chat",
    description: "Responde dúvidas programadas, transfere atendimentos e mantém o contato mesmo fora do horário comercial.",
    href: "#chatbot",
    messages: [
      { from: "user", text: "Oi, preciso da segunda via do boleto" },
      { from: "bot", text: "Olá! Escolha uma opção:", options: ["Segunda via de boleto", "Falar com um atendente"] },
      { from: "user", text: "1" },
      { typing: true },
    ],
  },
  {
    title: "Agente de IA",
    icon: "spark",
    description: "Entende perguntas, áudios e arquivos, responde de forma natural e encaminha para um humano quando necessário.",
    href: "#agente-ia",
    messages: [
      { from: "user", audio: "0:12" },
      {
        from: "bot",
        ai: true,
        text: "Claro! Seu boleto de novembro vence dia 10. Já te enviei a segunda via aqui. Quer que eu agende um lembrete?",
      },
      { from: "user", text: "Pode sim, obrigado!" },
      { typing: true },
    ],
  },
];

// TODO: trocar pelas integrações reais do CRM.
// Ícones disponíveis: database, sheet, mail, web, calendar, api, link
// (metade vai para a esquerda do círculo e metade para a direita)
const integrations = [
  { label: "ERP", icon: "database" },
  { label: "Planilhas", icon: "sheet" },
  { label: "E-mail", icon: "mail" },
  { label: "Site", icon: "web" },
];

// TODO: revisar os textos do PABX (exemplo)
const pabx = {
  badge: "Para empresas",
  title: "PABX em nuvem",
  subtitle: "Telefonia empresarial sem central física",
  ctaLabel: "Solicitar demonstração grátis",
  image: pabxImage,
  features: [
    { title: "Ramais em qualquer lugar:", text: "atenda pelo computador, celular ou telefone IP, no escritório ou em casa." },
    { title: "URA personalizada:", text: "menu de atendimento que direciona cada ligação para o setor certo." },
    { title: "Gravação de chamadas:", text: "histórico de ligações para conferência e treinamento da equipe." },
    { title: "Relatórios de ligações:", text: "volume de chamadas, tempo de espera e chamadas perdidas." },
  ],
};

export default function CorporateSolutions() {
  const gridRef = useRef(null);
  useGridLogo(gridRef, { width: 1 });

  return (
    <section id="solucoes-corporativas" className="bg-neutral-900">
      <SectionHeader title="Soluções Corporativas" />

      {/* Uma grade só: o logo grande atravessa todos os cards */}
      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-6 px-6 py-10">
        <ProductCard {...crm} />

        <h3 className="mt-2 text-3xl font-semibold text-white">INCLUSO NO CRM:</h3>

        {/* Inclusos: Chatbot e Agente de IA em cima, ligados pelas linhas ao hub de Integrações embaixo.
            Sem "relative" aqui, para o logo de fundo continuar alinhado com o CRM e o PABX. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-rows-[auto_56px_auto] lg:gap-y-0">
          <ChatShowcase className="md:col-span-2 lg:pb-6" items={included} />

          {/* Linhas ligando as duas conversas ao hub (só no desktop) */}
          <CardConnector className="hidden lg:col-span-2 lg:row-start-2 lg:block" />

          <IntegrationsHub
            className="md:col-span-2"
            integrations={integrations}
            description="Conecta seu CRM a outros sistemas e plataformas, sincroniza informações e automatiza processos para tornar sua operação mais prática e eficiente."
            href="#integracoes"
          />
        </div>

        <ProductCard {...pabx} className="mt-4" />
      </div>
    </section>
  );
}