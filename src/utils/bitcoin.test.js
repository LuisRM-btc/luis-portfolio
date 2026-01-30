import { describe, it, expect } from 'vitest'
import {
  satsToBTC,
  btcToSats,
  formatSats,
  formatUSD,
  satsToUSD,
  isValidBitcoinAddress,
} from './bitcoin'

describe('Bitcoin Utils', () => {
  describe('satsToBTC', () => {
    it('should convert satoshis to BTC correctly', () => {
      expect(satsToBTC(100_000_000)).toBe(1)
      expect(satsToBTC(50_000_000)).toBe(0.5)
      expect(satsToBTC(1_000)).toBe(0.00001)
      expect(satsToBTC(0)).toBe(0)
    })

    it('should throw error for invalid input', () => {
      expect(() => satsToBTC('invalid')).toThrow()
      expect(() => satsToBTC(NaN)).toThrow()
    })
  })

  describe('btcToSats', () => {
    it('should convert BTC to satoshis correctly', () => {
      expect(btcToSats(1)).toBe(100_000_000)
      expect(btcToSats(0.5)).toBe(50_000_000)
      expect(btcToSats(0.00001)).toBe(1_000)
      expect(btcToSats(0)).toBe(0)
    })

    it('should handle rounding correctly', () => {
      // Using more realistic values that avoid floating point precision issues
      expect(btcToSats(0.000000004)).toBe(0)
      expect(btcToSats(0.000000006)).toBe(1)
    })

    it('should throw error for invalid input', () => {
      expect(() => btcToSats('invalid')).toThrow()
      expect(() => btcToSats(NaN)).toThrow()
    })
  })

  describe('formatSats', () => {
    it('should format satoshis with thousand separators', () => {
      expect(formatSats(1_000_000)).toBe('1,000,000')
      expect(formatSats(100_000_000)).toBe('100,000,000')
      expect(formatSats(1_000)).toBe('1,000')
      expect(formatSats(500)).toBe('500')
    })

    it('should handle invalid input gracefully', () => {
      expect(formatSats('invalid')).toBe('0')
      expect(formatSats(NaN)).toBe('0')
    })
  })

  describe('formatUSD', () => {
    it('should format USD price correctly', () => {
      expect(formatUSD(50000)).toBe('$50,000.00')
      expect(formatUSD(100000.5)).toBe('$100,000.50')
      expect(formatUSD(0.99)).toBe('$0.99')
    })

    it('should handle invalid input gracefully', () => {
      expect(formatUSD('invalid')).toBe('$0.00')
      expect(formatUSD(NaN)).toBe('$0.00')
    })
  })

  describe('satsToUSD', () => {
    it('should calculate USD value from sats correctly', () => {
      const btcPrice = 50000
      expect(satsToUSD(100_000_000, btcPrice)).toBe(50000) // 1 BTC
      expect(satsToUSD(50_000_000, btcPrice)).toBe(25000) // 0.5 BTC
      expect(satsToUSD(1_000_000, btcPrice)).toBe(500) // 0.01 BTC
    })

    it('should throw error for invalid inputs', () => {
      expect(() => satsToUSD('invalid', 50000)).toThrow()
      expect(() => satsToUSD(100_000_000, 'invalid')).toThrow()
    })
  })

  describe('isValidBitcoinAddress', () => {
    it('should validate Legacy addresses', () => {
      expect(isValidBitcoinAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')).toBe(true)
      expect(isValidBitcoinAddress('3J98t1WpEZ73CNmYviecrnyiWrnqRhWNLy')).toBe(true)
    })

    it('should validate SegWit addresses', () => {
      expect(isValidBitcoinAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')).toBe(true)
    })

    it('should validate Taproot addresses', () => {
      expect(
        isValidBitcoinAddress('bc1p5d7rjq7g6rdk2yhzks9smlaqtedr4dekq08ge8ztwac72sfr9rusxg3297')
      ).toBe(true)
    })

    it('should reject invalid addresses', () => {
      expect(isValidBitcoinAddress('invalid')).toBe(false)
      expect(isValidBitcoinAddress('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb')).toBe(false)
      expect(isValidBitcoinAddress('')).toBe(false)
      expect(isValidBitcoinAddress(null)).toBe(false)
    })
  })
})
