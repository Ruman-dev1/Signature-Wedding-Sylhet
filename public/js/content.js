const DEFAULT_DATA = {
  settings: {
    whatsapp_number: '8801787341058',
    email: 'rumanrafsan@gmail.com',
    hours: 'Daily, 9:00 AM - 11:50 PM',
    location: 'Sylhet, Bangladesh',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    home_hero_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80'
  },
  packages: [
    { name: 'Basic', price: '৳25,000', description: 'A complete photography coverage for an intimate wedding day.', featured: false, features: ['6 hours photography coverage', '1 photographer', '300+ edited photos', 'Online gallery delivery', '2 months delivery'] },
    { name: 'Signature', price: '৳45,000', description: 'Photo + cinematic film for a fully documented celebration.', featured: true, features: ['12 hours photography coverage', 'Photo + cinematic film', '2 photographers + drone', '600+ edited photos', '5-7 minute highlight film', '1 month delivery'] },
    { name: 'Royal', price: '৳80,000', description: 'Multi-day luxury coverage with full team and drone.', featured: false, features: ['Multi-day coverage (2-3 days)', 'Photo + full cinematic film', 'Full team: 3 photographers + videographers', '1000+ edited photos', '10-15 minute feature film', 'Same-day teaser'] }
  ],
  gallery: [
    { category: 'wedding', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80', alt: 'Wedding couple' },
    { category: 'engagement', image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=900&q=80', alt: 'Engagement ring moment' },
    { category: 'prewedding', image: 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=900&q=80', alt: 'Pre-wedding couple' },
    { category: 'wedding', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=900&q=80', alt: 'Wedding floral arch' },
    { category: 'event', image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80', alt: 'Celebration event' },
    { category: 'engagement', image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80', alt: 'Engagement couple' },
    { category: 'wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=80', alt: 'Wedding ceremony' },
    { category: 'prewedding', image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=80', alt: 'Pre-wedding photoshoot' },
    { category: 'event', image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781?w=900&q=80', alt: 'Event celebration' }
  ],
  films: [
    { title: 'Wedding Film', description: 'Full-day cinematic highlight reel.', image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&q=80' },
    { title: 'Teaser', description: '60-second social media teaser.', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80' },
    { title: 'Highlights', description: 'Extended highlights of the celebration.', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80' }
  ],
  testimonials: [
    { quote: 'They captured every emotion of our wedding day beautifully. The film still makes us cry.', author: 'Rimi & Shakil' },
    { quote: 'Professional, warm, and creative. The best decision we made for our wedding.', author: 'Nusrat & Arif' },
    { quote: 'From the first call to the final film, everything was flawless. Highly recommended.', author: 'Tania & Farhan' }
  ],
  stories: [
    { image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', alt: 'Rimi and Shakil wedding', date: 'March 2026', title: 'A Royal Celebration in Sylhet', excerpt: 'Three days, three venues, and a love story told across a full cinematic film. Behind the scenes from Rimi and Shakil\'s grand wedding.' },
    { image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80', alt: 'Engagement shoot', date: 'February 2026', title: 'Golden Hour Engagement', excerpt: 'An intimate engagement session by the haor at sunset — how we planned the shoot around the perfect light.' },
    { image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80', alt: 'Pre-wedding shoot', date: 'January 2026', title: 'Pre-wedding Magic in the Tea Gardens', excerpt: 'Capturing chemistry against the lush green slopes of Sylhet\'s iconic tea estates. A look behind the lens.' }
  ],
  team: [
    { name: 'Arif Rahman', role: 'Lead Photographer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
    { name: 'Sadia Islam', role: 'Lead Videographer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
    { name: 'Tanvir Ahmed', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80' }
  ]
};

function esc(str) {
  return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
  });
}

function loadData() {
  return fetch('/api/data', { cache: 'no-store' })
    .then(function (res) { return res.ok ? res.json() : Promise.reject(); })
    .catch(function () { return DEFAULT_DATA; });
}

function applySettings(settings) {
  WHATSAPP_NUMBER = settings.whatsapp_number || WHATSAPP_NUMBER;

  var hero = document.querySelector('#home-hero');
  if (hero && settings.home_hero_image) {
    hero.style.backgroundImage = "url('" + settings.home_hero_image + "')";
  }

  var float = document.querySelector('.whatsapp-float');
  if (float) float.href = waLink('Hello Signature Wedding, I\'d like to inquire about your services.');

  var footerSocials = document.querySelector('.site-footer .footer-socials');
  if (footerSocials) {
    footerSocials.innerHTML =
      '<a href="' + esc(settings.instagram) + '" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="' + esc(settings.facebook) + '" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="' + esc(settings.youtube) + '" target="_blank" rel="noopener">YouTube</a>';
  }
}

function card(el, image, alt, body) {
  el.innerHTML =
    (image ? '<img src="' + esc(image) + '" alt="' + esc(alt || '') + '">' : '') +
    '<div class="card-body">' + body + '</div>';
}

function renderHome(data) {
  var featured = document.querySelector('#home-featured');
  if (featured) {
    featured.innerHTML = data.gallery.slice(0, 3).map(function (item) {
      return '<div class="card reveal"><img src="' + esc(item.image) + '" alt="' + esc(item.alt || '') + '"></div>';
    }).join('');
  }

  var packages = document.querySelector('#home-packages');
  if (packages) {
    packages.innerHTML = data.packages.slice(0, 3).map(function (p) {
      return '<div class="card package-card ' + (p.featured ? 'featured ' : '') + 'reveal">' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="package-price">From ' + esc(p.price) + '</p>' +
        '<p class="card-body" style="padding:0 1.25rem 2rem;">' + esc(p.description) + '</p>' +
        '<a class="btn ' + (p.featured ? 'btn-gold' : 'btn-outline') + '" href="packages.html">See Details</a>' +
        '</div>';
    }).join('');
  }

  var testimonials = document.querySelector('#home-testimonials');
  if (testimonials) {
    testimonials.innerHTML = data.testimonials.slice(0, 3).map(function (t) {
      return '<div class="testimonial reveal"><p>"' + esc(t.quote) + '"</p><cite>— ' + esc(t.author) + '</cite></div>';
    }).join('');
  }
}

function renderGallery(data) {
  var grid = document.querySelector('#gallery-grid');
  if (grid) {
    grid.innerHTML = data.gallery.map(function (item) {
      return '<figure class="gallery-item cat-' + esc(item.category) + '">' +
        '<img src="' + esc(item.image) + '" alt="' + esc(item.alt || '') + '"></figure>';
    }).join('');
  }

  var films = document.querySelector('#gallery-films');
  if (films) {
    films.innerHTML = data.films.map(function (f) {
      return '<div class="card reveal">' +
        '<img src="' + esc(f.image) + '" alt="' + esc(f.title) + '">' +
        '<div class="card-body"><h3>' + esc(f.title) + '</h3><p>' + esc(f.description) + '</p></div></div>';
    }).join('');
  }
}

function renderPackages(data) {
  var grid = document.querySelector('#packages-grid');
  if (grid) {
    grid.innerHTML = data.packages.map(function (p) {
      var features = (p.features || []).map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('');
      return '<div class="card package-card ' + (p.featured ? 'featured ' : '') + 'reveal">' +
        '<h3>' + esc(p.name) + '</h3>' +
        '<p class="package-price">From ' + esc(p.price) + '</p>' +
        '<ul>' + features + '</ul>' +
        '<a class="btn ' + (p.featured ? 'btn-gold' : 'btn-outline') + '" href="' + waLink('Hello Signature Wedding, I\'d like to know more about the ' + p.name + ' package.') + '" target="_blank" rel="noopener">Inquire on WhatsApp</a>' +
        '</div>';
    }).join('');
  }

  var cta = document.querySelector('#custom-quote-cta');
  if (cta) {
    cta.innerHTML = '<a class="btn btn-gold" href="' + waLink('Hello Signature Wedding, I\'d like a custom quote.') + '" target="_blank" rel="noopener">Get a Custom Quote</a>';
  }
}

function renderAbout(data) {
  var grid = document.querySelector('#team-grid');
  if (grid) {
    grid.innerHTML = data.team.map(function (m) {
      return '<div class="card reveal">' +
        '<img src="' + esc(m.image) + '" alt="' + esc(m.name) + '">' +
        '<div class="card-body"><h3>' + esc(m.name) + '</h3><p>' + esc(m.role) + '</p></div></div>';
    }).join('');
  }
}

function renderStories(data) {
  var grid = document.querySelector('#stories-grid');
  if (grid) {
    grid.innerHTML = data.stories.map(function (s) {
      return '<article class="card story-card reveal">' +
        '<img src="' + esc(s.image) + '" alt="' + esc(s.alt || '') + '">' +
        '<div class="card-body">' +
        '<time>' + esc(s.date) + '</time>' +
        '<h3>' + esc(s.title) + '</h3>' +
        '<p>' + esc(s.excerpt) + '</p>' +
        '</div></article>';
    }).join('');
  }
}

function renderContact(data) {
  var info = document.querySelector('#contact-info');
  if (info) {
    var s = data.settings;
    info.innerHTML =
      '<h3>Contact Information</h3>' +
      '<p>Location: <a href="contact.html">' + esc(s.location) + '</a></p>' +
      '<p>WhatsApp: <a href="' + waLink('Hello Signature Wedding') + '" target="_blank" rel="noopener">+' + esc(s.whatsapp_number) + '</a></p>' +
      '<p>Email: <a href="mailto:' + esc(s.email) + '">' + esc(s.email) + '</a></p>' +
      '<p>Hours: ' + esc(s.hours) + '</p>' +
      '<div class="footer-socials" style="justify-content:flex-start;padding:0;">' +
      '<a href="' + esc(s.instagram) + '" target="_blank" rel="noopener">Instagram</a>' +
      '<a href="' + esc(s.facebook) + '" target="_blank" rel="noopener">Facebook</a>' +
      '<a href="' + esc(s.youtube) + '" target="_blank" rel="noopener">YouTube</a>' +
      '</div>';
  }
}

loadData().then(function (data) {
  applySettings(data.settings);
  renderHome(data);
  renderGallery(data);
  renderPackages(data);
  renderAbout(data);
  renderStories(data);
  renderContact(data);
  observeReveals();
  initFilters();
});
