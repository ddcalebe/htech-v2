/**
 * Linhas de circuito que saem do círculo central do Hero, com um espaço
 * para ícone no fim de cada linha.
 *
 * Tudo (linhas e círculos dos ícones) é desenhado no MESMO SVG, então as
 * linhas sempre terminam exatamente na borda do círculo, em qualquer tela.
 *
 * Área: 1600x600 px. O centro (800, 300) coincide com o centro do círculo da nuvem.
 * Os caminhos são desenhados só do lado direito e espelhados para a esquerda.
 *
 * Uso:
 *   <CircuitLines
 *     icons={{
 *       left:  [<IconA />, <IconB />, <IconC />, <IconD />, <IconE />],
 *       right: [<IconF />, <IconG />, <IconH />, <IconI />, <IconJ />],
 *     }}
 *   />
 * Cada lista vai de cima para baixo. Pode passar <img>, SVG ou componente de ícone.
 */

import chatbot from "../../assets/icons/chatbot-icon.png";
import crm from "../../assets/icons/crm-icon.png";
import whatsapp from "../../assets/icons/whatsapp-icon.png";
import box from "../../assets/icons/box-icon.png";
import phone from "../../assets/icons/phone-icon.png";

const WIDTH = 1600;
const HEIGHT = 600;

const SLOT_RADIUS = 36; // círculo do ícone com 72px (equivale a h-18 w-18)
const ICON_SIZE = 36; // tamanho do ícone dentro do círculo

// Raio do círculo da nuvem: w-50 = 200px → raio 100.
// Ordem: de cima para baixo → é a mesma ordem dos ícones.
// Cada linha termina exatamente na borda do círculo do ícone (centro - 36).
const paths = [
  // [caminho, centro do ícone, atraso da animação em s]
  ["M877 236 H990 L1136 90 H1264", [1300, 90], 2.1],
  ["M897 274 H1040 L1119 195 H1354", [1390, 195], 1.4],
  ["M902 300 H1404", [1440, 300], 0],
  ["M897 326 H1040 L1119 405 H1354", [1390, 405], 0.7],
  ["M877 364 H990 L1136 510 H1264", [1300, 510], 2.8],
];

// Pequenos nós nas dobras para dar o visual de placa de circuito
const joints = [
  [990, 236],
  [1040, 274],
  [1150, 300],
  [1040, 326],
  [990, 364],
];

function Side({ mirrored = false, icons = [] }) {
  return (
    <g transform={mirrored ? `translate(${WIDTH} 0) scale(-1 1)` : undefined}>
      {/* Linhas base */}
      {paths.map(([d], i) => (
        <path
          key={`base-${i}`}
          d={d}
          pathLength="100"
          className="circuit-base"
          style={{ animationDelay: `${i * 0.08}s` }}
        />
      ))}

      {/* Pulsos de luz */}
      {paths.map(([d, , delay], i) => (
        <path
          key={`pulse-${i}`}
          d={d}
          pathLength="100"
          className="circuit-pulse"
          filter="url(#circuit-glow)"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}

      {/* Nós nas dobras */}
      {joints.map(([x, y], i) => (
        <circle key={`j-${i}`} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.7" />
      ))}

      {/* Círculos dos ícones */}
      {paths.map(([, [x, y], delay], i) => (
        <g key={`slot-${i}`}>
          <circle
            cx={x}
            cy={y}
            r={SLOT_RADIUS}
            strokeWidth="2"
            className="circuit-slot"
            style={{ animationDelay: `${delay}s` }}
          />

          {/* Ícone. O scale(-1 1) desfaz o espelhamento para o ícone não ficar invertido */}
          <foreignObject
            x={x - ICON_SIZE / 2}
            y={y - ICON_SIZE / 2}
            width={ICON_SIZE}
            height={ICON_SIZE}
            transform={mirrored ? `translate(${2 * x} 0) scale(-1 1)` : undefined}
          >
            <div className="flex h-full w-full items-center justify-center text-white [&>*]:h-full [&>*]:w-full">
              {icons[i]}
            </div>
          </foreignObject>
        </g>
      ))}
    </g>
  );
}

export default function CircuitLines({ className = "", icons = {} }) {
  const { left = [
            <img src={chatbot} alt="" />,
            <img src={crm} alt="" />,
            <img src={whatsapp} alt="" />,
            <img src={chatbot} alt="" />,
            <img src={crm} alt="" />,

  ], right = [
            <img src={box} alt="" />,
            <img src={phone} alt="" />,
            <img src={box} alt="" />,
            <img src={phone} alt="" />,
            <img src={box} alt="" />,
  ] } = icons;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      aria-hidden="true"
      className={`pointer-events-none overflow-visible ${className}`}
      fill="none"
      stroke="currentColor"
    >
      <defs>
        <filter id="circuit-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <style>{`
        .circuit-base {
          stroke-width: 1.5;
          opacity: 0.45;
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: circuit-draw 1.6s ease-out forwards;
        }
        .circuit-pulse {
          stroke-width: 2.5;
          stroke-linecap: round;
          stroke-dasharray: 10 100;
          stroke-dashoffset: 10;
          opacity: 0;
          animation: circuit-pulse 4s linear infinite;
        }
        .circuit-slot {
          fill: transparent; /* neutral-800 */
          animation: circuit-slot 4s ease-out infinite;
        }
        @keyframes circuit-draw {
          to { stroke-dashoffset: 0; }
        }
        @keyframes circuit-pulse {
          0%   { stroke-dashoffset: 10;   opacity: 0; }
          10%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { stroke-dashoffset: -100; opacity: 0; }
        }
        /* O círculo do ícone acende quando o pulso de luz chega ao fim da linha */
        @keyframes circuit-slot {
          0%, 75%, 100% { filter: drop-shadow(0 0 0 transparent); }
          92%           { filter: drop-shadow(0 0 12px currentColor); }
        }
        @media (prefers-reduced-motion: reduce) {
          .circuit-base { animation: none; stroke-dashoffset: 0; }
          .circuit-pulse, .circuit-slot { animation: none; }
        }
      `}</style>

      <Side icons={right} />
      <Side mirrored icons={left} />
    </svg>
  );
}