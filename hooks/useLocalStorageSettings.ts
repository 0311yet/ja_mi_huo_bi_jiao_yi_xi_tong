"use client";

import { useEffect, useState } from "react";
import { defaultSettings } from "@/data/settingsDefaults";
import { SystemSettings } from "@/types/settings";

const STORAGE_KEY = "okx-quant-settings";

export function useLocalStorageSettings() {
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSettings({ ...defaultSettings, ...JSON.parse(stored) });
    }
  }, []);

  const saveSettings = (next: SystemSettings) => {
    setSettings(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return { settings, saveSettings };
}
