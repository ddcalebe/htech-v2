import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import CorporateSolutions from "./components/sections/CorporateSolutions";
import CondoSolutions from "./components/sections/CondoSolutions";
import Intro from "./components/sections/Intro";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-900 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <CorporateSolutions />
        <CondoSolutions />
      </main>
    </div>
  );
}
