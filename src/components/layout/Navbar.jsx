import { useEffect, useState } from "react";
import Button from "../ui/Button";
import logo from "../../assets/logo/htech-logo-blue.png";

// Confira se os href batem com os id das suas seções
// ("Contato" não entra porque o botão "Fale conosco" já leva para lá)
const links = [
  { label: "Empresas", href: "#solucoes-corporativas" },
  { label: "Condomínios", href: "#solucoes-condominiais" },
  { label: "Contato", href: "#contato" },
];

// A partir de quantos px de rolagem a nav vira a pílula flutuante
const SCROLL_LIMIT = 24;

/**
 * Navbar fixa no topo.
 * - No topo da página: transparente, na largura toda, misturada ao Hero.
 * - Depois de rolar: vira uma pílula de vidro flutuante (descolada das bordas, com desfoque e sombra).
 *
 * Responsivo:
 * - Celular: só logo + botão (menores, para não estourar a largura).
 * - Tablet e notebook (md/lg): links em text-lg.
 * - Telas grandes (xl): links em text-2xl.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_LIMIT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-500 ease-out ${
        scrolled ? "px-4 pt-3 md:px-8 md:pt-4" : "px-0 pt-0"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between gap-4 border transition-all duration-500 ease-out md:gap-6 ${
          scrolled
            ? "h-16 max-w-6xl rounded-[32px] border-white/80 bg-white/75 pl-4 pr-2 shadow-[0_12px_30px_rgba(11,31,94,0.14)] backdrop-blur-md md:pl-6"
            : "h-20 max-w-7xl rounded-none border-transparent bg-transparent px-4"
        }`}
      >
        {/* Logo (menor no celular) */}
        <a href="/" className="flex shrink-0 items-center gap-2">
          <img
            src={logo}
            alt="Logo HTech"
            className={`transition-all duration-500 ${scrolled ? "w-24 md:w-30" : "w-28 md:w-40"}`}
          />
        </a>

        {/* Links no azul da marca; no hover escurecem para o azul de empresas */}
        <ul className="hidden items-center gap-6 md:flex xl:gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="whitespace-nowrap text-lg font-semibold text-[#0A84FF] transition-colors hover:text-[#153DCD] xl:text-2xl"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA: menor no celular; na pílula fica arredondado, com seta */}
        <Button
          href="#contato"
          size="md"
          className={`min-w-0 shrink-0 gap-2 whitespace-nowrap transition-all duration-500 max-md:!px-4 max-md:!py-1.5 max-md:!text-sm md:min-w-[140px] ${
            scrolled ? "!rounded-full" : ""
          }`}
        >
          Fale conosco
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 md:h-5 md:w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Button>
      </nav>
    </header>
  );
}