import { Settings } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

interface DashboardHeaderProps {
  onOpenSettings: () => void;
}

export function DashboardHeader({ onOpenSettings }: DashboardHeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenSettings}
          className="rounded-full border border-white/15 bg-white/5 p-3 text-slate-300 transition hover:border-accent hover:text-white"
        >
          <Settings className="h-5 w-5" />
        </button>
        <span className="text-3xl font-bold tracking-wide">OKX QUANT SYSTEM</span>
      </div>
      <StatusBadge text="System Online" online />
    </header>
  );
}
