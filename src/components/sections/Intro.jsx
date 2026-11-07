const Intro = () => {
  return (
    <section className="relative flex h-[50vh] items-start justify-center overflow-hidden pt-26 bg-secondary-gray">
      <h2 className="relative z-[2] px-6 text-center text-4xl font-semibold text-[#0B1F5E] md:text-6xl">
        Conheça nossas{" "}
        <span className="bg-[linear-gradient(135deg,#153DCD,#5AB0FF)] bg-clip-text pb-2 text-transparent">
          soluções
        </span>
      </h2>

      {/* Horizonte em arco: o azul de empresas sobe em curva até a barra "Soluções Corporativas" */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1000 110"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 w-full md:h-40"
      >
        <defs>
          {/* Brilho difuso do contorno */}
          <filter id="horizon-glow" x="-10%" y="-200%" width="120%" height="500%">
            <feGaussianBlur stdDeviation="4" />
          </filter>
          {/* Contorno azul mais forte no centro, sumindo nas pontas */}
          <linearGradient id="horizon-rim" x1="0" x2="1">
            <stop offset="0" stopColor="var(--color-blue)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--color-blue)" />
            <stop offset="1" stopColor="var(--color-blue)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Área azul (mesmo tom do fundo da seção de Empresas) */}
        <path d="M0 110 L0 90 Q500 -30 1000 90 L1000 110 Z" fill="var(--color-corp)" />

        {/* Contorno: uma camada borrada (brilho) + uma fina por cima */}
        <path
          d="M0 90 Q500 -30 1000 90"
          fill="none"
          stroke="url(#horizon-rim)"
          strokeWidth="6"
          filter="url(#horizon-glow)"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M0 90 Q500 -30 1000 90"
          fill="none"
          stroke="url(#horizon-rim)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </section>
  );
};

export default Intro;