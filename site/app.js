import { products, pricing, boosts, fruitOptions, toppingOptions, juiceOptions, coffeeMilks, coffeeFlavors } from './catalog.js';
import { productById, normalizeOptions, unitPrice, cartTotals } from './pricing.js';
import { offerConfiguration, subscribeToFirstOrderOffer } from './offer-integration.js';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
$$('.offer-preview-note').forEach(note => { note.hidden = Boolean(offerConfiguration.endpoint); });
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const money = cents => new Intl.NumberFormat('en-US', {style:'currency',currency:'USD'}).format(cents / 100);
const icon = name => `<svg class="icon" aria-hidden="true"><use href="#icon-${name}"/></svg>`;
const readStore = (key, fallback, session = false) => { try { const raw=(session ? sessionStorage : localStorage).getItem(key); return raw === null ? fallback : JSON.parse(raw); } catch { return fallback; } };
const writeStore = (key, value, session = false) => { try { (session ? sessionStorage : localStorage).setItem(key,JSON.stringify(value)); } catch { /* A blocked storage permission must not stop shopping. */ } };
const categoryNames = {all:'All the good stuff.',juice:'Cold-pressed goodness.',smoothie:'Blend a little joy.',bowl:'A bowl kind of day.',shot:'Small sips. Big flavor.',food:'A toast to good taste.','coffee-tea':'Coffee + tea, your way.',coffee:'Your daily coffee moment.',tea:'Steep a little calm.',cleanse:'Your fresh daily lineup.'};
const categoryDescriptions = {all:'Made with good ingredients. Ready for a good day.',juice:'Fresh fruit and vegetables, cold pressed. Menu juices are 16 oz.',smoothie:`20 oz of feel-good flavor. Add your favorite boost for ${money(pricing.smoothieBoostCents)}.`,bowl:'Organic açaí, fresh toppings and plenty of crunch. Or try our Greek yogurt bowl.',shot:'3 oz shots. Choose ginger, turmeric or apple cider vinegar.',food:'All served on organic wheat sprouted toast. A little something to go with your sip.','coffee-tea':'Coffee, matcha, chai and tea for your daily fresh moment.',coffee:'Your usual, made your way. Choose a published size, alternative milk or a flavor shot.',tea:'Hot or iced? Contact our Plantsville store for available teas, sizes and prices.',cleanse:'Five 16 oz juices per day: 2 Evergreen, 1 Heart Beet, 1 Refresher and 1 Sunset Detox. Please allow 2–3 hours.'};
let fulfillment = readStore('fp-v5-fulfillment','pickup');
if (!['pickup','delivery'].includes(fulfillment)) fulfillment='pickup';
let motionPaused = matchMedia('(prefers-reduced-motion: reduce)').matches;
let cart = [];
let toastTimer;
let buildState = null;
let detailState = null;
let lastAddedKey = null;
let cartNoticeTimer;

function lineDescription(line) {
  if (line.id==='custom-bowl') return 'Açaí + granola'+(line.options.toppings.length?' · '+line.options.toppings.join(', '):'');
  if (line.id==='custom-juice') return line.options.ingredients.join(', ');
  if (line.id==='custom-smoothie') return productById(line.options.recipe).name+(line.options.boosts.length?' · '+line.options.boosts.join(', '):'');
  const p=productById(line.id);
  if(p.variants) return [p.variants.find(v=>v.id===line.options.variant)?.label,line.options.milk,line.options.flavor && line.options.flavor+' flavor shot'].filter(Boolean).join(' · ');
  return line.options.boosts?.length?'Add: '+line.options.boosts.join(', '):productById(line.id).size;
}
function makeKey(id, options) { return id+'|'+JSON.stringify(options); }
const savedCart=readStore('fp-v5-cart',[]);
if(Array.isArray(savedCart)) for(const line of savedCart.slice(0,100)) {
  const p=productById(line?.id);if(!p||p.priceCents===null)continue;
  const options=normalizeOptions(p,line.options);if(unitPrice(p,options)===null)continue;
  const quantity=Math.max(1,Math.min(99,Math.floor(Number(line.quantity)||1)));
  cart.push({id:p.id,options,quantity,key:makeKey(p.id,options)});
}
function totals() { return cartTotals(cart); }
function saveCart(){writeStore('fp-v5-cart',cart);renderCart();}
function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('show');toastTimer=setTimeout(()=>$('#toast').classList.remove('show'),2600);}
function addItem(id, options={}, quantity=1, source) {
  const product=productById(id);
  if(!product || product.priceCents===null) return false;
  const clean=normalizeOptions(product,options);
  if(unitPrice(product,clean)===null)return false;
  const key=makeKey(id,clean),existing=cart.find(line=>line.key===key);
  const qty=Math.max(1,Math.min(99,Math.floor(Number(quantity)||1)));
  if(existing)existing.quantity=Math.min(99,existing.quantity+qty);else cart.push({id,options:clean,quantity:qty,key});
  lastAddedKey=key;
  saveCart();
  $$('.cart-count').forEach(el=>{el.classList.remove('bump');requestAnimationFrame(()=>el.classList.add('bump'));});
  $('#cartNotice').hidden=false;
  $('#cartNotice').innerHTML=icon('check')+'<span>'+esc(product.name)+' added to your bag</span>';
  clearTimeout(cartNoticeTimer);
  cartNoticeTimer=setTimeout(()=>{$('#cartNotice').hidden=true;lastAddedKey=null;},5000);
  openDialog('cartDialog');
  requestAnimationFrame(()=>$('.cart-row.just-added')?.scrollIntoView({block:'nearest',behavior:motionPaused?'instant':'smooth'}));
  if(source && !source.classList.contains('button')){source.classList.add('added');source.innerHTML=icon('check');setTimeout(()=>{if(source.isConnected){source.classList.remove('added');source.innerHTML=icon('plus');}},1600);}
  return true;
}
function openDialog(id){
  const dialog=document.getElementById(id);if(!dialog)return;
  if(dialog.open)return;
  const trigger=document.activeElement?.closest('dialog')?._trigger || document.activeElement;
  $$('dialog[open]').forEach(d=>{d.classList.remove('closing');d.close();});
  dialog._trigger=trigger;dialog.classList.remove('closing');dialog.showModal();
  if(id==='mobileMenu')$('[data-menu]').setAttribute('aria-expanded','true');
  hydrateFilms(dialog);syncVideos();
}
function closeDialog(dialog){
  if(!dialog?.open)return;
  if(dialog.id==='mobileMenu')$('[data-menu]').setAttribute('aria-expanded','false');
  if(motionPaused){dialog.close();dialog._trigger?.isConnected&&dialog._trigger.focus();return;}
  dialog.classList.add('closing');
  setTimeout(()=>{if(dialog.classList.contains('closing')){dialog.close();dialog.classList.remove('closing');if(dialog._trigger?.isConnected)dialog._trigger.focus();}},210);
}
$$('dialog').forEach(dialog=>{
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog(dialog);});
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)closeDialog(dialog);});
  dialog.addEventListener('close',()=>{$$('video',dialog).forEach(v=>v.pause());syncVideos();});
});

function card(product,index=0){
  const price=product.priceCents===null?'Ask in store':(product.from?'From ':'')+money(product.priceCents);
  const badge=product.builder?'MAKE IT YOURS':product.size || ({bowl:'BOWL GOODNESS',food:'FRESH TOAST',coffee:'COFFEE & TEA',cleanse:'SIGNATURE CLEANSE'}[product.cat]);
  const berryAccent=/very berry|heart beet|dragon bliss|strawberry|tropical bowl|summer bowl|nutella/i.test(product.name);
  return `<article class="product-card reveal${berryAccent?' berry-accent':''}" style="--card-bg:${product.bg};--delay:${(index%4)*65}ms"><a class="product-media ${product.cutout?'cutout':''}" href="shop.html?product=${encodeURIComponent(product.id)}" data-product="${product.id}"><img src="${product.image}" alt="${esc(product.representative?'Fresh Pressed '+({juice:'juice',smoothie:'smoothie',bowl:'bowl',food:'toast',coffee:'coffee preparation',tea:'tea and coffee preparation',shot:'shot',cleanse:'juice range'}[product.cat]):product.name)}" width="500" height="530" loading="lazy"><span class="product-tag">${esc(badge||'FRESHLY MADE')}</span></a><div class="product-info"><div class="product-title-line"><h3><a href="shop.html?product=${product.id}" data-product="${product.id}">${esc(product.name)}</a></h3><span class="product-price">${price}</span></div><p>${esc(product.desc)}</p><button class="quick-add" ${product.builder?`data-build="${product.builder}"`:product.priceCents===null||product.variants?`data-product="${product.id}"`:`data-add="${product.id}"`} aria-label="${product.builder?'Customize':product.priceCents===null?'View':product.variants?'Choose options for':'Add'} ${esc(product.name)}">${icon(product.variants?'arrow':'plus')}</button></div></article>`;
}
if($('#featuredGrid'))$('#featuredGrid').innerHTML=['green-machine','very-berry','tropical-bowl','citrus-breeze'].map((id,index)=>card(productById(id),index)).join('');
$$('[data-price]').forEach(el=>{const p=productById(el.dataset.price);el.textContent=p?.priceCents==null?'Ask in store':money(p.priceCents);});
$$('[data-rule-price]').forEach(el=>{el.textContent=money(pricing[el.dataset.rulePrice]);});
const url=new URL(location.href);
let shopState={cat:Object.keys(categoryNames).includes(url.searchParams.get('cat'))?url.searchParams.get('cat'):'all',query:url.searchParams.get('q')||'',sort:'featured'};
function renderShop(updateURL=false){
  if(!$('#productGrid'))return;
  let list=products.filter(p=>(shopState.cat==='all'||(shopState.cat==='coffee-tea'?['coffee','tea'].includes(p.cat):p.cat===shopState.cat))&&(!shopState.query||`${p.name} ${p.desc}`.toLocaleLowerCase().includes(shopState.query.toLocaleLowerCase())));
  if(shopState.sort==='az')list.sort((a,b)=>a.name.localeCompare(b.name));
  if(shopState.sort.startsWith('price'))list.sort((a,b)=>{if(a.priceCents===null)return 1;if(b.priceCents===null)return -1;return shopState.sort==='price-low'?a.priceCents-b.priceCents:b.priceCents-a.priceCents;});
  $('#productGrid').innerHTML=list.length?list.map(card).join(''):`<div class="empty-results"><h3>No matches just yet.</h3><p>Try another flavor or ingredient, or explore the full menu.</p><button class="button" data-reset-search>Show all products ${icon('arrow')}</button></div>`;
  $('#productCount').textContent=`${list.length} ${list.length===1?'item':'items'}`;
  $('#collectionTitle').textContent=shopState.query?'A fresh find.':categoryNames[shopState.cat];
  $('#collectionDescription').textContent=shopState.query?`Results for “${shopState.query}”` : categoryDescriptions[shopState.cat];
  $$('.filter').forEach(button=>{const active=button.dataset.filter===shopState.cat;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  $('#clearSearch').hidden=!shopState.query;
  if(updateURL){const next=new URL(location.href);next.searchParams.delete('product');next.searchParams.delete('search');if(shopState.cat==='all')next.searchParams.delete('cat');else next.searchParams.set('cat',shopState.cat);if(shopState.query)next.searchParams.set('q',shopState.query);else next.searchParams.delete('q');history.replaceState({},'',next);}
  observeReveals();
}
function selectCategory(category){
  shopState.cat=category;renderShop(true);
  if(!matchMedia('(max-width: 900px)').matches)return;
  requestAnimationFrame(()=>{
    const results=$('#productResults'),toolbar=$('.shop-toolbar'),header=$('.header');
    const top=results.getBoundingClientRect().top+scrollY-header.offsetHeight-toolbar.offsetHeight-12;
    window.scrollTo({top:Math.max(0,top),behavior:motionPaused?'instant':'smooth'});
    const row=$('.filter-row'),button=$('.filter.active');
    const left=button.getBoundingClientRect().left-row.getBoundingClientRect().left+row.scrollLeft-(row.clientWidth-button.offsetWidth)/2;
    row.scrollTo({left,behavior:motionPaused?'instant':'smooth'});
  });
}
$('#shopSearch')?.addEventListener('input',event=>{shopState.query=event.target.value.trim();renderShop(true);});
$('#searchForm')?.addEventListener('submit',event=>event.preventDefault());
$('#sortProducts')?.addEventListener('change',event=>{shopState.sort=event.target.value;renderShop();});
$('#clearSearch')?.addEventListener('click',()=>{shopState.query='';$('#shopSearch').value='';renderShop(true);$('#shopSearch').focus();});

function renderCart(){
  const t=totals();
  $$('.cart-count').forEach(el=>el.textContent=t.count);
  $$('[data-cart]').forEach(button=>button.setAttribute('aria-label',`Open bag, ${t.count} ${t.count===1?'item':'items'}`));
  $$('input[name=fulfillment]').forEach(input=>input.checked=input.value===fulfillment);
  $('.fulfillment-note').textContent=fulfillment==='pickup'?'Pickup at 930 Meriden-Waterbury Turnpike.':'Local delivery · address and availability confirmed before ordering.';
  $('#deliveryBar').max=pricing.deliveryMinimumCents/100;$('#deliveryBar').value=t.total/100;
  const needed=Math.max(0,pricing.deliveryMinimumCents-t.total);
  $('#deliveryText').textContent=needed?`${money(needed)} more for local delivery.`:'Your order qualifies for local delivery.';
  $('#deliveryProgress').classList.toggle('qualified',!needed);
  $('#cartItems').innerHTML=cart.length?cart.map((line,index)=>{
    const p=productById(line.id),visual=line.id==='custom-smoothie'?productById(line.options.recipe):p;
    return `<div class="cart-row ${line.key===lastAddedKey?'just-added':''}"><div class="cart-thumb ${visual.cutout?'cutout':''}" style="--card-bg:${visual.bg}"><img src="${visual.image}" alt="${esc(p.name)}" width="74" height="92"></div><div><h3>${esc(p.name)}</h3><p>${esc(lineDescription(line))}</p><div class="cart-row-price"><span>${money(unitPrice(p,line.options))} each</span><strong>${money(unitPrice(p,line.options)*line.quantity)}</strong></div><div class="cart-item-actions"><div class="quantity-control"><button data-quantity="${index}" data-change="-1" aria-label="Decrease ${esc(p.name)} quantity">${icon('minus')}</button><span aria-label="Quantity ${line.quantity}">${line.quantity}</span><button data-quantity="${index}" data-change="1" aria-label="Increase ${esc(p.name)} quantity" ${line.quantity>=99?'disabled':''}>${icon('plus')}</button></div><button class="remove-item" data-remove="${index}" aria-label="Remove ${esc(p.name)}">Remove</button></div></div></div>`;
  }).join(''):`<div class="cart-empty"><h3>A fresh start.</h3><p>Your bag is ready for something good.</p><a class="button" href="shop.html">Explore the menu ${icon('arrow')}</a></div>`;
  const upsell=productById('ginger-lemon-cayenne');
  $('#cartUpsell').innerHTML=cart.length&&!cart.some(i=>i.id===upsell.id)?`<h3>A little extra good.</h3><div class="upsell-row"><img src="${upsell.image}" alt="Fresh Pressed immunity shot" width="48" height="58"><p><strong>Ginger Lemon Cayenne</strong><br>3 oz · ${money(upsell.priceCents)}</p><button data-add="${upsell.id}">Add ${icon('plus')}</button></div>`:'';
  $('#cartTotals').innerHTML=`<div class="total-line"><span>Subtotal</span><span>${money(t.subtotal)}</span></div><div class="total-line grand-total"><span>Estimated total</span><span>${money(t.total)}</span></div>`;
  $('#checkoutButton').disabled=!cart.length||(fulfillment==='delivery'&&t.total<pricing.deliveryMinimumCents);
  $('#checkoutButton').innerHTML=!cart.length?'Your bag is empty':fulfillment==='delivery'&&t.total<pricing.deliveryMinimumCents?'Add more for local delivery':`Checkout ${icon('arrow')}`;
}
$$('input[name=fulfillment]').forEach(input=>input.addEventListener('change',()=>{fulfillment=input.value;writeStore('fp-v5-fulfillment',fulfillment);renderCart();}));
$('#discountForm').addEventListener('submit',event=>{
  event.preventDefault();const input=$('#discountCode');
  $('#discountMessage').textContent=input.value.trim()?'Discounts will be verified at checkout when online ordering launches.':'Enter your email offer code.';
});
$('#checkoutButton').addEventListener('click',()=>{
  const t=totals();if(!cart.length||(fulfillment==='delivery'&&t.total<pricing.deliveryMinimumCents))return;
  $('#infoContent').innerHTML=`<p class="eyebrow">YOUR ORDER PREVIEW</p><h2 id="infoTitle">Looking fresh.</h2><p>${fulfillment==='pickup'?'Pickup at 930 Meriden-Waterbury Turnpike, Plantsville.':'Local delivery selected. Delivery address and availability will be confirmed at checkout.'}</p><div class="order-summary">${cart.map(line=>`<div><span>${line.quantity} × ${esc(productById(line.id).name)}<br><small>${esc(lineDescription(line))}</small></span><strong>${money(unitPrice(productById(line.id),line.options)*line.quantity)}</strong></div>`).join('')}<div><strong>Estimated total</strong><strong>${money(t.total)}</strong></div></div><p>This is a preview. Online checkout is coming soon; no order has been placed and no payment has been taken. Taxes and delivery charges are not included.</p><button class="button" data-cart>Back to my bag ${icon('arrow')}</button>`;
  openDialog('infoDialog');
});
function openProduct(id){
  const p=productById(id);if(!p)return;
  if(p.builder){openBuilder(p.builder);return;}
  detailState={id:p.id,quantity:1,boosts:[],variant:p.variants?.[0]?.id,milk:'',flavor:''};
  $('#productDetail').innerHTML=`<div class="product-detail-grid"><div class="detail-image ${p.cutout?'cutout':''}" style="--card-bg:${p.bg}"><img src="${p.image}" alt="${esc(p.representative?'Fresh Pressed '+p.cat+' range':p.name)}" width="500" height="620"></div><div class="detail-copy"><p class="eyebrow">${esc(p.size||'FRESH PRESSED')}</p><h2 id="productTitle">${esc(p.name)}</h2><p class="detail-description">${esc(p.desc)}</p><div class="detail-price" id="detailPrice">${p.priceCents===null?'Ask us in store':money(p.priceCents)}</div>${p.variants?coffeeOptionsHTML(p):''}${p.cat==='smoothie'?`<details class="detail-modifiers"><summary>Make it yours · add a boost for ${money(pricing.smoothieBoostCents)} each</summary><div class="modifier-list">${boosts.map((boost,index)=>`<label><input type="checkbox" data-detail-boost="${index}">${esc(boost)} <span>+ ${money(pricing.smoothieBoostCents)}</span></label>`).join('')}</div></details>`:''}${p.priceCents!==null?`<div class="detail-add"><div class="quantity-control"><button data-detail-quantity="-1" aria-label="Decrease product quantity">${icon('minus')}</button><span id="detailQuantity">1</span><button data-detail-quantity="1" aria-label="Increase product quantity">${icon('plus')}</button></div><button class="button" id="detailAdd">Add to bag ${icon('plus')}</button></div>`:`<a class="button" href="tel:+18604260342">Call for sizes & prices ${icon('arrow')}</a>`}<small>Any item may contain peanuts, tree nuts, gluten, wheat, soy or dairy. If you have an allergy, please contact us before ordering.</small>${p.representative?'<small>Image shows a selection from this category. Your ingredients follow the description above.</small>':''}</div></div>`;
  openDialog('productDialog');
}
function updateDetailPrice(){if(!detailState)return;$('#detailQuantity').textContent=detailState.quantity;$('#detailPrice').textContent=money(unitPrice(productById(detailState.id),detailState)*detailState.quantity);}
function coffeeOptionsHTML(product){
  const variant=product.variants.find(v=>v.id===detailState.variant);
  return `<div class="coffee-options"><fieldset class="variant-options"><legend>${product.id==='espresso'?'Choose your shot':'Choose your size'}</legend>${product.variants.map(v=>`<label><input type="radio" name="coffeeVariant" value="${v.id}" ${v.id===detailState.variant?'checked':''}><span>${esc(v.label)}<strong>${money(v.priceCents)}</strong></span></label>`).join('')}</fieldset>${variant.sizeOz?`<label class="coffee-select-label" for="coffeeMilk">Milk<select id="coffeeMilk"><option value="">Standard</option>${coffeeMilks.map(m=>`<option value="${esc(m)}" ${detailState.milk===m?'selected':''}>${esc(m)} + ${money(pricing.alternativeMilkCents[variant.sizeOz])}</option>`).join('')}</select></label>`:''}<label class="coffee-select-label" for="coffeeFlavor">Flavor shot<select id="coffeeFlavor"><option value="">No flavor shot</option>${coffeeFlavors.map(f=>`<option value="${esc(f)}" ${detailState.flavor===f?'selected':''}>${esc(f)} + ${money(pricing.flavorShotCents)}</option>`).join('')}</select></label></div>`;
}
function openBuilder(kind){
  if(!['smoothie','bowl','juice'].includes(kind))return;
  buildState={kind,step:0,recipe:'strawberry-banana',boosts:[],fruits:[],toppings:[],ingredients:[]};
  renderBuilder();openDialog('builderDialog');
}
function builderOptions(){if(buildState.kind==='bowl')return {toppings:[...buildState.fruits,...buildState.toppings]};if(buildState.kind==='juice')return {ingredients:buildState.ingredients};return {recipe:buildState.recipe,boosts:buildState.boosts};}
function renderBuilder(){
  const s=buildState,kind=s.kind;
  const previousVisual=$('#builderContent .builder-visual');
  const headings=kind==='smoothie'?['Choose your blend.','Give it a little boost.','Your blend. Your way.']:kind==='bowl'?['Start with fresh fruit.','Add your finishing touches.','One very good bowl.']:['Pick your ingredients.','Check your fresh mix.','Ready for a fresh squeeze.'];
  const labels=kind==='smoothie'?['The blend','The boost','Your creation']:kind==='bowl'?['The fruit','The toppings','Your creation']:['Your ingredients','Your mix','Your creation'];
  let optionsHTML='',hint='';
  if(kind==='smoothie' && s.step===0){hint='Start with a menu smoothie. Then add your favorite boosts.';optionsHTML=products.filter(p=>p.cat==='smoothie'&&!p.builder).map(p=>`<button class="builder-option" data-recipe="${p.id}" aria-pressed="${s.recipe===p.id}">${esc(p.name)}<span>${money(p.priceCents)} · 20 oz</span></button>`).join('');}
  if(kind==='smoothie'&&s.step===1){hint=`Each boost is ${money(pricing.smoothieBoostCents)}. Pick your favorites, or keep it classic.`;optionsHTML=boosts.map((name,index)=>`<button class="builder-option" data-build-option="boosts" data-value="${index}" aria-pressed="${s.boosts.includes(name)}">${esc(name)}<span>+ ${money(kind==='bowl'?pricing.bowlToppingCents:pricing.smoothieBoostCents)}</span></button>`).join('');}
  if(kind==='bowl'&&s.step<2){const group=s.step===0?'fruits':'toppings',list=s.step===0?fruitOptions:toppingOptions;hint=s.step===0?`Organic açaí + granola starts at ${money(pricing.bowlBaseCents)}. Each fruit topping is ${money(pricing.bowlToppingCents)}.`:`Each topping is ${money(pricing.bowlToppingCents)}. Add your favorites, or keep it as it is.`;optionsHTML=list.map((name,index)=>`<button class="builder-option" data-build-option="${group}" data-value="${index}" aria-pressed="${s[group].includes(name)}">${esc(name)}<span>+ ${money(kind==='bowl'?pricing.bowlToppingCents:pricing.smoothieBoostCents)}</span></button>`).join('');}
  if(kind==='juice'&&s.step===0){hint=`Choose 2, 3 or 4 ingredients. ${Object.values(pricing.juiceIngredientPrices).map(money).join(' / ')}.`;optionsHTML=juiceOptions.map((name,index)=>`<button class="builder-option" data-build-option="ingredients" data-value="${index}" aria-pressed="${s.ingredients.includes(name)}" ${s.ingredients.length===4&&!s.ingredients.includes(name)?'disabled':''}>${esc(name)}</button>`).join('');}
  const custom=productById('custom-'+kind),options=builderOptions(),price=unitPrice(custom,normalizeOptions(custom,options));
  let review='';
  if(s.step===2 || (kind==='juice'&&s.step===1)){
    hint=s.step===2?'Looking good. Your choices and price travel with your order.':'Your juice, mixed just the way you like it.';
    review=`<div class="builder-review"><h4>${kind==='smoothie'?esc(productById(s.recipe).name):kind==='bowl'?'Açaí + granola':'Your custom juice'}</h4><p>${esc(lineDescription({id:custom.id,options:normalizeOptions(custom,options)}))}</p></div><p class="builder-hint" style="margin-top:18px">Allergens may include nuts, gluten, soy and dairy. Contact the store if you have an allergy.</p>`;
  }
  const canContinue=kind!=='juice'||s.ingredients.length>=2;
  $('#builderTitle').textContent=kind==='smoothie'?'Build your smoothie.':kind==='bowl'?'Build your bowl.':'Build your juice.';
  $('#builderContent').innerHTML=`<div class="builder-layout"><div class="builder-visual"><div class="film"><video autoplay muted loop playsinline preload="none" poster="media/posters/${kind==='bowl'?'build-your-own-bowl':kind==='smoothie'?'build-your-own-smoothie':'green-drink-30fps'}.jpg" data-video="media/${kind==='bowl'?'build-your-own-bowl':kind==='smoothie'?'build-your-own-smoothie':'green-drink-30fps'}.mp4" aria-label="Fresh Pressed ${kind} being made"></video></div></div><div class="builder-panel"><div class="step-progress">${labels.map((label,index)=>`<span class="${s.step>=index?'active':''}">${index+1}. ${label}</span>`).join('')}</div><h3 tabindex="-1" id="builderStepHeading">${headings[s.step]}</h3><p class="builder-hint">${hint}</p>${optionsHTML?`<div class="option-grid">${optionsHTML}</div>`:''}${review}<div class="builder-bottom"><div class="builder-total"><small>${price===null?'STARTING AT':'YOUR TOTAL'}</small>${money(price??custom.priceCents)}</div>${s.step>0?'<button class="builder-back" data-build-back>Back</button>':''}<button class="button" data-build-next ${!canContinue?'disabled':''}>${s.step===2?'Add to bag':'Next'} ${icon(s.step===2?'plus':'arrow')}</button></div></div></div>`;
  const nextVisual=$('#builderContent .builder-visual');
  if(previousVisual?.dataset.kind===kind)nextVisual.replaceWith(previousVisual);
  else nextVisual.dataset.kind=kind;
  if($('#builderDialog').open)hydrateFilms($('#builderDialog'));
}
function toggleBuilderOption(group,index){
  const source={boosts,fruits:fruitOptions,toppings:toppingOptions,ingredients:juiceOptions}[group];if(!source||!source[index])return;
  const name=source[index],values=buildState[group];if(values.includes(name))buildState[group]=values.filter(x=>x!==name);else if(group!=='ingredients'||values.length<4)values.push(name);
  const scroll=$('.option-grid')?.scrollTop||0;renderBuilder();if($('.option-grid'))$('.option-grid').scrollTop=scroll;
  $(`[data-build-option="${group}"][data-value="${index}"]`)?.focus({preventScroll:true});
}
function showInfo(kind){
  const content=kind==='gift'?`<p class="eyebrow">GIVE A LITTLE FRESH</p><h2 id="infoTitle">Good taste.<br>Great gift.</h2><p>A fresh favorite makes a thoughtful treat. Contact our Plantsville store to ask about gift card availability.</p><a class="button" href="tel:+18604260342">Ask about gift cards ${icon('arrow')}</a>`:`<p class="eyebrow">A FRESH ROUTINE</p><h2 id="infoTitle">Same good sip.<br>More good days.</h2><p>Subscribe & save is coming to online ordering. Explore your favorites today; recurring orders and subscription savings are not available yet.</p><a class="button" href="shop.html?cat=juice">Find my daily fresh ${icon('arrow')}</a>`;
  $('#infoContent').innerHTML=content;openDialog('infoDialog');
}
let promoShownThisLoad=false;
let promoAutoTimer=null;
function showPromo(){
  promoShownThisLoad=true;
  if(promoAutoTimer){clearTimeout(promoAutoTimer);promoAutoTimer=null;}
  openDialog('promoDialog');
}
$('#offerForm').addEventListener('submit',async event=>{
  event.preventDefault();const input=$('#offerEmail'),button=$('#offerSubmit'),error=$('#offerError');
  const email=input.value.trim();error.textContent='';input.removeAttribute('aria-invalid');
  if(!email||!input.validity.valid||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    error.textContent='Please enter a valid email address.';input.setAttribute('aria-invalid','true');input.focus();return;
  }
  button.disabled=true;button.textContent='Sending…';$('#offerForm').setAttribute('aria-busy','true');
  const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),10000);
  try{
    const result=await subscribeToFirstOrderOffer({email,consent:true,source:'first-order-popup'},controller.signal);
    $('#offerFormState').hidden=true;$('#offerSuccess').hidden=false;
    $('#promoDialog').setAttribute('aria-labelledby','offerSuccessTitle');
    $('#offerSuccessTitle').textContent=result.status==='preview'?'Signup preview complete.':result.status==='pending_confirmation'?'One more fresh step.':'You’re on the fresh side.';
    $('#offerSuccessText').textContent=result.status==='preview'?'Email signup isn’t connected yet. No email has been sent and your address has not been saved.':result.status==='pending_confirmation'?'Check your inbox to confirm your email address. Your first-order offer follows after confirmation.':'Thanks for joining us. Check your inbox for your first-order offer.';
    $('#offerSuccessTitle').focus();input.value='';
  }catch(errorValue){error.textContent=errorValue.name==='AbortError'?'That took a little too long. Please try again.':errorValue.message;}
  finally{clearTimeout(timer);button.disabled=false;button.innerHTML='Send my 20% off '+icon('arrow');$('#offerForm').removeAttribute('aria-busy');}
});
$('#offerReset').addEventListener('click',()=>{$('#offerFormState').hidden=false;$('#offerSuccess').hidden=true;$('#promoDialog').setAttribute('aria-labelledby','promoTitle');$('#offerError').textContent='';$('#offerEmail').focus();});
let lastInteraction=0;
// iOS can reject muted autoplay while Low Power Mode is enabled. Retry visible editorial
// films synchronously on the visitor's first touch so they start as soon as Safari permits it.
document.addEventListener('pointerdown',()=>{
  lastInteraction=Date.now();
  retryVisibleVideosFromGesture();
},{passive:true});

// Surface the first-order offer on every fresh homepage load. This deliberately uses an
// in-memory guard rather than sessionStorage so a reload behaves like a new storefront visit.
// If another dialog is open at that moment, keep retrying until the UI is clear.
function scheduleFirstOrderOffer(){
  if(!document.body.classList.contains('home')||promoShownThisLoad)return;
  let attempts=0;
  const tryOpen=()=>{
    if(promoShownThisLoad)return;
    attempts++;
    if(!document.hidden&&!$('dialog[open]')){showPromo();return;}
    if(attempts<20)promoAutoTimer=setTimeout(tryOpen,1000);
  };
  promoAutoTimer=setTimeout(tryOpen,9200);
}
scheduleFirstOrderOffer();

document.addEventListener('click',event=>{
  const target=event.target.closest('button,a');if(!target)return;
  if(target.hasAttribute('data-close')){closeDialog(target.closest('dialog'));return;}
  if(target.hasAttribute('data-cart')){event.preventDefault();renderCart();openDialog('cartDialog');return;}
  if(target.hasAttribute('data-menu')){openDialog('mobileMenu');return;}
  if(target.hasAttribute('data-promo')){showPromo();return;}
  if(target.dataset.add){const p=productById(target.dataset.add);if(!p)return;if(p.builder)openBuilder(p.builder);else addItem(p.id,{},1,target);return;}
  if(target.dataset.product){event.preventDefault();openProduct(target.dataset.product);return;}
  if(target.dataset.build){openBuilder(target.dataset.build);return;}
  if(target.dataset.info){showInfo(target.dataset.info);return;}
  if(target.hasAttribute('data-filter')){selectCategory(target.dataset.filter);return;}
  if(target.hasAttribute('data-reset-search')){shopState={cat:'all',query:'',sort:'featured'};$('#shopSearch').value='';$('#sortProducts').value='featured';renderShop(true);return;}
  if(target.hasAttribute('data-quantity')){const index=Number(target.dataset.quantity),delta=Number(target.dataset.change);if(!cart[index])return;cart[index].quantity+=delta;if(cart[index].quantity<=0)cart.splice(index,1);saveCart();$(`[data-quantity="${Math.min(index,cart.length-1)}"][data-change="${delta}"]`)?.focus();return;}
  if(target.hasAttribute('data-remove')){cart.splice(Number(target.dataset.remove),1);saveCart();$('#cartTitle').setAttribute('tabindex','-1');$('#cartTitle').focus();return;}
  if(target.hasAttribute('data-detail-quantity')){detailState.quantity=Math.max(1,Math.min(99,detailState.quantity+Number(target.dataset.detailQuantity)));updateDetailPrice();return;}
  if(target.id==='detailAdd'){addItem(detailState.id,detailState,detailState.quantity);closeDialog($('#productDialog'));return;}
  if(target.dataset.recipe){buildState.recipe=target.dataset.recipe;const scroll=$('.option-grid').scrollTop;renderBuilder();$('.option-grid').scrollTop=scroll;$(`[data-recipe="${buildState.recipe}"]`)?.focus({preventScroll:true});return;}
  if(target.dataset.buildOption){toggleBuilderOption(target.dataset.buildOption,Number(target.dataset.value));return;}
  if(target.hasAttribute('data-build-back')){buildState.step=Math.max(0,buildState.step-1);renderBuilder();$('#builderStepHeading').focus();return;}
  if(target.hasAttribute('data-build-next')){if(buildState.step<2){buildState.step++;renderBuilder();$('#builderStepHeading').focus();}else{const added=addItem('custom-'+buildState.kind,builderOptions());if(added)closeDialog($('#builderDialog'));}return;}
  if(target.classList.contains('film-toggle')){const video=$('video',target.closest('.film'));if(video.paused){if(matchMedia('(max-width: 900px)').matches)$$('video').filter(v=>v!==video).forEach(v=>v.pause());video._userPaused=false;ensureVideo(video);video.play().then(()=>updateVideoControl(video)).catch(()=>toast('This video could not play. Please try again.'));}else{video._userPaused=true;video.pause();updateVideoControl(video);}return;}
  if(target.closest('#mobileMenu')&&target.tagName==='A')closeDialog($('#mobileMenu'));
});
document.addEventListener('change',event=>{
  if(!detailState)return;
  if(event.target.matches('[data-detail-boost]')){detailState.boosts=$$('[data-detail-boost]:checked').map(input=>boosts[Number(input.dataset.detailBoost)]);updateDetailPrice();}
  if(event.target.name==='coffeeVariant'){
    detailState.variant=event.target.value;
    const product=productById(detailState.id);$('.coffee-options').outerHTML=coffeeOptionsHTML(product);updateDetailPrice();
    $(`input[name="coffeeVariant"][value="${detailState.variant}"]`).focus({preventScroll:true});
  }
  if(event.target.id==='coffeeMilk'){detailState.milk=event.target.value;updateDetailPrice();}
  if(event.target.id==='coffeeFlavor'){detailState.flavor=event.target.value;updateDetailPrice();}
});
const megaToggle=$('#megaToggle'),mega=$('#megaMenu');
megaToggle?.addEventListener('click',()=>{const expanded=megaToggle.getAttribute('aria-expanded')==='true';megaToggle.setAttribute('aria-expanded',String(!expanded));mega.hidden=expanded;});
document.addEventListener('click',event=>{if(!event.target.closest('.shop-nav')&&mega){mega.hidden=true;megaToggle.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&mega&&!mega.hidden){mega.hidden=true;megaToggle.setAttribute('aria-expanded','false');megaToggle.focus();}});
document.addEventListener('focusin',event=>{if(mega&&!mega.hidden&&!event.target.closest('.shop-nav')){mega.hidden=true;megaToggle.setAttribute('aria-expanded','false');}});

function seedMotionTargets(){
  $$('.category-row,.build-grid,.story-grid').forEach(group=>{
    [...group.children].forEach((el,index)=>{
      el.classList.add('reveal','reveal-item');
      el.style.setProperty('--delay',`${Math.min(index,3)*70}ms`);
    });
  });
  $$('.center-action,.community .button,.visit-actions').forEach(el=>el.classList.add('reveal'));
}
seedMotionTargets();
const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.04,rootMargin:'110px 0px 90px 0px'}):null;
function observeReveals(){if(!revealObserver||motionPaused){$$('.reveal').forEach(el=>el.classList.add('visible'));return;}$$('.reveal:not(.visible)').forEach(el=>revealObserver.observe(el));}
function updateVideoControl(video){const button=$('.film-toggle',video.closest('.film'));if(button){button.innerHTML=icon(video.paused?'play':'pause');button.setAttribute('aria-label',`${video.paused?'Play':'Pause'} ${video.getAttribute('aria-label')||'video'}`);}}
function ensureVideoFallback(video){
  const film=video.closest('.film');
  if(!film||!video.poster||$('.video-fallback',film))return;
  const image=document.createElement('img');
  image.className='video-fallback';
  image.src=video.poster;
  image.alt='';
  image.setAttribute('aria-hidden','true');
  image.decoding='async';
  film.prepend(image);
}
function ensureVideo(video,{loadSource=true}={}){
  video.muted=true;video.defaultMuted=true;video.autoplay=true;video.loop=true;video.controls=false;video.playsInline=true;
  video.setAttribute('autoplay','');video.setAttribute('loop','');video.setAttribute('playsinline','');video.setAttribute('webkit-playsinline','');video.setAttribute('muted','');video.removeAttribute('controls');
  ensureVideoFallback(video);
  video.closest('.film')?.classList.add('video-pending');
  if(loadSource&&!video.getAttribute('src')&&video.dataset.video){
    video.preload='auto';
    video.src=video.dataset.video;
    video.load();
  }else if(!loadSource&&!video.getAttribute('src')){
    video.preload='none';
  }
}
function videoNearViewport(video,margin=120){
  const rect=video.getBoundingClientRect();
  return rect.bottom>=-margin&&rect.top<=innerHeight+margin&&rect.right>=0&&rect.left<=innerWidth;
}
function attemptVideoPlay(video,{gesture=false}={}){
  if(!video||video._userPaused||document.hidden||video.closest('dialog:not([open])'))return Promise.resolve(false);
  ensureVideo(video);
  const film=video.closest('.film');
  // Calling play() directly from pointerdown preserves the iOS user-activation window.
  let result;
  try{result=video.play();}catch{result=Promise.reject(new Error('play failed'));}
  if(!result?.then){film?.classList.remove('autoplay-blocked');updateVideoControl(video);return Promise.resolve(true);}
  return result.then(()=>{
    film?.classList.remove('autoplay-blocked');
    video.dataset.autoplayState='playing';
    updateVideoControl(video);
    return true;
  }).catch(()=>{
    video.dataset.autoplayState=gesture?'blocked-after-gesture':'blocked';
    film?.classList.add('autoplay-blocked');
    updateVideoControl(video);
    return false;
  });
}
function syncVideos(){
  const open=$('dialog[open]'),mobile=matchMedia('(max-width: 900px)').matches;
  const candidates=$$('video[data-video]').filter(v=>
    !v._userPaused&&!v.closest('dialog:not([open])')&&(!open||open.contains(v))&&videoNearViewport(v,120)
  ).sort((a,b)=>{
    const ar=a.getBoundingClientRect(),br=b.getBoundingClientRect();
    const ac=Math.abs((ar.top+ar.bottom)/2-innerHeight/2),bc=Math.abs((br.top+br.bottom)/2-innerHeight/2);
    return ac-bc;
  });
  // One active movie on phones avoids decode/network contention that causes a start-stop feel.
  const allowed=!document.hidden&&!navigator.connection?.saveData?candidates.slice(0,mobile?1:2):[];
  $$('video[data-video]').forEach(video=>{
    if(allowed.includes(video)){
      if(video.paused)attemptVideoPlay(video);
    }else if(!video.paused){video.pause();}
  });
}
function retryVisibleVideosFromGesture(){
  if(document.hidden)return;
  const visible=$$('video[data-video]').filter(v=>!v._userPaused&&videoNearViewport(v));
  // Keep this synchronous with the pointer event; iOS may only grant playback here.
  visible.slice(0,2).forEach(video=>{attemptVideoPlay(video,{gesture:true});});
}
const filmObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  for(const entry of entries){
    const video=entry.target;
    video._inLoadZone=entry.isIntersecting;
    if(entry.isIntersecting){
      // Start fetching roughly a screen before the film arrives, but don't decode/play every film at once.
      ensureVideo(video,{loadSource:true});
      if(videoNearViewport(video,120))attemptVideoPlay(video);
    }else if(!video.paused){video.pause();}
  }
  syncVideos();
},{rootMargin:'850px 0px 850px 0px',threshold:0}):null;
function hydrateFilms(root=document){
  $$('video[data-video]',root).forEach(video=>{
    if(video.dataset.bound)return;
    video.dataset.bound='true';
    ensureVideo(video,{loadSource:false});
    const film=video.closest('.film');
    video.addEventListener('playing',()=>{
      film?.classList.remove('autoplay-blocked','video-pending');
      film?.classList.add('video-playing');
      updateVideoControl(video);
    });
    video.addEventListener('waiting',()=>film?.classList.add('video-buffering'));
    video.addEventListener('canplay',()=>{
      film?.classList.remove('video-buffering');
      if(videoNearViewport(video,120))attemptVideoPlay(video);
    });
    video.addEventListener('loadeddata',()=>film?.classList.add('video-loaded'),{once:true});
    video.addEventListener('pause',()=>updateVideoControl(video));
    filmObserver?.observe(video);
  });
  requestAnimationFrame(syncVideos);
}
function applyMotion(){
  document.body.classList.toggle('motion-paused',motionPaused);
  syncVideos();observeReveals();
}
matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',event=>{motionPaused=event.matches;applyMotion();});
document.addEventListener('visibilitychange',()=>{if(document.hidden)$$('video').forEach(video=>video.pause());else applyMotion();});
let scrollFrame=false;
window.addEventListener('scroll',()=>{if(scrollFrame)return;scrollFrame=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress')?.style.setProperty('--scroll',`${max>0?scrollY/max*100:0}%`);syncVideos();scrollFrame=false;});},{passive:true});
try{history.scrollRestoration='manual';}catch{/* not supported */}
window.addEventListener('pageshow',()=>{
  const nav=performance.getEntriesByType?.('navigation')?.[0];
  if(!location.hash&&nav?.type==='reload')requestAnimationFrame(()=>window.scrollTo({top:0,left:0,behavior:'instant'}));
});
const loader=$('#preloader');
if(loader){
  if(motionPaused)loader.classList.add('skip');
  else{
    const started=performance.now();
    const finish=()=>setTimeout(()=>loader.classList.add('done'),Math.max(0,1650-(performance.now()-started)));
    if(document.readyState==='complete')finish();else window.addEventListener('load',finish,{once:true});
  }
}
document.documentElement.classList.add('js-motion');
if($('#shopSearch'))$('#shopSearch').value=shopState.query;
renderShop();renderCart();observeReveals();hydrateFilms();applyMotion();
if(url.searchParams.get('product'))openProduct(url.searchParams.get('product'));
if(url.searchParams.get('search'))$('#shopSearch')?.focus();
// Category links from Home and the mobile menu land at the same useful results position.
if($('#productGrid') && shopState.cat!=='all' && !url.searchParams.get('product'))selectCategory(shopState.cat);
window.addEventListener('popstate',()=>{const params=new URL(location.href).searchParams;shopState.cat=Object.keys(categoryNames).includes(params.get('cat'))?params.get('cat'):'all';shopState.query=params.get('q')||'';if($('#shopSearch'))$('#shopSearch').value=shopState.query;renderShop();});

// Structured discovery uses the same catalog shown to visitors. It cannot order or charge.
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'search_freshpressed_menu',title:'Search Fresh Pressed menu',description:'Read matching menu items, prices and ingredients. Does not change the bag or place an order.',inputSchema:{type:'object',properties:{query:{type:'string',maxLength:100},category:{type:'string',enum:['all','juice','smoothie','bowl','shot','food','coffee-tea','coffee','tea','cleanse']}},additionalProperties:false},annotations:{readOnlyHint:true},execute(input){if(!input||typeof input!=='object'||Object.keys(input).some(k=>!['query','category'].includes(k))||('query'in input&&typeof input.query!=='string')||(input.query?.length||0)>100||('category'in input&&!Object.keys(categoryNames).includes(input.category)))throw new Error('Use a valid category and a query of at most 100 characters.');const q=(input.query||'').toLowerCase();return products.filter(p=>(!input.category||input.category==='all'||(input.category==='coffee-tea'?['coffee','tea'].includes(p.cat):p.cat===input.category))&&`${p.name} ${p.desc}`.toLowerCase().includes(q)).map(p=>({id:p.id,name:p.name,category:p.cat,price:p.priceCents===null?null:p.priceCents/100,from:!!p.from,variants:p.variants||null,ingredients:p.desc}));}},{signal:lifecycle.signal})).catch(()=>{});}catch{/* Progressive enhancement only. */}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}

/* Pass 6: self-guided horizontal category rails. */

/* Pass 6: self-guided horizontal category rails.
   They move just enough to reveal that more choices exist, then pause for direct interaction. */
function initAutoGlideRail(rail){
  if(!rail || rail.dataset.autoGlideBound || motionPaused) return;
  rail.dataset.autoGlideBound='true';
  let timer=null;
  let pausedUntil=0;
  let programmatic=false;
  const isScrollable=()=>rail.scrollWidth>rail.clientWidth+24;
  const delay=rail.dataset.autoRail==='filters'?2900:3200;
  const pauseFor=(ms=8500)=>{
    pausedUntil=Date.now()+ms;
    if(timer){clearTimeout(timer);timer=null;}
    timer=setTimeout(tick,ms+300);
  };
  const tick=()=>{
    if(motionPaused||document.hidden||Date.now()<pausedUntil||!isScrollable()){
      timer=setTimeout(tick,1800);
      return;
    }
    const max=rail.scrollWidth-rail.clientWidth;
    const atEnd=rail.scrollLeft>=max-22;
    const distance=rail.dataset.autoRail==='filters'
      ? Math.min(178,rail.clientWidth*.46)
      : Math.min(154,rail.clientWidth*.42);
    programmatic=true;
    rail.scrollTo({left:atEnd?0:Math.min(max,rail.scrollLeft+distance),behavior:'smooth'});
    setTimeout(()=>{programmatic=false;},700);
    timer=setTimeout(tick,delay);
  };
  ['pointerdown','touchstart','wheel'].forEach(type=>rail.addEventListener(type,()=>pauseFor(),{passive:true}));
  rail.addEventListener('focusin',()=>pauseFor(10000));
  rail.addEventListener('scroll',()=>{
    if(!programmatic && rail.matches(':hover')) pauseFor(6500);
  },{passive:true});
  timer=setTimeout(tick,1800);
}
$$('[data-auto-rail]').forEach(initAutoGlideRail);
