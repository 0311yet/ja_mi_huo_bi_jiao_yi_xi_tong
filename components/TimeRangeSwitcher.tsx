import { TimeRange } from "@/types/trading";

interface TimeRangeSwitcherProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const ranges: TimeRange[] = ["1D", "1W", "1M", "ALL"];

export function TimeRangeSwitcher({ value, onChange }: TimeRangeSwitcherProps) {
  return (
    <div className="flex rounded-xl bg-white/5 p-1">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          onClick={() => onChange(range)}
          className={`min-w-12 rounded-lg px-3 py-1.5 text-sm transition ${
            value === range ? "bg-accent text-white" : "text-slate-300 hover:bg-white/10"
          }`}
        >
          {range}
        </button>
      ))}
    </div>
  );
}
