import nuvemBg from "../../assets/bg/nuvem-bg.svg";

/** Pedaço do logo grande. A cor vem da classe passada (ex.: bg-white/10). */
export default function LogoLayer({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        maskImage: `url(${nuvemBg})`,
        WebkitMaskImage: `url(${nuvemBg})`,
        maskSize: "var(--logo-w) auto",
        WebkitMaskSize: "var(--logo-w) auto",
        maskPosition: "var(--logo-x) var(--logo-y)",
        WebkitMaskPosition: "var(--logo-x) var(--logo-y)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}