# AI Greeting Generator (Hackathon)

Simple React + Vite app that generates short greetings using Anthropic Claude (server proxy). Includes a Tailwind UI and a small Express proxy to keep the API key server-side.

## Features
- Input: name, occasion, tone
- Generates short greetings using Claude (Anthropic) or a local mock when no key is present
- Local history (localStorage), copy-to-clipboard
- Dev server runs client + proxy concurrently

## Quick start
1. Install

   npm install

2. Copy environment file and add your Claude API key (do NOT commit keys)

   cp .env.example .env
   # set CLAUDE_API_KEY in .env

3. Run locally

   npm run dev

Open the client at `http://localhost:5173` (Vite default). The proxy runs on `http://localhost:3000` for API calls.

## Production
Build the client and start the server which will serve the built assets:

  npm run build
  npm start

## Notes
- The server looks for `process.env.CLAUDE_API_KEY`. If missing, the server returns a harmless mock greeting for demos.
- Confirm Anthropic / Claude API parameters before using in production; the proxy is intentionally small and easy to replace.
- Node 18+ recommended (global fetch). If you need other runtimes, swap to axios/node-fetch.

## Extending
- Add authentication, usage limits, or billing checks for production
- Switch to serverless functions for Vercel / Netlify

## License
MIT
