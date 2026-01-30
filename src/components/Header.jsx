import BitcoinTicker from './BitcoinTicker'
import NostrLogin from './NostrLogin'

export default function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <BitcoinTicker />
        <NostrLogin />
      </div>
    </header>
  )
}
