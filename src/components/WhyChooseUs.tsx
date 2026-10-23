import { whyChooseUs } from "@/lib/data";
import Reveal from "./Reveal";

export default function WhyChooseUs() {
  return (
    <div className="grid border-t hairline sm:grid-cols-2">
      {whyChooseUs.map((item, i) => (
        <Reveal key={item.title} delay={i * 0.08}>
          <div
            className={`group h-full border-b hairline py-8 sm:px-8 ${
              i % 2 === 1 ? "sm:border-l" : "sm:pl-0"
            }`}
          >
            <span className="font-serif-accent text-xl text-sun-400/80">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="font-display mt-3 text-xl font-semibold text-warm transition-colors group-hover:text-sun-300">
              {item.title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-warm/55">
              {item.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
