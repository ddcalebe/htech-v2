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
// Ordem = posição na grade em "escada":
//   1ª fileira: App de Gestão (largura toda)
//   2ª fileira: Smart Box (largo) + Interfonia (estreito)
//   3ª fileira: Controle de Acesso (estreito) + CFTV (largo)
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
    title: "Smart\nBox",
    description: "Armário inteligente para encomendas: o entregador deposita e o morador retira com senha, a qualquer hora.",
    href: "#smart-box",
    // image: smartBoxImg,
  },
  {
    title: "Interfonia\nSem Fio",
    description: "O interfone toca no celular do morador, sem passar fiação nova pelo prédio.",
    href: "#interfonia",
    // image: interfoniaImg,
  },
  {
    title: "Controle\nde Acesso",
    description: "Entrada de moradores e visitantes por reconhecimento facial, tag ou QR Code, com registro de cada acesso.",
    href: "#controle-de-acesso",
    // image: acessoImg,
  },
  {
    title: "CFTV",
    description: "Câmeras com gravação em nuvem e acesso pelo celular para o síndico e a portaria.",
    href: "#cftv",
    // image: cftvImg,
  },
];

// Largura de cada card na grade de 5 colunas (mesma ordem do array `cards`)
const spans = ["md:col-span-5", "md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-3"];

export default function CondoSolutions() {
  const gridRef = useRef(null);
  useGridLogo(gridRef, { width: 0.88 });

  return (
    <section id="solucoes-condominiais" className="bg-condo pb-16 pt-10 -scroll-mt-10">
      <SectionHeader title="Soluções Condominiais" align="right" color="navy" />

      {/* Grade de 5 colunas: as fileiras alternam largo (3) + estreito (2) e estreito (2) + largo (3) */}
      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-5">
        {cards.map((card, i) => (
          // Cards da direita de cada fileira (Interfonia e CFTV) ficam invertidos: imagem à esquerda, texto à direita
          <CondoCard key={card.title} {...card} reverse={i > 0 && i % 2 === 0} className={spans[i]} />
        ))}
      </div>
    </section>
  );
}