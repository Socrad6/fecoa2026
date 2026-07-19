type LogLevel = 'info' | 'warn' | 'error' | 'debug'

function formatMessage(level: LogLevel, context: string, message: string, data?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const base = `[${timestamp}] [${level.toUpperCase()}] [${context}] ${message}`
  if (data && Object.keys(data).length > 0) {
    return `${base} ${JSON.stringify(data)}`
  }
  return base
}

export const logger = {
  info(context: string, message: string, data?: Record<string, unknown>) {
    console.log(formatMessage('info', context, message, data))
  },
  warn(context: string, message: string, data?: Record<string, unknown>) {
    console.warn(formatMessage('warn', context, message, data))
  },
  error(context: string, message: string, error?: unknown) {
    const data = error instanceof Error
      ? { name: error.name, message: error.message, stack: process.env.NODE_ENV === 'development' ? error.stack : undefined }
      : error ? { raw: String(error) } : undefined
    console.error(formatMessage('error', context, message, data))
  },
  debug(context: string, message: string, data?: Record<string, unknown>) {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('debug', context, message, data))
    }
  },
}
