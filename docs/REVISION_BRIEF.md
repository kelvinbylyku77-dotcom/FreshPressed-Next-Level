# Revision request supplied by the owner

Act as a senior Shopify eCommerce developer, CRO specialist, UX/UI designer,
mobile designer, motion designer, and front-end engineer.

You are working on the EXISTING Fresh Pressed redesign project I uploaded.

IMPORTANT:
Do not start over with a generic template.
Do not only give me recommendations.
Open the existing project, inspect all current files, and ACTUALLY MODIFY THE WEBSITE.

CURRENT LIVE BUSINESS WEBSITE / SOURCE OF TRUTH:
https://www.freshpressed-ct.com/

CURRENT MENU / PRICING SOURCE OF TRUTH:
https://www.freshpressed-ct.com/menu

MAIN DESIGN REFERENCE:
https://juise-organic-store.myshopify.com/

The redesigned Fresh Pressed website should continue moving toward the premium,
animated, colorful, organic Shopify experience of Juise Organic, but with its
own Fresh Pressed personality, media, logo, store, products and colors.

==================================================
1. FIX ALL PRODUCT PRICES ACROSS THE ENTIRE WEBSITE
==================================================

This is one of the highest-priority fixes.

Go through EVERY product currently shown anywhere in the project:

Homepage featured products
Shop page
Juices
Smoothies
Açaí bowls
Build Your Own
Toast
Shots
Coffee
Tea
Cleanses
Bundles
Cart
Quick Add
Recommended products
Upsells
Any promotional/product sections

DO NOT trust any placeholder or previously hard-coded price.

Use the ORIGINAL LIVE FRESH PRESSED WEBSITE as the source of truth:

https://www.freshpressed-ct.com/menu

Extract the current official price for every product from the live menu.

Then audit the entire redesigned website and make sure:

Product name matches
Product size matches
Product price matches
Variant prices match
Build Your Own pricing matches
Cleanse pricing matches
Add-ons/upcharges match
Coffee/tea pricing matches where published
Cart calculations use the same real price

There must NOT be one price shown on the product card and another price in the
cart.

There must NOT be invented prices.

If a specific price is not clearly available on the live Fresh Pressed site,
do not guess.

Flag that product in the project notes instead.

Create one central product/menu data source if possible so we are not repeating
prices manually throughout multiple HTML/JS sections.

The final architecture should make it easy to update a product price once and
have it update everywhere.

==================================================
2. FIX THE MOBILE DESIGN PROPERLY
==================================================

The mobile version still needs major work.

Test at minimum:

390px
393px
414px
430px

Do NOT simply shrink the desktop layout.

Inspect every section manually.

Fix:

Spacing
Margins
Typography
Section heights
Button sizing
Card widths
Image cropping
Video cropping
Header
Navigation
Product cards
Category selectors
Cart
Discount popup
Footer
Hero
Açaí section
Build Your Own
Featured products
Store/location section
All icons

Some of the current icons look cheap or awkward on mobile.

Replace bad icons with a professional, consistent icon system.

Icons should:

Use the same visual style
Have consistent stroke weights
Be properly centered
Be properly sized
Not look like random emoji
Not touch text
Not overflow buttons
Not look oversized on mobile

Use clean SVG icons where appropriate.

Do not use emoji as permanent interface icons.

Check specifically:

Menu icon
Close icon
Cart/bag
Search
Account
Arrow icons
Quantity + / -
Popup close icon
Category controls
Delivery / pickup icons
Social icons

==================================================
3. MOBILE CATEGORY NAVIGATION BEHAVIOR
==================================================

On mobile, when a visitor selects a category such as:

Juices
Smoothies
Açaí
Bowls
Shots
Toast
Coffee
Tea
Cleanses

the page currently changes the products but the customer may remain halfway
down the page.

Fix this.

Whenever the customer taps a category/filter on MOBILE:

1. Apply the selected category.
2. Smoothly scroll the customer back to the TOP OF THE PRODUCT RESULTS area.
3. Make the selected category visually obvious.
4. Keep the category navigation easy to swipe horizontally if needed.

Do NOT jump all the way to the absolute top/header unless that makes sense.

Scroll to the top of the Shop/product listing so the first products in the new
category are immediately visible.

Respect reduced-motion settings.

==================================================
4. ADD A REAL MINI CART EXPERIENCE
==================================================

When somebody clicks:

Add to Cart
Quick Add
Add to Order

do not silently update only the cart number.

A small cart experience should immediately appear.

DESKTOP:
Use a premium side cart drawer.

Prefer the right side unless the existing design works better elsewhere.

MOBILE:
Use either:

a polished bottom cart sheet

OR

a narrow mobile cart drawer

Choose whichever creates the best UX.

After adding a product, immediately show:

Product thumbnail
Product name
Price
Quantity
Subtotal
Cart total
Delivery progress
View Cart / Checkout CTA

Also allow:

Increase quantity
Decrease quantity
Remove item

The mini-cart should feel similar to a polished premium Shopify store.

Add subtle animation when an item enters the cart.

Update the cart count instantly.

Do NOT make the customer navigate away from the page every time they add
something.

==================================================
5. $12 LOCAL DELIVERY MINIMUM
==================================================

Fresh Pressed local delivery minimum is:

$12

Keep this logic.

Inside the cart show useful feedback.

Example if cart is $8.95:

"$3.05 more for local delivery."

Once the cart reaches $12:

"Your order qualifies for local delivery."

Pickup should still be possible where appropriate.

Do not make the delivery minimum confusing.

==================================================
6. CHANGE THE 20% DISCOUNT EXPERIENCE
==================================================

The current discount popup reveals the code too easily.

CHANGE IT.

The 20% discount should be used as an EMAIL ACQUISITION offer.

Main offer:

20% OFF YOUR FIRST ONLINE ORDER

The visitor must enter their EMAIL first.

Do NOT reveal the discount code immediately when the popup opens.

Popup structure:

20% OFF
YOUR FIRST ONLINE ORDER

Enter your email to receive your discount.

[ Email field ]

SEND MY 20% OFF

After successful signup:

Show a polished success state such as:

"Check your inbox — your 20% off is on the way."

Do NOT simply reveal FRESH20 before the visitor subscribes.

IMPORTANT:
If this project is still a front-end prototype and there is no real email
backend connected yet:

Do not fake an actual delivered email.

Instead:
- build the complete UI
- validate email
- create the success state
- add clearly documented integration hooks for Shopify Email / Klaviyo
- document where the real discount email automation will connect

When moved into Shopify/Klaviyo, the workflow should be:

Customer enters email
→ email is subscribed
→ welcome automation sends unique/approved 20% offer
→ customer receives code by email

Do not expose the code directly in page source/UI where avoidable.

==================================================
7. TOP 20% OFF ANNOUNCEMENT BAR MUST MOVE
==================================================

At the very top of the website we currently have messaging similar to:

FIRST ONLINE ORDER — TAKE 20% OFF

Turn this into a CONTINUOUSLY MOVING promotional ticker.

Example:

FIRST ONLINE ORDER • TAKE 20% OFF • FRESHLY MADE • PICKUP + LOCAL DELIVERY •
FIRST ONLINE ORDER • TAKE 20% OFF ...

It should slide continuously across the top.

Make it smooth.

No visible jump when looping.

Do not move too fast.

Pause or simplify appropriately for accessibility/reduced motion.

It should feel similar to a premium Shopify announcement marquee.

==================================================
8. UPDATE THE OFFICIAL FRESH PRESSED LOGO
==================================================

Use the real official Fresh Pressed logo exactly as it currently exists.

Source it from:

https://www.freshpressed-ct.com/

or the supplied Fresh Pressed media/assets.

Do NOT recreate the logo with text.

Do NOT redesign it.

Do NOT alter its proportions.

Use a clean transparent/high-quality version wherever possible.

Audit logo usage in:

Desktop header
Mobile header
Footer
Loader
Discount popup if applicable
Any brand story section

Make sure it remains readable on every background.

==================================================
9. EXTRACT MORE QUALITY MEDIA FROM THE CURRENT WEBSITE
==================================================

Review:

https://www.freshpressed-ct.com/

and relevant internal pages.

Inspect the actual original website assets.

Extract/download additional Fresh Pressed images that could improve the new
design, including if available:

Product imagery
Juices
Smoothies
Açaí bowls
Store photography
Ingredients
Team/store imagery
Gallery images
Menu photography
Lifestyle photography

IMPORTANT:

Do not randomly use every old image.

Compare the existing-site images against the newer professional media already
provided in this project.

Prioritize the best-quality/newest content.

Only bring old website images into the redesign where they genuinely fill a
gap.

Do not downgrade a section that already has better photography.

If the original site embeds useful videos or high-quality media that are
legitimately part of Fresh Pressed's own website, inspect and organize those
assets as well.

Save useful extracted assets into the media structure with sensible filenames.

Create/update a media manifest telling us:

source
filename
what the asset shows
where it is used

==================================================
10. GOOD MOOD. GREAT BOWL. SECTION
==================================================

This section needs to be redesigned.

Current issue:
The still image currently dominates the section.

CHANGE IT.

Use one of the strongest Açaí/bowl VIDEOS as the PRIMARY/BIGGER visual.

Best candidates from the provided media include:

Tropical Bowl FINAL
FP Bowl
Açaí Bowl
Build Your Own Bowl
Apple Açaí Bowl

Choose whichever looks strongest in the actual layout.

The video should be noticeably larger than the secondary image.

Possible layout:

Large video: 60–70%
Secondary supporting image/content: 30–40%

OR a more creative editorial overlapping composition.

The section should feel premium and visually rich.

Video requirements:

autoplay
muted
loop
playsinline

Use poster image.

Do not show ugly browser video controls.

Do not autoplay heavy media unnecessarily on low-power mobile devices if it
damages performance.

The section should immediately make someone want an Açaí bowl.

==================================================
11. RETHINK "BIG FLAVOR. GOOD ENERGY."
==================================================

The current positioning/layout of:

BIG FLAVOR.
GOOD ENERGY.

needs to be redesigned.

Do NOT simply move it a few pixels.

Reconsider the whole composition.

Problems to investigate:

Relationship between text and media
Text scale
Whitespace
Image/video crop
Vertical rhythm
CTA placement
Desktop composition
Mobile composition
Whether text overlaps product correctly
Whether it looks too generic

Make it feel editorial and intentional.

Consider:

oversized typography
split-screen composition
text partially entering media
layered video
scroll reveal
sticky text
mask animation
offset imagery
asymmetric layout

Use the visual language of premium Shopify brands such as Juise as inspiration,
but make it original to Fresh Pressed.

The section must NOT look like a template with:

left text
right rectangle image

Make it visually memorable.

==================================================
12. CONTINUE PUSHING TOWARD THE JUISE DESIGN LEVEL
==================================================

Reference:

https://juise-organic-store.myshopify.com/

Do NOT copy their site literally.

Do NOT copy proprietary theme source code.

Study what makes it feel premium:

Motion
Organic shapes
Typography
Product presentation
Spacing
Creative section transitions
Ingredient graphics
Hover interactions
Color blocking
Product photography
Visual rhythm
Loading experience
Promotional elements
Cart interaction
Mobile composition

Then reinterpret that experience for Fresh Pressed.

Fresh Pressed should have a PERSONALIZED identity using:

its existing logo
green
yellow
orange
red/pink product colors
real Fresh Pressed products
real store imagery
fresh ingredients
Açaí
cold-pressed juices
smoothies
Connecticut/local identity

==================================================
13. DO NOT OVERLOAD THE HOMEPAGE
==================================================

Keep the current strategy:

Homepage:
approximately 3–4 featured products.

Then:

SHOP ALL PRODUCTS

The complete menu belongs on Shop.

Do not start dumping all products onto the homepage again.

The homepage sells the BRAND and guides users.

The Shop page handles the catalog.

==================================================
14. PRODUCT IMAGERY
==================================================

Every visible featured product should use the best available REAL Fresh Pressed
image/video.

Do not use generic illustrated bottle placeholders when real media exists.

For each featured product choose media that actually matches or closely
represents the product/category.

Maintain good crops.

Avoid:

heads cut off
cups cut off awkwardly
logos hidden
important food outside frame
extreme object-fit zoom
blurry screenshots

==================================================
15. MOBILE HEADER
==================================================

Completely review the mobile header.

It should feel premium and minimal.

Suggested layout:

Menu
Centered Fresh Pressed logo
Search/Cart

Keep enough breathing room.

Make cart count readable.

Ensure icons align perfectly.

Sticky behavior should feel smooth.

Do not let the announcement ticker interfere with the header.

==================================================
16. PERFORMANCE
==================================================

There is now a lot of media.

Do not preload everything.

Use:

poster images
lazy loading
loading="lazy"
muted autoplay only where justified
playsinline
intersection observers if appropriate

Load primary hero media first.

Load below-the-fold video only shortly before it enters the viewport.

Avoid multiple heavy videos running simultaneously on mobile.

Compress or use the optimized versions already provided.

==================================================
17. ACCESSIBILITY
==================================================

Maintain:

keyboard support
focus states
semantic buttons
semantic links
form labels
aria labels where required
proper popup focus trap
ESC close behavior
accessible cart drawer
reduced motion support
color contrast

==================================================
18. SHOP PAGE
==================================================

Apply the same quality level to Shop.

Fix:

category mobile scroll behavior
product prices
filter UI
icons
spacing
product imagery
Quick Add
cart drawer
mobile typography
empty/no-results state

The Shop page should NOT look like a secondary unfinished page.

==================================================
19. FINAL QA — REQUIRED
==================================================

Before finishing, test:

Desktop homepage
Desktop Shop
390px mobile
393px mobile
414px mobile
430px mobile

Test:

Loading animation
Announcement marquee
Header
Mobile menu
Shop category selection
Auto-scroll to product results
Search
Quick Add
Add to Cart
Cart drawer/bottom sheet
Quantity controls
Remove item
$12 delivery minimum
20% popup
Email validation
Popup success state
Featured product prices
All Shop prices
Açaí section video
Big Flavor Good Energy layout
Videos
Logo
Footer
Overflow
Broken images
Broken links

Open the browser console and fix JS errors.

Check that no horizontal overflow exists on mobile.

==================================================
20. IMPORTANT BUSINESS INFORMATION
==================================================

Brand:
Fresh Pressed

Official site:
https://www.freshpressed-ct.com/

Menu/pricing:
https://www.freshpressed-ct.com/menu

Address:
930 Meriden-Waterbury Turnpike
Plantsville, CT 06479

Local delivery minimum:
$12

Pickup:
Yes

Local delivery:
Yes

Catering:
Do NOT add it right now.

Existing Fresh Pressed logo:
MUST remain.

Açaí:
Must remain a major visual/product category.

==================================================
FINAL EXPECTATION
==================================================

Do not respond with only:

"Here are the improvements I recommend."

Actually implement the changes in the uploaded project.

You are expected to make design decisions yourself.

You may significantly rewrite the existing CSS/JS/HTML where the current
implementation limits quality.

The result needs to be noticeably more polished than the current version.

This revision should specifically solve:

wrong/inconsistent prices
weak mobile design
bad mobile icons
weak Add to Cart feedback
discount code being revealed too easily
static promo bar
incorrect/weak logo implementation
underused Fresh Pressed media
weak Açaí composition
weak Big Flavor Good Energy composition
poor category UX on mobile

The target is not merely "better."

The target is:

a polished, animated, conversion-focused Fresh Pressed eCommerce experience
that feels custom-built and visually competitive with premium Shopify food and
beverage brands.