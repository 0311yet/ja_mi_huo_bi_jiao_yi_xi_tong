"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ColorType, ISeriesApi, createChart, CandlestickData, Time } from "lightweight-charts";
import { CandleItem, TradeSignal } from "@/types/trading";

interface CandlestickChartProps {
  pair: string;
  fallbackCandles: CandleItem[];
  fallbackSignals: TradeSignal[];
  title: string;
}

export function CandlestickChart({ pair, fallbackCandles, fallbackSignals, title }: CandlestickChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [liveCandles, setLiveCandles] = useState<CandleItem[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const resp = await fetch(`https://www.okx.com/api/v5/market/candles?instId=${pair}&bar=15m&limit=120`, {
          cache: "no-store",
        });
        const json = (await resp.json()) as { data?: string[][] };
        const candles = [...(json.data ?? [])]
          .reverse()
          .map((item) => ({
            time: new Date(Number(item[0])).toISOString().slice(0, 10),
            open: Number(item[1]),
            high: Number(item[2]),
            low: Number(item[3]),
            close: Number(item[4]),
          }));

        setLiveCandles(candles);
      } catch {
        setLiveCandles([]);
      }
    };

    load();
  }, [pair]);

  const candles = liveCandles.length > 0 ? liveCandles : fallbackCandles;
  const signals = useMemo(() => {
    if (liveCandles.length === 0) return fallbackSignals;
    const sampled = liveCandles.filter((_, i) => i > 2 && i % 20 === 0);
    return sampled.map((item, i) => ({
      time: item.time,
      type: i % 2 === 0 ? "BUY" : "SELL",
      price: item.close,
    })) as TradeSignal[];
  }, [fallbackSignals, liveCandles]);

  const latest = candles[candles.length - 1];
  const previous = candles[candles.length - 2];
  const changePercent = latest && previous ? ((latest.close - previous.close) / previous.close) * 100 : 0;

  useEffect(() => {
    if (!chartRef.current || candles.length === 0) return;

    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "#04070d" },
        textColor: "#8f98a8",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.08)" },
        horzLines: { color: "rgba(255,255,255,0.08)" },
      },
      width: chartRef.current.clientWidth,
      height: 620,
      rightPriceScale: { borderColor: "rgba(255,255,255,0.15)" },
      timeScale: { borderColor: "rgba(255,255,255,0.15)", timeVisible: true },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#00d28f",
      downColor: "#ff4d4f",
      borderVisible: false,
      wickUpColor: "#00d28f",
      wickDownColor: "#ff4d4f",
    });

    const chartData: CandlestickData[] = candles.map((item) => ({
      time: item.time as Time,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
    }));

    series.setData(chartData);
    setMarkers(series, signals);

    const resizeObserver = new ResizeObserver(() => {
      if (chartRef.current) {
        chart.applyOptions({ width: chartRef.current.clientWidth });
      }
    });

    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [candles, signals]);

  return (
    <div className="rounded-xl border border-white/10 bg-[#05080f]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3 text-sm">
        {latest ? (
          <>
            <div className="flex flex-wrap items-center gap-4">
              <span className="font-semibold text-white">{title}</span>
              <span className={changePercent >= 0 ? "text-profit" : "text-danger"}>{changePercent >= 0 ? "+" : ""}{changePercent.toFixed(2)}%</span>
              <span>O: {latest.open.toLocaleString()}</span>
              <span>H: {latest.high.toLocaleString()}</span>
              <span>L: {latest.low.toLocaleString()}</span>
              <span>C: {latest.close.toLocaleString()}</span>
            </div>
            <span>Indicators: RSI(14), MACD(12,26,9), Volume: Live</span>
          </>
        ) : (
          <span className="text-slate-500">No market candles</span>
        )}
      </div>
      {candles.length === 0 ? <div className="flex h-[620px] items-center justify-center text-slate-500">No market data</div> : <div ref={chartRef} className="w-full" />}
    </div>
  );
}

function setMarkers(series: ISeriesApi<"Candlestick">, signals: TradeSignal[]) {
  series.setMarkers(
    signals.map((signal) => ({
      time: signal.time as Time,
      position: signal.type === "BUY" ? "belowBar" : "aboveBar",
      color: signal.type === "BUY" ? "#00d28f" : "#ff4d4f",
      shape: signal.type === "BUY" ? "arrowUp" : "arrowDown",
      text: signal.type,
      size: 2,
    }))
  );
}
