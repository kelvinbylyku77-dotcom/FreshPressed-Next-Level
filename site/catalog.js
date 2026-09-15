// All menu amounts live in menu.json. Cards, customizers and cart share this model.
import menu from './menu.json' with { type: 'json' };
export const { pricing, boosts, fruitOptions, toppingOptions, juiceOptions, coffeeMilks, coffeeFlavors } = menu;
export const products = menu.products.map(product => {
  const p = { ...product };
  if (p.id === 'custom-bowl') p.priceCents = pricing.bowlBaseCents;
  if (p.id === 'custom-juice') p.priceCents = Math.min(...Object.values(pricing.juiceIngredientPrices));
  if (p.id === 'custom-smoothie') p.priceCents = Math.min(...menu.products.filter(x => x.cat === 'smoothie' && !x.builder).map(x => x.priceCents));
  if (p.variants?.length) p.priceCents = Math.min(...p.variants.map(v => v.priceCents));
  if (p.id === 'custom-bowl') p.desc = `Organic açaí base + granola. Each additional topping is $${(pricing.bowlToppingCents / 100).toFixed(2)}.`;
  if (p.id === 'custom-juice') p.desc = Object.entries(pricing.juiceIngredientPrices).map(([count, price]) => `${count} ingredients $${(price / 100).toFixed(2)}`).join(' · ') + `. Special blends from $${(pricing.specialJuiceFromCents / 100).toFixed(2)} in store.`;
  if (p.id === 'custom-smoothie') p.desc = `Choose a menu blend, then make it yours with $${(pricing.smoothieBoostCents / 100).toFixed(2)} boosts.`;
  return p;
});
