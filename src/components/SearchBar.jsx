// SearchBar håndterer søkeinput fra brukeren
// Søket trigges kun når brukeren har skrevet minst 3 tegn
import { useState } from 'react'
import styles from './SearchBar.module.css'

// Props:
// onSearch(query) - kalles når input er >= 3 tegn
// onClear() - kalles når feltet tømmes eller input er < 3 tegn
export default function SearchBar({ onSearch, onClear }) {

// Lokal state holder styr på hva brukeren har skrevet
const [value, setValue] = useState('')

  function handleChange(e) {
    const q = e.target.value
    setValue(q)
// Sender søket videre kun når brukeren har skrevet nok tegn

    if (q.trim().length >= 3) {
      onSearch(q.trim())
    } else {
// Tilbakestiller til standardlisten hvis søket er for kort

      onClear()
    }
  }

  function handleClear() {
    setValue('')
    onClear()
  }

  return (
  // <search> er et semantisk HTML-element for søkefunksjonalitet

    <search className={styles.wrapper}>
    {/* Label er koblet til input via htmlFor/id for tilgjengelighet */}

      <label htmlFor="movie-search" className={styles.label}>Søk etter film</label>
      <span className={styles.inputRow}>
        <input
          id="movie-search"
          type="search"
          className={styles.input}
          placeholder="Skriv minst 3 tegn…"
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
        {/* X-knappen vises kun når det er tekst i feltet */}
        {value && (
          <button className={styles.clearBtn} onClick={handleClear} aria-label="Tøm søk">✕</button>
        )}
      </span>
      {/* Gir brukeren feedback på hvor mange tegn som mangler */}

      <p className={styles.hint} aria-live="polite">
        {value.trim().length > 0 && value.trim().length < 3
          ? `Skriv ${3 - value.trim().length} tegn til…` : ''}
      </p>
    </search>
  )
}