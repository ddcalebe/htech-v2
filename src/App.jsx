import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Intro from "./components/sections/Intro";
import CorporateSolutions from "./components/sections/CorporateSolutions";
import CondoSolutions from "./components/sections/CondoSolutions";
import Clients from "./components/sections/Clients";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/ui/CustomCursor";
import Faq from "./components/sections/Faq";
import WhatsAppButton from "./components/ui/WhatsAppButton";
import useScrollReveal from "./hooks/useScrollReveal";

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
        <Clients />
        <Faq />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
