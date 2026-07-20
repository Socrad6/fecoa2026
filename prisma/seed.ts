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

  console.log('🎉 Seed terminé !')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
