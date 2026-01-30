/**
 * Bitcoin utility functions for formatting and conversions
 * Pure functions - no side effects
 */

const SATS_PER_BTC = 100_000_000

/**
 * Convert satoshis to BTC
 * @param {number} sats - Amount in satoshis
 * @returns {number} Amount in BTC
 */
export function satsToBTC(sats) {
  if (typeof sats !== 'number' || isNaN(sats)) {
    throw new Error('Invalid input: sats must be a number')
  }
  return sats / SATS_PER_BTC
}

/**
 * Convert BTC to satoshis
 * @param {number} btc - Amount in BTC
 * @returns {number} Amount in satoshis
 */
export function btcToSats(btc) {
  if (typeof btc !== 'number' || isNaN(btc)) {
    throw new Error('Invalid input: btc must be a number')
  }
  return Math.round(btc * SATS_PER_BTC)
}

/**
 * Format satoshis with thousand separators
 * @param {number} sats - Amount in satoshis
 * @returns {string} Formatted string
 */
export function formatSats(sats) {
  if (typeof sats !== 'number' || isNaN(sats)) {
    return '0'
  }
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(sats)
}

/**
 * Format BTC price in USD
 * @param {number} price - BTC price in USD
 * @returns {string} Formatted price string
 */
export function formatUSD(price) {
  if (typeof price !== 'number' || isNaN(price)) {
    return '$0.00'
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Calculate USD value from sats
 * @param {number} sats - Amount in satoshis
 * @param {number} btcPrice - Current BTC price in USD
 * @returns {number} USD value
 */
export function satsToUSD(sats, btcPrice) {
  if (typeof sats !== 'number' || typeof btcPrice !== 'number') {
    throw new Error('Invalid inputs: sats and btcPrice must be numbers')
  }
  const btc = satsToBTC(sats)
  return btc * btcPrice
}

/**
 * Validate Bitcoin address (basic validation)
 * @param {string} address - Bitcoin address
 * @returns {boolean} True if valid format
 */
export function isValidBitcoinAddress(address) {
  if (typeof address !== 'string') return false
  
  // Basic regex for Legacy, SegWit, and Taproot addresses
  const legacyPattern = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/
  const segwitPattern = /^bc1[a-z0-9]{39,87}$/
  const taprootPattern = /^bc1p[a-z0-9]{58}$/
  
  return (
    legacyPattern.test(address) ||
    segwitPattern.test(address) ||
    taprootPattern.test(address)
  )
}
