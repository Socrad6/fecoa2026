const ORANGE_API = process.env.ORANGE_MONEY_API_URL || 'https://api.orange.com/orange-money-webpay/dev/v1'

async function getAccessToken(): Promise<string> {
  const res = await fetch('https://api.orange.com/oauth/v3/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${process.env.ORANGE_MONEY_MERCHANT_KEY}:${process.env.ORANGE_MONEY_API_KEY}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

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
  const accessToken = await getAccessToken()

  const res = await fetch(`${ORANGE_API}/webpayment`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      merchant_key: process.env.ORANGE_MONEY_MERCHANT_KEY,
      currency: 'OUV', // Franc CFA Ouest
      order_id: orderId,
      amount: total,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie/confirmation?order=${orderId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie?order=${orderId}`,
      notif_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/orange-money`,
      lang: 'fr',
    }),
  })

  return res.json()
}
