# PlaceVerse – Discover India Beyond the Ordinary

PlaceVerse is a responsive travel-discovery web application focused on destinations across India. It helps visitors browse places, explore destination details, filter the catalogue, compare locations, save favourites and prepare sample multi-day itineraries.

> **Project status:** PlaceVerse is currently a frontend prototype. User preferences, saved places, trip selections and prototype moderation data are stored in the browser using `localStorage`. There is no shared backend database or production authentication in this version.

## Features

- **Destination discovery:** Browse a curated catalogue of Indian destinations and view detailed place information.
- **Search and filters:** Find places using the available search and category/region filters.
- **Interactive map:** Explore destination markers and the map-based discovery interface.
- **Saved places:** Keep a personal shortlist in the current browser.
- **Trip planner:** Select destinations and build a sample itinerary with estimated costs.
- **Place comparison:** Compare selected destinations side by side.
- **Community contribution demo:** Submit sample destination suggestions through the frontend interface.
- **Admin moderation demo:** Review prototype submissions using the demonstration admin interface.
- **Project presentation:** View the built-in project pitch and roadmap sections.

## Technology Stack

| Area | Technology |
|---|---|
| UI | React 19 |
| Language | TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| Browser persistence | `localStorage` |
| Hosting | Vercel or Netlify (static frontend) |

## Project Structure

```text
placeverse/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/       # UI components and feature modals
│   ├── data/             # Destination and presentation data
│   ├── types/            # TypeScript types
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.tsx          # React entry point
├── .gitignore
├── index.html            # Page metadata and application entry
├── package.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

## Requirements

- Node.js **20.19+** or **22.12+**
- npm (comes with Node.js)

Check your installed versions:

```bash
node --version
npm --version
```

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/PlaceVerse.git
   cd PlaceVerse
   ```

2. Install project dependencies (npm will create `package-lock.json`):

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the local URL printed by Vite in your terminal (normally `http://localhost:3000`).

## Available Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run lint` | Run TypeScript type checking |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

Before publishing changes, run:

```bash
npm run lint
npm run build
```

## Environment Variables

No environment variables are currently required to run this frontend prototype. Do not add API keys, passwords, tokens or private credentials to source files or commit them to GitHub. If a future feature requires a secret, keep it on a trusted backend and document only the variable name (never its value) in an example environment file.

## Screenshots

Screenshots are intentionally not represented by placeholder images. To add real screenshots after running the app:

1. Create a `docs/screenshots/` folder in the repository.
2. Capture the landing page, destination discovery/map, trip planner and comparison views.
3. Save the images in that folder and embed them here using relative Markdown paths, for example:

   ```markdown
   ![PlaceVerse home page](docs/screenshots/home.png)
   ```

## Deployment

### Vercel

1. Push the project to a GitHub repository.
2. Sign in to [Vercel](https://vercel.com/) and import that repository.
3. Use these project settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
4. Deploy. The included `vercel.json` rewrites requests to `index.html` for the single-page application.

### Netlify

1. Push the project to GitHub and import it in [Netlify](https://www.netlify.com/).
2. Set the build command to `npm run build` and publish directory to `dist`.
3. The `public/_redirects` file included in this project supports SPA fallback routing.

## Prototype Limitations and Security Notes

- Browser `localStorage` is device- and browser-specific; data is not synchronized between users or devices.
- The admin role switch is a demonstration feature, not secure authentication or authorization. Do not use it to protect real user data.
- Community submissions are prototype data and are not sent to a shared moderation service.
- Trip costs and destination details are informational examples. Confirm current prices, access conditions, local rules and travel advisories with authoritative sources before travelling.
- A production version would require a backend, database, server-side validation, real user authentication and role-based access control.

## Future Improvements

- Backend API and shared database for accounts, saved places and community submissions.
- Secure authentication and server-enforced administrator permissions.
- Verified destination information and source references.
- Live weather, transport and travel advisory integrations.
- Automated tests and an offline-friendly progressive web app.

## Contributing

Suggestions and improvements are welcome. Please open an issue describing the proposed change, or submit a pull request with a clear summary and testing notes.

## Author

**Shreesha U.**  
Project: **PlaceVerse – Discover India Beyond the Ordinary**

## License

This project is distributed under the [Apache License 2.0](LICENSE).
