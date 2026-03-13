"use client";

import { useEffect, useRef } from "react";
import { ColorType, ISeriesApi, createChart, CandlestickData, Time } from "lightweight-charts";
import { CandleItem, TradeSignal } from "@/types/trading";

interface CandlestickChartProps {
  candles: CandleItem[];
  signals: TradeSignal[];
  title: string;
  ohlc: {
    open: number;
    high: number;
    low: number;
    close: number;
    changePercent: number;
    volume: string;
  };
}

export function CandlestickChart({ candles, signals, title, ohlc }: CandlestickChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

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
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-white">{title}</span>
          <span className="text-profit">{ohlc.changePercent > 0 ? "+" : ""}{ohlc.changePercent}%</span>
          <span>O: {ohlc.open.toLocaleString()}</span>
          <span>H: {ohlc.high.toLocaleString()}</span>
          <span>L: {ohlc.low.toLocaleString()}</span>
          <span>C: {ohlc.close.toLocaleString()}</span>
        </div>
        <span>Indicators: RSI(14), MACD(12,26,9), Volume: {ohlc.volume}</span>
      </div>
      <div ref={chartRef} className="w-full" />
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
