interface SectionHeadingProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
  titleId?: string;
}

export function SectionHeading({ label, title, description, className = "", titleId }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${className}`}>
      <p className="eyebrow"><span className="eyebrow-mark" aria-hidden="true" />{label}</p>
      <h2 id={titleId}>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
