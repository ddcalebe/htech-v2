import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import ProductCard from "../cards/ProductCard";
import FeatureCard from "../cards/FeatureCard";
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
    title: "Agente de IA",
    description: "Vai além do chatbot de menu. Entende perguntas, áudios, arquivos e responde de forma natural e encaminha para um humano quando necessário.",
    href: "#agente-ia",
    image: aiAgent,
  },
  {
    title: "Chatbot",
    description: "Responde dúvidas programadas, transfere atendimentos e mantém o contato com seus clientes, mesmo fora do horário comercial.",
    href: "#chatbot",
    image: chatbot  ,
  },
  {
    // TODO: trocar pelo nome, descrição e imagem do terceiro item
    title: "Integrações",
    description: "Conecta seu CRM a outros sistemas e plataformas, sincroniza informações e automatiza processos para tornar sua operação mais prática e eficiente.",
    href: "#",
  },
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
      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        <ProductCard {...crm} className="md:col-span-3" />

        <h3 className="mt-2 text-3xl font-semibold text-white md:col-span-3">INCLUSO NO CRM:</h3>

        {included.map((item) => (
          <FeatureCard key={item.title} {...item} />
        ))}

        <ProductCard {...pabx} className="mt-4 md:col-span-3" />
      </div>
    </section>
  );
}