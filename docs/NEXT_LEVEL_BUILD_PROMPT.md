> Historical initial brief. The current September 2026 revision is in REVISION_BRIEF.md. In particular, the email acquisition flow supersedes the earlier coupon-reveal request.

# MASTER PROMPT — Take the Fresh Pressed Website to the Next Level

Act as an award-winning senior eCommerce creative director, Shopify UX/UI designer, CRO strategist, motion designer, brand designer and senior front-end developer.

You are taking over an existing Fresh Pressed rebrand prototype. The current version is functional but visually too basic. Do not make a small facelift. Re-art-direct and rebuild the experience so it feels like a premium, memorable, high-converting juice/wellness eCommerce brand.

## 1. Start by inspecting everything provided
Before changing code, inspect:
- `site/index.html`
- `site/shop.html`
- `site/styles.css`
- `site/app.js`
- all media inside `site/public/media/`
- `docs/MENU_DATA.json`
- `docs/MEDIA_CATALOG.md`
- `docs/PROJECT_HANDOFF.md`
- `docs/REFERENCE_SITES.md`
- `docs/ORIGINAL_SITE_ASSET_URLS.md`

Use the existing work as source material, not as a layout that must be preserved. You are allowed to restructure the HTML/CSS/JS completely if that produces a better result.

## 2. Primary visual direction
The main visual reference is:
https://juise-organic-store.myshopify.com/

The new Fresh Pressed site should feel much closer to the level of polish, animation, organic eCommerce design, product focus and playful premium energy seen in that reference. Also consider the secondary references in `docs/REFERENCE_SITES.md`.

IMPORTANT: do not create a pixel-for-pixel copy, copy proprietary theme code, or reuse another brand's exact assets. Translate the qualities we like into a custom Fresh Pressed design.

Fresh Pressed should feel:
- premium but fun
- fresh and colorful
- organic without looking rustic
- modern and editorial
- highly visual
- energetic and alive
- conversion-focused
- unmistakably Fresh Pressed and Connecticut-local

Use the existing Fresh Pressed logo. DO NOT redesign or replace the logo.

Build the visual system around the existing logo colors: fresh greens, citrus orange/yellow, warm cream and deep forest. Add product-driven berry/red/purple/blue accents where appropriate. Avoid generic all-green wellness branding.

Use a premium display typeface paired with a clean, highly readable sans-serif. Use oversized typography, unexpected but controlled composition, strong section contrast and intentional whitespace.

## 3. The homepage must NOT contain the whole menu
This is a critical requirement.

The homepage is a brand/conversion page. It should show only around 3–4 featured/best-selling products, then push users to Shop.

The full menu belongs on the separate Shop page.

Recommended homepage architecture:
1. animated branded preloader
2. animated announcement/promo strip
3. premium sticky header/navigation
4. high-impact hero using one excellent Fresh Pressed product image or video
5. visual category navigation: Juices, Smoothies, Açaí Bowls, Shots, Toast, Coffee/Tea
6. 3–4 featured products only
7. clear Shop All CTA
8. large editorial Açaí feature
9. premium smoothie/protein feature
10. Build Your Own Smoothie + Build Your Own Bowl interactive feature
11. cold-pressed juices / immunity / cleanse feature
12. Made Fresh process/story section
13. active-lifestyle content using tennis/trisport where appropriate
14. real store / Plantsville Connecticut story and location
15. reviews/social proof
16. final oversized CTA/footer

Do not use every uploaded asset. Curate the best media. The page must feel intentional, not like a gallery dump.

## 4. Motion and animation must be a major part of the design
The site currently does not feel animated or premium enough. Build motion into the experience from the beginning.

Create a distinctive Fresh Pressed loading sequence. It should be more than a spinner. Consider animated fruit/juice shapes, logo reveal, liquid-fill motion, masking, or percentage/progress animation. It should feel branded and last only long enough to create a premium entrance.

Add sophisticated motion such as:
- cinematic image/video mask reveals
- staggered text entrances
- scroll-triggered product reveals
- parallax on ingredient/fruit layers
- subtle scroll-linked transforms
- smooth marquees/tickers
- animated curved/organic section transitions
- product-card hover motion
- image-to-video hover states where useful
- magnetic or responsive CTA hover states on desktop
- animated navigation/mega-menu
- smooth mobile menu transitions
- cart drawer transition
- product quick-add feedback
- animated page transitions between Home and Shop when practical
- scroll progress or subtle directional indicators where useful

Motion should feel smooth and expensive, not gimmicky. Support `prefers-reduced-motion` and disable/reduce heavy effects for accessibility and low-power/mobile devices.

## 5. Build a premium 20% discount experience
Do not use a generic newsletter popup.

Create a visually premium first-order offer:
**20% OFF YOUR FIRST ONLINE ORDER**
Prototype discount code: `FRESH20`

The popup should feel like part of the brand and include:
- custom animated entrance
- strong product/fruit visual
- large 20% typography
- copy/reveal discount-code interaction
- Shop Now CTA
- close button
- do not show immediately on page load; trigger after a sensible delay or engagement point
- use localStorage/session logic so it does not annoy the same user on every page load

The code is a prototype until the actual Shopify discount is created.

## 6. Use the real Fresh Pressed media as the visual foundation
The media library is one of the strongest assets of this project. Use real Fresh Pressed media instead of generic stock whenever possible.

Consult `docs/MEDIA_CATALOG.md` before choosing assets.

Important media rules:
- choose the strongest shot/video for each section
- use videos as atmosphere and storytelling, not everywhere
- keep autoplay video muted, looped and optimized
- lazy-load noncritical media
- use poster images
- avoid making Demitasse Cafe branding dominant in coffee visuals; crop or focus on the drink-making process
- use the real Fresh Pressed interior for the local/store story
- give Açaí proper visual prominence
- use product colors to drive section art direction
- use lifestyle footage (tennis/trisport) as a secondary brand layer, not as the entire identity

You may also pull useful legacy product images from `docs/ORIGINAL_SITE_ASSET_URLS.md` if a product lacks suitable local media. Prefer the new media when it is stronger.

## 7. Make the hero exceptional
The hero cannot look like a standard template hero.

Create a layered composition with one dominant real Fresh Pressed product photo/video. Use editorial typography, layered masks/organic shapes, floating ingredient accents or controlled motion. The first screen must immediately communicate that Fresh Pressed sells juices, smoothies and bowls online.

Primary CTAs:
- SHOP NOW
- BUILD YOUR OWN

Include concise pickup/local delivery messaging, but do not overcrowd the hero.

## 8. Make product merchandising feel like real premium eCommerce
Featured product cards should look finished, not like placeholders.

Include:
- real imagery/poster frame
- product name
- short ingredient/flavor line
- price
- quick add
- hover or focus animation
- optional video-on-hover only when it improves the experience

Homepage: only 3–4 featured products.
Shop page: full menu.

The Shop page should feel equally designed, not like a plain data grid. Build premium category tabs/filters, search, collection headers, responsive product grids and quick-add interactions.

Use the full current menu/pricing in `docs/MENU_DATA.json`.

## 9. Açaí must be a major category
Do not forget or minimize Açaí bowls.

Create a large, high-impact Açaí section on the homepage using the strongest bowl imagery/video. It can use an editorial split, image mask, ingredient labels, motion, or interactive build animation.

The Shop page must have a dedicated Açaí/Bowls category containing FP Bowl, Nutty Delight, Tropical Bowl, Healthy Bowl, FP Yogurt Bowl and Create Your Own Bowl.

## 10. Build Your Own should feel interactive
Build Your Own Smoothie and Build Your Own Bowl should not be plain text cards.

Create an interactive visual experience that can eventually connect to Shopify line-item properties or a bundle/customizer. Prototype the UI now with clear steps/options and a satisfying progression.

Use the provided build-your-own videos.

## 11. Make the shopping experience conversion-focused
Include:
- cart drawer
- cart count animation
- quick add
- related-item/cart upsells
- clear pickup vs local-delivery choice
- **$12 minimum for local delivery**
- clear delivery-minimum progress/feedback in cart
- sticky mobile add-to-cart on product detail pages if PDPs are built
- gift-card entry point
- subscription / Subscribe & Save presentation where appropriate
- cleanse merchandising
- first-order discount integration

Catering is NOT part of this project right now.

## 12. Add premium supporting pages/components
If time allows, create or improve:
- product detail template
- cleanse landing/product page
- Build Your Own flow
- About/Our Story section/page
- cart drawer
- mobile navigation

The end goal is Shopify, so structure interactions in a way that can later map cleanly to Shopify products, variants, cart and checkout.

## 13. Mobile must be treated as a primary design
Do not create desktop first and simply stack everything.

On mobile:
- hero must still feel premium
- typography should scale intentionally
- no overlapping effects
- animations must stay smooth
- category browsing should be easy with thumbs
- product cards should be readable
- cart must be easy to use
- sticky actions should not obstruct content
- media should not cause huge page weight or layout shifts

Test the entire experience at mobile widths around 390–430px and desktop widths around 1440px.

## 14. Performance and accessibility
Keep the site visually ambitious but technically disciplined.

Requirements:
- use optimized local media already provided
- lazy-load below-the-fold images/video
- avoid loading every video on first paint
- use poster frames
- use `loading="lazy"` where appropriate
- preserve semantic links/buttons
- visible focus states
- keyboard-operable menus/popup/cart
- good contrast
- descriptive alt text
- `prefers-reduced-motion`
- avoid excessive CLS and blocking scripts

## 15. Fresh Pressed facts that must remain consistent
- Existing logo stays.
- Location: 930 Meriden-Waterbury Turnpike, Plantsville, CT 06479.
- Current full menu and pricing come from `docs/MENU_DATA.json`.
- Local delivery minimum is $12.
- Pickup and local delivery are part of the online-order concept.
- No catering section right now.
- The full menu is on Shop, not the homepage.
- Açaí is important.
- The site should ultimately support Shopify eCommerce.

## 16. What I expect you to deliver
Do not only give recommendations. Modify/build the files.

Deliver a polished, working prototype that includes:
- redesigned homepage
- redesigned Shop page
- functioning navigation/mobile drawer
- branded preloader
- 20% promo popup
- functional product filters/search
- quick-add/cart interactions
- delivery-minimum feedback
- responsive desktop/mobile behavior
- premium motion and transitions
- real media integrated intentionally

After implementation, test the page for broken links/media, responsive issues, overflow, animation conflicts, popup behavior and cart behavior. Fix problems before declaring it complete.

The result should make someone think: **this looks like a real premium juice brand with a serious online store**, not a school project, generic template, or restaurant menu website.
