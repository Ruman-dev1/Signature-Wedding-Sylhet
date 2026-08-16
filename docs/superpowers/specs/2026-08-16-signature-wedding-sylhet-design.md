# Signature Wedding Sylhet — Website Design

**Date:** 2026-08-16
**Status:** Approved

## Overview

A marketing website for **Signature Wedding Sylhet**, a wedding photography &
videography business in Sylhet, Bangladesh. The site showcases the portfolio,
presents pricing packages, and drives client inquiries via WhatsApp (the
primary contact channel, commonly used in Bangladesh).

## Goals

- Showcase wedding photography/videography work through a polished portfolio.
- Present clear pricing packages with WhatsApp inquiry CTAs.
- Provide contact info and a WhatsApp-based contact path.
- Establish an elegant, premium brand feel.

## Non-goals

- No backend, database, or CMS — content is hand-written static HTML.
- No online payment or booking system.
- No real photos/pricing yet — placeholders only (owner will replace later).

## Architecture

Pure static multi-page site. **No build step, no dependencies.** Plain HTML,
CSS, and vanilla JS served by any static file server.

```
/
├── index.html          Home
├── gallery.html        Portfolio grid (photos + video)
├── packages.html       Pricing packages
├── about.html          Brand story + team
├── stories.html        Client stories / mini-blog
├── contact.html        Contact + WhatsApp CTA
├── css/style.css       Shared styles
├── js/main.js          Shared nav/footer/scroll animations
└── assets/images/      Placeholder photos
```

- Shared `<header>` (logo, nav, WhatsApp button) and `<footer>` (contact,
  socials) repeated on each page.
- One shared CSS file and one shared JS file keep maintenance simple.
- All internal navigation links are relative paths.

## Pages & Content

### Home (`index.html`)
- Full-screen hero with brand statement and cinematic background image.
- Featured portfolio preview (select images linking to gallery).
- Packages teaser (3 cards linking to packages page).
- Testimonials strip.
- WhatsApp CTA.

### Gallery (`gallery.html`)
- Filterable photo grid with categories: **All / Wedding / Engagement /
  Pre-wedding / Event**.
- Dedicated videography section (embedded video placeholders).

### Packages (`packages.html`)
- Three tiers: **Basic**, **Signature**, **Royal**.
- Each card: tier name, "starting from" price, feature list, "Inquire on
  WhatsApp" button with prefilled message.

### About (`about.html`)
- Brand story, mission, team section with placeholder photos.

### Stories (`stories.html`)
- 3+ sample blog-style posts about recent shoots (placeholder content).

### Contact (`contact.html`)
- Contact details, hours, location (Sylhet), social links.
- Form that composes a prefilled WhatsApp message on submit (no backend).

## Visual Style

- **Base:** dark charcoal/near-black backgrounds.
- **Accents:** gold + romantic pink highlights.
- **Typography:** serif display font for headings (Playfair Display), clean
  sans for body (Inter).
- **Motion:** subtle fade/slide-in on scroll (IntersectionObserver), smooth
  scroll, mobile slide-out nav.
- **Images:** high-quality placeholder images (Unsplash-sourced) until owner
  supplies real photos.
- Fully responsive: mobile, tablet, desktop.

## WhatsApp Integration

- Floating WhatsApp button on every page.
- Each package and the contact form open `https://wa.me/<number>` with a
  prefilled message. Phone number configured as a constant in `js/main.js`.

## Testing & Verification

- Serve the site locally and verify every page loads with no console errors.
- Check all internal links and WhatsApp links.
- Verify responsive layout at mobile, tablet, and desktop widths.
- Verify filter functionality in the gallery and nav behavior.
