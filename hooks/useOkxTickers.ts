"use client";

import { useEffect, useState } from "react";
import { PairTicker } from "@/types/trading";

interface OkxTickerResp {
  code: string;
  data?: Array<{
    instId: string;
    last: string;
    open24h: string;
    vol24h: string;
    ts: string;
  }>;
}

export function useOkxTickers(pairs: string[], intervalMs = 8000) {
  const [tickers, setTickers] = useState<PairTicker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const data = await Promise.all(
          pairs.map(async (instId) => {
            const resp = await fetch(`https://www.okx.com/api/v5/market/ticker?instId=${instId}`, { cache: "no-store" });
            const json = (await resp.json()) as OkxTickerResp;
            const item = json.data?.[0];
            if (!item) return null;
            const last = Number(item.last);
            const open24h = Number(item.open24h);
            return {
              instId: item.instId,
              last,
              open24h,
              change24hPct: open24h ? ((last - open24h) / open24h) * 100 : 0,
              vol24h: Number(item.vol24h),
              ts: Number(item.ts),
            } satisfies PairTicker;
          })
        );
        if (mounted) {
          setTickers(data.filter((item): item is PairTicker => item !== null));
        }
      } catch {
        if (mounted) {
          setTickers([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    load();
    const timer = setInterval(load, intervalMs);

    return () => {
      mounted = false;
      clearInterval(timer);
    };
  }, [intervalMs, pairs]);

  return { tickers, loading };
}
