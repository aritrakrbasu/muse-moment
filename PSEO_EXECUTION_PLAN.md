# PSEO Execution Plan for Muse Moment

## Overview
Implement Programmatic SEO to create 30+ keyword-targeted pages that can rank organically for party game, drinking game, and social gathering related searches.

## Phase 1: Add React Router (Foundation)

### Tasks
1. Install `react-router-dom` dependency
2. Update `src/index.js` to wrap app with BrowserRouter
3. Refactor `src/App.js` from state-based to route-based navigation
4. Create route components for each game state
5. Implement 404 page for SEO

### Routes to create
- `/` - Home (onboarding)
- `/play/:mode` - Game play page
- `/complete/:mode` - Completion page
- `/*` - 404 page

## Phase 2: Create Mode-Specific Landing Pages

### New files to create
- `src/pages/modes/BFFPage.jsx` - `/bff-party-game`
- `src/pages/modes/DatePage.jsx` - `/date-night-game`
- `src/pages/modes/CouplesPage.jsx` - `/couples-party-game`

### Content structure per page
- Mode-specific title and meta description
- Key benefits/features
- How to play instructions
- Example dares (non-explicit)
- Call-to-action to start game
- Mode-specific structured data (Game schema)

## Phase 3: Programmatic Content Pages Generation

### New directory structure
```
src/pages/programmatic/
├── templates/
│   ├── TopicPageTemplate.jsx     # Generic template
│   ├── CategoryPageTemplate.jsx  # Category template
└── content/
    └── pages-config.js           # Page configuration data
```

### Topic Pages (20-30 pages)
- How-to guides
- Party game ideas
- Drinking game variations
- Date night game ideas
- Games for specific occasions

### Category Pages (5-10 pages)
- `/party-games`
- `/drinking-games`
- `/date-night-games`
- `/games-for-couples`
- `/games-for-friends`

### Content per page
- SEO-optimized title (keyword-rich)
- Meta description with target keywords
- H1 heading with keyword
- 300-500 words of unique content
- Internal links to relevant game modes
- Structured data (Article schema)
- Related pages section

## Phase 4: Enhanced Structured Data

### Tasks
1. Extend `src/components/SEO.jsx` with schema prop support
2. Add Game schema for mode pages
3. Add Article schema for content pages
4. Add BreadcrumbList schema for navigation
5. Add FAQPage schema for how-to content

## Phase 5: Dynamic Sitemap Generation

### Tasks
1. Create `src/utils/sitemap-generator.js`
2. Generate sitemap with all routes
3. Add to npm scripts for deployment
4. Configure to update on each build

## Phase 6: Internal Linking Structure

### Tasks
1. Add "Related Games" section to programmatic pages
2. Create footer links to main categories
3. Add breadcrumb navigation
4. Cross-link between mode pages
5. Link programmatic pages to relevant game modes

## Verification Steps

1. Run `npm start` and verify all routes work
2. Test each mode-specific page
3. Verify programmatic pages generate correctly
4. Check meta tags on each page
5. Validate structured data (Google Rich Results Test)
6. Test internal links
7. Verify sitemap.xml includes all pages
8. Test 404 page handling
