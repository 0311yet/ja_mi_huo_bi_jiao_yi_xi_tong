import { ExecutionLogItem } from "@/types/trading";

interface ExecutionLogProps {
  logs: ExecutionLogItem[];
}

export function ExecutionLog({ logs }: ExecutionLogProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-3xl font-semibold tracking-wide text-slate-300">LIVE EXECUTION LOG</h3>
      <div className="space-y-2">
        {logs.map((log) => {
          const isBuy = log.side.includes("BUY");
          return (
            <div
              key={log.id}
              className={`rounded-lg border-l-2 p-3 ${
                isBuy
                  ? "border-profit bg-profit/10"
                  : "border-danger bg-danger/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className={`font-semibold ${isBuy ? "text-profit" : "text-danger"}`}>{log.side}</p>
                <span className="text-xs text-slate-400">{log.time}</span>
              </div>
              <p className="mt-1 text-slate-300">Price: {log.price.toLocaleString()}</p>
            </div>
          );
        })}
      </div>
      <button className="mt-8 w-full rounded-lg bg-white py-3 text-center text-xl font-semibold text-black hover:bg-slate-200">
        View Detailed Report
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">Last updated: 2023-11-20 14:25:31</p>
    </div>
  );
}
