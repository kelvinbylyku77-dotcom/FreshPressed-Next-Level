const products = [
  {id:'whole-greens',name:'Whole Greens',cat:'juice',price:9.95,desc:'Kale, green apple, cucumber, lemon',drink:'#79a34f',bg:'#dbe7bc',badge:'16 oz'},
  {id:'immunity-juice',name:'Immunity Juice',cat:'juice',price:9.95,desc:'Carrot, orange, ginger, turmeric',drink:'#eaa73d',bg:'#f6dfb7',badge:'16 oz'},
  {id:'heart-beet',name:'Heart Beet',cat:'juice',price:9.95,desc:'Beets, carrots, apple, orange, lemon',drink:'#a44659',bg:'#efd8dd',badge:'16 oz',image:'public/media/beet.jpg',featured:true},
  {id:'evergreen',name:'Evergreen',cat:'juice',price:9.95,desc:'Spinach, kale, celery, cucumber, apple',drink:'#5e914d',bg:'#dce9cf',badge:'16 oz'},
  {id:'refresher',name:'Refresher',cat:'juice',price:9.95,desc:'Pineapple, celery, apple, ginger',drink:'#b6bc48',bg:'#eef0c8',badge:'16 oz'},
  {id:'sunset-detox',name:'Sunset Detox',cat:'juice',price:9.95,desc:'Carrot, apple, pineapple, lemon, ginger',drink:'#e98237',bg:'#f5d5b8',badge:'16 oz'},
  {id:'citrus-breeze',name:'Citrus Breeze',cat:'juice',price:9.95,desc:'Orange, grapefruit, lemon, lime',drink:'#eca841',bg:'#f6e0b9',badge:'16 oz'},
  {id:'golden-glow',name:'Golden Glow',cat:'juice',price:9.95,desc:'Orange, pineapple, lemon, ginger',drink:'#eeb52e',bg:'#f7ebbf',badge:'16 oz'},
  {id:'fresh-breeze',name:'Fresh Breeze',cat:'juice',price:9.95,desc:'Pineapple, apple, cucumber, kale, lime',drink:'#8ea850',bg:'#e7edcd',badge:'16 oz'},
  {id:'custom-juice',name:'Create Your Own Juice',cat:'juice',price:8.95,priceLabel:'From $8.95',desc:'2 ingredients $8.95 · 3 $9.95 · 4 $10.95 · specials $11.95+',drink:'#9eb768',bg:'#edf2d9',badge:'Custom'},
  {id:'strawberry-banana',name:'Strawberry Banana',cat:'smoothie',price:9.95,desc:'Almond milk, strawberry, banana, date',drink:'#dc7a86',bg:'#f4dade',badge:'20 oz'},
  {id:'very-berry',name:'Very Berry',cat:'smoothie',price:9.95,desc:'Strawberry, blackberry, blueberry, pineapple, orange juice',drink:'#a23d64',bg:'#ecd5df',badge:'20 oz',image:'public/media/red-smoothie.jpg',featured:true},
  {id:'blue-fusion',name:'Blue Fusion',cat:'smoothie',price:9.95,desc:'Coconut milk, mango, peach, passion fruit, date, blue spirulina',drink:'#5e9fac',bg:'#d7eaed',badge:'20 oz'},
  {id:'tropical-press',name:'Tropical Press',cat:'smoothie',price:9.95,desc:'Passion fruit, mango, banana, hint of honey',drink:'#ebb54a',bg:'#f8e8c0',badge:'20 oz'},
  {id:'green-machine',name:'Green Machine',cat:'smoothie',price:9.95,desc:'Spinach, kale, banana, apple juice, pineapple',drink:'#77a24e',bg:'#dce8cb',badge:'20 oz',image:'public/media/green-smoothie.jpg',featured:true},
  {id:'mango-fresh',name:'Mango Fresh',cat:'smoothie',price:9.95,desc:'Mango, strawberry, mango sherbet, apple juice',drink:'#e99a51',bg:'#f7dfc6',badge:'20 oz'},
  {id:'super-smoothie',name:'Super Smoothie',cat:'smoothie',price:9.95,desc:'Açaí, banana, strawberry, blueberry, peanut butter, almond milk, chia',drink:'#7b4b73',bg:'#e8d9e4',badge:'20 oz'},
  {id:'protein-pro',name:'Protein Pro',cat:'smoothie',price:11.95,desc:'Cacao nibs, banana, peanut butter, whey protein, agave, almond milk',drink:'#a78564',bg:'#ece0d0',badge:'20 oz'},
  {id:'sweet-protein',name:'Sweet Protein',cat:'smoothie',price:11.95,desc:'Chocolate plant protein, dates, banana, walnuts, almond milk, cacao nibs',drink:'#7b5d4a',bg:'#eaded5',badge:'20 oz'},
  {id:'mocha-press',name:'Mocha Press',cat:'smoothie',price:9.95,desc:'Almond milk, espresso, cacao, banana, peanut butter, vanilla, coconut oil, dates',drink:'#8a7255',bg:'#e9e0d4',badge:'20 oz'},
  {id:'dragon-bliss',name:'Dragon Bliss',cat:'smoothie',price:9.95,desc:'Dragon fruit, passion fruit, mango, banana, honey',drink:'#ce4e7b',bg:'#f1d6e0',badge:'20 oz'},
  {id:'fp-bowl',name:'FP Bowl',cat:'bowl',price:10.95,desc:'Açaí, granola, banana, strawberries, blueberries, almonds, chia, honey',drink:'#69415f',bg:'#e4d8e2',badge:'Açaí',image:'public/media/fruit-bowl.jpg',featured:true},
  {id:'nutty-delight',name:'Nutty Delight Bowl',cat:'bowl',price:10.95,desc:'Açaí, granola, banana, green apples, coconut, almonds, Nutella, peanut butter',drink:'#744259',bg:'#e7dade',badge:'Açaí'},
  {id:'tropical-bowl',name:'Tropical Bowl',cat:'bowl',price:10.95,desc:'Açaí, granola, kiwi, pineapple, strawberries, blueberries, raspberries, honey',drink:'#8a3c65',bg:'#ead7e1',badge:'Açaí'},
  {id:'healthy-bowl',name:'Healthy Bowl',cat:'bowl',price:11.95,desc:'Açaí, granola, almond butter, strawberries, pineapple, flax, honey, coconut',drink:'#75405c',bg:'#e8dbe2',badge:'Açaí'},
  {id:'yogurt-bowl',name:'FP Yogurt Bowl',cat:'bowl',price:10.95,desc:'Greek yogurt, strawberries, blueberries, kiwi, goji berries, flax, honey',drink:'#d5c2bd',bg:'#efe5e1',badge:'Yogurt'},
  {id:'custom-bowl',name:'Create Your Own Bowl',cat:'bowl',price:4.95,priceLabel:'From $4.95',desc:'Starting base + granola. Additional toppings $2 each.',drink:'#704059',bg:'#eadce3',badge:'Custom'},
  {id:'avocado-toast',name:'Avocado Toast',cat:'food',price:4.95,desc:'Organic wheat sprouted toast, everything bagel seasoning',drink:'#7fa25c',bg:'#e2ecd5',badge:'Toast'},
  {id:'cucumber-hummus',name:'Cucumber Hummus',cat:'food',price:4.95,desc:'Red pepper or plain hummus, cucumber, olive oil, salt + pepper',drink:'#9bab6b',bg:'#ebeedc',badge:'Toast'},
  {id:'pb-banana',name:'PB Banana',cat:'food',price:4.95,desc:'Peanut butter, banana, honey + chia seeds',drink:'#bf9d69',bg:'#eee2d1',badge:'Toast'},
  {id:'strawberry-nutella',name:'Strawberry Nutella',cat:'food',price:4.95,desc:'Nutella, fresh strawberries, coconut flakes',drink:'#a96b64',bg:'#efddda',badge:'Toast'},
  {id:'ginger-shot',name:'Ginger Lemon Shot',cat:'shot',price:4.99,desc:'Ginger, lemon, cayenne pepper',drink:'#d6a73d',bg:'#f3e6bd',badge:'3 oz',image:'public/media/immunity-shots.jpg'},
  {id:'acv-shot',name:'Apple Cider Vinegar Shot',cat:'shot',price:4.99,desc:'Apple cider vinegar, honey, lemon juice',drink:'#c48a42',bg:'#efe0c7',badge:'3 oz'},
  {id:'turmeric-shot',name:'Turmeric Apple Shot',cat:'shot',price:4.99,desc:'Turmeric + apple',drink:'#e0a42c',bg:'#f4e3b5',badge:'3 oz'},
  {id:'hot-coffee',name:'Hot Coffee',cat:'coffee',price:3,priceLabel:'From $3.00',desc:'Available in current menu size options',drink:'#79513b',bg:'#e8ddd5',badge:'Coffee',image:'public/media/espresso.jpg',optionOnly:true},
  {id:'iced-coffee',name:'Iced Coffee',cat:'coffee',price:3,priceLabel:'From $3.00',desc:'Available in current menu size options',drink:'#79513b',bg:'#e8ddd5',badge:'Coffee',optionOnly:true},
  {id:'cold-brew',name:'Cold Brew',cat:'coffee',price:3,priceLabel:'From $3.00',desc:'Available in current menu size options',drink:'#6d4938',bg:'#e6d9cf',badge:'Coffee',optionOnly:true},
  {id:'espresso',name:'Espresso',cat:'coffee',price:3.5,priceLabel:'See size options',desc:'Single / double options on the current menu',drink:'#5c3d2e',bg:'#e5d8ce',badge:'Espresso',optionOnly:true},
  {id:'cappuccino',name:'Cappuccino',cat:'coffee',price:4,priceLabel:'See size options',desc:'Available with current milk options',drink:'#a77d5e',bg:'#eee3d9',badge:'Espresso',optionOnly:true},
  {id:'latte',name:'Latte',cat:'coffee',price:4,priceLabel:'See size options',desc:'Hot latte with current milk + flavor options',drink:'#b28a6b',bg:'#eee2d7',badge:'Espresso',optionOnly:true},
  {id:'iced-latte',name:'Iced Latte',cat:'coffee',price:5,priceLabel:'See size options',desc:'Iced latte with current milk + flavor options',drink:'#aa7f5f',bg:'#eee0d5',badge:'Espresso',optionOnly:true},
  {id:'macchiato',name:'Macchiato',cat:'coffee',price:5,priceLabel:'See size options',desc:'Espresso drink from the current menu',drink:'#77513c',bg:'#e7d9cf',badge:'Espresso',optionOnly:true},
  {id:'americano',name:'Americano',cat:'coffee',price:4,priceLabel:'See size options',desc:'Espresso + water',drink:'#664432',bg:'#e2d4ca',badge:'Espresso',optionOnly:true},
  {id:'matcha-latte',name:'Matcha Latte',cat:'coffee',price:5,priceLabel:'See size options',desc:'Specialty drink from the current menu',drink:'#8fa36d',bg:'#e5ead8',badge:'Specialty',optionOnly:true},
  {id:'chai-latte',name:'Chai Latte',cat:'coffee',price:5,priceLabel:'See size options',desc:'Specialty drink from the current menu',drink:'#b28d68',bg:'#eee2d4',badge:'Specialty',optionOnly:true},
  {id:'iced-chai',name:'Iced Chai Latte',cat:'coffee',price:5,priceLabel:'See size options',desc:'Iced specialty drink',drink:'#aa8664',bg:'#eee1d5',badge:'Specialty',optionOnly:true},
  {id:'hot-cocoa',name:'Hot Cocoa',cat:'coffee',price:4,priceLabel:'See size options',desc:'Warm cocoa from the current menu',drink:'#76523f',bg:'#e7d9cf',badge:'Specialty',optionOnly:true},
  {id:'hot-tea',name:'Hot Tea',cat:'coffee',price:4,priceLabel:'See size options',desc:'Tea from the current menu',drink:'#a78a54',bg:'#ede5d4',badge:'Tea',optionOnly:true},
  {id:'iced-tea',name:'Iced Tea',cat:'coffee',price:4,priceLabel:'See size options',desc:'Iced tea from the current menu',drink:'#a58b57',bg:'#ece4d2',badge:'Tea',optionOnly:true},
  {id:'cleanse-1',name:'1-Day Signature Cleanse',cat:'cleanse',price:46.95,desc:'Five 16 oz juices: 2 Evergreen, Heart Beet, Refresher + Sunset Detox',drink:'#6e914f',bg:'#dfe8cf',badge:'5 juices'},
  {id:'cleanse-2',name:'2-Day Signature Cleanse',cat:'cleanse',price:89.95,desc:'Ten 16 oz juices across two cleanse days',drink:'#719251',bg:'#dfe8cf',badge:'10 juices'},
  {id:'cleanse-3',name:'3-Day Signature Cleanse',cat:'cleanse',price:134.95,desc:'Fifteen 16 oz juices across three cleanse days',drink:'#739453',bg:'#dfe8cf',badge:'15 juices'}
];

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = n => `$${Number(n).toFixed(2)}`;
let cart = JSON.parse(localStorage.getItem('fp-cart') || '[]');
let fulfillment = 'pickup';

function productCard(p){
  const media = p.image
    ? `<div class="product-media" style="--card-bg:${p.bg}"><img src="${p.image}" alt="${p.name}"><span class="product-pill">${p.badge}</span></div>`
    : `<div class="product-media placeholder" style="--card-bg:${p.bg};background:${p.bg}"><div class="product-shape" style="--drink:${p.drink}"></div><span class="product-pill">${p.badge}</span></div>`;
  const price = p.priceLabel || money(p.price);
  const btn = p.optionOnly ? `<button class="add-btn option-only" data-option="${p.id}">View options</button>` : `<button class="add-btn" data-add="${p.id}">Quick add +</button>`;
  return `<article class="product-card">${media}<div class="product-info"><div class="product-title-row"><h3>${p.name}</h3><span class="product-price">${price}</span></div><p class="product-desc">${p.desc}</p>${btn}</div></article>`;
}

function bindProductButtons(){
  $$('[data-add]').forEach(b=>b.onclick=()=>addProduct(b.dataset.add));
  $$('[data-option]').forEach(b=>b.onclick=()=>toast('Size and modifier selection will open here in Shopify'));
}

function renderFeatured(){
  const el=$('#featuredGrid'); if(!el) return;
  el.innerHTML=products.filter(p=>p.featured).slice(0,4).map(productCard).join('');
  bindProductButtons();
}

function shopState(){
  const url=new URL(location.href); return {cat:url.searchParams.get('cat')||'all',q:''};
}
let currentShop=shopState();
function renderShop(){
  const el=$('#productGrid'); if(!el) return;
  let list=products;
  if(currentShop.cat!=='all') list=list.filter(p=>p.cat===currentShop.cat);
  if(currentShop.q) list=list.filter(p=>(p.name+' '+p.desc+' '+p.cat).toLowerCase().includes(currentShop.q));
  el.innerHTML=list.map(productCard).join('');
  $('#productCount').textContent=list.length;
  $$('.filter').forEach(b=>b.classList.toggle('active',b.dataset.filter===currentShop.cat));
  bindProductButtons();
}

function saveCart(){localStorage.setItem('fp-cart',JSON.stringify(cart))}
function addProduct(id){
  const p=products.find(x=>x.id===id); if(!p) return;
  cart.push({id:p.id,name:p.name,price:p.price,drink:p.drink,uid:(crypto.randomUUID?crypto.randomUUID():String(Date.now()+Math.random()))});
  saveCart(); renderCart(); toast(`${p.name} added to your bag`);
}
function renderCart(){
  if(!$('#cartCount')) return;
  $('#cartCount').textContent=cart.length;
  const items=$('#cartItems');
  items.innerHTML=cart.length?cart.map(i=>`<div class="cart-row"><div class="cart-thumb" style="--drink:${i.drink};background:${i.drink}"></div><div><h4>${i.name}</h4><small>${money(i.price)}</small></div><button class="remove" data-remove="${i.uid}" aria-label="Remove">×</button></div>`).join(''):`<p style="color:#6d766f;padding-top:20px">Your bag is empty. Fresh is one click away.</p>`;
  $$('[data-remove]').forEach(b=>b.onclick=()=>{cart=cart.filter(i=>i.uid!==b.dataset.remove);saveCart();renderCart()});
  const total=cart.reduce((s,i)=>s+Number(i.price),0); $('#cartTotal').textContent=money(total);
  const n=$('#deliveryNotice');
  if(fulfillment==='delivery'&&total<12){n.textContent=`Add ${money(12-total)} more to reach the $12 delivery minimum.`;n.classList.remove('hidden');$('#checkout').disabled=true;$('#checkout').style.opacity=.45}
  else{n.classList.add('hidden');$('#checkout').disabled=false;$('#checkout').style.opacity=1}
}
function openPanel(el){if(!el)return;$('#overlay').classList.add('open');el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.classList.add('lock')}
function closePanels(){$('#overlay')?.classList.remove('open');$$('.drawer,.search-panel,.mobile-menu').forEach(x=>{x.classList.remove('open');x.setAttribute('aria-hidden','true')});document.body.classList.remove('lock')}
function toast(msg){const t=$('#toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1800)}

renderFeatured(); renderShop(); renderCart();

$$('.filter').forEach(b=>b.onclick=()=>{currentShop.cat=b.dataset.filter;const u=new URL(location.href);if(currentShop.cat==='all')u.searchParams.delete('cat');else u.searchParams.set('cat',currentShop.cat);history.replaceState({},'',u);renderShop()});
$('#shopSearch')?.addEventListener('input',e=>{currentShop.q=e.target.value.trim().toLowerCase();renderShop()});
$('#cartOpen')?.addEventListener('click',()=>openPanel($('#cartDrawer')));
$('#searchOpen')?.addEventListener('click',()=>{openPanel($('#searchPanel'));setTimeout(()=>$('#searchInput')?.focus(),180)});
$('#menuOpen')?.addEventListener('click',()=>openPanel($('#mobileMenu')));
$('#overlay')?.addEventListener('click',closePanels); $$('[data-close]').forEach(b=>b.onclick=closePanels);
$$('.fulfill').forEach(b=>b.onclick=()=>{$$('.fulfill').forEach(x=>x.classList.remove('active'));b.classList.add('active');fulfillment=b.dataset.fulfill;renderCart()});
$('#searchInput')?.addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const list=q?products.filter(p=>(p.name+' '+p.desc+' '+p.cat).toLowerCase().includes(q)).slice(0,10):[];$('#searchResults').innerHTML=list.map(p=>`<div class="search-result"><div><b>${p.name}</b><br><small>${p.priceLabel||money(p.price)}</small></div>${p.optionOnly?`<button data-option="${p.id}">View</button>`:`<button data-search-add="${p.id}">Add +</button>`}</div>`).join('');$$('[data-search-add]').forEach(b=>b.onclick=()=>addProduct(b.dataset.searchAdd));$$('[data-option]').forEach(b=>b.onclick=()=>toast('Size and modifier selection will open here in Shopify'))});
$('#signupForm')?.addEventListener('submit',e=>{e.preventDefault();toast('Welcome to the Fresh List');e.target.reset()});
$('#checkout')?.addEventListener('click',()=>toast('Shopify checkout connects here in production'));

const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.1});$$('.reveal').forEach(el=>obs.observe(el));
