import Button from "../ui/Button";
import CircuitLines from "../ui/CircuitLines";
import nuvem from "../../assets/logo/htech-nuvem.png";
import RotatingGlobe from "../ui/globe/RotatingGlobe";

export default function Hero() {
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-secondary-gray px-4 py-24">
      {/* Fundo: meio globo girando. Ajuste opacidade (opacity-30), tamanho (w-[1200px]) e velocidade (duration, em segundos por volta) */}
      <RotatingGlobe
        color="primary-gray"
        duration={120}
        className="absolute bottom-0 left-1/2 w-[1200px] max-w-none -translate-x-1/2 opacity-30"
      />

      <h1 className="relative z-10 mb-14 text-center text-4xl font-semibold text-primary-gray md:text-6xl">
        Comunicação moderna <br /> e eficiente
      </h1>

      {/* Círculo da nuvem + linhas de circuito */}
      <div className="relative mb-16 flex items-center justify-center">
        <CircuitLines className="absolute left-1/2 top-1/2 h-[600px] w-[1600px] max-w-none -translate-x-1/2 -translate-y-1/2 text-blue" />

        <div className="relative z-10 bg-secondary-gray flex aspect-square w-50 items-center justify-center rounded-full border-4 border-blue shadow-[0_0_40px] shadow-blue/40">
          <img src={nuvem} alt="Logo Htech Nuvem" className="h-30" />
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