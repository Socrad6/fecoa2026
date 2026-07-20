import QRCode from 'qrcode'

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://fecoa2026.vercel.app'

export async function generateTicketQR(qrCode: string): Promise<string> {
  return QRCode.toDataURL(`${SITE_URL}/api/verify?qr=${qrCode}`, {
    width: 280,
    margin: 2,
    color: { dark: '#061524', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  })
}

export async function generateTicketSVG(qrCode: string): Promise<string> {
  return QRCode.toString(`${SITE_URL}/api/verify?qr=${qrCode}`, {
    type: 'svg',
    width: 160,
    margin: 1,
    color: { dark: '#061524', light: '#ffffff' },
    errorCorrectionLevel: 'H',
  })
}
