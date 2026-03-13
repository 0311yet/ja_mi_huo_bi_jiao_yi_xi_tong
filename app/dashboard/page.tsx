"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ProfitChart } from "@/components/ProfitChart";
import { SettingsModal } from "@/components/SettingsModal";
import { TimeRangeSwitcher } from "@/components/TimeRangeSwitcher";
import { TradingModeCard } from "@/components/TradingModeCard";
import { modeCards, totalProfit, totalProfitChangePct } from "@/data/dashboardData";
import { TimeRange } from "@/types/trading";
import { formatCurrency, formatPercent } from "@/utils/format";
import { useLocalStorageSettings } from "@/hooks/useLocalStorageSettings";

export default function DashboardPage() {
  const [range, setRange] = useState<TimeRange>("1W");
  const [showSettings, setShowSettings] = useState(false);
  const { settings, saveSettings } = useLocalStorageSettings();

  return (
    <main className="min-h-screen bg-base p-8 text-white xl:p-10">
      <DashboardHeader onOpenSettings={() => setShowSettings(true)} />

      <section className="rounded-3xl border border-white/15 bg-white/[0.03] p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xl uppercase tracking-wide text-slate-400">Total Profit</p>
            <div className="mt-2 flex items-center gap-3">
              <h2 className="text-6xl font-bold">{formatCurrency(totalProfit)}</h2>
              <span className="rounded-md bg-profit/20 px-3 py-1 text-3xl font-semibold text-profit">
                {formatPercent(totalProfitChangePct)}
              </span>
            </div>
          </div>
          <TimeRangeSwitcher value={range} onChange={setRange} />
        </div>
        <ProfitChart range={range} />
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        {modeCards.map((card) => (
          <TradingModeCard key={card.id} data={card} />
        ))}
      </section>

      <SettingsModal
        open={showSettings}
        initialValue={settings}
        onClose={() => setShowSettings(false)}
        onSave={saveSettings}
      />
    </main>
  );
}
