import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  center = true,
}: {
  eyebrow: string;
  title: string;
  /** Trailing words set in the serif italic accent face */
  accent?: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "text-center" : ""}>
      <div className={`max-w-3xl ${center ? "mx-auto" : ""}`}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="font-display mt-5 text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold leading-[1.04] text-warm">
          {title}
          {accent && (
            <>
              {" "}
              <span className="font-serif-accent text-sun-300">{accent}</span>
            </>
          )}
        </h2>
        {subtitle && (
          <p
            className={`mt-6 text-base sm:text-lg text-warm/55 leading-relaxed max-w-2xl ${
              center ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
}
