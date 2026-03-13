export type TimeRange = "1D" | "1W" | "1M" | "ALL";

export interface ProfitPoint {
  time: string;
  value: number;
}

export interface TradingModeSummary {
  id: "ai" | "strategy";
  title: string;
  subtitle: string;
  investment: number;
  roi: number;
  progress: number;
}

export interface CandleItem {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface TradeSignal {
  time: string;
  type: "BUY" | "SELL";
  price: number;
}

export interface ExecutionLogItem {
  id: string;
  side: "BUY / LONG" | "SELL / SHORT";
  price: number;
  time: string;
}

export interface StrategyMetrics {
  totalProfitLoss: number;
  monthlyReturn: number;
  winRate: number;
  totalTrades: number;
  sharpeRatio: number;
}

export interface StrategyDetail {
  mode: "ai" | "strategy";
  strategyName: string;
  market: string;
  status: "Running" | "Stopped";
  ohlcSummary: {
    open: number;
    high: number;
    low: number;
    close: number;
    changePercent: number;
    volume: string;
  };
  candles: CandleItem[];
  signals: TradeSignal[];
  metrics: StrategyMetrics;
  logs: ExecutionLogItem[];
}
