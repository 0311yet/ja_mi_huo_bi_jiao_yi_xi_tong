import { notFound } from "next/navigation";
import { CandlestickChart } from "@/components/CandlestickChart";
import { ExecutionLog } from "@/components/ExecutionLog";
import { PerformancePanel } from "@/components/PerformancePanel";
import { StrategyHeader } from "@/components/StrategyHeader";
import { strategyDetails } from "@/data/strategyData";
import { RealtimeTickerPanel } from "@/components/RealtimeTickerPanel";

interface TradingDetailPageProps {
  params: {
    mode: "ai" | "strategy";
  };
  searchParams: {
    pair?: string;
    accountMode?: "paper" | "live";
  };
}

export default function TradingDetailPage({ params, searchParams }: TradingDetailPageProps) {
  const detail = strategyDetails[params.mode];

  if (!detail) {
    notFound();
  }

  const pair = searchParams.pair || "BTC-USDT";
  const accountMode = searchParams.accountMode === "live" ? "live" : "paper";

  return (
    <main className="min-h-screen bg-base p-6 text-white xl:p-8">
      <StrategyHeader strategyName={detail.strategyName} market={`${pair} · 15m Timeframe`} status={detail.status} accountMode={accountMode} />

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <CandlestickChart
          pair={pair}
          fallbackCandles={detail.candles}
          fallbackSignals={detail.signals}
          title={pair}
        />

        <aside className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="mb-4">
            <h3 className="mb-2 text-sm uppercase tracking-wider text-slate-400">Realtime Pair Data</h3>
            <RealtimeTickerPanel pairs={["BTC-USDT", "ETH-USDT", pair]} compact />
          </div>
          <PerformancePanel metrics={detail.metrics} />
          <ExecutionLog logs={detail.logs} />
        </aside>
      </section>
    </main>
  );
}
