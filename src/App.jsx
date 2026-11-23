import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import CorporateSolutions from "./components/sections/CorporateSolutions";
import CondoSolutions from "./components/sections/CondoSolutions";
import Clients from "./components/sections/Clients";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import Faq from "./components/sections/Faq";
import WhatsAppButton from "./components/ui/WhatsappButton";
import useScrollReveal from "./hooks/useScrollReveal";

// Seção "Clientes" (logos + depoimentos) escondida por enquanto.
// Para trazer de volta, troque para true: ela volta entre Condomínios e FAQ,
// e o degradê do FAQ passa a sair do preto dela automaticamente.
const SHOW_CLIENTS = false;

export default function App() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-neutral-900 font-sans">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <CorporateSolutions />
        <CondoSolutions />
        {SHOW_CLIENTS && <Clients />}
        <Faq fromColor={SHOW_CLIENTS ? "#171717" : "var(--color-condo)"} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
