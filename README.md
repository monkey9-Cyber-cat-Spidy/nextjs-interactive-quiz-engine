# Next.js Interactive Quiz Engine

Interactive, real-time quiz application built with Next.js 14 App Router, React 18, TypeScript, and Tailwind CSS. Features dynamic countdown timers, instant architectural feedback explanations, and comprehensive score analytics.

## Features

- **Next.js 14 App Router Architecture**: Clean client/server split with custom Route Handler (`/api/quiz`).
- **Real-Time Countdown Timer**: Per-question countdown with automatic graceful submission.
- **Immediate Architectural Explanations**: Deep-dive explanations into PostgreSQL GiST indexing, RSC mechanics, BullMQ retries, and reverse proxy caching.
- **Score Analytics**: Final accuracy breakdown with retake capability.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Production Build

```bash
npm run build
npm start
```
