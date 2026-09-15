import { products, pricing, boosts, fruitOptions, toppingOptions, juiceOptions, coffeeMilks, coffeeFlavors } from './catalog.js';

export const productById = id => products.find(product => product.id === id);
const selections = (value, allowed) => allowed.filter(item => Array.isArray(value) && value.includes(item));

export function normalizeOptions(product, raw = {}) {
  const opts = raw && typeof raw === 'object' ? raw : {};
  if (product.id === 'custom-bowl') return { toppings: selections(opts.toppings, [...fruitOptions, ...toppingOptions]) };
  if (product.id === 'custom-juice') return { ingredients: selections(opts.ingredients, juiceOptions).slice(0, 4) };
  if (product.id === 'custom-smoothie') {
    const recipe = productById(opts.recipe);
    return { recipe: recipe?.cat === 'smoothie' && !recipe.builder ? recipe.id : 'strawberry-banana', boosts: selections(opts.boosts, boosts) };
  }
  if (product.variants?.length) {
    const variant = product.variants.find(v => v.id === opts.variant) || product.variants[0];
    return {
      variant: variant.id,
      milk: variant.sizeOz && coffeeMilks.includes(opts.milk) ? opts.milk : '',
      flavor: coffeeFlavors.includes(opts.flavor) ? opts.flavor : '',
    };
  }
  return product.cat === 'smoothie' ? { boosts: selections(opts.boosts, boosts) } : {};
}

export function unitPrice(product, raw = {}) {
  if (!product) return null;
  const options = normalizeOptions(product, raw);
  if (product.id === 'custom-bowl') return pricing.bowlBaseCents + options.toppings.length * pricing.bowlToppingCents;
  if (product.id === 'custom-juice') return pricing.juiceIngredientPrices[options.ingredients.length] ?? null;
  if (product.id === 'custom-smoothie') return productById(options.recipe).priceCents + options.boosts.length * pricing.smoothieBoostCents;
  if (product.variants?.length) {
    const variant = product.variants.find(v => v.id === options.variant);
    return variant.priceCents + (options.milk ? pricing.alternativeMilkCents[variant.sizeOz] : 0) + (options.flavor ? pricing.flavorShotCents : 0);
  }
  return product.priceCents === null ? null : product.priceCents + (options.boosts?.length || 0) * pricing.smoothieBoostCents;
}

export function cartTotals(cart) {
  const subtotal = cart.reduce((sum, line) => sum + (unitPrice(productById(line.id), line.options) ?? 0) * line.quantity, 0);
  // Real offers are issued and validated by Shopify. No browser-only coupon grants.
  return { subtotal, discount: 0, total: subtotal, count: cart.reduce((sum, line) => sum + line.quantity, 0) };
}
