import { useLayoutEffect, useRef } from "react";
import SectionHeader from "../ui/SectionHeader";
import CondoCard from "../cards/CondoCard";
import nuvemBg from "../../assets/bg/nuvem-bg.svg";

const cards = [
  { title: "App de\nGestão\nCondominial", size: "lg", badge: "Para condomínios" },
  { title: "Controle\nde Acesso" },
  { title: "Interfonia\nSem Fio" },
  { title: "Smart\nBox" },
  { title: "CFTV" },
];

// Tamanho do logo grande, em proporção da largura da grade (0 a 1).
// A posição é calculada para ele ficar centralizado na grade, na horizontal e na vertical.
const LOGO = {
  width: 0.88,
  aspect: 0.8,
  offsetY: 0.00, // empurra o logo para baixo: 6% da altura da grade
};

export default function CondoSolutions() {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let aspect = LOGO.aspect;

    const update = () => {
      const logoW = grid.clientWidth * LOGO.width;
      const logoH = logoW * aspect;
      const logoX = (grid.clientWidth - logoW) / 2; // centro horizontal
      const logoY = (grid.clientHeight - logoH) / 2 + grid.clientHeight * LOGO.offsetY;

      grid.querySelectorAll("[data-logo-card]").forEach((card) => {
        card.style.setProperty("--logo-w", `${logoW}px`);
        card.style.setProperty("--logo-x", `${logoX - card.offsetLeft}px`);
        card.style.setProperty("--logo-y", `${logoY - card.offsetTop}px`);
      });
    };

    // Lê a proporção real do SVG para centralizar certinho
    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        aspect = img.naturalHeight / img.naturalWidth;
        update();
      }
    };
    img.src = nuvemBg;

    const observer = new ResizeObserver(update);
    observer.observe(grid);
    update();

    return () => observer.disconnect();
  }, []);

  return (
    <section id="solucoes-condominiais" className="bg-neutral-900">
      <SectionHeader title="Soluções Condominiais" align="right" color="gray" />

      <div ref={gridRef} className="relative mx-auto grid max-w-7xl gap-10 px-6 py-10 md:grid-cols-2">
        {cards.map((card) => (
          <CondoCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}