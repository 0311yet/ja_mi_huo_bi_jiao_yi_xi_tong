import { notFound } from "next/navigation";
import { CandlestickChart } from "@/components/CandlestickChart";
import { ExecutionLog } from "@/components/ExecutionLog";
import { PerformancePanel } from "@/components/PerformancePanel";
import { StrategyHeader } from "@/components/StrategyHeader";
import { strategyDetails } from "@/data/strategyData";

interface TradingDetailPageProps {
  params: {
    mode: "ai" | "strategy";
  };
}

export default function TradingDetailPage({ params }: TradingDetailPageProps) {
  const detail = strategyDetails[params.mode];

  if (!detail) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-base p-6 text-white xl:p-8">
      <StrategyHeader strategyName={detail.strategyName} market={detail.market} status={detail.status} />

      <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <CandlestickChart
          candles={detail.candles}
          signals={detail.signals}
          title="BTC/USDT"
          ohlc={detail.ohlcSummary}
        />

        <aside className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <PerformancePanel metrics={detail.metrics} />
          <ExecutionLog logs={detail.logs} />
        </aside>
      </section>
    </main>
  );
}
