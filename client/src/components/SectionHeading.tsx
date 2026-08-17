/**
 * Officina Editoriale — heading asimmetrici, tono tecnico e spazio generoso.
 * Usa DM Serif Display per il tema e Manrope per microcopy e riferimenti.
 */
type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  copy?: string;
  inverted?: boolean;
};

export function SectionHeading({ eyebrow, title, copy, inverted = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${inverted ? "section-heading--inverted" : ""}`}>
      <p className="eyebrow"><span>{eyebrow}</span></p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy.split("\n").map((paragraph, index) => <span className="section-copy__paragraph" key={`${index}-${paragraph.slice(0, 12)}`}>{paragraph}</span>)}</p>}
    </div>
  );
}
