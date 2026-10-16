import Button from "../ui/Button";
import CircuitLines from "../ui/CircuitLines";
import nuvem from "../../assets/logo/htech-nuvem.png";
import cidade from "../../assets/bg/cidade.svg";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-secondary-gray px-4 py-24">
      {/* Fundo: mapa da cidade. A cor vem do bg-primary-gray e a intensidade do opacity-40 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-primary-gray opacity-40"
        style={{
          maskImage: `url(${cidade})`,
          WebkitMaskImage: `url(${cidade})`,
          maskSize: "cover",
          WebkitMaskSize: "cover",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />

      <h1 className="relative z-10 mb-14 text-center text-4xl font-semibold text-primary-gray md:text-6xl">
        Comunicação moderna <br /> e eficiente
      </h1>

      {/* Círculo da nuvem + linhas de circuito */}
      <div className="relative mb-16 flex items-center justify-center">
        <CircuitLines className="absolute left-1/2 top-1/2 h-[600px] w-[1600px] max-w-none -translate-x-1/2 -translate-y-1/2 text-blue" />

        <div
          className="relative z-10 flex aspect-square w-50 items-center justify-center rounded-full bg-secondary-gray"
          style={{
            boxShadow:
              "-14px 0 40px -8px color-mix(in srgb, var(--color-blue) 45%, transparent), 14px 0 40px -8px rgb(75 85 99 / 0.45)",
          }}
        >
          {/* Borda: metade esquerda azul, metade direita cinza */}
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