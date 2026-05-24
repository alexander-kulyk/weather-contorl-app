# Architecture

Aeris is a single-page weather dashboard built with React 19 and TypeScript. It searches cities through the Visual Crossing API, shows current conditions plus hourly and 7/15-day forecasts, and lets the user pin favorite cities to local storage.

## Tech stack

| Layer | Choice |
| ----- | ------ |
| Framework | React 19.2 + TypeScript |
| Build tool | Vite 8 |
| HTTP client | Axios (single shared instance) |
| Styling | styled-components + theme tokens |
| Charts | Recharts |
| Icons | lucide-react |
| Toasts | sonner |
| Persistence | `localStorage` (favorites only) |

## Layered architecture

The app is organized as a strict four-layer pipeline. Each layer talks only to its immediate neighbor.

```
UI components / pages
        │
        ▼
React contexts + custom hooks   (state, orchestration, side effects)
        │
        ▼
src/services/                   (DTO → domain mapping, business facade)
        │
        ▼
src/api/                        (HTTP only — httpClient, weatherApi, error normalization)
        │
        ▼
External: Visual Crossing API / localStorage
```

### `src/api/`
HTTP transport only. No domain logic.
- `httpClient.ts` — single Axios instance with `baseURL`, timeout, and a request interceptor that injects `key`, `unitGroup`, `contentType`.
- `weatherApi.ts` — endpoint methods that return raw DTOs (`IVisualCrossingTimelineResponse`).
- `types/visualCrossing.types.ts` — raw API DTO shapes.
- `types/apiError.types.ts` — normalized `IApiError` type.
- `utils/` — `apiKeyGuard`, `normalizedCityGuard`, `handleApiError`, `isApiError`, `isRequestCanceled`. These convert axios errors into typed `IApiError` instances.

### `src/services/`
DTO → domain mapping and the business-facing facade.
- `weatherService.fetchByCity(city, signal)` — calls `weatherApi.fetchTimelineDto`, runs the mapper, returns `IWeatherResponse`.
- `mappers/` — `mapTimelineResponse`, `mapCurrentConditions`, `mapDays`, `mapHours`. Pure functions that take DTOs and produce domain objects.
- `constants.ts` — `WEATHER_DEFAULTS` used by mappers as safe fallbacks.

### `src/hooks/`
Stateful orchestration and side effects.
- `useWeatherSearch` — debounced text query, owns search results state.
- `useSelectedCityWeather` — manages the currently selected city (handles both "select existing result" and "fetch by name" flows).
- `useAppWeatherDashboard` — top-level composition hook that flattens contexts into the props `App.tsx` needs.
- `useDebounce` — generic debounce primitive.
- Each fetch hook delegates I/O to a pure `fetch*` util that returns a discriminated outcome (`success | no-results | error | aborted`). The hook owns all `setState`.

### `src/context/`
Four providers, each memoized so consumers don't re-render unnecessarily.
- `ApiErrorContext` — broadcasts API errors to the toast layer.
- `FavoritesContext` — persisted list of favorite cities (backed by `src/storage/favoritesStorage.ts`).
- `WeatherSearchContext` — search query + results.
- `SelectedWeatherContext` — currently selected city + its weather.

Search and selected weather are intentionally split so typing in the search box does not re-render the details card.

### `src/components/`
Presentation. One folder per component, each with its own `styled.ts`, `types/`, optional `hooks/` and `utils/`. No component talks to the API or service layer directly — they only read props and call handlers from the dashboard hook.

Notable shared primitives:
- `Button`, `Modal`, `Confirmation`, `EmptyState`, `LoadingSkeleton`, `ErrorMessage`, `ErrorBoundary` — reusable UI primitives.
- `Modal` and `Confirmation` both portal to `document.body`, trap focus, restore focus on close, lock body scroll, and respond to Escape.

### `src/theme/`
Single theme object (`theme.ts`) exposing spacing, radii, typography, breakpoints, focus rings (light + dark variants), and per-weather-condition gradient palettes. `GlobalStyles.ts` declares CSS resets, the `:focus-visible` ring, screen-reader-only utilities, and `prefers-reduced-motion` overrides.

### `src/utils/`
Pure helpers — `formatters` (temperature, wind, pressure, etc.), `dateTime`, `weatherIcons` (condition → lucide icon and theme key mapping), `toAppError`.

## File and folder structure

```
src/
├── api/
│   ├── httpClient.ts            # Axios instance + interceptors
│   ├── weatherApi.ts            # Endpoint methods (returns raw DTOs)
│   ├── constants/               # Base URL
│   ├── types/                   # DTO types, IApiError
│   └── utils/                   # Error handling, guards
│
├── services/
│   └── weatherService/
│       ├── weatherService.ts    # Public facade
│       ├── mappers/             # DTO → domain
│       └── constants.ts         # WEATHER_DEFAULTS
│
├── hooks/
│   ├── useAppWeatherDashboard.ts
│   ├── useDebounce.ts
│   ├── useSelectedCityWeather/
│   └── useWeatherSearch/
│
├── context/
│   ├── ApiErrorContext/
│   ├── FavoritesContext/
│   ├── SelectedWeatherContext/
│   └── WeatherSearchContext/
│
├── components/                  # See section above
│
├── storage/
│   └── favoritesStorage.ts      # localStorage I/O + favorite factory
│
├── theme/
│   ├── theme.ts
│   ├── GlobalStyles.ts
│   └── styled.d.ts
│
├── types/
│   ├── common.types.ts          # AsyncStatus, ForecastRange, IAppError
│   └── weather.types.ts         # Domain types only
│
├── utils/                       # Pure formatters and helpers
├── App.tsx                      # Layout — consumes useAppWeatherDashboard
├── index.tsx                    # Root render with AppProviders
└── styled.ts                    # Top-level layout (Shell / Workspace / Sidebar / Details)
```

## Features

| Feature | Where it lives |
| ------- | -------------- |
| City search with 400ms debounce | `useWeatherSearch` + `SearchInput`, `SearchResultsList`, `SearchResultRow` |
| Current weather + 6 metric cards | `WeatherDetailsCard` + `WeatherMetricCard` |
| Hourly forecast chart (with screen-reader fallback table) | `HourlyForecastChart` |
| 7-day / 15-day forecast toggle | `ForecastSwitcher` + `ForecastList` + `ForecastDayItem` |
| Sunrise / sunset / day length | `SunriseSunsetCard` |
| Favorites (pin, unpin, clear all, view all modal) | `FavoritesContext`, `FavoriteCitiesSection`, `FavoritesModal`, `FavoriteCityItem`, `FavoriteButton` |
| Per-surface error boundaries | `ErrorBoundary` wrapping each sidebar/details section |
| Global API error toast | `ApiErrorContext` + `ApiErrorAlert` (sonner-backed) |
| Theme-aware weather gradients | `theme.weatherThemes` + `getWeatherThemeKey` |

## Data flow

### Selecting a city from search results
```
SearchResultRow click
  → useAppWeatherDashboard.handleWeatherSelect
  → SelectedWeatherContext.selectWeather(weather)
  → setSelectedWeather(weather)   # no extra fetch — reuses the search result
```

### Re-opening a favorite
```
FavoriteCityItem click
  → useAppWeatherDashboard.handleFavoriteSelect
  → SelectedWeatherContext.selectCityByName(resolvedAddress)
  → effect triggers weatherService.fetchByCity
  → mapTimelineResponse(dto)
  → setSelectedWeather(domain)
```

### Toggling a favorite
```
FavoriteButton click
  → useAppWeatherDashboard.handleWeatherFavoriteToggle
  → FavoritesContext.toggleWeatherFavorite(weather)
  → createFavoriteCity(weather) (snapshot)
  → setFavorites(...)
  → useEffect persists to localStorage
```

## Conventions

- All components are `React.FC<IProps>` with `interface I<Component>Props`.
- Hooks return `{ values, handlers }` with explicit `IUse<Hook>Return` types.
- No `JSON.stringify` for comparison; no `any`; no logic in JSX.
- `useCallback` for every handler, `useMemo` for every derived value and every context payload.
- One component per folder: `Component.tsx`, `styled.ts`, `index.ts`, optional `types/`, `hooks/`, `utils/`.
- Accessibility: native `<button>` for actions, `<a>` for navigation, focus trap in modals, screen-reader tables behind charts, `prefers-reduced-motion` respected, focus ring auto-switches between light and dark variants per weather theme.
