/**
 * Simple in-memory per-IP rate limiter.
 * NOTE: In-memory stores are reset on every serverless cold start.
 * For production-scale protection, replace this with Redis or a Vercel KV store.
 */

const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 60 seconds
const RATE_LIMIT_MAX_REQUESTS = 10

const store = new Map()

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  return request.headers.get('x-real-ip') || 'unknown'
}

export function rateLimit(request) {
  const ip = getClientIp(request)
  const now = Date.now()

  const record = store.get(ip) || { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS }

  if (now > record.resetAt) {
    record.count = 0
    record.resetAt = now + RATE_LIMIT_WINDOW_MS
  }

  record.count += 1
  store.set(ip, record)

  return {
    allowed: record.count <= RATE_LIMIT_MAX_REQUESTS,
    limit: RATE_LIMIT_MAX_REQUESTS,
    remaining: Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count),
    resetAt: record.resetAt,
  }
}
