# Revision QA — September 13–14, 2026

## Coverage

Browser review used the supervised local preview, with Home and Shop at desktop width 1440 px and mobile content widths 390, 393, 414 and 430 px. Mobile reviews covered the hero, header/menu, categories, four featured cards, açaí video, Sweet Protein feature, builders, cleanses, story/lifestyle, location imagery, community, final CTA and footer. Native dialog flows were checked on desktop and mobile. These checks do not claim a physical-device or every-browser certification.

## Passed checks

- The branded entrance completes and yields to the page. The official SVG stays readable and proportional in the shared UI.
- The announcement uses equal repeated groups, moves continuously and provides a pause control. Global Pause motion stops video and animation; reduced-motion handling is present in JS/CSS.
- Category filters show the expected counts: 10 juices, 12 smoothies, 6 bowls, 3 shots, 4 toast items, 13 coffee items, 2 tea items and 3 cleanses. Mobile selection brings the first results below the sticky navigation and centers the active category.
- Ingredient search for pineapple returns eight products. A deliberately unmatched search shows a useful empty state; Show all products restores all 53 cards.
- Quick Add and builder completion open the cart. Thumbnails, selected options, each-price and line total agree. Quantity changes and removal update totals and the cart count immediately.
- A $9.95 item reports $2.05 more for local delivery; a $10.95 custom bowl reports $1.05. Delivery review is blocked below $12, becomes available above it, and pickup remains available below it. Automated arithmetic also checks exactly $12 and the requested $8.95 / $3.05 example.
- A bowl with Banana, Strawberries and Honey is $10.95 and retains those choices in the cart. A 16 oz Latte with Oat Milk and Vanilla is $7.50. Builders and smoothie boosts share the same integer-cent pricing module as the cart.
- Empty/malformed email submissions show validation. A valid QA address reaches the explicit preview success state: no address saved and no email sent. No coupon appears. No real email or order was submitted.
- Escape closes the cart and returns focus to the triggering Quick Add button. Native dialogs contain keyboard focus. Mobile pickup, quantity and variant controls have usable hit areas.
- Açaí uses the dominant video; its supporting photo no longer covers the caption. The Sweet Protein mobile film caption was moved away from the ingredient card.
- Offscreen video pauses and mobile playback is limited to one visible video. Posters and lazy source assignment work. No broken images were observed in reviewed sections.
- Home/Shop links, local anchors, SVG symbol references, static media and all catalog image paths resolve. External contact, directions and social links use the official business destinations; no external purchase or contact action was submitted.
- Production build succeeds. All 122 media assets are included in the static output; development-only qa.html is excluded. The active source contains no legacy revealed coupon.
- Console review identified skipped-transition AbortErrors from the optional cross-page View Transitions rule during frame navigation. That rule was removed. Section, dialog and video motion remains. Browser-extension metadata messages are separate from site code; final navigation was checked after the fix.

## Repeatable pricing gate

Run `npm run check:menu`. It checks all 50 named entries against independently transcribed official-menu audit values, 21 coffee variants, three customizers, add-on calculations, price/display parity, unresolved tea pricing, normalized choices, delivery boundaries and honest email preview behavior.

## Explicit limits

The live menu was audited on September 13, 2026. Hot Tea and Iced Tea remain unpriced because the source is ambiguous. Reference-site access stopped at its password screen. Checkout, gift cards, subscriptions and email delivery remain integration work described in PROJECT_HANDOFF.md and EMAIL_INTEGRATION.md. No real order, payment, marketing subscription or email was created. Optional WebMCP registration is not required for ordinary shopping and was not exercised in a browser that exposed that API.
