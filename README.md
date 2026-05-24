# Getting Started

This guide walks you from a fresh `git clone` to a running development server.

## Prerequisites

| Tool    | Minimum version    | Notes                                                               |
| ------- | ------------------ | ------------------------------------------------------------------- |
| Node.js | **20.x or 22.x**   | Vite 8 requires Node 20.19+ or 22.12+. Check with `node --version`. |
| npm     | bundled with Node  | `npm --version` should print 10.x or newer.                         |
| Git     | any recent version |                                                                     |

Optional but recommended:

- **VS Code** with the **ESLint** and **styled-components** extensions.
- A modern desktop browser (Chrome, Edge, Firefox, or Safari) for testing.

## 1. Clone the repository

```bash
git clone <repo-url> weather-control-app
cd weather-control-app
```

> On Windows the path contains a space (`work space/...`). If you use PowerShell, quote any paths that include spaces: `cd "C:\work space\learningPath\weather-control-app"`.

## 2. Install dependencies

```bash
npm install
```

This installs everything listed in `package.json` (React 19, Vite, styled-components, recharts, axios, sonner, lucide-react, etc.).

## 3. Get a Visual Crossing API key

The app pulls weather from the Visual Crossing Timeline API. The free tier is enough for development.

1. Open [https://www.visualcrossing.com/weather-api](https://www.visualcrossing.com/weather-api).
2. Sign up for a free account.
3. Open your account dashboard and copy your API key.

## 4. Configure environment variables

Copy the example file and paste your key into it.

```bash
# macOS / Linux
cp .env.example .env.local

# Windows PowerShell
Copy-Item .env.example .env.local
```

Open `.env.local` and replace the placeholder:

```env
VITE_VISUAL_CROSSING_API_KEY=your_actual_api_key_here
```

> `.env.local` is gitignored by default — your key will never be committed.

If the key is missing or empty at runtime, the app surfaces a `MISSING_API_KEY` error (`src/api/utils/apiKeyGuard.ts`) instead of silently failing.

## 5. Start the dev server

```bash
npm run dev
```

Vite prints a local URL — usually [http://localhost:5173](http://localhost:5173). Hot Module Replacement is enabled; saving a file refreshes the affected component without losing app state.

## 6. Verify the install

A quick smoke test:

1. The app shell loads with the header and an empty sidebar message.
2. Type a city (4+ characters) into the search box. After ~400 ms a result row appears.
3. Click the row — the details card on the right fills with current conditions, an hourly chart, and a 7-day forecast.
4. Click the heart icon — the city is added to the **Favorites** section in the sidebar.
5. Reload the page — the favorite is still there (persisted to `localStorage`).

If step 2 returns an API-key error toast, double-check `.env.local` and restart the dev server (Vite reads env files at startup).

## Useful scripts

| Command           | What it does                                                          |
| ----------------- | --------------------------------------------------------------------- |
| `npm run dev`     | Start the Vite dev server with HMR.                                   |
| `npm run build`   | Type-check (`tsc -b`) then produce a production bundle in `dist/`.    |
| `npm run preview` | Serve the production bundle locally to sanity-check the build output. |
| `npm run lint`    | Run ESLint over the whole project.                                    |

## Project layout (at a glance)

```
src/
├── api/         HTTP transport + error normalization
├── services/    DTO → domain mapping (weatherService)
├── hooks/       Stateful orchestration
├── context/     Memoized React providers
├── components/  UI (one folder per component)
├── storage/     localStorage I/O
├── theme/       Tokens, GlobalStyles, weather gradients
├── types/       Domain types
└── utils/       Pure formatters and helpers
```

For a deeper tour of the architecture, see [ARCHITECTURE.md](ARCHITECTURE.md).
