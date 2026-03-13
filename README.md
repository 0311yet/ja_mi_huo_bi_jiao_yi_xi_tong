# OKX Quant System Frontend Prototype

A dark-theme, web-based interactive prototype for an OKX quantitative trading terminal built with Next.js + React + TypeScript + Tailwind CSS.

## Stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- TradingView Lightweight Charts (candlestick + BUY/SELL markers)

## Quick Start
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes
- `/login`: Login page (mock authentication)
- `/dashboard`: Main control center
- `/trading/ai`: AI auto-trading detail page
- `/trading/strategy`: Strategy trading detail page

## Features
- Dark, trading-terminal style UI
- Profit chart with `1D / 1W / 1M / ALL` time range switching
- AI and Strategy mode cards with ROI stats
- Trading detail page with:
  - Candlestick chart
  - BUY/SELL markers aligned to K-line data
  - OHLC + indicators header
  - Performance panel + execution log
- Settings modal with localStorage persistence

## Project Structure
```text
app/
  login/
  dashboard/
  trading/[mode]/
components/
data/
hooks/
types/
utils/
public/
styles/
```
