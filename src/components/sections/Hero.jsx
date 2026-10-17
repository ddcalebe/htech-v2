import Button from "../ui/Button";
import CircuitLines from "../ui/CircuitLines";
import nuvem from "../../assets/logo/htech-nuvem.png";
import cidade from "../../assets/bg/cidade.svg";

// Quanto o mapa desce além do Hero, nas laterais
const MAP_EXTRA = 320;
// Cor do mapa na parte que fica fora do Hero (sobre a seção escura)
const MAP_EXTRA_COLOR = "var(--color-primary-gray)";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-x-clip bg-secondary-gray px-4 py-24">
      {/* Fundo: mapa da cidade, com intensidade em opacity-40.
          No centro o mapa termina na base do Hero; nas laterais ele continua para baixo e vai sumindo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] opacity-40"
        style={{
          height: `calc(100% + ${MAP_EXTRA}px)`,
          // cor do mapa: primary-gray dentro do Hero, mais claro na parte que desce sobre a seção escura
          background: `linear-gradient(to bottom, var(--color-primary-gray) calc(100% - ${MAP_EXTRA}px), ${MAP_EXTRA_COLOR} calc(100% - ${MAP_EXTRA}px))`,
          maskImage: [
            `url(${cidade})`,
            // "buraco" oval embaixo, no centro: é ele que faz o mapa terminar na base do Hero
            `radial-gradient(ellipse 40% ${MAP_EXTRA + 140}px at 50% 100%, transparent 68%, #000 100%)`,
            // as laterais vão sumindo até o fim do mapa
            `linear-gradient(to bottom, #000 calc(100% - ${MAP_EXTRA / 2}px), transparent 100%)`,
          ].join(", "),
          WebkitMaskImage: [
            `url(${cidade})`,
            `radial-gradient(ellipse 40% ${MAP_EXTRA + 140}px at 50% 100%, transparent 68%, #000 100%)`,
            `linear-gradient(to bottom, #000 calc(100% - ${MAP_EXTRA / 2}px), transparent 100%)`,
          ].join(", "),
          maskSize: "cover, 100% 100%, 100% 100%",
          WebkitMaskSize: "cover, 100% 100%, 100% 100%",
          maskPosition: "top center",
          WebkitMaskPosition: "top center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <h1 className="relative z-10 mb-14 text-center text-4xl font-semibold text-primary-gray md:text-6xl">
        Comunicação moderna <br /> e eficiente
      </h1>

      {/* Círculo da nuvem + linhas de circuito */}
      <div className="relative z-10 mb-16 flex items-center justify-center">
        <CircuitLines className="absolute left-1/2 top-1/2 h-[600px] w-[1600px] max-w-none -translate-x-1/2 -translate-y-1/2 text-blue" />

        <div
          className="relative z-10 flex aspect-square w-50 items-center justify-center rounded-full bg-secondary-gray"
          style={{
            boxShadow:
              "-14px 0 40px -8px color-mix(in srgb, var(--color-blue) 45%, transparent), 14px 0 40px -8px rgb(75 85 99 / 0.45)",
          }}
        >
          {/* Borda: metade azul (esquerda), metade cinza (direita), com degradê nas junções */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full p-1"
            style={{
              background:
                "conic-gradient(from -20deg, var(--color-blue), #4b5563 40deg 180deg, var(--color-blue) 220deg 360deg)",
              WebkitMask:
                "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
              WebkitMaskComposite: "xor",
              mask: "linear-gradient(#000 0 0) content-box exclude, linear-gradient(#000 0 0)",
            }}
          />
          <img src={nuvem} alt="Logo Htech Nuvem" className="relative h-30" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:gap-14">
        <Button href="#solucoes-corporativas" size="lg" className="min-w-[230px]">
          Empresas
        </Button>
        <Button
          href="#solucoes-condominiais"
          variant="secondary"
          size="lg"
          className="min-w-[230px]"
        >
          Condomínios
        </Button>
      </div>
    </section>
  );
}