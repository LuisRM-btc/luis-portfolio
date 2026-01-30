# Luis Antonio Rodriguez - Bitcoin Developer Portfolio

Professional portfolio built with React + Vite, featuring real-time Bitcoin price tracking and Nostr authentication.

## 🚀 Features

- **Real-time Bitcoin Ticker**: WebSocket connection to Binance for live BTC/USDT prices
- **Nostr Login**: NIP-07 authentication with localStorage persistence
- **Clean Architecture**: Component-based structure following SOLID principles
- **Tested Utils**: Bitcoin utility functions with Vitest
- **Glassmorphism UI**: Modern dark theme with Bitcoin orange accents

## 📁 Project Structure

```
src/
├── components/
│   ├── BitcoinTicker.jsx    # Real-time BTC price with WebSocket
│   ├── NostrLogin.jsx        # NIP-07 authentication
│   ├── Header.jsx            # Sticky header with Ticker + Login
│   └── ProjectCard.jsx       # Reusable project card component
├── utils/
│   ├── bitcoin.js            # Pure functions for BTC/Sats/USD
│   └── bitcoin.test.js       # Unit tests (15 tests, 100% pass)
├── constants/
│   └── data.js               # Projects, skills, personal info
├── App.jsx                   # Main application
├── App.css                   # Styles
└── main.jsx                  # Entry point
```

## 🛠️ Tech Stack

- **React 19**: Latest React with hooks
- **Vite**: Fast build tool
- **Vitest**: Unit testing framework
- **nostr-tools**: Nostr protocol implementation
- **WebSocket API**: Native browser WebSocket for real-time data

## 📦 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run lint         # Lint code
```

## 🔧 Bitcoin Utils

Utility functions for Bitcoin-related operations:

- `satsToBTC()` - Convert satoshis to BTC
- `btcToSats()` - Convert BTC to satoshis
- `formatSats()` - Format satoshis with thousand separators
- `formatUSD()` - Format USD price
- `satsToUSD()` - Calculate USD value from sats
- `isValidBitcoinAddress()` - Validate Legacy, SegWit, Taproot addresses

## 🔐 Nostr Integration

The portfolio includes Nostr authentication via NIP-07:

1. Detects `window.nostr` extension (Alby, nos2x, etc.)
2. Requests public key from user
3. Persists session in localStorage
4. Shows user's npub (truncated)

If no extension is detected, provides link to Alby.

## 🎨 Design System

- **Background**: `#0a0a0a` (Deep dark)
- **Accent**: `#F7931A` (Bitcoin orange)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Font**: Inter (Google Fonts)

## 📊 Test Coverage

All Bitcoin utility functions are tested:
- ✅ 15 tests passing
- ✅ Edge cases covered
- ✅ Error handling validated

## 🚀 Deployment

Built for production with:
```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static hosting.

---

**Building in public on Nostr** ⚡
