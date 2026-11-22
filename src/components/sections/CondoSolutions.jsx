import SectionHeader from "../ui/SectionHeader";
import CondoCard from "../cards/CondoCard";
import smartBox from "../../assets/services/smartbox.webp";
import intercom from "../../assets/services/intercom.webp";
import accessControl from "../../assets/services/access-control.webp";
import cftv from "../../assets/services/cftv.webp";
import { whatsappSolutionLink } from "../../config/contact";

// TODO: revisar os textos (exemplos)
// Ordem = posição na grade:
//   Smart Box: card alto à esquerda (duas fileiras)
//   App de Gestão e Interfonia: empilhados à direita
//   Controle de Acesso (estreito) + CFTV (largo): fileira de baixo
// O href de cada card abre o WhatsApp com o nome da solução na mensagem.
const cards = [
  {
    title: "Smart\nBox",
    badge: "Destaque",
    description: "O entregador deposita a encomenda e o morador retira com senha, a qualquer hora.",
    highlights: ["24 horas", "Senha única", "Aviso no celular"],
    href: whatsappSolutionLink("Smart Box", "condominio"),
    ctaLabel: "Quero essa solução",
    tall: true,
    className: "lg:col-span-7 lg:row-span-2",
    image: smartBox,
  },
  {
    title: "App de\nGestão",
    description: "Comunicados, reservas de áreas comuns, visitantes e boletos do condomínio em um só app.",
    highlights: ["Comunicados", "Reservas", "Visitantes", "Boletos"],
    href: whatsappSolutionLink("App de Gestão", "condominio"),
    reverse: true,
    className: "lg:col-span-5",
  },
  {
    title: "Interfonia\nSem Fio",
    description: "O interfone toca no celular do morador, sem passar fiação nova.",
    highlights: ["Sem obra", "Toca no celular"],
    href: whatsappSolutionLink("Interfonia Sem Fio", "condominio"),
    className: "lg:col-span-5",
    image: intercom,
  },
  {
    title: "Controle\nde Acesso",
    description: "Entrada por reconhecimento facial, tag ou QR Code, com registro de cada acesso.",
    highlights: ["Facial", "Tag", "QR Code"],
    href: whatsappSolutionLink("Controle de Acesso", "condominio"),
    reverse: true,
    className: "lg:col-span-5",
    image: accessControl,
  },
  {
    title: "CFTV",
    description: "Câmeras com gravação em nuvem e acesso pelo celular para o síndico e a portaria.",
    highlights: ["Gravação em nuvem", "Ao vivo no celular"],
    href: whatsappSolutionLink("CFTV", "condominio"),
    className: "lg:col-span-7",
    image: cftv,
  },
];

export default function CondoSolutions() {
  return (
    <section id="solucoes-condominiais" className="bg-condo pb-16 pt-10 -scroll-mt-10">
      <div className="reveal relative z-[3]">
        <SectionHeader title="Soluções Condominiais" align="right" color="navy" />
      </div>

      {/* Grade de 12 colunas: no celular e tablet os cards ficam empilhados */}
      <div className="relative mx-auto grid max-w-[1600px] gap-8 px-6 py-10 md:px-10 lg:grid-cols-12 2xl:px-16">
        {/* reveal: aparece ao rolar. O card da direita de cada fileira entra um pouco depois */}
        {cards.map((card, i) => (
          <CondoCard
            key={card.title}
            {...card}
            className={`${card.className} reveal ${i % 2 === 1 ? "[--reveal-delay:150ms]" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}