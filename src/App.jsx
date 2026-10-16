import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import CorporateSolutions from "./components/sections/CorporateSolutions";
import CondoSolutions from "./components/sections/CondoSolutions";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-800 font-sans">
      <Navbar />
      <main>
        <Hero />
        <CorporateSolutions />
        <CondoSolutions />
      </main>
    </div>
  );
}
