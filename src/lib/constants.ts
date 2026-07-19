export const ticketTypes = [
  {
    slug: 'journee',
    name: 'Journée',
    description: 'Accès à une journée au choix',
    price: 1500, // 15 CAD en cents
    category: 'general',
    maxPerOrder: 20,
  },
  {
    slug: 'enfant',
    name: 'Enfant (< 12 ans)',
    description: 'Tarif réduit pour les enfants',
    price: 800,
    category: 'child',
    maxPerOrder: 20,
  },
  {
    slug: 'forfait',
    name: 'Forfait 4 jours',
    description: 'Accès complet à toutes les journées',
    price: 5500,
    category: 'general',
    maxPerOrder: 20,
  },
  {
    slug: 'vip-journee',
    name: 'VIP Journée',
    description: 'Expérience premium pour 1 journée',
    price: 4500,
    category: 'vip',
    maxPerOrder: 10,
  },
  {
    slug: 'vip-forfait',
    name: 'VIP Forfait 4 jours',
    description: 'L\'expérience ultime — accès complet VIP',
    price: 15000,
    category: 'vip',
    maxPerOrder: 10,
  },
  {
    slug: 'gratuit',
    name: 'Moins de 5 ans',
    description: 'Entrée gratuite',
    price: 0,
    category: 'free',
    maxPerOrder: 10,
  },
]

export const promoCodes = [
  { code: 'EARLYBIRD', discountType: 'percent', discountValue: 15, maxUses: 500 },
  { code: 'DIASPORA', discountType: 'percent', discountValue: 10, maxUses: 300 },
  { code: 'GROUPE', discountType: 'percent', discountValue: 20, maxUses: 100 },
]

export const standTiers = [
  { tier: 'essential', name: 'Essentiel', price: 80000, size: '4 m²' },
  { tier: 'standard', name: 'Standard', price: 150000, size: '9 m²' },
  { tier: 'premium', name: 'Premium', price: 280000, size: '16 m²' },
  { tier: 'custom', name: 'Sur Mesure', price: 0, size: '20 m²+' },
]

export const sponsorPackages = [
  { level: 'bronze', name: 'Bronze', price: 500000 },
  { level: 'silver', name: 'Argent', price: 1000000 },
  { level: 'gold', name: 'Or', price: 2500000 },
  { level: 'platinum', name: 'Platine', price: 5000000 },
]
