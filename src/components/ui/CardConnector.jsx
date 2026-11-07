/**
 * Linhas de circuito ligando os dois cards de cima (Agente de IA e Chatbot)
 * ao card de baixo (Integrações). Fica numa faixa estreita entre as duas linhas da grade.
 *
 * As linhas descem do meio de cada card de cima (24,5% e 75,5% da largura,
 * descontando o espaço entre os cards), se juntam no centro e descem até o card de baixo.
 */
export default function CardConnector({ className = "" }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative ${className}`}>
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        fill="none"
      >
        <style>{`
          .connector-base {
            stroke: #ffffff;
            stroke-width: 2;
            opacity: 0.55;
          }
          /* Traços de luz correndo pela linha, dos cards de cima até o de baixo (como dados fluindo) */
          .connector-pulse {
            stroke: #ffffff;
            stroke-width: 3;
            stroke-linecap: round;
            stroke-dasharray: 12 48;
            animation: connector-flow 1.6s linear infinite;
            filter: drop-shadow(0 0 4px rgba(255,255,255,.8));
          }
          @keyframes connector-flow {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -60; }
          }
          @media (prefers-reduced-motion: reduce) {
            .connector-pulse { animation: none; }
          }
        `}</style>

        {/* Linha da esquerda: Agente de IA → Integrações */}
        <path d="M24.5 0 V50 H50 V100" pathLength="100" vectorEffect="non-scaling-stroke" className="connector-base" />
        <path d="M24.5 0 V50 H50 V100" vectorEffect="non-scaling-stroke" className="connector-pulse" />

        {/* Linha da direita: Chatbot → Integrações */}
        <path d="M75.5 0 V50 H50 V100" pathLength="100" vectorEffect="non-scaling-stroke" className="connector-base" />
        <path
          d="M75.5 0 V50 H50 V100"
          vectorEffect="non-scaling-stroke"
          className="connector-pulse"
          style={{ animationDelay: "-0.8s" }}
        />
      </svg>

      {/* Pontos nas pontas (em HTML para não deformarem) */}
      <span className="absolute left-[24.5%] top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      <span className="absolute left-[75.5%] top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      <span className="absolute bottom-0 left-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
    </div>
  );
}