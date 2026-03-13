// HomePage er forsiden av applikasjonen
// Den henter James Bond-filmer automatisk når siden lastes
// og bytter til søkeresultater når brukeren søker

import { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MovieGrid from '../components/MovieGrid'
import { searchMovies, getBondMovies } from "../services/omdb";
import styles from './HomePage.module.css'

export default function HomePage() {
    // bondMovies lagrer standard Bond-filmer som vises før brukeren søker
  const [bondMovies, setBondMovies] = useState([])

  // searchResults er null når brukeren ikke har søkt ennå
  // når brukeren søker, fylles den med resultater fra API
  const [searchResults, setSearchResults] = useState(null)

  // loading brukes for å vise spinner mens Bond-filmer lastes inn
  const [loading, setLoading] = useState(true)

    // searchLoading brukes separat for å vise spinner under søk
  const [searchLoading, setSearchLoading] = useState(false)
  
    
  // error lagrer feilmelding hvis API-kallet feiler
  const [error, setError] = useState(null)



// useEffect kjører én gang når komponenten monteres (tom array = [])
// Henter Bond-filmer automatisk når forsiden åpnes
  useEffect(() => {
    async function fetchBond() {
      setLoading(true)
      try {
// Kaller getBondMovies fra omdb.js som søker på "james bond"

        const movies = await getBondMovies()
        setBondMovies(movies)
      } catch {
        setError('Kunne ikke hente filmer. Sjekk API-nøkkelen i src/services/omdb.js')
      } finally {
        
        // Stopper loading uansett om det gikk bra eller ikke       
        setLoading(false)
      }
    }
    fetchBond()
  }, [])
  
  
  // Kalles fra SearchBar når brukeren har skrevet minst 3 tegn
  async function handleSearch(query) {
    setSearchLoading(true)
    try {
  
   // Sender søket til OMDB API via searchMovies-funksjonen
      const results = await searchMovies(query)
      setSearchResults(results)
    } catch {
      setError('Søket feilet. Prøv igjen.')
    } finally {
      setSearchLoading(false)
    }
  }
  
  // Kalles når brukeren tømmer søkefeltet
  // Tilbakestiller til Bond-listen ved å sette searchResults til null
  function handleClear() {
    setSearchResults(null)
    setError(null)
  }

// Avgjør hvilke filmer som skal vises:
// Hvis searchResults ikke er null, er brukeren i søkemodus
  const isSearching = searchResults !== null
  const movies = isSearching ? searchResults : bondMovies
  const heading = isSearching ? `${searchResults.length} treff` : 'James Bond — klassikerne'

  return (
    // <main> er hoved-innholdsområdet på siden
    <main className={styles.main}>
   {/* Hero-seksjonen inneholder tittel, undertittel og søkefelt */}

      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          <span>Finn din</span>
   {/* em-elementet er rød og vises på egen linje */}

          <em> neste film</em>
        </h1>
        <p className={styles.heroSub}>Søk blant millioner av titler via OMDB</p>
        
         {/* SearchBar får to funksjoner som props:
            onSearch - trigges når bruker skriver 3+ tegn
            onClear - trigges når søkefeltet tømmes */}
        <SearchBar onSearch={handleSearch} onClear={handleClear} />
      </section>
      {/* MovieGrid viser enten Bond-filmer eller søkeresultater
          loading slås på under både første innlasting og søk */}
      <MovieGrid movies={movies} heading={heading} loading={loading || searchLoading} error={error} />
    </main>
  )
}