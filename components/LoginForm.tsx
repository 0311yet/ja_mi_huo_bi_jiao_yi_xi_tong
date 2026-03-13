"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-[460px] rounded-2xl border border-white/15 bg-gradient-to-b from-white/10 to-white/[0.03] p-8 shadow-soft"
    >
      <h1 className="mb-2 text-4xl font-bold text-white">Quantitative Trading</h1>
      <p className="mb-8 text-slate-400">Institutional-grade algorithmic execution</p>
      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-slate-300">Email or Username</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm text-slate-300">Password</label>
            <a className="text-sm text-accent">Forgot password?</a>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-lg border border-white/15 bg-black/60 px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-8 w-full rounded-lg bg-white py-3 text-lg font-semibold text-black transition hover:bg-slate-200"
      >
        Log In →
      </button>
      <div className="my-8 flex items-center gap-3 text-xs text-slate-500">
        <span className="h-px flex-1 bg-white/10" />
        SECURITY VERIFIED
        <span className="h-px flex-1 bg-white/10" />
      </div>
      <p className="text-center text-slate-400">
        New to the platform? <a className="text-accent">Create an account</a>
      </p>
    </form>
  );
}
