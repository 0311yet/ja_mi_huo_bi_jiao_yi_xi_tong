import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        base: "#06080c",
        panel: "#12161f",
        panelAlt: "#181d27",
        line: "#2a3241",
        accent: "#1f7aff",
        profit: "#00d28f",
        danger: "#ff4d4f",
      },
      boxShadow: {
        soft: "0 12px 32px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
