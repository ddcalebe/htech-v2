import { useEffect, useState } from "react";
import Button from "../ui/Button";
import logo from "../../assets/logo/htech-logo-blue.png";
import { whatsappLink } from "../../config/contact";

// Confira se os href batem com os id das suas seções
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
 * - O botão "Fale conosco" abre o WhatsApp em outra aba, com a mensagem padrão.
 *
 * Responsivo:
 * - Celular e tablet pequeno (abaixo de md): logo + botão + menu hambúrguer,
 *   que abre um painel pela direita com todos os links.
 * - Tablet e notebook (md/lg): links em text-lg.
 * - Telas grandes (xl): links em text-2xl.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_LIMIT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu aberto: Esc fecha e a página de trás não rola.
  // Se a tela crescer até o tamanho dos links (md = 768px), o menu fecha sozinho.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const desktop = window.matchMedia("(min-width: 768px)");
    const onResize = () => desktop.matches && setMenuOpen(false);
    const previousOverflow = document.body.style.overflow;

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
          <ul className="hidden items-center gap-5 md:flex lg:gap-6 xl:gap-8">
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

          <div className="flex shrink-0 items-center gap-2">
            {/* CTA: abre o WhatsApp. Menor no celular; na pílula fica arredondado, com seta */}
            <Button
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className={`min-w-0 shrink-0 gap-2 whitespace-nowrap transition-all duration-500 max-md:!px-4 max-md:!py-1.5 max-md:!text-sm md:max-lg:!px-5 md:max-lg:!text-lg lg:min-w-[140px] ${
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

            {/* Hambúrguer: só abaixo de md */}
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A84FF] transition-colors hover:bg-[#0A84FF]/10 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* ===== Menu lateral (celular) ===== */}
      {/* Fundo escuro: clicar fora fecha */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-[60] bg-[#071433]/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Painel que entra pela direita */}
      <aside
        id="mobile-menu"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[82%] max-w-xs flex-col bg-white shadow-[-20px_0_50px_-10px_rgba(11,31,94,0.35)] transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <img src={logo} alt="Logo HTech" className="w-24" />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Fechar menu"
            className="flex h-10 w-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-navy"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col gap-1 px-3 py-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={closeMenu}
                className="flex items-center justify-between rounded-xl px-4 py-3.5 text-lg font-semibold text-navy transition-colors hover:bg-[#0A84FF]/10 hover:text-[#0A84FF]"
              >
                {link.label}
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 text-[#0A84FF]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto border-t border-neutral-200 p-5">
          <Button
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            onClick={closeMenu}
            className="w-full gap-2 !rounded-full !text-lg"
          >
            Fale conosco no WhatsApp
          </Button>
        </div>
      </aside>
    </>
  );
}