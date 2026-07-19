const WAVE_API = process.env.WAVE_API_URL || 'https://api.wave.com/v1'

export async function createWavePayment({
  orderId,
  total,
  currency = 'XOF',
}: {
  orderId: string
  total: number
  currency?: string
}) {
  const res = await fetch(`${WAVE_API}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.WAVE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: total,
      currency,
      reference: orderId,
      merchant_url: process.env.WAVE_MERCHANT_URL || 'https://fecoa2026.ca',
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/billetterie/confirmation?order=${orderId}`,
    }),
  })

  return res.json()
}
