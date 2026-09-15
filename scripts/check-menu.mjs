import assert from 'node:assert/strict';
import { products, pricing } from '../site/catalog.js';
import { productById, unitPrice, cartTotals, normalizeOptions } from '../site/pricing.js';
import { subscribeToFirstOrderOffer, offerConfiguration } from '../site/offer-integration.js';

// Expected values independently transcribed from the official menu audit dated 2026-09-13.
const groups = [
  [995, 'strawberry-banana very-berry blue-fusion tropical-press green-machine mango-fresh super-smoothie mocha-press dragon-bliss whole-greens immunity-juice heart-beet evergreen refresher sunset-detox citrus-breeze golden-glow fresh-breeze'],
  [1195, 'protein-pro sweet-protein healthy-bowl'],
  [1095, 'fp-bowl nutty-delight-bowl tropical-bowl fp-yogurt-bowl'],
  [495, 'avocado-toast cucumber-hummus pb-banana strawberry-nutella'],
  [499, 'ginger-lemon-cayenne acv-honey-lemon turmeric-apple'],
  [4695, '1-day-cleanse'], [8995, '2-day-cleanse'], [13495, '3-day-cleanse'],
];
const variants = {
  'hot-coffee': { '12oz': 300, '16oz': 400 },
  'iced-coffee': { '12oz': 300, '16oz': 400 },
  'cold-brew': { '16oz': 500 },
  espresso: { single: 300, double: 400 },
  cappuccino: { '12oz': 500, '16oz': 600 },
  latte: { '12oz': 500, '16oz': 600 },
  'iced-latte': { '16oz': 600 }, macchiato: { '12oz': 400 }, americano: { '12oz': 400 },
  'matcha-latte': { '12oz': 500, '16oz': 600 },
  'chai-latte': { '12oz': 500, '16oz': 600 },
  'iced-chai-latte': { '12oz': 500, '16oz': 600 },
  'hot-cocoa': { '16oz': 400 },
};
const checked = new Set();
for (const [price, ids] of groups) for (const id of ids.split(' ')) {
  assert.equal(productById(id).priceCents, price, `${id} display`);
  assert.equal(unitPrice(productById(id)), price, `${id} cart`);
  checked.add(id);
}
for (const [id, expected] of Object.entries(variants)) {
  const p = productById(id);
  assert.deepEqual(Object.fromEntries(p.variants.map(v => [v.id, v.priceCents])), expected, `${id} variants`);
  assert.equal(p.priceCents, Math.min(...Object.values(expected)), `${id} starting price`);
  for (const [variant, price] of Object.entries(expected)) assert.equal(unitPrice(p, { variant }), price, `${id}/${variant} cart`);
  checked.add(id);
}
for (const id of ['hot-tea', 'iced-tea']) {
  assert.equal(productById(id).priceCents, null);
  assert.equal(unitPrice(productById(id)), null);
  checked.add(id);
}
assert.equal(checked.size, 50);
assert.equal(products.length, 53);
assert.equal(new Set(products.map(p => p.id)).size, 53);
assert.equal(products.filter(p => p.variants).flatMap(p => p.variants).length, 21);
assert.equal(unitPrice(productById('latte'), { variant: '16oz', milk: 'Oat Milk', flavor: 'Vanilla' }), 750);
assert.equal(unitPrice(productById('hot-coffee'), { variant: '12oz', milk: 'Almond Milk' }), 350);
assert.equal(unitPrice(productById('hot-coffee'), { variant: '16oz', milk: 'Almond Milk' }), 500);
assert.equal(unitPrice(productById('custom-bowl')), 495);
assert.equal(unitPrice(productById('custom-bowl'), { toppings: ['Banana', 'Strawberries', 'Honey'] }), 1095);
assert.equal(unitPrice(productById('custom-smoothie'), { recipe: 'sweet-protein', boosts: ['Chia Seeds', 'Hemp Seeds'] }), 1595);
assert.equal(unitPrice(productById('blue-fusion'), { boosts: ['Chia Seeds'] }), 1195);
const ingredients = ['Kale', 'Green Apple', 'Cucumber', 'Lemon'];
for (const [count, price] of [[1, null], [2, 895], [3, 995], [4, 1095]]) {
  assert.equal(unitPrice(productById('custom-juice'), { ingredients: ingredients.slice(0, count) }), price);
}
assert.deepEqual(normalizeOptions(productById('custom-bowl'), { toppings: ['Honey', 'Honey', 'Invalid'] }), { toppings: ['Honey'] });
assert.equal(pricing.deliveryMinimumCents, 1200);
const line = { id: 'custom-juice', options: { ingredients: ingredients.slice(0, 2) }, quantity: 1 };
assert.deepEqual(cartTotals([line]), { subtotal: 895, discount: 0, total: 895, count: 1 });
assert.equal(pricing.deliveryMinimumCents - cartTotals([line]).total, 305);
assert.equal(cartTotals([{ id: 'hot-coffee', options: { variant: '12oz' }, quantity: 4 }]).total, 1200);
assert.equal(cartTotals([{ id: 'hot-coffee', options: { variant: '12oz' }, quantity: 3 }]).total, 900);
if (!offerConfiguration.endpoint) {
  assert.deepEqual(await subscribeToFirstOrderOffer({ email: 'qa@example.com', consent: true, source: 'check' }), { status: 'preview', subscribed: false });
  await assert.rejects(subscribeToFirstOrderOffer({ email: 'invalid', consent: true, source: 'check' }));
}
console.log('PASS: all 50 named entries, 21 variants, 3 builders, add-ons, exact delivery boundary and honest offer preview.');
