import { Resend } from 'resend'
import { logger } from '@/lib/logger'
import { generateTicketQR } from '@/lib/qr'
import { SITE } from '@/lib/site'

const ctx = 'email'

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key || key.startsWith('re_REMPLACER')) {
    logger.warn(ctx, 'RESEND_API_KEY not configured — emails disabled')
    return null
  }
  return new Resend(key)
}

const FROM = process.env.EMAIL_FROM || 'billetterie@fecoa2026.ca'

// ═══════════════════════════════════════
// EMAIL TEMPLATES
// ═══════════════════════════════════════

function ticketEmailHTML(data: {
  firstName: string
  orderId: string
  items: { name: string; quantity: number; unitPrice: number }[]
  total: number
  tickets: { type: string; qrCode: string; qrDataUrl: string }[]
}): string {
  const itemRows = data.items
    .map(i => `<tr><td style="padding:10px 16px;border-bottom:1px solid #eee;font-size:14px;">${i.quantity}x ${i.name}</td><td style="padding:10px 16px;border-bottom:1px solid #eee;text-align:right;font-weight:600;color:#C89B3C;">${(i.unitPrice / 100).toFixed(2)} CAD</td></tr>`)
    .join('')

  const ticketCards = data.tickets
    .map(
      (t, i) => `
    <div style="background:#faf9f7;border:1px solid #e5e2dc;border-radius:12px;padding:24px;text-align:center;margin-bottom:16px;">
      <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C89B3C;">Billet ${i + 1} sur ${data.tickets.length}</p>
      <p style="margin:0 0 16px;font-size:16px;font-weight:600;color:#111827;">${t.type}</p>
      <img src="${t.qrDataUrl}" alt="QR Code billet" style="width:160px;height:160px;border-radius:8px;margin:0 auto 12px;display:block;" />
      <p style="margin:0;font-size:10px;color:#6b7280;letter-spacing:1px;">${t.qrCode}</p>
    </div>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#061524 0%,#0d2d4a 100%);padding:40px 40px 32px;text-align:center;">
          <h1 style="margin:0;font-size:28px;font-weight:700;color:#C89B3C;letter-spacing:2px;">FÉCOA 2026</h1>
          <p style="margin:8px 0 0;font-size:12px;color:#7a8fa8;letter-spacing:3px;text-transform:uppercase;">Foire Économique et Culturelle Ouest-Africaine</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;font-size:22px;color:#111827;">Merci pour votre achat, ${data.firstName} !</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Voici vos billets pour la FÉCOA 2026. Présentez-les (imprimés ou sur mobile) à l'entrée de l'événement.</p>

          <p style="margin:0 0 8px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C89B3C;">Commande #${data.orderId.slice(-8).toUpperCase()}</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e2dc;border-radius:8px;overflow:hidden;margin-bottom:24px;">
            <tr><td style="background:#f0eeea;padding:10px 16px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;">Détails</td><td style="background:#f0eeea;padding:10px 16px;font-size:11px;font-weight:700;text-align:right;color:#6b7280;">Prix</td></tr>
            ${itemRows}
            <tr><td style="padding:12px 16px;font-size:16px;font-weight:700;">Total</td><td style="padding:12px 16px;text-align:right;font-size:16px;font-weight:700;color:#C89B3C;">${(data.total / 100).toFixed(2)} CAD</td></tr>
          </table>

          <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#C89B3C;">Vos billets</p>
          ${ticketCards}

          <div style="text-align:center;margin-top:32px;">
            <a href="${SITE.url}/billetterie/confirmation?order=${data.orderId}" style="display:inline-block;background:linear-gradient(135deg,#C89B3C,#E8B84B);color:#061524;font-size:13px;font-weight:600;padding:14px 32px;border-radius:9999px;text-decoration:none;letter-spacing:1px;">VOIR MES BILLETS</a>
          </div>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f0eeea;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 4px;font-size:11px;color:#6b7280;">${SITE.dates} · ${SITE.location}</p>
          <p style="margin:0;font-size:11px;color:#6b7280;">${SITE.emails.general} · ${SITE.phone}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function newsletterWelcomeHTML(email: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#061524,#0d2d4a);padding:40px;text-align:center;">
          <h1 style="margin:0;font-size:24px;color:#C89B3C;letter-spacing:2px;">FÉCOA 2026</h1>
        </td></tr>
        <tr><td style="padding:40px;text-align:center;">
          <h2 style="margin:0 0 12px;font-size:20px;color:#111827;">Bienvenue dans la newsletter !</h2>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Vous recevrez nos prochaines annonces concernant la FÉCOA 2026 : programme, artistes, billetterie early bird et plus encore.</p>
          <a href="${SITE.url}" style="display:inline-block;background:linear-gradient(135deg,#C89B3C,#E8B84B);color:#061524;font-size:13px;font-weight:600;padding:12px 28px;border-radius:9999px;text-decoration:none;">DÉCOUVRIR LA FÉCOA</a>
        </td></tr>
        <tr><td style="background:#f0eeea;padding:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#6b7280;">${SITE.dates} · ${SITE.location}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function contactConfirmationHTML(name: string, subject: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#faf9f7;font-family:'DM Sans',system-ui,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf9f7;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;">
        <tr><td style="background:linear-gradient(135deg,#061524,#0d2d4a);padding:40px;text-align:center;">
          <h1 style="margin:0;font-size:24px;color:#C89B3C;letter-spacing:2px;">FÉCOA 2026</h1>
        </td></tr>
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 12px;font-size:20px;color:#111827;">Message bien reçu</h2>
          <p style="margin:0 0 8px;font-size:14px;color:#6b7280;">Bonjour ${name},</p>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">Nous avons bien reçu votre message concernant « ${subject || 'votre demande'} ». Notre équipe vous répondra dans les plus brefs délais.</p>
          <p style="margin:0;font-size:14px;color:#6b7280;">Merci pour votre intérêt pour la FÉCOA 2026 !</p>
        </td></tr>
        <tr><td style="background:#f0eeea;padding:20px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#6b7280;">${SITE.dates} · ${SITE.location}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

// ═══════════════════════════════════════
// SEND FUNCTIONS
// ═══════════════════════════════════════

export async function sendTicketEmail(data: {
  to: string
  firstName: string
  orderId: string
  items: { name: string; quantity: number; unitPrice: number }[]
  total: number
  tickets: { type: string; qrCode: string }[]
}) {
  const client = getClient()
  if (!client) {
    logger.warn(ctx, 'Email not sent (Resend not configured)', { orderId: data.orderId })
    return
  }

  const ticketsWithQR = await Promise.all(
    data.tickets.map(async (t) => ({
      ...t,
      qrDataUrl: await generateTicketQR(t.qrCode),
    }))
  )

  try {
    const { error } = await client.emails.send({
      from: `FÉCOA 2026 <${FROM}>`,
      to: data.to,
      subject: `vos billets FÉCOA 2026 — Commande #${data.orderId.slice(-8).toUpperCase()}`,
      html: ticketEmailHTML({ ...data, tickets: ticketsWithQR }),
    })

    if (error) {
      logger.error(ctx, 'Ticket email failed', error)
    } else {
      logger.info(ctx, 'Ticket email sent', { to: data.to, orderId: data.orderId })
    }
  } catch (err) {
    logger.error(ctx, 'Ticket email error', err)
  }
}

export async function sendNewsletterWelcome(email: string) {
  const client = getClient()
  if (!client) return

  try {
    const { error } = await client.emails.send({
      from: `FÉCOA 2026 <${FROM}>`,
      to: email,
      subject: 'Bienvenue dans la newsletter FÉCOA 2026',
      html: newsletterWelcomeHTML(email),
    })
    if (error) logger.error(ctx, 'Newsletter welcome email failed', error)
    else logger.info(ctx, 'Newsletter welcome email sent', { email })
  } catch (err) {
    logger.error(ctx, 'Newsletter welcome email error', err)
  }
}

export async function sendContactConfirmation(email: string, name: string, subject: string) {
  const client = getClient()
  if (!client) return

  try {
    const { error } = await client.emails.send({
      from: `FÉCOA 2026 <${FROM}>`,
      to: email,
      subject: `Confirmation : ${subject || 'Votre message'}`,
      html: contactConfirmationHTML(name, subject),
    })
    if (error) logger.error(ctx, 'Contact confirmation email failed', error)
    else logger.info(ctx, 'Contact confirmation email sent', { email })
  } catch (err) {
    logger.error(ctx, 'Contact confirmation email error', err)
  }
}

export async function sendAdminNotification(data: {
  subject: string
  body: string
}) {
  const client = getClient()
  if (!client) return

  const adminEmail = SITE.emails.general
  try {
    const { error } = await client.emails.send({
      from: `FÉCOA 2026 <${FROM}>`,
      to: adminEmail,
      subject: `[FÉCOA Admin] ${data.subject}`,
      html: `<div style="font-family:system-ui,sans-serif;padding:24px;"><h2 style="color:#C89B3C;">Notification Admin</h2><p>${data.body}</p></div>`,
    })
    if (error) logger.error(ctx, 'Admin notification email failed', error)
  } catch (err) {
    logger.error(ctx, 'Admin notification email error', err)
  }
}
