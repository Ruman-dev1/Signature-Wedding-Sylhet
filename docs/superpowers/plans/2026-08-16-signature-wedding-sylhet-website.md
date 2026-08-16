# Signature Wedding Sylhet Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a pure-static, multi-page marketing website for Signature Wedding Sylhet (wedding photography & videography in Sylhet, Bangladesh) with portfolio, packages, about, stories, and WhatsApp-driven contact.

**Architecture:** Six hand-written HTML pages sharing one CSS file (`css/style.css`) and one JS file (`js/main.js`). No build step, no dependencies, no backend. Contact is handled entirely through prefilled WhatsApp links. Placeholder images are used throughout and are easily replaced later.

**Tech Stack:** Plain HTML5, CSS3 (custom properties, flexbox, grid, media queries), vanilla JavaScript (IntersectionObserver for scroll reveal, DOM-based gallery filtering).

## Global Constraints

- No build step, no package manager, no external JS/CSS libraries.
- Google Fonts loaded via `<link>` (Playfair Display + Inter).
- Brand palette: dark charcoal `#14110f` base, gold `#c9a24b`, romantic pink `#e8a2b6`.
- All WhatsApp links use the single constant `WHATSAPP_NUMBER = '8801712345678'` defined in `js/main.js`.
- All internal links are relative paths. Shared header/footer markup repeated verbatim on every page.
- Every page must be fully responsive (mobile slide-out nav under 768px).
- No emojis in content or code. No code comments.

---

### Task 1: Shared design system — CSS + JS

**Files:**
- Create: `css/style.css`
- Create: `js/main.js`
- Create: `assets/images/.gitkeep`

**Interfaces:**
- Produces: CSS classes used by all later tasks (header, footer, hero, buttons, cards, grids, filter bar, forms, whatsapp-float, reveal). JS globals: `WHATSAPP_NUMBER`, `waLink(message)`, nav toggle, scroll reveal, footer year.

- [ ] **Step 1: Create `css/style.css`**

Write the full design system. Key structure:

```css
:root {
  --dark: #14110f;
  --dark-2: #1d1917;
  --gold: #c9a24b;
  --pink: #e8a2b6;
  --text: #f4ede2;
  --muted: #b5a99a;
  --serif: 'Playfair Display', serif;
  --sans: 'Inter', sans-serif;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { background: var(--dark); color: var(--text); font-family: var(--sans); line-height: 1.6; }

/* Header */
.site-header { position: sticky; top: 0; z-index: 100; background: rgba(20,17,15,.92); backdrop-filter: blur(8px); border-bottom: 1px solid rgba(201,162,75,.25); }
.header-inner { max-width: 1200px; margin: 0 auto; padding: 1rem 1.25rem; display: flex; align-items: center; justify-content: space-between; }
.logo { font-family: var(--serif); font-size: 1.4rem; color: var(--text); text-decoration: none; letter-spacing: .04em; }
.logo span { color: var(--gold); }
.nav-links { display: flex; gap: 1.75rem; list-style: none; }
.nav-links a { color: var(--muted); text-decoration: none; font-size: .95rem; transition: color .2s; }
.nav-links a:hover, .nav-links a.active { color: var(--gold); }
.header-cta { display: flex; align-items: center; gap: .75rem; }
.nav-toggle { display: none; background: none; border: 0; color: var(--text); font-size: 1.6rem; cursor: pointer; }

/* Buttons */
.btn { display: inline-block; padding: .8rem 1.6rem; border-radius: 2px; text-decoration: none; font-weight: 600; font-size: .95rem; transition: all .2s; border: 1px solid transparent; }
.btn-gold { background: var(--gold); color: #14110f; }
.btn-gold:hover { background: #d8b361; }
.btn-outline { border-color: var(--gold); color: var(--gold); background: transparent; }
.btn-outline:hover { background: rgba(201,162,75,.15); }

/* Hero */
.hero { min-height: 88vh; display: flex; align-items: center; justify-content: center; text-align: center; background-size: cover; background-position: center; position: relative; }
.hero::after { content: ''; position: absolute; inset: 0; background: rgba(20,17,15,.55); }
.hero-content { position: relative; z-index: 1; max-width: 820px; padding: 2rem; }
.hero h1 { font-family: var(--serif); font-size: clamp(2.4rem, 6vw, 4.2rem); line-height: 1.15; margin-bottom: 1rem; }
.hero p { color: var(--muted); font-size: 1.1rem; margin-bottom: 2rem; max-width: 560px; margin-inline: auto; }
.hero-actions { display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; }

/* Section scaffolding */
.section { max-width: 1200px; margin: 0 auto; padding: 5rem 1.25rem; }
.section-head { text-align: center; max-width: 640px; margin: 0 auto 3rem; }
.eyebrow { color: var(--gold); text-transform: uppercase; letter-spacing: .18em; font-size: .8rem; }
.section-head h2 { font-family: var(--serif); font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: .5rem 0; color: var(--text); }
.section-head p { color: var(--muted); }

/* Grids */
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }

/* Cards */
.card { background: var(--dark-2); border: 1px solid rgba(201,162,75,.15); border-radius: 4px; overflow: hidden; }
.card img { width: 100%; height: 240px; object-fit: cover; display: block; }
.card-body { padding: 1.25rem; }
.card-body h3 { font-family: var(--serif); font-size: 1.2rem; margin-bottom: .4rem; }
.card-body p { color: var(--muted); font-size: .92rem; }

/* Gallery */
.filter-bar { display: flex; gap: .75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2.5rem; }
.filter-btn { background: none; border: 1px solid rgba(201,162,75,.4); color: var(--muted); padding: .55rem 1.2rem; border-radius: 999px; cursor: pointer; font-family: var(--sans); font-size: .9rem; transition: all .2s; }
.filter-btn:hover { border-color: var(--gold); color: var(--gold); }
.filter-btn.active { background: var(--gold); border-color: var(--gold); color: #14110f; }
.gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }
.gallery-item { position: relative; overflow: hidden; border-radius: 4px; cursor: pointer; }
.gallery-item img { width: 100%; height: 320px; object-fit: cover; display: block; transition: transform .4s; }
.gallery-item:hover img { transform: scale(1.05); }
.gallery-item.hidden { display: none; }

/* Packages */
.package-card { text-align: center; padding: 2.5rem 2rem; }
.package-card.featured { border-color: var(--gold); transform: scale(1.03); }
.package-card h3 { font-family: var(--serif); font-size: 1.5rem; }
.package-price { color: var(--gold); font-size: 1.5rem; font-weight: 700; margin: .75rem 0; }
.package-card ul { list-style: none; margin: 1.5rem 0 2rem; color: var(--muted); }
.package-card li { padding: .45rem 0; border-bottom: 1px dashed rgba(201,162,75,.2); }

/* Testimonials */
.testimonial { background: var(--dark-2); border-left: 3px solid var(--gold); padding: 1.75rem; border-radius: 4px; }
.testimonial p { color: var(--muted); font-style: italic; }
.testimonial cite { display: block; margin-top: .75rem; color: var(--gold); font-style: normal; font-size: .9rem; }

/* Stories */
.story-card .card-body { padding: 1.5rem; }
.story-card time { color: var(--gold); font-size: .8rem; text-transform: uppercase; letter-spacing: .12em; }
.story-card h3 { font-family: var(--serif); font-size: 1.35rem; margin: .4rem 0; }
.story-card p { color: var(--muted); }

/* Contact */
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
.contact-info h3 { font-family: var(--serif); margin-bottom: 1rem; }
.contact-info p { color: var(--muted); margin-bottom: .6rem; }
.contact-info a { color: var(--gold); text-decoration: none; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; margin-bottom: .4rem; font-size: .9rem; color: var(--muted); }
.form-group input, .form-group select, .form-group textarea { width: 100%; padding: .8rem 1rem; background: var(--dark-2); border: 1px solid rgba(201,162,75,.3); color: var(--text); border-radius: 4px; font-family: var(--sans); }
.form-group textarea { min-height: 120px; resize: vertical; }

/* Footer */
.site-footer { border-top: 1px solid rgba(201,162,75,.2); padding: 3rem 1.25rem; text-align: center; color: var(--muted); }
.site-footer a { color: var(--gold); text-decoration: none; }
.footer-socials { display: flex; gap: 1.25rem; justify-content: center; margin: 1rem 0; }

/* WhatsApp float */
.whatsapp-float { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 90; background: #25d366; color: #fff; width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; box-shadow: 0 4px 16px rgba(0,0,0,.4); font-size: 1.6rem; }

/* Scroll reveal */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.reveal.visible { opacity: 1; transform: none; }

/* Responsive */
@media (max-width: 900px) {
  .grid-3, .grid-4 { grid-template-columns: repeat(2, 1fr); }
  .contact-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .nav-toggle { display: block; }
  .nav-links { position: fixed; top: 0; right: -100%; width: 260px; height: 100vh; background: var(--dark-2); flex-direction: column; padding: 5rem 2rem; gap: 1.5rem; transition: right .3s ease; }
  .nav-links.open { right: 0; }
  .header-cta .btn { display: none; }
}
@media (max-width: 560px) {
  .grid-3, .grid-4 { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Create `js/main.js`**

```js
const WHATSAPP_NUMBER = '8801712345678';

function waLink(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', function () {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(function (a) {
  a.addEventListener('click', function () {
    if (navLinks) navLinks.classList.remove('open');
  });
});

const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

document.querySelectorAll('.filter-bar .filter-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-bar .filter-btn').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.classList.toggle('hidden', filter !== 'all' && !item.classList.contains('cat-' + filter));
    });
  });
});

const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
```

- [ ] **Step 3: Create placeholder assets dir**

```bash
mkdir -p assets/images && touch assets/images/.gitkeep
```

- [ ] **Step 4: Verify**

Serve the directory and check no JS syntax errors:

```bash
python3 -m http.server 8000 &
# then: curl -s http://localhost:8000/js/main.js | node --check
```

Expected: `node --check` exits 0 (no syntax errors).

- [ ] **Step 5: Commit**

```bash
git add css/style.css js/main.js assets/images/.gitkeep
git commit -m "feat: add shared design system, JS utilities, asset dir"
```

---

### Task 2: Home page

**Files:**
- Create: `index.html`

**Interfaces:**
- Consumes: classes from `css/style.css` (Task 1).
- Produces: canonical header/footer markup that Tasks 3-7 copy.

- [ ] **Step 1: Create `index.html`**

Use exactly this structure (header/footer become the shared template):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signature Wedding Sylhet — Wedding Photography & Videography</title>
  <meta name="description" content="Signature Wedding Sylhet captures your wedding day with cinematic photography and videography. Serving Sylhet, Bangladesh.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header">
    <div class="header-inner">
      <a class="logo" href="index.html">Signature<span> Wedding</span></a>
      <nav>
        <ul class="nav-links">
          <li><a href="index.html" class="active">Home</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="packages.html">Packages</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="stories.html">Stories</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div class="header-cta">
        <a class="btn btn-gold" href="contact.html">Book a Shoot</a>
        <button class="nav-toggle" aria-label="Menu">&#9776;</button>
      </div>
    </div>
  </header>

  <section class="hero" style="background-image:url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80');">
    <div class="hero-content">
      <p class="eyebrow">Wedding Photography & Videography — Sylhet, Bangladesh</p>
      <h1>Every Love Story Deserves a Signature</h1>
      <p>Cinematic coverage of your wedding, engagement, and pre-wedding moments — crafted with heart and delivered with timeless elegance.</p>
      <div class="hero-actions">
        <a class="btn btn-gold" href="gallery.html">View Our Work</a>
        <a class="btn btn-outline" href="packages.html">Explore Packages</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Featured Work</p>
      <h2>Moments We Have Framed</h2>
      <p>A glimpse into recent wedding stories. Visit the gallery for the full collection.</p>
    </div>
    <div class="grid-3">
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" alt="Couple under floral arch"></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" alt="Bride and groom"></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" alt="Wedding ceremony"></div>
    </div>
  </section>

  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Packages</p>
      <h2>Coverage to Fit Your Day</h2>
    </div>
    <div class="grid-3">
      <div class="card package-card reveal"><h3>Basic</h3><p class="package-price">From ৳25,000</p><p class="card-body" style="padding:0 1.25rem 2rem;">A complete photography coverage for an intimate wedding day.</p><a class="btn btn-outline" href="packages.html">See Details</a></div>
      <div class="card package-card featured reveal"><h3>Signature</h3><p class="package-price">From ৳45,000</p><p class="card-body" style="padding:0 1.25rem 2rem;">Photo + cinematic film for a fully documented celebration.</p><a class="btn btn-gold" href="packages.html">See Details</a></div>
      <div class="card package-card reveal"><h3>Royal</h3><p class="package-price">From ৳80,000</p><p class="card-body" style="padding:0 1.25rem 2rem;">Multi-day luxury coverage with full team and drone.</p><a class="btn btn-outline" href="packages.html">See Details</a></div>
    </div>
  </section>

  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Kind Words</p>
      <h2>What Couples Say</h2>
    </div>
    <div class="grid-3">
      <div class="testimonial reveal"><p>"They captured every emotion of our wedding day beautifully. The film still makes us cry."</p><cite>— Rimi & Shakil</cite></div>
      <div class="testimonial reveal"><p>"Professional, warm, and creative. The best decision we made for our wedding."</p><cite>— Nusrat & Arif</cite></div>
      <div class="testimonial reveal"><p>"From the first call to the final film, everything was flawless. Highly recommended."</p><cite>— Tania & Farhan</cite></div>
    </div>
  </section>

  <footer class="site-footer">
    <a class="logo" href="index.html">Signature<span> Wedding</span></a>
    <div class="footer-socials">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
      <a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a>
      <a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube</a>
    </div>
    <p>Sylhet, Bangladesh &nbsp;|&nbsp; <a href="contact.html">Contact Us</a></p>
    <p>&copy; <span id="year"></span> Signature Wedding Sylhet. All rights reserved.</p>
  </footer>

  <a class="whatsapp-float" href="https://wa.me/8801712345678?text=Hello%20Signature%20Wedding%2C%20I%27d%20like%20to%20inquire%20about%20your%20services." target="_blank" rel="noopener" aria-label="Chat on WhatsApp">&#9990;</a>

  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verify**

Serve locally and confirm the page renders and JS runs:

```bash
python3 -m http.server 8000 &
curl -s http://localhost:8000/ | grep -c "signature" # expect > 0
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/css/style.css   # 200
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/js/main.js     # 200
```

Open in browser at `http://localhost:8000/`: hero shows, reveal elements animate on scroll, nav toggle works at mobile width.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home page with hero, featured work, packages, testimonials"
```

---

### Task 3: Gallery page with filtering

**Files:**
- Create: `gallery.html`

**Interfaces:**
- Consumes: `.filter-bar`, `.filter-btn`, `.gallery-grid`, `.gallery-item`, `cat-<name>` classes (Task 1 CSS + JS).
- Produces: gallery markup that the filter JS in `js/main.js` operates on.

- [ ] **Step 1: Create `gallery.html`**

Copy the header/footer from `index.html` (Task 2), replacing `class="active"` so Gallery is active. Add the gallery section:

```html
  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Portfolio</p>
      <h2>Our Gallery</h2>
      <p>Weddings, engagements, pre-weddings, and events — filter to explore.</p>
    </div>

    <div class="filter-bar reveal">
      <button class="filter-btn active" data-filter="all">All</button>
      <button class="filter-btn" data-filter="wedding">Wedding</button>
      <button class="filter-btn" data-filter="engagement">Engagement</button>
      <button class="filter-btn" data-filter="prewedding">Pre-wedding</button>
      <button class="filter-btn" data-filter="event">Event</button>
    </div>

    <div class="gallery-grid reveal">
      <figure class="gallery-item cat-wedding"><img src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80" alt="Wedding couple"><figcaption class="card-body" style="display:none;"></figcaption></figure>
      <figure class="gallery-item cat-engagement"><img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80" alt="Engagement ring moment"></figure>
      <figure class="gallery-item cat-prewedding"><img src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=900&q=80" alt="Pre-wedding couple"></figure>
      <figure class="gallery-item cat-wedding"><img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80" alt="Wedding floral arch"></figure>
      <figure class="gallery-item cat-event"><img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80" alt="Celebration event"></figure>
      <figure class="gallery-item cat-engagement"><img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80" alt="Engagement couple"></figure>
      <figure class="gallery-item cat-wedding"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80" alt="Wedding ceremony"></figure>
      <figure class="gallery-item cat-prewedding"><img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=80" alt="Pre-wedding photoshoot"></figure>
      <figure class="gallery-item cat-event"><img src="https://images.unsplash.com/photo-1478147427282-58a87a120781?w=900&q=80" alt="Event celebration"></figure>
    </div>

    <div class="section-head reveal" style="margin-top:4rem;">
      <p class="eyebrow">Cinema</p>
      <h2>Films & Highlights</h2>
      <p>Video placeholders — real wedding films coming soon.</p>
    </div>
    <div class="grid-3">
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80" alt="Videography placeholder"><div class="card-body"><h3>Wedding Film</h3><p>Full-day cinematic highlight reel.</p></div></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80" alt="Videography placeholder"><div class="card-body"><h3>Teaser</h3><p>60-second social media teaser.</p></div></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" alt="Videography placeholder"><div class="card-body"><h3>Highlights</h3><p>Extended highlights of the celebration.</p></div></div>
    </div>
  </section>
```

Also update the page `<title>` and `meta description` for the Gallery page.

- [ ] **Step 2: Verify**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/gallery.html   # 200
```

In browser: clicking each filter button shows only matching items; "All" shows everything; no console errors.

- [ ] **Step 3: Commit**

```bash
git add gallery.html
git commit -m "feat: add gallery page with category filtering and video section"
```

---

### Task 4: Packages page with WhatsApp CTAs

**Files:**
- Create: `packages.html`

**Interfaces:**
- Consumes: `waLink(message)` from `js/main.js` (Task 1), `.package-card` styles.
- Produces: package inquiry links used in `contact.html` messaging too.

- [ ] **Step 1: Create `packages.html`**

Copy header/footer from `index.html`, Gallery nav item active. Add:

```html
  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Investment</p>
      <h2>Wedding Packages</h2>
      <p>Transparent pricing. Every package is tailored to your day — inquire on WhatsApp for details.</p>
    </div>

    <div class="grid-3">
      <div class="card package-card reveal">
        <h3>Basic</h3>
        <p class="package-price">From ৳25,000</p>
        <ul>
          <li>6 hours photography coverage</li>
          <li>1 photographer</li>
          <li>300+ edited photos</li>
          <li>Online gallery delivery</li>
          <li>2 months delivery</li>
        </ul>
        <a class="btn btn-outline" href="https://wa.me/8801712345678?text=Hello%20Signature%20Wedding%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Basic%20package." target="_blank" rel="noopener">Inquire on WhatsApp</a>
      </div>

      <div class="card package-card featured reveal">
        <h3>Signature</h3>
        <p class="package-price">From ৳45,000</p>
        <ul>
          <li>12 hours photography coverage</li>
          <li>Photo + cinematic film</li>
          <li>2 photographers + drone</li>
          <li>600+ edited photos</li>
          <li>5-7 minute highlight film</li>
          <li>1 month delivery</li>
        </ul>
        <a class="btn btn-gold" href="https://wa.me/8801712345678?text=Hello%20Signature%20Wedding%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Signature%20package." target="_blank" rel="noopener">Inquire on WhatsApp</a>
      </div>

      <div class="card package-card reveal">
        <h3>Royal</h3>
        <p class="package-price">From ৳80,000</p>
        <ul>
          <li>Multi-day coverage (2-3 days)</li>
          <li>Photo + full cinematic film</li>
          <li>Full team: 3 photographers + videographers</li>
          <li>1000+ edited photos</li>
          <li>10-15 minute feature film</li>
          <li>Same-day teaser</li>
        </ul>
        <a class="btn btn-outline" href="https://wa.me/8801712345678?text=Hello%20Signature%20Wedding%2C%20I%27d%20like%20to%20know%20more%20about%20the%20Royal%20package." target="_blank" rel="noopener">Inquire on WhatsApp</a>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Custom</p>
      <h2>Need Something Unique?</h2>
      <p>Every wedding is different. Tell us about your plans and we will design coverage around your day.</p>
      <div style="margin-top:1.5rem;">
        <a class="btn btn-gold" href="https://wa.me/8801712345678?text=Hello%20Signature%20Wedding%2C%20I%27d%20like%20a%20custom%20quote." target="_blank" rel="noopener">Get a Custom Quote</a>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Verify**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/packages.html   # 200
```

In browser: three package cards render, WhatsApp buttons open wa.me links with prefilled messages, featured card is highlighted.

- [ ] **Step 3: Commit**

```bash
git add packages.html
git commit -m "feat: add packages page with pricing tiers and WhatsApp CTAs"
```

---

### Task 5: About page

**Files:**
- Create: `about.html`

- [ ] **Step 1: Create `about.html`**

Copy header/footer from `index.html`, About nav item active. Content:

```html
  <section class="hero" style="min-height:50vh;background-image:url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80');">
    <div class="hero-content">
      <p class="eyebrow">About Us</p>
      <h1>The Story Behind the Lens</h1>
    </div>
  </section>

  <section class="section">
    <div class="grid-3" style="grid-template-columns:1fr 1fr;align-items:center;gap:3rem;">
      <div class="reveal"><img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80" alt="Team member" style="width:100%;border-radius:4px;"></div>
      <div class="reveal">
        <p class="eyebrow">Who We Are</p>
        <h2 style="font-family:var(--serif);font-size:2rem;margin:.5rem 0 1rem;">Signature Wedding Sylhet</h2>
        <p style="color:var(--muted);margin-bottom:1rem;">Based in the heart of Sylhet, we are a team of photographers and filmmakers devoted to documenting love. From intimate engagements to grand royal weddings, we believe every couple deserves a signature story told with artistry and heart.</p>
        <p style="color:var(--muted);margin-bottom:1rem;">Our approach is simple: blend into your day, capture the real emotions, and deliver timeless images and films you will treasure for a lifetime.</p>
        <p style="color:var(--muted);">Serving couples across Sylhet and beyond.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">The Team</p>
      <h2>People Behind the Camera</h2>
    </div>
    <div class="grid-3">
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" alt="Lead photographer"><div class="card-body"><h3>Arif Rahman</h3><p>Lead Photographer</p></div></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80" alt="Videographer"><div class="card-body"><h3>Sadia Islam</h3><p>Lead Videographer</p></div></div>
      <div class="card reveal"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80" alt="Creative director"><div class="card-body"><h3>Tanvir Ahmed</h3><p>Creative Director</p></div></div>
    </div>
  </section>
```

- [ ] **Step 2: Verify**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/about.html   # 200
```

In browser: hero, story section, and team cards render with reveal animations.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: add about page with brand story and team"
```

---

### Task 6: Stories page

**Files:**
- Create: `stories.html`

- [ ] **Step 1: Create `stories.html`**

Copy header/footer from `index.html`, Stories nav item active. Content:

```html
  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Journal</p>
      <h2>Client Stories</h2>
      <p>Recap of recent weddings, shoots, and behind-the-scenes moments.</p>
    </div>

    <div class="grid-3">
      <article class="card story-card reveal">
        <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80" alt="Rimi and Shakil wedding">
        <div class="card-body">
          <time>March 2026</time>
          <h3>A Royal Celebration in Sylhet</h3>
          <p>Three days, three venues, and a love story told across a full cinematic film. Behind the scenes from Rimi and Shakil's grand wedding.</p>
        </div>
      </article>
      <article class="card story-card reveal">
        <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80" alt="Engagement shoot">
        <div class="card-body">
          <time>February 2026</time>
          <h3>Golden Hour Engagement</h3>
          <p>An intimate engagement session by the haor at sunset — how we planned the shoot around the perfect light.</p>
        </div>
      </article>
      <article class="card story-card reveal">
        <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80" alt="Pre-wedding shoot">
        <div class="card-body">
          <time>January 2026</time>
          <h3>Pre-wedding Magic in the Tea Gardens</h3>
          <p>Capturing chemistry against the lush green slopes of Sylhet's iconic tea estates. A look behind the lens.</p>
        </div>
      </article>
    </div>
  </section>
```

- [ ] **Step 2: Verify**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/stories.html   # 200
```

In browser: three story cards render with dates, titles, and reveal animations.

- [ ] **Step 3: Commit**

```bash
git add stories.html
git commit -m "feat: add stories page with sample client stories"
```

---

### Task 7: Contact page with WhatsApp form

**Files:**
- Create: `contact.html`

**Interfaces:**
- Consumes: `waLink(message)` from `js/main.js` (Task 1).

- [ ] **Step 1: Create `contact.html`**

Copy header/footer from `index.html`, Contact nav item active. Add:

```html
  <section class="section">
    <div class="section-head reveal">
      <p class="eyebrow">Get in Touch</p>
      <h2>Let's Plan Your Day</h2>
      <p>Send us a message and we will reply on WhatsApp, usually within a few hours.</p>
    </div>

    <div class="contact-grid">
      <div class="contact-info reveal">
        <h3>Contact Information</h3>
        <p>Location: <a href="contact.html">Sylhet, Bangladesh</a></p>
        <p>WhatsApp: <a href="https://wa.me/8801712345678" target="_blank" rel="noopener">+880 1712-345678</a></p>
        <p>Email: <a href="mailto:hello@signaturewedding.com">hello@signaturewedding.com</a></p>
        <p>Hours: Daily, 10:00 AM - 9:00 PM</p>
        <div class="footer-socials" style="justify-content:flex-start;padding:0;">
          <a href="https://www.instagram.com/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener">Facebook</a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube</a>
        </div>
      </div>

      <form class="reveal" id="contact-form">
        <div class="form-group">
          <label for="name">Your Name</label>
          <input type="text" id="name" name="name" required>
        </div>
        <div class="form-group">
          <label for="event">Event Type</label>
          <select id="event" name="event">
            <option value="Wedding">Wedding</option>
            <option value="Engagement">Engagement</option>
            <option value="Pre-wedding">Pre-wedding</option>
            <option value="Event">Event</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="form-group">
          <label for="date">Event Date (if planned)</label>
          <input type="date" id="date" name="date">
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" placeholder="Tell us about your wedding plans..."></textarea>
        </div>
        <button type="submit" class="btn btn-gold">Send via WhatsApp</button>
      </form>
    </div>
  </section>
```

In `contact.html`, add before `</body>` (in addition to the shared `<script src="js/main.js">`):

```html
  <script>
    document.getElementById('contact-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value;
      var event = document.getElementById('event').value;
      var date = document.getElementById('date').value;
      var message = document.getElementById('message').value;
      var text = 'Hello Signature Wedding, I am ' + name + '. I am interested in ' + event +
        ' coverage' + (date ? ' on ' + date : '') + '. ' + message;
      window.open(waLink(text), '_blank');
    });
  </script>
```

- [ ] **Step 2: Verify**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/contact.html   # 200
```

In browser: submit the form (no required fields filled except name) and confirm it opens a `wa.me` link in a new tab with the prefilled message.

- [ ] **Step 3: Commit**

```bash
git add contact.html
git commit -m "feat: add contact page with WhatsApp form"
```

---

### Task 8: Final verification and README

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create `README.md`**

```markdown
# Signature Wedding Sylhet

Marketing website for a wedding photography & videography business in Sylhet, Bangladesh.

## Pages

- `index.html` — Home
- `gallery.html` — Portfolio gallery with category filter
- `packages.html` — Pricing packages
- `about.html` — Brand story and team
- `stories.html` — Client stories
- `contact.html` — Contact + WhatsApp form

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000

## Customize

- **WhatsApp number:** edit `WHATSAPP_NUMBER` in `js/main.js`.
- **Photos:** replace the Unsplash URLs in each HTML page.
- **Pricing:** edit the package prices/features in `packages.html` and the home teaser.
- **Fonts:** the Google Fonts `<link>` in the `<head>` of every page.
```

- [ ] **Step 2: Verify all pages**

```bash
for p in index gallery packages about stories contact; do
  echo -n "$p: "; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/$p.html;
done
```

Expected: each returns 200. Also run `node --check js/main.js` (exit 0), and manually test in browser: nav links on every page, gallery filter, mobile nav, WhatsApp float, form submit.

- [ ] **Step 3: Kill the test server and commit**

```bash
kill %1 2>/dev/null; git add README.md; git commit -m "docs: add README with setup and customization notes"
```

- [ ] **Step 4: Show the user**

Report the preview URL and summarize pages, customization points (WhatsApp number, photos, pricing), and how to run locally.
