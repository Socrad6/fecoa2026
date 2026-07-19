import { logger } from '@/lib/logger'

const ctx = 'orange-money'
const ORANGE_API = process.env.ORANGE_MONEY_API_URL || 'https://api.orange.com/orange-money-webpay/dev/v1'

async function getAccessToken(): Promise<string> {
  const merchantKey = process.env.ORANGE_MONEY_MERCHANT_KEY
  const apiKey = process.env.ORANGE_MONEY_API_KEY
  if (!merchantKey || !apiKey) throw new Error('Orange Money credentials missing')

  const res = await fetch('https://api.orange.com/oauth/v3/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${merchantKey}:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const body = await res.text()
    logger.error(ctx, `Token request failed (${res.status})`, { status: res.status, body })
    throw new Error(`Orange Money token error: ${res.status}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function createOrangeMoneyPayment({
  orderId,
  total,
  email,
}: {
  orderId: string
  total: number
  email: string
}) {
  logger.info(ctx, 'Creating Orange Money payment', { orderId, total, email })

  const accessToken = await getAccessToken()

  const res = await fetch(`${ORANGE_API}/webpayment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      merchant_key: process.env.ORANGE_MONEY_MERCHANT_KEY,
      currency: 'OUV',
      order_id: orderId,
      amount: total,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie/confirmation?order=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie?order=${orderId}`,
      notif_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/orange-money`,
      lang: 'fr',
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    logger.error(ctx, `Create payment failed (${res.status})`, { orderId, status: res.status, orangeError: data })
    throw new Error(`Orange Money create payment error: ${res.status}`)
  }

  logger.info(ctx, 'Orange Money payment created', { orderId, payToken: data.pay_token })
  return data
}
