import { useLayoutEffect } from "react";
import nuvemBg from "../assets/bg/nuvem-bg.svg";

/**
 * Faz os cards com [data-logo-card] dentro da grade mostrarem pedaços
 * de um mesmo logo grande, centralizado na grade.
 *  - width:   largura do logo em proporção da grade (0 a 1)
 *  - aspect:  altura ÷ largura do SVG (só até ele carregar)
 *  - offsetY: deslocamento vertical em proporção da altura da grade
 */
export default function useGridLogo(gridRef, { width = 0.88, aspect = 0.8, offsetY = 0 } = {}) {
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let ratio = aspect;

    const update = () => {
      const logoW = grid.clientWidth * width;
      const logoH = logoW * ratio;
      const logoX = (grid.clientWidth - logoW) / 2;
      const logoY = (grid.clientHeight - logoH) / 2 + grid.clientHeight * offsetY;

      grid.querySelectorAll("[data-logo-card]").forEach((card) => {
        card.style.setProperty("--logo-w", `${logoW}px`);
        card.style.setProperty("--logo-x", `${logoX - card.offsetLeft}px`);
        card.style.setProperty("--logo-y", `${logoY - card.offsetTop}px`);
      });
    };

    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth && img.naturalHeight) {
        ratio = img.naturalHeight / img.naturalWidth;
        update();
      }
    };
    img.src = nuvemBg;

    const observer = new ResizeObserver(update);
    observer.observe(grid);
    update();

    return () => observer.disconnect();
  }, [gridRef, width, aspect, offsetY]);
}