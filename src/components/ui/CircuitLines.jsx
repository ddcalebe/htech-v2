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
 *
 * Os ícones padrão usam <MaskIcon>: o PNG vira uma "máscara" e é pintado com uma cor só
 * (iconColor), sem precisar editar as imagens.
 */

import chatbot from "../../assets/icons/chatbot-icon.png";
import crm from "../../assets/icons/crm-icon.png";
import whatsapp from "../../assets/icons/whatsapp-icon.png";
import box from "../../assets/icons/box-icon.png";
import phone from "../../assets/icons/phone-icon.png";
import cftv from "../../assets/icons/cftv-icon.png";
import intercom from "../../assets/icons/intercom-icon.png";
import acessControl from "../../assets/icons/acess-control-icon.png";
import integration from "../../assets/icons/integration-icon.png";
import ai from "../../assets/icons/ai-icon.png";

// ===== Cores para testar (deixe só um bloco ativo) =====

// Opção 3: ícone com degradê do azul escuro ao azul claro, círculo com o fundo de antes
const ICON_COLOR = "linear-gradient(135deg, #0B2BC4, #5AB0FF)";
const SLOT_FILL = "#f2f2f2";

// Opção 4: círculo preenchido de azul bem clarinho, ícone azul escuro
// const ICON_COLOR = "#0B2BC4";
// const SLOT_FILL = "#DCEBFF";

/**
 * Pinta um ícone PNG (com fundo transparente) com uma cor só.
 * A imagem vira máscara e o fundo do span (a cor) aparece no formato do ícone.
 */
function MaskIcon({ src, color = ICON_COLOR }) {
  return (
    <span
      aria-hidden="true"
      className="block"
      style={{
        // "background" (e não backgroundColor) para aceitar cor sólida ou degradê
        background: color,
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

/**
 * Ícones flutuando em volta da nuvem: versão do Hero para tablet e celular (abaixo de lg).
 * Sem linhas: cada ícone sobe e desce devagar, num ritmo diferente.
 * Fica "absolute inset-0" dentro da área da nuvem; as posições são em % dessa área.
 * x/y: posição no celular (abaixo de 560px) · tx/ty: posição a partir de 560px (celular grande e tablet)
 */
const FLOAT_SPOTS = [
  // esquerda (de cima para baixo)
  { src: chatbot, x: 27, y: 6, tx: 24, ty: 10 },
  { src: crm, x: 9, y: 26, tx: 8, ty: 30 },
  { src: whatsapp, x: 10, y: 50, tx: 20, ty: 52 },
  { src: integration, x: 9, y: 74, tx: 6, ty: 74 },
  { src: ai, x: 29, y: 94, tx: 23, ty: 92 },
  // direita (de cima para baixo)
  { src: box, x: 73, y: 6, tx: 77, ty: 9 },
  { src: phone, x: 91, y: 26, tx: 93, ty: 30 },
  { src: cftv, x: 90, y: 50, tx: 80, ty: 51 },
  { src: intercom, x: 91, y: 74, tx: 94, ty: 73 },
  { src: acessControl, x: 71, y: 94, tx: 76, ty: 92 },
];

export function FloatingIcons({ className = "", iconColor = ICON_COLOR, slotFill = SLOT_FILL }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <style>{`
        .hero-float { animation: hero-float 5s ease-in-out infinite; }
        @keyframes hero-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-float { animation: none; }
        }
      `}</style>

      {FLOAT_SPOTS.map((spot, i) => (
        <span
          key={i}
          className="absolute left-[var(--x)] top-[var(--y)] -translate-x-1/2 -translate-y-1/2 min-[560px]:left-[var(--tx)] min-[560px]:top-[var(--ty)]"
          style={{ "--x": `${spot.x}%`, "--y": `${spot.y}%`, "--tx": `${spot.tx}%`, "--ty": `${spot.ty}%` }}
        >
          <span
            className="hero-float flex h-15 w-15 min-[560px]:h-[72px] min-[560px]:w-[72px] items-center justify-center rounded-full border-2 border-blue shadow-[0_0_0_4px_rgba(90,176,255,0.12)] md:h-[72px] md:w-[72px]"
            style={{
              background: slotFill,
              // cada ícone num ritmo e num momento diferente
              animationDuration: `${4.2 + (i % 4) * 0.7}s`,
              animationDelay: `${-i * 0.55}s`,
            }}
          >
            <span className="h-[52%] w-[52%] [&>*]:h-full [&>*]:w-full">
              <MaskIcon src={spot.src} color={iconColor} />
            </span>
          </span>
        </span>
      ))}
    </div>
  );
}

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

function Side({ mirrored = false, icons = [], color }) {
  return (
    <g
      transform={mirrored ? `translate(${WIDTH} 0) scale(-1 1)` : undefined}
      style={color ? { color } : undefined}
    >
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

/**
 * Cores de cada lado (linhas, pulsos, nós e círculos dos ícones):
 *  - leftColor:  se não passar, usa a cor do texto do componente (ex.: text-blue)
 *  - rightColor: lado direito
 *  - iconColor:  cor (ou degradê) de todos os ícones (padrão ICON_COLOR)
 *  - slotFill:   fundo dos círculos dos ícones (padrão SLOT_FILL)
 */
export default function CircuitLines({
  className = "",
  icons = {},
  leftColor = "#0A84FF",
  rightColor = "#0A84FF",
  iconColor = ICON_COLOR,
  slotFill = SLOT_FILL,
}) {
  const {
    left = [
      <MaskIcon src={chatbot} color={iconColor} />,
      <MaskIcon src={crm} color={iconColor} />,
      <MaskIcon src={whatsapp} color={iconColor} />,
      <MaskIcon src={integration} color={iconColor} />,
      <MaskIcon src={ai} color={iconColor} />,
    ],
    right = [
      <MaskIcon src={box} color={iconColor} />,
      <MaskIcon src={phone} color={iconColor} />,
      <MaskIcon src={cftv} color={iconColor} />,
      <MaskIcon src={intercom} color={iconColor} />,
      <MaskIcon src={acessControl} color={iconColor} />,
    ],
  } = icons;

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
          fill: ${slotFill};
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

      <Side icons={right} color={rightColor} />
      <Side mirrored icons={left} color={leftColor} />
    </svg>
  );
}