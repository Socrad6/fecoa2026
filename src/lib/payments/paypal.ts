const PAYPAL_API = process.env.PAYPAL_MODE === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64')

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

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

  return res.json()
}

export async function capturePayPalOrder(orderId: string) {
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  return res.json()
}
