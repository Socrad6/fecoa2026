export type Locale = 'fr' | 'en'

export const locales: Locale[] = ['fr', 'en']
export const defaultLocale: Locale = 'fr'

export const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Navigation
    'nav.about': "L'événement",
    'nav.programme': 'Programme',
    'nav.billetterie': 'Billetterie',
    'nav.exposants': 'Exposants',
    'nav.sponsors': 'Sponsors',
    'nav.presse': 'Presse',
    'nav.contact': 'Contact',
    'nav.billets': 'Billets',

    // Hero
    'hero.date': '17 – 20 Décembre 2026 · Montréal, Canada',
    'hero.title.1': 'Foire',
    'hero.title.2': 'Économique',
    'hero.title.3': 'Ouest-Africaine',
    'hero.subtitle': 'Sénégal · Guinée · Mali · Diaspora',
    'hero.desc': "Quatre jours d'échanges commerciaux, de culture et de rencontres entre l'Afrique de l'Ouest et le Canada.",
    'hero.cta.tickets': 'Acheter un billet',
    'hero.cta.programme': 'Voir le programme',

    // Common
    'common.readMore': 'En savoir plus',
    'common.backHome': "Retour à l'accueil",
    'common.submit': 'Soumettre',
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',

    // Footer
    'footer.event': 'Événement',
    'footer.participation': 'Participation',
    'footer.legal': 'Légal',
    'footer.rights': 'Tous droits réservés.',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Restez informé des annonces de la FÉCOA 2026.',
    'footer.newsletter.placeholder': 'Votre courriel',
    'footer.newsletter.cta': "S'inscrire",

    // Billetterie
    'tickets.step1': '1. Choisir',
    'tickets.step2': '2. Panier',
    'tickets.step3': '3. Paiement',
    'tickets.selectDay': 'Choisir une journée',
    'tickets.cart': 'Votre panier',
    'tickets.total': 'Total',
    'tickets.pay': 'Payer',
    'tickets.promoCode': 'Code promo',
    'tickets.apply': 'Appliquer',

    // Contact
    'contact.title': 'Contactez-nous',
    'contact.name': 'Nom',
    'contact.email': 'Courriel',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer',
  },

  en: {
    // Navigation
    'nav.about': 'The Event',
    'nav.programme': 'Program',
    'nav.billetterie': 'Tickets',
    'nav.exposants': 'Exhibitors',
    'nav.sponsors': 'Sponsors',
    'nav.presse': 'Press',
    'nav.contact': 'Contact',
    'nav.billets': 'Tickets',

    // Hero
    'hero.date': 'December 17–20, 2026 · Montreal, Canada',
    'hero.title.1': 'West African',
    'hero.title.2': 'Economic & Cultural',
    'hero.title.3': 'Fair',
    'hero.subtitle': 'Senegal · Guinea · Mali · Diaspora',
    'hero.desc': 'Four days of business exchanges, culture, and networking between West Africa and Canada.',
    'hero.cta.tickets': 'Buy a ticket',
    'hero.cta.programme': 'View program',

    // Common
    'common.readMore': 'Learn more',
    'common.backHome': 'Back to home',
    'common.submit': 'Submit',
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',

    // Footer
    'footer.event': 'Event',
    'footer.participation': 'Participation',
    'footer.legal': 'Legal',
    'footer.rights': 'All rights reserved.',
    'footer.newsletter.title': 'Newsletter',
    'footer.newsletter.desc': 'Stay updated on FÉCOA 2026 announcements.',
    'footer.newsletter.placeholder': 'Your email',
    'footer.newsletter.cta': 'Subscribe',

    // Billetterie
    'tickets.step1': '1. Select',
    'tickets.step2': '2. Cart',
    'tickets.step3': '3. Payment',
    'tickets.selectDay': 'Select a day',
    'tickets.cart': 'Your cart',
    'tickets.total': 'Total',
    'tickets.pay': 'Pay',
    'tickets.promoCode': 'Promo code',
    'tickets.apply': 'Apply',

    // Contact
    'contact.title': 'Contact Us',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send',
  },
}
