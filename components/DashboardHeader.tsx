import { Plus, Settings } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface DashboardHeaderProps {
  onOpenSettings: () => void;
  onCreateStrategy: () => void;
}

export function DashboardHeader({ onOpenSettings, onCreateStrategy }: DashboardHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSettings}
          className="rounded-full border border-white/15 bg-white/5 p-3 text-slate-300 transition hover:border-accent hover:text-white"
        >
          <Settings className="h-5 w-5" />
        </button>
        <span className="text-3xl font-bold tracking-wide">OKX QUANT SYSTEM</span>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={onCreateStrategy} className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:brightness-110">
          <Plus className="h-4 w-4" />
          创建策略
        </button>
        <StatusBadge text="System Online" online />
      </div>
    </header>
  );
}
