import { logger } from '@/lib/logger'

const ctx = 'wave'
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
  const apiKey = process.env.WAVE_API_KEY
  if (!apiKey) throw new Error('WAVE_API_KEY manquante')

  logger.info(ctx, 'Creating Wave payment', { orderId, total, currency })

  const res = await fetch(`${WAVE_API}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
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

  const data = await res.json()

  if (!res.ok) {
    logger.error(ctx, `Create payment failed (${res.status})`, { orderId, status: res.status, waveError: data })
    throw new Error(`Wave create payment error: ${res.status}`)
  }

  logger.info(ctx, 'Wave payment created', { orderId, waveSessionId: data.id })
  return data
}
