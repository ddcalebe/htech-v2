import { useEffect, useRef } from "react";
import haia from "../../assets/haia.webp";

const SIZE = 36; // tamanho do bonequinho em px
const HOTSPOT = { x: SIZE / 2, y: SIZE / 2 }; // clique no centro do bonequinho
const HOVER_SCALE = 1.15; // quanto cresce sobre links e botões (1 = não cresce)

// Rastro
const TRAIL = {
  color: "21, 101, 192", // #1565C0: azul mais escuro que o #2E94F6
  life: 350, // quanto tempo cada ponto leva para sumir (ms)
  width: 14, // espessura máxima da linha (px)
  opacity: 0.45, // opacidade máxima do começo do rastro (0 a 1)
};

export default function CustomCursor() {
  const wrapperRef = useRef(null);
  const imgRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Só em dispositivos com mouse (no celular não existe cursor)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const wrapper = wrapperRef.current;
    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    document.documentElement.classList.add("has-custom-cursor");

    // Canvas do tamanho da tela, nítido em telas retina
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let points = [];
    let frame = null;

    const draw = () => {
      const now = performance.now();
      points = points.filter((p) => now - p.t < TRAIL.life);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.shadowColor = `rgba(${TRAIL.color}, ${TRAIL.opacity})`;
        ctx.shadowBlur = 12;
      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        const life = 1 - (now - b.t) / TRAIL.life; // 1 = acabou de nascer, 0 = sumindo
        ctx.strokeStyle = `rgba(${TRAIL.color}, ${life * TRAIL.opacity})`;
        ctx.lineWidth = Math.max(TRAIL.width * life, 0.5);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Continua animando só enquanto houver rastro na tela
      frame = points.length ? requestAnimationFrame(draw) : null;
    };

    const move = (e) => {
      // A div só segue o mouse
      wrapper.style.opacity = "1";
      wrapper.style.transform = `translate(${e.clientX - HOTSPOT.x}px, ${e.clientY - HOTSPOT.y}px)`;

      // A imagem só cresce (com transição suave), sem mexer na posição
      const clickable = e.target.closest("a, button, [role='button']");
      img.style.transform = `scale(${clickable ? HOVER_SCALE : 1})`;

      // Rastro (desligado para quem pediu "reduzir movimento")
      if (!reduceMotion) {
        points.push({
            x: e.clientX - HOTSPOT.x + SIZE / 2,
            y: e.clientY - HOTSPOT.y + SIZE / 2,
            t: performance.now(),
            });
        if (!frame) frame = requestAnimationFrame(draw);
      }
    };

    const hide = () => {
      wrapper.style.opacity = "0";
      points = [];
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", hide);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mouseleave", hide);
      if (frame) cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      {/* Rastro: atrás do bonequinho */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[9998] h-screen w-screen"
      />

      {/* Bonequinho */}
      <div
        ref={wrapperRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
        style={{ width: SIZE, height: SIZE }}
      >
        <img
          ref={imgRef}
          src={haia}
          alt=""
          width={SIZE}
          height={SIZE}
          className="h-full w-full origin-center transition-transform duration-150 ease-out"
        />
      </div>
    </>
  );
}