export default function RayBurst({
  count,
  color = "rgba(251,191,36,0.55)",
}: {
  count: number;
  color?: string;
}) {
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2="50"
            y2="2"
            stroke={color}
            strokeWidth="1.4"
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        );
      })}
    </svg>
  );
}
