import { Check, X, Minus } from "lucide-react";
import Reveal from "./Reveal";

type Cell = true | false | "partial" | string;

const rows: { label: string; onGrid: Cell; offGrid: Cell; hybrid: Cell }[] = [
  { label: "Grid Connection", onGrid: true, offGrid: false, hybrid: true },
  { label: "Battery Backup", onGrid: false, offGrid: true, hybrid: true },
  { label: "Power During Outage", onGrid: false, offGrid: true, hybrid: true },
  { label: "Net Metering Credits", onGrid: true, offGrid: false, hybrid: "partial" },
  { label: "Lowest Upfront Cost", onGrid: true, offGrid: false, hybrid: false },
  { label: "Govt. Subsidy Eligible", onGrid: true, offGrid: false, hybrid: "partial" },
  { label: "Ideal For", onGrid: "Grid-connected homes & shops", offGrid: "Remote sites, farmhouses", hybrid: "Frequent outage areas" },
];

function CellValue({ value }: { value: Cell }) {
  if (value === true) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-eco-500/15 text-eco-400">
        <Check className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-warm/30">
        <X className="h-3.5 w-3.5" />
      </span>
    );
  }
  if (value === "partial") {
    return (
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sun-500/15 text-sun-400">
        <Minus className="h-3.5 w-3.5" />
      </span>
    );
  }
  return <span className="text-xs text-warm/60 leading-snug">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <Reveal>
      <div className="rounded-3xl glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-5 sm:px-7 py-5 text-left text-xs font-semibold uppercase tracking-wide text-warm/40">
                  Feature
                </th>
                <th className="px-5 py-5 text-center">
                  <span className="font-display font-bold text-warm">On-Grid</span>
                </th>
                <th className="px-5 py-5 text-center">
                  <span className="font-display font-bold text-warm">Off-Grid</span>
                </th>
                <th className="px-5 py-5 text-center">
                  <span className="font-display font-bold sun-gradient-text">Hybrid</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-white/[0.02]" : ""}
                >
                  <td className="px-5 sm:px-7 py-4 text-warm/75 font-medium whitespace-nowrap">
                    {row.label}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center"><CellValue value={row.onGrid} /></div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center"><CellValue value={row.offGrid} /></div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center"><CellValue value={row.hybrid} /></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}
