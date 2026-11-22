import { useEffect } from "react";

/**
 * Faz os elementos com a classe "reveal" aparecerem quando entram na tela ao rolar.
 * Chame uma vez só, no App.jsx: useScrollReveal();
 *
 * Quando o elemento entra na tela, ganha a classe "is-visible" (a animação está no index.css).
 * Cada elemento anima uma vez só: depois de aparecer, não some de novo ao rolar para cima.
 *
 * Atraso opcional por elemento (para entrar um depois do outro):
 *   className="reveal [--reveal-delay:150ms]"
 */
export default function useScrollReveal(selector = ".reveal") {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    // Navegador muito antigo: mostra tudo direto
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      // Começa a animar quando 12% do elemento aparece, um pouco antes do fim da tela
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector]);
}