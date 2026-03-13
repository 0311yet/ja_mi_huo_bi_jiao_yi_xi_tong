"use client";

import { useOkxTickers } from "@/hooks/useOkxTickers";
import { formatPercent } from "@/utils/format";

interface RealtimeTickerPanelProps {
  pairs: string[];
  compact?: boolean;
}

export function RealtimeTickerPanel({ pairs, compact = false }: RealtimeTickerPanelProps) {
  const { tickers, loading } = useOkxTickers(pairs);

  if (loading) {
    return <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-400">Loading market data...</div>;
  }

  if (tickers.length === 0) {
    return <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-sm text-slate-500">No live data</div>;
  }

  return (
    <div className={`grid gap-3 ${compact ? "grid-cols-1" : "sm:grid-cols-2"}`}>
      {tickers.map((ticker) => (
        <div key={ticker.instId} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-white">{ticker.instId}</span>
            <span className={ticker.change24hPct >= 0 ? "text-profit" : "text-danger"}>
              {formatPercent(ticker.change24hPct)}
            </span>
          </div>
          <p className="mt-1 text-xl font-semibold">{ticker.last.toLocaleString()}</p>
          <p className="text-xs text-slate-400">24h Vol: {Math.round(ticker.vol24h).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
