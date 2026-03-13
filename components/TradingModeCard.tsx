import Link from "next/link";
import { BrainCircuit, BarChart3 } from "lucide-react";
import { TradingModeSummary } from "@/types/trading";
import { formatCurrency, formatPercent } from "@/utils/format";

interface TradingModeCardProps {
  data: TradingModeSummary;
}

export function TradingModeCard({ data }: TradingModeCardProps) {
  const Icon = data.id === "ai" ? BrainCircuit : BarChart3;

  return (
    <Link
      href={`/trading/${data.id}`}
      className="rounded-2xl border border-white/15 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-accent"
    >
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="text-4xl font-semibold text-white">{data.title}</h3>
          <p className="mt-1 text-sm text-slate-400">{data.subtitle}</p>
        </div>
        <div className="rounded-xl bg-accent/20 p-3 text-accent">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="grid gap-3 text-lg">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Total Investment</span>
          <span className="font-semibold">{formatCurrency(data.investment)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Current ROI</span>
          <span className="font-bold text-profit">{formatPercent(data.roi)}</span>
        </div>
      </div>
      <div className="mt-6 h-2 rounded-full bg-white/10">
        <div className="h-full rounded-full bg-accent" style={{ width: `${data.progress}%` }} />
      </div>
    </Link>
  );
}
