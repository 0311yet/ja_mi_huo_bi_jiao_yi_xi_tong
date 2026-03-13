"use client";

import { useMemo, useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProfitChart } from "@/components/ProfitChart";
import { SettingsModal } from "@/components/SettingsModal";
import { TimeRangeSwitcher } from "@/components/TimeRangeSwitcher";
import { TradingModeCard } from "@/components/TradingModeCard";
import { modeCards } from "@/data/dashboardData";
import { TimeRange } from "@/types/trading";
import { formatCurrency, formatPercent } from "@/utils/format";
import { useLocalStorageSettings } from "@/hooks/useLocalStorageSettings";
import { useOkxProfitCurve } from "@/hooks/useOkxProfitCurve";
import { RealtimeTickerPanel } from "@/components/RealtimeTickerPanel";
import { defaultPairs } from "@/data/marketData";
import { CreateStrategyModal } from "@/components/CreateStrategyModal";

export default function DashboardPage() {
  const [range, setRange] = useState<TimeRange>("1W");
  const [showSettings, setShowSettings] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const { settings, saveSettings } = useLocalStorageSettings();
  const { points, loading } = useOkxProfitCurve(range);

  const totalProfit = useMemo(() => points[points.length - 1]?.value ?? 0, [points]);
  const base = points[0]?.value ?? 0;
  const change = base > 0 && totalProfit > 0 ? ((totalProfit - base) / base) * 100 : 0;

  return (
    <main className="min-h-screen bg-base p-8 text-white xl:p-10">
      <DashboardHeader onOpenSettings={() => setShowSettings(true)} onCreateStrategy={() => setShowCreate(true)} />

      <section className="rounded-3xl border border-white/15 bg-white/[0.03] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xl uppercase tracking-wide text-slate-400">Total Profit</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-6xl font-bold">{loading ? "--" : formatCurrency(totalProfit)}</h2>
              <span className="rounded-md bg-profit/20 px-3 py-1 text-3xl font-semibold text-profit">
                {loading ? "--" : formatPercent(change)}
              </span>
            </div>
          </div>
          <TimeRangeSwitcher value={range} onChange={setRange} />
        </div>
        <ProfitChart points={points} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {modeCards.map((card) => (
          <TradingModeCard key={card.id} data={card} />
        ))}
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-sm uppercase tracking-wider text-slate-400">Selected Pair Live Data</h3>
        <RealtimeTickerPanel pairs={defaultPairs} />
      </section>

      <CreateStrategyModal open={showCreate} onClose={() => setShowCreate(false)} />

      <SettingsModal
        open={showSettings}
        initialValue={settings}
        onClose={() => setShowSettings(false)}
        onSave={saveSettings}
      />
    </main>
  );
}
