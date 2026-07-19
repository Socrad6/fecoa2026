import Stripe from 'stripe'
import { logger } from '@/lib/logger'

const ctx = 'stripe'

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY manquante')
  return new Stripe(key)
}

let _stripe: Stripe | null = null
export function getStripeClient(): Stripe {
  if (!_stripe) _stripe = getStripe()
  return _stripe
}

export async function createStripeCheckoutSession({
  orderId,
  email,
  lineItems,
  successUrl,
  cancelUrl,
}: {
  orderId: string
  email: string
  lineItems: { name: string; price: number; quantity: number }[]
  successUrl: string
  cancelUrl: string
}) {
  logger.info(ctx, 'Creating checkout session', { orderId, email, itemCount: lineItems.length })

  const session = await getStripeClient().checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: lineItems.map(item => ({
      price_data: {
        currency: 'cad',
        product_data: { name: item.name },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}&order=${orderId}`,
    cancel_url: `${cancelUrl}?order=${orderId}`,
    metadata: { orderId },
  })

  logger.info(ctx, 'Checkout session created', { orderId, sessionId: session.id })
  return session
}

export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.orderId
    const paymentId = (session.payment_intent as string) || null

    if (!orderId) {
      logger.warn(ctx, 'Webhook session missing orderId metadata', { sessionId: session.id })
      return null
    }

    logger.info(ctx, 'Webhook: checkout.session.completed', { orderId, paymentId })
    return { orderId, paymentId }
  }

  logger.debug(ctx, `Webhook: unhandled event type "${event.type}"`, { eventId: event.id })
  return null
}
