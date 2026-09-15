# Official menu price audit

Verified September 13, 2026 against the [live Fresh Pressed menu](https://www.freshpressed-ct.com/menu). Prices are USD. The original menu HTML and grouped coffee price rows were inspected, retaining blank rows rather than shifting prices to fill them.

`site/menu.json` is the single active menu/pricing source. The derived catalog and pricing module use integer cents for product cards, homepage slots, details, builders, upsells and cart totals. `docs/MENU_DATA.json` remains an historical input snapshot.

## Every catalog entry

| Product | Category | Size / verified price | Status |
|---|---|---|---|
| Strawberry Banana | smoothie | 20 oz · $9.95 | Verified |
| Very Berry | smoothie | 20 oz · $9.95 | Verified |
| Blue Fusion | smoothie | 20 oz · $9.95 | Verified |
| Tropical Press | smoothie | 20 oz · $9.95 | Verified |
| Green Machine | smoothie | 20 oz · $9.95 | Verified |
| Mango Fresh | smoothie | 20 oz · $9.95 | Verified |
| Super Smoothie | smoothie | 20 oz · $9.95 | Verified |
| Protein Pro | smoothie | 20 oz · $11.95 | Verified |
| Sweet Protein | smoothie | 20 oz · $11.95 | Verified |
| Mocha Press | smoothie | 20 oz · $9.95 | Verified |
| Dragon Bliss | smoothie | 20 oz · $9.95 | Verified |
| Whole Greens | juice | 16 oz · $9.95 | Verified |
| Immunity Juice | juice | 16 oz · $9.95 | Verified |
| Heart Beet | juice | 16 oz · $9.95 | Verified |
| Evergreen | juice | 16 oz · $9.95 | Verified |
| Refresher | juice | 16 oz · $9.95 | Verified |
| Sunset Detox | juice | 16 oz · $9.95 | Verified |
| Citrus Breeze | juice | 16 oz · $9.95 | Verified |
| Golden Glow | juice | 16 oz · $9.95 | Verified |
| Fresh Breeze | juice | 16 oz · $9.95 | Verified |
| FP Bowl | bowl | $10.95 | Verified |
| Nutty Delight Bowl | bowl | $10.95 | Verified |
| Tropical Bowl | bowl | $10.95 | Verified |
| Healthy Bowl | bowl | $11.95 | Verified |
| FP Yogurt Bowl | bowl | $10.95 | Verified |
| Avocado Toast | food | $4.95 | Verified |
| Cucumber Hummus | food | $4.95 | Verified |
| PB Banana | food | $4.95 | Verified |
| Strawberry Nutella | food | $4.95 | Verified |
| Ginger Lemon Cayenne | shot | 3 oz · $4.99 | Verified |
| ACV Honey Lemon | shot | 3 oz · $4.99 | Verified |
| Turmeric Apple | shot | 3 oz · $4.99 | Verified |
| Hot Coffee | coffee | 12 oz: $3.00; 16 oz: $4.00 | Published variants only |
| Iced Coffee | coffee | 12 oz: $3.00; 16 oz: $4.00 | Published variants only |
| Cold Brew | coffee | 16 oz: $5.00 | Published variants only |
| Espresso | coffee | Single: $3.00; Double: $4.00 | Published variants only |
| Cappuccino | coffee | 12 oz: $5.00; 16 oz: $6.00 | Published variants only |
| Latte | coffee | 12 oz: $5.00; 16 oz: $6.00 | Published variants only |
| Iced Latte | coffee | 16 oz: $6.00 | Published variants only |
| Macchiato | coffee | 12 oz: $4.00 | Published variants only |
| Americano | coffee | 12 oz: $4.00 | Published variants only |
| Matcha Latte | coffee | 12 oz: $5.00; 16 oz: $6.00 | Published variants only |
| Chai Latte | coffee | 12 oz: $5.00; 16 oz: $6.00 | Published variants only |
| Iced Chai Latte | coffee | 12 oz: $5.00; 16 oz: $6.00 | Published variants only |
| Hot Cocoa | coffee | 16 oz: $4.00 | Published variants only |
| Hot Tea | tea | Price / sizes unresolved | Unavailable to add; call store |
| Iced Tea | tea | Price / sizes unresolved | Unavailable to add; call store |
| 1 Day Cleanse | cleanse | 5 × 16 oz juices · $46.95 | Verified |
| 2 Day Cleanse | cleanse | 10 × 16 oz juices · $89.95 | Verified |
| 3 Day Cleanse | cleanse | 15 × 16 oz juices · $134.95 | Verified |
| Create Your Own Bowl | bowl | Açaí + granola $4.95; each fruit/topping +$2.00 | Uses verified component pricing |
| Create Your Own Juices | juice | 16 oz: 2 ingredients $8.95; 3 $9.95; 4 $10.95 | Uses verified component pricing |
| Build Your Own Smoothie | smoothie | 20 oz: selected menu recipe price + $2.00 per boost | Uses verified component pricing |

## Shared rules

| Rule | Official amount / behavior |
|---|---|
| Smoothie boost | +$2.00 each |
| Bowl base | $4.95, organic açaí + granola |
| Bowl fruit or topping | +$2.00 each |
| Custom juice | 2 / 3 / 4 ingredients: $8.95 / $9.95 / $10.95 |
| Specialty custom juices | From $11.95 in store; unspecified recipes are not automatically priced |
| Almond / oat milk | +$0.50 for 12 oz, +$1.00 for 16 oz |
| Flavor shot | +$0.50; mocha, caramel, vanilla, hazelnut, salted caramel |
| Delivery minimum | $12.00 merchandise total; pickup permitted below it |
| First-order offer | 20% email offer UI. Real code issuance/eligibility/discounts require backend integration |

## Unresolved source details

- **Hot Tea and Iced Tea:** one $3.50 value is published without a clear product/size association. Both remain `null` until the store confirms the mapping. No inferred tea price is purchasable.
- Missing coffee sizes are omitted. Cold Brew, Iced Latte and Hot Cocoa have only a published 16 oz variant; Macchiato and Americano only a published 12 oz variant. Espresso uses the explicitly stated Single / Double choices.
- Coffee pricing follows the source HTML subgroups and blank rows. It is not assigned by nearest on-screen pixel because the source table has uneven text alignment.
- The smoothie customizer starts from an existing priced recipe. It does not invent a price for an unrestricted blend.
- No delivery fees, tax, subscription savings, gift-card denominations or unspecified bundle prices are invented. Cleanse bundles use the exact published prices above.
- The owner must confirm the delivery minimum treatment after real discounts when enabling checkout. The current preview never grants a discount.

## Regression checks

`npm run check:menu` checks all 50 named entries against independently transcribed audit values, all 21 coffee variants, display/cart parity, three customizers, add-ons, tea null prices, a $3.05 delivery gap on an $8.95 cart, and the exact $12 boundary. Update these expected audit values deliberately when a newly verified menu revision changes the source.
