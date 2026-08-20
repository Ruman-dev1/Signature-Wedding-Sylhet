const SEED = {
  settings: {
    whatsapp_number: '8801787341058',
    email: 'rumanrafsan@gmail.com',
    hours: 'Daily, 9:00 AM - 11:50 PM',
    location: 'Sylhet, Bangladesh',
    instagram: 'https://www.instagram.com/',
    facebook: 'https://www.facebook.com/',
    youtube: 'https://www.youtube.com/',
    home_hero_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    about_hero_image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80',
    about_who_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80'
  },
  packages: [
    {
      name: 'Basic',
      price: '৳25,000',
      description: 'A complete photography coverage for an intimate wedding day.',
      features: [
        '6 hours photography coverage',
        '1 photographer',
        '300+ edited photos',
        'Online gallery delivery',
        '2 months delivery'
      ],
      featured: false
    },
    {
      name: 'Signature',
      price: '৳45,000',
      description: 'Photo + cinematic film for a fully documented celebration.',
      features: [
        '12 hours photography coverage',
        'Photo + cinematic film',
        '2 photographers + drone',
        '600+ edited photos',
        '5-7 minute highlight film',
        '1 month delivery'
      ],
      featured: true
    },
    {
      name: 'Royal',
      price: '৳80,000',
      description: 'Multi-day luxury coverage with full team and drone.',
      features: [
        'Multi-day coverage (2-3 days)',
        'Photo + full cinematic film',
        'Full team: 3 photographers + videographers',
        '1000+ edited photos',
        '10-15 minute feature film',
        'Same-day teaser'
      ],
      featured: false
    }
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
    {
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80',
      alt: 'Rimi and Shakil wedding',
      date: 'March 2026',
      title: 'A Royal Celebration in Sylhet',
      excerpt: 'Three days, three venues, and a love story told across a full cinematic film. Behind the scenes from Rimi and Shakil\'s grand wedding.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
      alt: 'Engagement shoot',
      date: 'February 2026',
      title: 'Golden Hour Engagement',
      excerpt: 'An intimate engagement session by the haor at sunset — how we planned the shoot around the perfect light.'
    },
    {
      image: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&q=80',
      alt: 'Pre-wedding shoot',
      date: 'January 2026',
      title: 'Pre-wedding Magic in the Tea Gardens',
      excerpt: 'Capturing chemistry against the lush green slopes of Sylhet\'s iconic tea estates. A look behind the lens.'
    }
  ],
  team: [
    { name: 'Arif Rahman', role: 'Lead Photographer', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80' },
    { name: 'Sadia Islam', role: 'Lead Videographer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80' },
    { name: 'Tanvir Ahmed', role: 'Creative Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80' }
  ]
};

const SECTIONS = ['packages', 'gallery', 'films', 'testimonials', 'stories', 'team'];

module.exports = { SEED, SECTIONS };
