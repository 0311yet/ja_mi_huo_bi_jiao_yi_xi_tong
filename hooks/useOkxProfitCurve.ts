"use client";

import { useEffect, useState } from "react";
import { TimeRange, ProfitPoint } from "@/types/trading";

const rangeConfig: Record<TimeRange, { bar: string; limit: number }> = {
  "1D": { bar: "1H", limit: 24 },
  "1W": { bar: "4H", limit: 42 },
  "1M": { bar: "1D", limit: 30 },
  ALL: { bar: "1W", limit: 52 },
};

export function useOkxProfitCurve(range: TimeRange) {
  const [points, setPoints] = useState<ProfitPoint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const { bar, limit } = rangeConfig[range];
        const resp = await fetch(
          `https://www.okx.com/api/v5/market/candles?instId=BTC-USDT&bar=${bar}&limit=${limit}`,
          { cache: "no-store" }
        );
        const json = (await resp.json()) as { data?: string[][] };
        const rows = [...(json.data ?? [])].reverse();
        if (rows.length === 0) {
          if (mounted) setPoints([]);
          return;
        }
        const firstClose = Number(rows[0][4]);
        let equity = 100000;
        const mapped = rows.map((row, index) => {
          const close = Number(row[4]);
          const growth = firstClose ? close / firstClose : 1;
          equity = 100000 * growth;
          return {
            time: String(index + 1),
            value: Number(equity.toFixed(2)),
          };
        });
        if (mounted) {
          setPoints(mapped);
        }
      } catch {
        if (mounted) {
          setPoints([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
  }, [range]);

  return { points, loading };
}
