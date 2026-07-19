import Stripe from 'stripe'

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY manquante')
  return new Stripe(key)
}

let _stripe: Stripe | null = null
export function get stripe() {
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
  const session = await stripe.checkout.sessions.create({
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

  return session
}

export async function handleStripeWebhook(event: Stripe.Event) {
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    return { orderId: session.metadata?.orderId, paymentId: session.payment_intent as string }
  }
  return null
}
