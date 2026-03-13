import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface StrategyHeaderProps {
  strategyName: string;
  market: string;
  status: string;
}

export function StrategyHeader({ strategyName, market, status }: StrategyHeaderProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-300 hover:text-white">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="h-7 w-px bg-white/15" />
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold">{strategyName}</h1>
            <span className="rounded-md bg-profit/15 px-3 py-1 text-sm font-semibold text-profit">{status}</span>
          </div>
          <p className="mt-1 text-slate-400">{market}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10">Settings</button>
        <button className="rounded-lg border border-danger/60 bg-danger/15 px-5 py-2.5 text-danger hover:bg-danger/20">Stop Strategy</button>
      </div>
    </header>
  );
}
