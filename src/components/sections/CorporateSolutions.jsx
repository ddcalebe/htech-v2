import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../cards/ProductCard";
import CardConnector from "../ui/CardConnector";
import IntegrationsHub from "../ui/IntegrationsHub";
import ChatShowcase from "../ui/ChatShowcase";
import CrmShowcase from "../ui/CrmShowcase";
import haia from "../../assets/haia.webp";
import useGridLogo from "../../hooks/useGridLogo";
import laptop from "../../assets/services/crm-laptop.png";
import tablet from "../../assets/services/crm-tablet.png";
import phone from "../../assets/services/crm-phone.png";
import pabxImage from "../../assets/services/pabx.png";

const crm = {
  badge: "Para empresas",
  title: "CENTRAL DE CONVERSAS",
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

// CRM: três prints do sistema em leque, do fundo para a frente.
// TODO: importar os prints reais e colocar em `images`, ex.:
//   import crmContatos from "../../assets/services/crm-contatos.png";
//   import crmKanban from "../../assets/services/crm-kanban.png";
//   import crmRelatorios from "../../assets/services/crm-relatorios.png";
const crmShowcase = {
  title: "CRM",
  description: "Funil de vendas, histórico de cada cliente e relatórios de atendimento, tudo no mesmo lugar.",
  items: ["Funil de vendas por etapas", "Histórico de cada contato", "Relatórios e métricas da equipe"],
  images: [], // [crmContatos, crmKanban, crmRelatorios]
};

// Chatbot (esquerda, com o robô) e Agente de IA (direita, com o bonequinho do cursor).
// Cada um tem até 3 mensagens flutuando ao lado. Os textos são só ilustração.
const included = [
  {
    title: "Chatbot",
    character: "robot",
    icon: "chat",
    description: "Responde dúvidas programadas, transfere atendimentos e mantém o contato mesmo fora do horário comercial.",
    bubbles: [
      { from: "user", text: "Oi, bom dia!" },
      {
        from: "bot",
        text: "Olá! Seja bem-vindo à Htech!\nComo gostaria de prosseguir?",
        options: ["Conhecer soluções", "Conhecer produtos", "Outros assuntos"],
      },
      { from: "user", quote: "Como gostaria de prosseguir?", text: "Conhecer soluções" },
    ],
  },
  {
    title: "Agente de IA",
    character: haia,
    icon: "spark",
    description: "Entende perguntas, áudios e arquivos, responde de forma natural e encaminha para um humano quando necessário.",
    bubbles: [
      { from: "user", audio: "0:12" },
      {
        from: "bot",
        text: "Entendi! Você quer automatizar o atendimento da sua empresa no WhatsApp. Posso te mostrar como o nosso CRM faz isso e já agendar uma demonstração gratuita. Qual o melhor dia pra você?",
      },
      { from: "user", text: "Pode ser quinta à tarde!" },
    ],
  },
];

// TODO: trocar pelas integrações reais do CRM.
// Ícones disponíveis: database, sheet, mail, web, calendar, api, form, link
// (metade vai para a esquerda do círculo e metade para a direita)
const integrations = [
  { label: "ERP", icon: "database" },
  { label: "Planilhas", icon: "sheet" },
  { label: "Formulários", icon: "form" },
  { label: "APIs", icon: "api" },
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
    <section id="solucoes-corporativas" className="bg-corp">
      <SectionHeader title="Soluções Corporativas" color="white" />

      {/* Uma grade só: o logo grande atravessa todos os cards */}
      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-6 px-6 py-10">
        <ProductCard {...crm} />

        <h3 className="mt-2 text-3xl font-semibold text-white">OTIMIZE SUA EXPERIÊNCIA DE ATENDIMENTO:</h3>

        {/* Inclusos: CRM em cima; dele sai uma linha que se divide para o Chatbot e o Agente de IA,
            que por sua vez se ligam ao hub de Integrações embaixo.
            Sem "relative" aqui, para o logo de fundo continuar alinhado com o CRM e o PABX. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-rows-[auto_110px_auto_150px_auto] lg:gap-y-0">
          <CrmShowcase className="md:col-span-2 lg:pb-2" {...crmShowcase} />

          {/* Linha do CRM se dividindo para as duas conversas (só no desktop) */}
          <CardConnector flip className="hidden lg:col-span-2 lg:row-start-2 lg:block" />

          <ChatShowcase className="md:col-span-2 lg:row-start-3 lg:pb-6 lg:pt-5" items={included} />

          {/* Linhas ligando as duas conversas ao hub (só no desktop) */}
          <CardConnector className="hidden lg:col-span-2 lg:row-start-4 lg:block" />

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