import { logger } from '@/lib/logger'

const ctx = 'paypal'

const PAYPAL_API = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !secret) throw new Error('PayPal credentials missing (PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET)')

  const auth = Buffer.from(`${clientId}:${secret}`).toString('base64')

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const body = await res.text()
    logger.error(ctx, `Token request failed (${res.status})`, { status: res.status, body })
    throw new Error(`PayPal token error: ${res.status}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function createPayPalOrder({
  orderId,
  total,
  currency = 'CAD',
}: {
  orderId: string
  total: number
  currency?: string
}) {
  logger.info(ctx, 'Creating PayPal order', { orderId, total, currency })

  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          reference_id: orderId,
          amount: {
            currency_code: currency,
            value: (total / 100).toFixed(2),
          },
          description: `FÉCOA 2026 — Commande ${orderId}`,
        },
      ],
      application_context: {
        brand_name: 'FÉCOA 2026',
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie/confirmation?order=${orderId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie?order=${orderId}`,
      },
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    logger.error(ctx, `Create order failed (${res.status})`, { orderId, status: res.status, paypalError: data })
    throw new Error(`PayPal create order error: ${res.status}`)
  }

  logger.info(ctx, 'PayPal order created', { orderId, paypalOrderId: data.id })
  return data
}

export async function capturePayPalOrder(paypalOrderId: string) {
  logger.info(ctx, 'Capturing PayPal order', { paypalOrderId })

  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await res.json()

  if (!res.ok) {
    logger.error(ctx, `Capture failed (${res.status})`, { paypalOrderId, status: res.status, paypalError: data })
    throw new Error(`PayPal capture error: ${res.status}`)
  }

  logger.info(ctx, 'PayPal order captured', { paypalOrderId, status: data.status })
  return data
}
