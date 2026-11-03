import logo from "../../assets/logo/htech-logo-blue.png";

// TODO: preencher com os dados reais
const contact = {
  whatsapp: "(81) 2011-5904",
  whatsappLink: "https://wa.me/558120115904",
  phone: "(81) 2011-5904",
  instagram: "https://instagram.com/htechsolucoes25",
  email: "contato@htech-solucoes.com",
  address: "[Endereço], [Cidade] - [UF]",
  cnpj: "50.626.675/0001-19",
};

const social = [
  { label: "Instagram", href: "https://instagram.com/htechsolucoes25" },
  { label: "LinkedIn", href: "https://linkedin.com/company/" },
];

const columns = [
  {
    title: "Para empresas",
    links: [
      { label: "CRM", href: "#solucoes-corporativas" },
      { label: "Chatbot", href: "#solucoes-corporativas" },
      { label: "Agente de IA", href: "#solucoes-corporativas" },
      { label: "Integrações", href: "#solucoes-corporativas" },
      { label: "PABX em nuvem", href: "#solucoes-corporativas" },
    ],
  },
  {
    title: "Para condomínios",
    links: [
      { label: "App de Gestão", href: "#solucoes-condominiais" },
      { label: "Controle de Acesso", href: "#solucoes-condominiais" },
      { label: "Interfonia Sem Fio", href: "#solucoes-condominiais" },
      { label: "Smart Box", href: "#solucoes-condominiais" },
      { label: "CFTV", href: "#solucoes-condominiais" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contato" className="relative bg-neutral-950 text-white/70">
      {/* Linha de luz no topo */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0A84FF] to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Marca */}
        <div>
          <img src={logo} alt="Htech" className="w-40" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Comunicação moderna e eficiente para empresas e condomínios: atendimento, telefonia,
            segurança e gestão num só lugar.
          </p>

{/*           <ul className="mt-6 flex gap-4">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-white transition hover:text-blue"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul> */}
        </div>

        {/* Soluções */}
        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm transition hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Contato */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white">Contato</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a href={contact.whatsappLink} target="_blank" rel="noreferrer" className="transition hover:text-white">
                WhatsApp: {contact.whatsapp}
              </a>
            </li>
            <li>Telefone: {contact.phone}</li>
            <li>Instagram: <a href={contact.instagram} target="_blank" rel="noreferrer" className="transition hover:text-white">@htechsolucoes25</a></li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                {contact.email}
              </a>
            </li>
{/*             <li>{contact.address}</li>
 */}          </ul>

{/*           <a
            href={contact.whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center rounded-md bg-[#0A84FF] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0070e0]"
          >
            Fale com um especialista
          </a> */}
        </div>
      </div>

      {/* Linha final */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Htech Soluções. Todos os direitos reservados. CNPJ {contact.cnpj}
          </p>
          <a href="#" className="transition hover:text-white">
            Política de privacidade
          </a>
        </div>
      </div>
    </footer>
  );
}