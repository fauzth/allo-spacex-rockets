# SpaceX Rockets (Allo Bank Frontend Assignment)

A two-screen web app that lists SpaceX rockets and shows rocket details, built with React (JavaScript). The Vue/Vuetify starter was replaced with React.

## Features

- Rocket list with image, name, and description
- Filter by rocket name (case-insensitive)
- Add a new rocket via a modal form (client-side only, since the API is read-only)
- Rocket detail: image, name, description, cost per launch, country, first flight
- Graceful handling of missing data (`image_url`, `launch_cost`, `maiden_flight`, `description`, country)
- Loading, error (with Retry), and success states on both screens
- Responsive layout

## Tech Stack

- React + Vite
- React Router (routing)
- Zustand (state management)
- Tailwind CSS (styling)

## Getting Started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run lint`.

## Project Structure

```
src/
  api/          API calls (Launch Library 2)
  store/        Zustand store (rockets, status, filter query)
  pages/        RocketListPage, RocketDetailPage
  components/   RocketCard, RocketFilter, AddRocketForm, Modal,
                RocketImage, LoadingState, ErrorState
  utils/        Formatting helpers with "N/A" fallbacks
```

## Design Decisions

- **API:** uses the `lldev.thespacedevs.com` host and version `2.2.0` with `mode=detailed&limit=20`, as specified in the assignment.
- **State:** the rocket list, request status, and filter query live in a Zustand store. The list is not refetched when navigating back from the detail page.
- **Detail page:** reads from the store first, then falls back to fetching by id. This lets rockets added locally open correctly without hitting the API.
- **Lifecycle:** data fetching runs in `useEffect` with an `AbortController` for cleanup.
- **Missing data:** each field has an explicit fallback (`N/A`, "No description available.", and a placeholder when the image is missing or fails to load).

## Known Limitations

- Rockets added through the form exist only in memory and disappear on page refresh.
