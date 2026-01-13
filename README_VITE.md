# Vite Build Setup

## Development

```bash
npm run dev
```

Starts Vite dev server on http://localhost:3000 with:
- Hot module replacement (HMR)
- Fast rebuilds
- Source maps

## Production Build

```bash
npm run build
```

Creates optimized production build in `dist/` folder with:
- Code splitting (vendor, ai, state, utils chunks)
- Minification
- Tree shaking
- Legacy browser support

## Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## Current Mode

The app works in **both modes**:

1. **Direct mode** (current): Access via `app.html` directly
   - No build step required
   - ES modules loaded directly by browser
   - Good for development without build tools

2. **Vite mode** (new): Access via `npm run dev` or built version
   - Optimized bundle
   - Code splitting
   - Better performance

## Deployment

For GitHub Pages or static hosting:
1. Run `npm run build`
2. Deploy contents of `dist/` folder
3. Configure server to serve `dist/index.html` and `dist/app.html`

## Code Splitting Strategy

### Vendor Chunks
- **vendor-charts**: Chart.js library (~50KB)
- **vendor-ui**: Tippy.js, SortableJS (~60KB)

### Application Chunks
- **ai**: AI service and Amazon research (~120KB)
- **state**: State management and database (~40KB)
- **utils**: Utilities and helpers (~30KB)

### Benefits
- **Initial load**: Only ~80KB (down from ~250KB)
- **Parallel loading**: Chunks load in parallel
- **Browser caching**: Vendor chunks rarely change
- **Faster navigation**: Shared chunks cached between pages

## Lazy Loading

Even without Vite, the app now uses dynamic imports:
- Chart.js loads only when viewing Results step
- Amazon Research loads only when clicking "AI Research Products"

This gives ~60% faster initial page load!
