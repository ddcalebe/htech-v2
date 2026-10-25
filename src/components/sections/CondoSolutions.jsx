import { useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import CondoCard from "../cards/CondoCard";
import useGridLogo from "../../hooks/useGridLogo";

// Imagens dos cards: descomente e ajuste os caminhos quando tiver os arquivos
// import acessoImg from "../../assets/services/condo-controle-acesso.webp";
// import interfoniaImg from "../../assets/services/condo-interfonia.webp";
// import smartBoxImg from "../../assets/services/condo-smart-box.webp";
// import cftvImg from "../../assets/services/condo-cftv.webp";

// TODO: revisar os textos (exemplos)
const cards = [
  {
    title: "App de\nGestão",
    size: "lg",
    badge: "Para condomínios",
    subtitle: "Toda a gestão do condomínio\nna palma da mão",
    ctaLabel: "Solicitar demonstração grátis",
    features: [
      { title: "Comunicados e avisos:", text: "mensagens para todos os moradores ou por bloco, com confirmação de leitura." },
      { title: "Reservas de áreas comuns:", text: "salão de festas, churrasqueira e quadra reservados pelo app." },
      { title: "Portaria e visitantes:", text: "o morador autoriza a entrada de visitas direto pelo celular." },
      { title: "Prestação de contas:", text: "boletos, balancetes e documentos sempre acessíveis." },
    ],
  },
  {
    title: "Controle\nde Acesso",
    description: "Entrada de moradores e visitantes por reconhecimento facial, tag ou QR Code, com registro de cada acesso.",
    href: "#controle-de-acesso",
    // image: acessoImg,
  },
  {
    title: "Interfonia\nSem Fio",
    description: "O interfone toca no celular do morador, sem passar fiação nova pelo prédio.",
    href: "#interfonia",
    // image: interfoniaImg,
  },
  {
    title: "Smart\nBox",
    description: "Armário inteligente para encomendas: o entregador deposita e o morador retira com senha, a qualquer hora.",
    href: "#smart-box",
    // image: smartBoxImg,
  },
  {
    title: "CFTV",
    description: "Câmeras com gravação em nuvem e acesso pelo celular para o síndico e a portaria.",
    href: "#cftv",
    // image: cftvImg,
  },
];

export default function CondoSolutions() {
  const gridRef = useRef(null);
  useGridLogo(gridRef, { width: 0.88 });

  return (
    <section id="solucoes-condominiais" className="bg-neutral-900">
      <SectionHeader title="Soluções Condominiais" align="right" color="gray" />

      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2">
        {cards.map((card, i) => (
          // Cards 2 e 4 (coluna da direita) ficam invertidos: imagem à esquerda, texto à direita
          <CondoCard key={card.title} {...card} reverse={i > 0 && i % 2 === 0} />
        ))}
      </div>
    </section>
  );
}