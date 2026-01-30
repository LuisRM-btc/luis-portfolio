import { useState, useEffect } from 'react'
import { nip19 } from 'nostr-tools'

const STORAGE_KEY = 'nostr_pubkey'
const ALBY_URL = 'https://getalby.com'

export default function NostrLogin() {
  const [pubkey, setPubkey] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user was previously logged in
    const savedPubkey = localStorage.getItem(STORAGE_KEY)
    if (savedPubkey) {
      setPubkey(savedPubkey)
    }
  }, [])

  const handleLogin = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if NIP-07 extension is available
      if (!window.nostr) {
        setError('nostr-extension')
        setIsLoading(false)
        return
      }

      // Request public key from extension
      const userPubkey = await window.nostr.getPublicKey()

      if (userPubkey) {
        setPubkey(userPubkey)
        localStorage.setItem(STORAGE_KEY, userPubkey)
      }
    } catch (err) {
      console.error('Nostr login error:', err)
      setError('login-failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setPubkey(null)
    localStorage.removeItem(STORAGE_KEY)
    setError(null)
  }

  const getNpub = () => {
    if (!pubkey) return ''
    try {
      return nip19.npubEncode(pubkey)
    } catch {
      return pubkey
    }
  }

  const getTruncatedNpub = () => {
    const npub = getNpub()
    if (npub.length > 16) {
      return `${npub.slice(0, 8)}...${npub.slice(-4)}`
    }
    return npub
  }

  // Logged in state
  if (pubkey) {
    return (
      <div className="nostr-login nostr-login--connected">
        <span className="nostr-login__npub" title={getNpub()}>
          ⚡ {getTruncatedNpub()}
        </span>
        <button
          onClick={handleLogout}
          className="nostr-login__btn nostr-login__btn--logout"
          aria-label="Logout from Nostr"
        >
          ✕
        </button>
      </div>
    )
  }

  // Error state - No extension
  if (error === 'nostr-extension') {
    return (
      <div className="nostr-login nostr-login--error">
        <a
          href={ALBY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="nostr-login__link"
        >
          Get Alby Extension
        </a>
      </div>
    )
  }

  // Error state - Login failed
  if (error === 'login-failed') {
    return (
      <div className="nostr-login nostr-login--error">
        <button
          onClick={handleLogin}
          className="nostr-login__btn nostr-login__btn--retry"
          disabled={isLoading}
        >
          Retry Login
        </button>
      </div>
    )
  }

  // Default state - Login button
  return (
    <div className="nostr-login">
      <button
        onClick={handleLogin}
        className="nostr-login__btn"
        disabled={isLoading}
        aria-label="Login with Nostr"
      >
        {isLoading ? 'Connecting...' : 'Login with Nostr'}
      </button>
    </div>
  )
}
