import { useState, useEffect, useRef } from 'react'
import { formatUSD } from '../utils/bitcoin'

const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws/btcusdt@trade'
const RECONNECT_DELAY = 3000
const PRICE_UPDATE_THRESHOLD = 0.01 // Only update if change > $0.01

export default function BitcoinTicker() {
  const [price, setPrice] = useState(null)
  const [priceDirection, setPriceDirection] = useState(null) // 'up' | 'down' | null
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef(null)
  const reconnectTimeoutRef = useRef(null)
  const previousPriceRef = useRef(null)

  useEffect(() => {
    connectWebSocket()

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [])

  const connectWebSocket = () => {
    try {
      const ws = new WebSocket(BINANCE_WS_URL)
      wsRef.current = ws

      ws.onopen = () => {
        setIsConnected(true)
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          const newPrice = parseFloat(data.p)

          if (!isNaN(newPrice)) {
            // Only update if price changed significantly
            if (
              previousPriceRef.current === null ||
              Math.abs(newPrice - previousPriceRef.current) > PRICE_UPDATE_THRESHOLD
            ) {
              // Determine direction
              if (previousPriceRef.current !== null) {
                if (newPrice > previousPriceRef.current) {
                  setPriceDirection('up')
                } else if (newPrice < previousPriceRef.current) {
                  setPriceDirection('down')
                }
              }

              setPrice(newPrice)
              previousPriceRef.current = newPrice

              // Reset direction after animation
              setTimeout(() => setPriceDirection(null), 600)
            }
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setIsConnected(false)
      }

      ws.onclose = () => {
        setIsConnected(false)
        // Attempt to reconnect after delay
        reconnectTimeoutRef.current = setTimeout(() => {
          connectWebSocket()
        }, RECONNECT_DELAY)
      }
    } catch (error) {
      console.error('Error connecting to WebSocket:', error)
      setIsConnected(false)
    }
  }

  const getIndicatorColor = () => {
    if (priceDirection === 'up') return '#10b981' // green
    if (priceDirection === 'down') return '#ef4444' // red
    return '#F7931A' // bitcoin orange
  }

  return (
    <div className="ticker">
      <div
        className="ticker__indicator"
        style={{ backgroundColor: getIndicatorColor() }}
      />
      <div className="ticker__content">
        <span className="ticker__label">BTC</span>
        <span className="ticker__price">
          {price !== null ? formatUSD(price) : '...'}{' '}
        </span>
      </div>
      {!isConnected && (
        <div className="ticker__status" title="Reconnecting...">
          ⟳
        </div>
      )}
    </div>
  )
}
