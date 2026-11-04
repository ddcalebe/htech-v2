import Button from "../ui/Button";
import logo from "../../assets/logo/htech-logo-blue.png";

// Confira se os href batem com os id das suas seções
const links = [
  { label: "Soluções", href: "#solucoes-corporativas" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-4 border-[#0A84FF]/40 bg-white shadow-sm">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo HTech" className="w-30" />
        </a>

        {/* Links no azul da marca; no hover escurecem para o azul de empresas */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[22px] font-semibold text-[#0A84FF] transition-colors hover:text-[#153DCD]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button size="md" className="min-w-[140px]">
          Fale conosco
        </Button>
      </nav>
    </header>
  );
}