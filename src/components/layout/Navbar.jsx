import Button from "../ui/Button";
import logo from "../../assets/logo/htech-logo-blue.png";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Quem Somos", href: "#quem-somos" },
  { label: "Contato", href: "#contato" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b-4 border-[#0A84FF]/40">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo Htech" className="h-30 w-30" />
        </a>

        {/* Links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-lg font-medium text-neutral-500 transition-colors hover:text-neutral-800"
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
