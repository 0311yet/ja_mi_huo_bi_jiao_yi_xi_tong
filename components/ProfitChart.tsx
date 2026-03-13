"use client";

import { useMemo } from "react";
import { ProfitPoint } from "@/types/trading";

interface ProfitChartProps {
  points: ProfitPoint[];
}

export function ProfitChart({ points }: ProfitChartProps) {
  const path = useMemo(() => {
    if (points.length === 0) return "";
    const values = points.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return points
      .map((point, i) => {
        const x = (i / (points.length - 1 || 1)) * 100;
        const y = 88 - ((point.value - min) / (max - min || 1)) * 56;
        return `${x},${y}`;
      })
      .join(" ");
  }, [points]);

  return (
    <div className="relative mt-8 h-64 w-full overflow-hidden rounded-xl border border-white/10 bg-gradient-to-b from-[#0f1624] to-[#0c111a] p-4">
      {points.length === 0 ? (
        <div className="flex h-full items-center justify-center text-slate-500">No market data</div>
      ) : (
        <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="profitArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1f7aff" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#1f7aff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline points={path} fill="none" stroke="#1f7aff" strokeWidth="0.7" />
          <polygon points={`0,100 ${path} 100,100`} fill="url(#profitArea)" />
        </svg>
      )}
    </div>
  );
}
