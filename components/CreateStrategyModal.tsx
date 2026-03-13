"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { AccountMode, StrategyMode } from "@/types/trading";
import { pairOptions } from "@/data/marketData";

interface CreateStrategyModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateStrategyModal({ open, onClose }: CreateStrategyModalProps) {
  const router = useRouter();
  const [mode, setMode] = useState<StrategyMode>("ai");
  const [accountMode, setAccountMode] = useState<AccountMode>("paper");
  const [pair, setPair] = useState(pairOptions[0]);

  if (!open) return null;

  const submit = () => {
    router.push(`/trading/${mode}?pair=${pair}&accountMode=${accountMode}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-white/20 bg-panel shadow-soft">
        <div className="flex items-start justify-between border-b border-white/10 p-5">
          <div>
            <h3 className="text-2xl font-semibold">创建策略</h3>
            <p className="mt-1 text-sm text-slate-400">选择策略类型与运行环境</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          <div>
            <label className="mb-1 block text-sm text-slate-300">策略类型</label>
            <select value={mode} onChange={(e) => setMode(e.target.value as StrategyMode)} className="w-full rounded-lg border border-white/15 bg-black px-4 py-2.5">
              <option value="ai">AI 自动交易</option>
              <option value="strategy">策略交易</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">账户类型</label>
            <select value={accountMode} onChange={(e) => setAccountMode(e.target.value as AccountMode)} className="w-full rounded-lg border border-white/15 bg-black px-4 py-2.5">
              <option value="paper">模拟盘</option>
              <option value="live">实盘</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm text-slate-300">交易对</label>
            <select value={pair} onChange={(e) => setPair(e.target.value)} className="w-full rounded-lg border border-white/15 bg-black px-4 py-2.5">
              {pairOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 p-5">
          <button onClick={onClose} className="rounded-lg px-4 py-2 hover:bg-white/10">取消</button>
          <button onClick={submit} className="rounded-lg bg-accent px-4 py-2 font-semibold">创建</button>
        </div>
      </div>
    </div>
  );
}
