# Fresh Pressed — Mobile Polish + CRO Pass

Date: 2026-09-14

This pass continues the existing Fresh Pressed redesign. It does not replace the current design, catalog, pricing system, cart math, builders, delivery minimum, or offer flow.

## Implemented fixes

1. Replaced the platform-rendered star/emoji-style separators with one custom inline SVG brand spark across the announcement, brand ticker, and local-community mark.
2. Removed the visible pause button from the top announcement. The announcement now runs as a seamless duplicated marquee while the footer motion preference and `prefers-reduced-motion` remain available.
3. Rebuilt the secondary “locally loved / cold pressed” strip with slimmer mobile spacing, consistent phrases, custom SVG separators, and a seamless two-group loop.
4. Removed the loader percentage. The `fresh.` word now fills upward with orange/citrus color using a liquid-like wave-shaped clip animation, while the official logo and “PRESSING SOMETHING GOOD” remain.
5. Updated homepage editorial videos and Build Your Own dialog video to autoplay, muted, looped, inline playback with no visible play controls. Video hydration now begins near the viewport and mobile playback remains capped to one heavy video at a time.
6. Reduced the dead transition after “Shop the full menu” and before the açaí section to deliberate mobile breathing room rather than a large empty beige zone.
7. Updated reveal timing to trigger roughly 280px before content reaches the viewport so product rows and editorial content do not remain invisible while the customer scrolls.
8. Removed the customer-facing “Category photo” development label from representative catalog media.
9. Tightened and aligned the mobile shop cards: compact row gap, consistent card flex structure, three-line description clamp, stable add-button area, and no stagger delay on shop cards.
10. Refined the mobile category scroller so common 390–430px widths show roughly three category circles with a partial next item and smooth horizontal scrolling.
11. Changed the cart CTA from “Review order” to “Checkout” in both the initial HTML fallback and dynamic cart renderer.
12. Increased the mobile cart bottom sheet to approximately 90dvh, refined the top corners and close control, kept the checkout area fixed at the bottom of the sheet, and increased the checkout tap target/visual emphasis.
13. Preserved the 20% email offer behavior, current centralized pricing, builders, coffee modifiers, smoothie boosts, cleanses, cart math, and the $12 delivery minimum.

## Source QA completed

- `node --check site/app.js` — passed.
- `npm run check:menu` — passed: 50 named entries, 21 variants, 3 builders, add-ons, exact delivery boundary, and offer-preview rules.
- HTML checks — no duplicate IDs in the main pages.
- CSS parsing — no stylesheet parse errors detected.
- Local media-reference audit — all `src`, `poster`, and `data-video` references resolve against the project/public files.
- Requested-string audit — no customer-facing `Category photo`, `Review order`, loader percentage counter, top announcement pause control, or Unicode star separator remains.
- Homepage editorial video audit — all four static homepage videos include autoplay, muted, loop, playsinline and no controls; the builder video is generated with the same playback attributes.

## Runtime QA note

The environment used for this edit blocks Chromium navigation to local/file URLs with `ERR_BLOCKED_BY_ADMINISTRATOR`, so I could not complete a real rendered screenshot pass at 390, 393, 414 and 430px inside this session. The source, syntax, media, and catalog checks above were completed successfully. A final device/browser visual pass should still be run before production publish.

## Checkout integration note

This project currently implements a frontend order preview rather than a live payment/Shopify checkout endpoint. The cart CTA and mobile hierarchy now say and emphasize `Checkout`, but no fake payment destination was added. Connect the approved commerce backend/checkout URL before calling the purchase flow production-ready.
