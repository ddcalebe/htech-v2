import { useState } from "react";
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
  const [open, setOpen] = useState(true);

  return (
    <section id="solucoes-condominiais" className="bg-neutral-800">
      <SectionHeader
        title="Soluções Condominiais"
        align="right"
        open={open}
        onToggle={() => setOpen(!open)}
      />

      {open && (
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2">
          {cards.map((card) => (
            <CondoCard key={card.title} {...card} />
          ))}
        </div>
      )}
    </section>
  );
}
