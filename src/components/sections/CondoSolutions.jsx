import SectionHeader from "../ui/SectionHeader";
import CondoCard from "../cards/CondoCard";

const cards = [
  { title: "App de\nGestão\nCondominial", size: "lg", badge: "Para condomínios" },
  { title: "Controle\nde Acesso" },
  { title: "Interfonia\nSem Fio" },
  { title: "Smart\nBox" },
  { title: "CFTV" },
];

export default function CondoSolutions() {
  return (
    <section id="solucoes-condominiais" className="bg-neutral-900">
      <SectionHeader title="Soluções Condominiais" align="right" color="gray" />

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2">
        {cards.map((card) => (
          <CondoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}