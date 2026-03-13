import { StrategyMetrics } from "@/types/trading";
import { formatCurrency } from "@/utils/format";

interface PerformancePanelProps {
  metrics: StrategyMetrics;
}

export function PerformancePanel({ metrics }: PerformancePanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-semibold tracking-wide text-slate-300">PERFORMANCE</h3>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm text-slate-400">Total Profit/Loss</p>
        <p className="mt-2 text-5xl font-bold text-profit">+{formatCurrency(metrics.totalProfitLoss)}</p>
        <p className="mt-2 text-profit">+{metrics.monthlyReturn}% this month</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <p className="text-sm text-slate-400">Win Rate</p>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-5xl font-semibold">{metrics.winRate}%</p>
          <div className="h-3 w-32 overflow-hidden rounded-full bg-black">
            <div className="h-full bg-profit" style={{ width: `${metrics.winRate}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
          <p className="text-xs text-slate-400">TOTAL TRADES</p>
          <p className="mt-1 text-4xl font-semibold">{metrics.totalTrades}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-center">
          <p className="text-xs text-slate-400">SHARPE RATIO</p>
          <p className="mt-1 text-4xl font-semibold">{metrics.sharpeRatio}</p>
        </div>
      </div>
    </div>
  );
}
