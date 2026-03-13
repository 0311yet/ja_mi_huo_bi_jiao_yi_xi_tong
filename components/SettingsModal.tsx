"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { SystemSettings, AIProvider } from "@/types/settings";

interface SettingsModalProps {
  open: boolean;
  initialValue: SystemSettings;
  onClose: () => void;
  onSave: (settings: SystemSettings) => void;
}

const providers: AIProvider[] = ["OpenAI", "Anthropic", "DeepSeek", "Gemini"];

export function SettingsModal({ open, initialValue, onClose, onSave }: SettingsModalProps) {
  const [form, setForm] = useState<SystemSettings>(initialValue);

  if (!open) return null;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl rounded-2xl border border-white/20 bg-panel shadow-soft"
      >
        <div className="flex items-start justify-between border-b border-white/10 p-6">
          <div>
            <h2 className="text-3xl font-bold">System Settings</h2>
            <p className="mt-1 text-slate-400">Configure your OKX API and AI Engine credentials.</p>
          </div>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8 p-6">
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">OKX API Configuration</h3>
            <Field label="API Key" value={form.apiKey} onChange={(value) => setForm({ ...form, apiKey: value })} />
            <Field
              label="Secret Key"
              value={form.secretKey}
              onChange={(value) => setForm({ ...form, secretKey: value })}
            />
            <Field
              label="Passphrase"
              value={form.passphrase}
              onChange={(value) => setForm({ ...form, passphrase: value })}
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">AI Engine Settings</h3>
            <label className="block text-sm text-slate-300">Preferred AI Provider</label>
            <select
              value={form.aiProvider}
              onChange={(e) => setForm({ ...form, aiProvider: e.target.value as AIProvider })}
              className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-white focus:border-accent focus:outline-none"
            >
              {providers.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <Field
              label="AI Engine API Key"
              value={form.aiApiKey}
              onChange={(value) => setForm({ ...form, aiApiKey: value })}
            />
          </section>
        </div>

        <div className="flex justify-end gap-3 border-t border-white/10 p-6">
          <button type="button" onClick={onClose} className="rounded-lg px-5 py-2.5 text-white hover:bg-white/10">
            Cancel
          </button>
          <button type="submit" className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-white hover:brightness-110">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function Field({ label, value, onChange }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm text-slate-300">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-black px-4 py-3 text-white placeholder:text-slate-500 focus:border-accent focus:outline-none"
      />
    </div>
  );
}
