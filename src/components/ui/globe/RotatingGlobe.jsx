import { useEffect, useRef } from "react";
import landDots from "./landDots";

/**
 * Meio globo girando devagar (só a metade de cima), desenhado em canvas.
 * Malha de paralelos/meridianos + continentes em pontos, fundo transparente.
 *
 * Props:
 *  - color:     cor das linhas e pontos (padrão #dbdbdb)
 *  - duration:  segundos para dar uma volta completa (padrão 120)
 *  - className: classes do container (defina a largura aqui; a altura é metade dela)
 */

const TILT = (18 * Math.PI) / 180; // inclina o polo norte para o observador
const GRID_STEP = 15; // graus entre as linhas da malha
const RAD = Math.PI / 180;

const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);

// Pré-calcula seno/cosseno da latitude de cada ponto (não muda com a rotação)
const DOTS = [];
for (let i = 0; i < landDots.length; i += 2) {
  const lat = landDots[i + 1] * RAD;
  DOTS.push([landDots[i] * RAD, Math.cos(lat), Math.sin(lat)]);
}

export default function RotatingGlobe({ color = "#dbdbdb", duration = 120, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, R = 0, cx = 0, cy = 0;
    let rotation = 0;
    let last = performance.now();
    let frame = null;
    let visible = true;

    // Projeta lon/lat (já em radianos e com cos/sen da latitude) para a tela.
    // Retorna [x, y, profundidade]. Profundidade < 0 = lado de trás do globo.
    function project(lon, cosLat, sinLat) {
      const l = lon + rotation;
      const x = cosLat * Math.sin(l);
      const z = cosLat * Math.cos(l);
      const y2 = sinLat * COS_T - z * SIN_T;
      const z2 = z * COS_T + sinLat * SIN_T;
      return [cx + R * x, cy - R * y2, z2];
    }

    function drawLine(points) {
      // Desenha só os trechos da frente, quebrando a linha quando ela passa para trás
      let drawing = false;
      for (const [lon, lat] of points) {
        const [x, y, z] = project(lon * RAD, Math.cos(lat * RAD), Math.sin(lat * RAD));
        if (z >= 0) {
          drawing ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
          drawing = true;
        } else drawing = false;
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.fillStyle = color;

      // Malha (paralelos e meridianos)
      ctx.globalAlpha = 0.35;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let lat = -75; lat <= 75; lat += GRID_STEP) {
        const pts = [];
        for (let lon = -180; lon <= 180; lon += 3) pts.push([lon, lat]);
        drawLine(pts);
      }
      for (let lon = -180; lon < 180; lon += GRID_STEP) {
        const pts = [];
        for (let lat = -90; lat <= 90; lat += 3) pts.push([lon, lat]);
        drawLine(pts);
      }
      ctx.stroke();

      // Continentes em pontos: mais fortes no centro, mais fracos perto da borda (efeito 3D)
      const dotR = Math.max(R / 360, 0.9);
      for (const [lon, cosLat, sinLat] of DOTS) {
        const [x, y, z] = project(lon, cosLat, sinLat);
        if (z <= 0 || y > h + dotR) continue;
        ctx.globalAlpha = 0.25 + 0.75 * z;
        ctx.beginPath();
        ctx.arc(x, y, dotR, 0, Math.PI * 2);
        ctx.fill();
      }

      // Contorno do globo
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, R, Math.PI, 0);
      ctx.stroke();
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      R = Math.min(w / 2, h) - 2;
      cx = w / 2;
      cy = h; // centro na base → só a metade de cima aparece
      draw();
    }

    function tick(now) {
      const dt = Math.min(now - last, 100);
      last = now;
      rotation += ((Math.PI * 2) / (duration * 1000)) * dt;
      draw();
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (reduceMotion || frame !== null || !visible) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }

    function stop() {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Pausa a animação quando o globo sai da tela (economiza bateria/CPU)
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      visible ? start() : stop();
    });
    visibilityObserver.observe(canvas);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [color, duration]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none block aspect-[2/1] ${className}`}
    />
  );
}
