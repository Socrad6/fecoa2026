import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Créer les types de billets
  const ticketTypes = [
    { slug: 'journee', name: 'Journée', description: 'Accès à une journée au choix', price: 1500, category: 'general' },
    { slug: 'enfant', name: 'Enfant (< 12 ans)', description: 'Tarif réduit pour les enfants', price: 800, category: 'child' },
    { slug: 'forfait', name: 'Forfait 4 jours', description: 'Accès complet à toutes les journées', price: 5500, category: 'general' },
    { slug: 'vip-journee', name: 'VIP Journée', description: 'Expérience premium pour 1 journée', price: 4500, category: 'vip' },
    { slug: 'vip-forfait', name: 'VIP Forfait 4 jours', description: 'L\'expérience ultime — accès complet VIP', price: 15000, category: 'vip' },
    { slug: 'gratuit', name: 'Moins de 5 ans', description: 'Entrée gratuite', price: 0, category: 'free' },
  ]

  for (const tt of ticketTypes) {
    await prisma.ticketType.upsert({
      where: { slug: tt.slug },
      update: {},
      create: tt,
    })
  }
  console.log(`  ✅ ${ticketTypes.length} types de billets créés`)

  // Créer les codes promo
  const promos = [
    { code: 'EARLYBIRD', discountType: 'percent', discountValue: 15, maxUses: 500 },
    { code: 'DIASPORA', discountType: 'percent', discountValue: 10, maxUses: 300 },
    { code: 'GROUPE', discountType: 'percent', discountValue: 20, maxUses: 100 },
  ]

  for (const p of promos) {
    await prisma.promoCode.upsert({
      where: { code: p.code },
      update: {},
      create: p,
    })
  }
  console.log(`  ✅ ${promos.length} codes promo créés`)

  // Créer l'admin
  const adminEmail = 'admin@fecoa2026.ca'
  const adminPassword = 'FECOA2026!'
  const passwordHash = await bcrypt.hash(adminPassword, 12)

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      firstName: 'Admin',
      lastName: 'FÉCOA',
      role: 'admin',
      passwordHash,
    },
  })
  console.log(`  ✅ Admin créé: ${adminEmail} / ${adminPassword}`)

  // Créer des exposants samples
  const sampleExhibitors = [
    { companyName: 'Teranga Artisanat', sector: 'Artisanat & Bijoux', country: 'Sénégal', description: 'Créations artisanales sénégalaises en argent et perles.' },
    { companyName: 'Baobab Foods', sector: 'Alimentation & Gastronomie', country: 'Mali', description: 'Produits à base de baobab, mangue et moringa.' },
    { companyName: 'Mode Faso', sector: 'Textile & Mode', country: 'Burkina Faso', description: 'Prêt-à-porter africain pour femmes.' },
    { companyName: 'NexTech Conakry', sector: 'Technologie & Services', country: 'Guinée', description: 'Solutions digitales pour entreprises en Afrique de l\'Ouest.' },
    { companyName: 'Sahel Cosmetics', sector: 'Cosmétique & Beauté', country: 'Sénégal', description: 'Cosmétiques naturels à base de beurre de karité.' },
  ]

  for (const ex of sampleExhibitors) {
    const user = await prisma.user.upsert({
      where: { email: `${ex.companyName.toLowerCase().replace(/\s+/g, '')}@exhibitor.fecoa` },
      update: {},
      create: {
        email: `${ex.companyName.toLowerCase().replace(/\s+/g, '')}@exhibitor.fecoa`,
        firstName: ex.companyName.split(' ')[0],
        lastName: 'Expo',
        role: 'exhibitor',
      },
    })
    await prisma.exhibitor.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, ...ex, standTier: 'standard', status: 'confirmed' },
    })
  }
  console.log(`  ✅ ${sampleExhibitors.length} exposants samples créés`)

  // Créer des sponsors samples
  const sampleSponsors = [
    { companyName: 'Banque Atlantique', packageLevel: 'platine', sector: 'Finance', amount: 5000000, contactName: 'Direction Marketing' },
    { companyName: 'Air Canada', packageLevel: 'platine', sector: 'Transport', amount: 5000000, contactName: 'Partenariats' },
    { companyName: 'Desjardins', packageLevel: 'or', sector: 'Finance', amount: 2500000, contactName: 'Sponsoring' },
    { companyName: 'Exportation Canada', packageLevel: 'or', sector: 'Gouvernement', amount: 2500000, contactName: 'Affaires' },
  ]

  for (const sp of sampleSponsors) {
    const user = await prisma.user.upsert({
      where: { email: `${sp.companyName.toLowerCase().replace(/\s+/g, '')}@sponsor.fecoa` },
      update: {},
      create: {
        email: `${sp.companyName.toLowerCase().replace(/\s+/g, '')}@sponsor.fecoa`,
        firstName: sp.companyName.split(' ')[0],
        lastName: 'Sponsor',
        role: 'sponsor',
      },
    })
    await prisma.sponsor.upsert({
      where: { userId: user.id },
      update: {},
      create: { userId: user.id, ...sp, status: 'confirmed' },
    })
  }
  console.log(`  ✅ ${sampleSponsors.length} sponsors samples créés`)

  console.log('🎉 Seed terminé !')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
