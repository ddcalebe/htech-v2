const variants = {
  primary: "bg-[#0A84FF] text-white hover:bg-[#0070e0]",
  secondary: "bg-neutral-600/80 text-white hover:bg-neutral-600",
  card: "bg-[#3b5bdb] text-white hover:bg-[#4c6ef5]",
};

const sizes = {
  sm: "px-6 py-1.5 text-sm",
  md: "px-8 py-2 text-xl",
  lg: "px-8 py-2.5 text-2xl",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  ...props
}) {
  const classes = `inline-flex items-center justify-center rounded-md font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
