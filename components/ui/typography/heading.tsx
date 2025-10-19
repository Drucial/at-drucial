type HeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5";
};

export function Heading({ eyebrow, title, subtitle, as = "h2" }: HeadingProps) {
  return (
    <hgroup>
      {eyebrow && <p>{eyebrow}</p>}
      {as === "h1" && <h1>{title}</h1>}
      {as === "h2" && <h2>{title}</h2>}
      {as === "h3" && <h3>{title}</h3>}
      {as === "h4" && <h4>{title}</h4>}
      {as === "h5" && <h5>{title}</h5>}
      {subtitle && <p>{subtitle}</p>}
    </hgroup>
  );
}
