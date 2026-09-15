# Fresh Pressed — Next Level

This is the revised Fresh Pressed storefront: Home, Shop, verified menu pricing, coffee variants, custom builders, cart and email offer UI.

## Open the project

The published link supplied with this project is the quickest way to view it on a phone or computer.

To run the editable source, use Node.js 24 and npm:

1. Open this folder in a terminal.
2. Run `npm install` once.
3. Run `npm run dev`.
4. Open the local address printed by Vite.

Run `npm run build` to generate the static website in `dist/`. Serve that directory with an HTTP server; opening HTML directly through a file URL does not support the module-based shop.

Run `npm run check:menu` to verify audited prices and cart/builder arithmetic. The development-only `/qa.html` page compares 390, 393, 414, 430 and 1440 pixel layouts. It is excluded from production.

## Main files

- `site/index.html`, `site/shop.html`: Home and the complete menu.
- `site/styles.css`, `site/refinements.css`: design, responsive layouts and motion.
- `site/menu.json`: current prices, variants, sizes and add-on rules. Update prices here once.
- `site/catalog.js`, `site/pricing.js`: display data and integer-cent calculations.
- `site/app.js`: navigation, dialogs, search, builders, cart and media behavior.
- `site/offer-integration.js`: subscription endpoint hook; currently an honest preview.
- `site/public/media/`: all supplied web-ready media plus selected official assets.
- `docs/PROJECT_HANDOFF.md`: changes and remaining commerce integration.
- `docs/PRICE_AUDIT.md`, `docs/MEDIA_MANIFEST.md`, `docs/EMAIL_INTEGRATION.md`, `docs/QA_REPORT.md`: audit and handoff evidence.

The cart stores a preview on this device. Checkout cannot place orders or process payments. The offer does not send or store an email until a real endpoint is connected. This is not yet an installable Shopify theme. Earlier V3 material in `history/v3/` and `docs/MENU_DATA.json` is historical only.
