import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../cards/ProductCard";
import FeatureCard from "../cards/FeatureCard";
import CardConnector from "../ui/CardConnector";
import IntegrationsHub from "../ui/IntegrationsHub";
import useGridLogo from "../../hooks/useGridLogo";
import laptop from "../../assets/services/crm-laptop.png";
import tablet from "../../assets/services/crm-tablet.png";
import phone from "../../assets/services/crm-phone.png";
import aiAgent from "../../assets/services/crm-ai-agent.png";
import chatbot from "../../assets/services/crm-chatbot.png";
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

const included = [
  {
    title: "Chatbot",
    description: "Responde dúvidas programadas, transfere atendimentos e mantém o contato com seus clientes, mesmo fora do horário comercial.",
    href: "#chatbot",
    image: chatbot,
  },
  {
    title: "Agente de IA",
    description: "Vai além do chatbot de menu. Entende perguntas, áudios, arquivos e responde de forma natural e encaminha para um humano quando necessário.",
    href: "#agente-ia",
    image: aiAgent,
    reverse: true,
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

        {/* Inclusos: Agente e Chatbot em cima, ligados pelas linhas ao hub de Integrações embaixo.
            Sem "relative" aqui, para o logo de fundo continuar alinhado com o CRM e o PABX. */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-rows-[auto_56px_auto] lg:gap-y-0">
          {included.map((item) => (
            <FeatureCard key={item.title} {...item} tag="CRM" />
          ))}

          {/* Linhas ligando os dois cards ao hub (só no desktop) */}
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