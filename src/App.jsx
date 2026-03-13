// Importerer nødvendige komponenter fra react-router-dom for ruting-funksjonalitet
// Routes og Route lar oss definere forskjellige stier og deres tilsvarende komponenter
import { Routes, Route } from 'react-router-dom'

// Importerer sidekomponentene som vil bli gjengitt basert på gjeldende rute
// HomePage er hovedsiden, MoviePage viser detaljer for en spesifikk film
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'

// Importerer Header-komponenten som vises på alle sider for navigasjon
import Header from './components/Header'

// Hoved-App-komponenten som definerer strukturen til applikasjonen
// Den bruker React Router for å håndtere navigasjon mellom forskjellige sider
export default function App() {
  return (
    // Fragment for å pakke inn flere elementer uten å legge til ekstra DOM-noder
    <>
      {/* Header-komponenten er alltid synlig øverst i appen */}
      <Header />

      {/* Routes-komponenten inneholder alle rute-definisjonene */}
      <Routes>
        {/* Rute for hjemmesiden, gjengir HomePage-komponenten når stien er "/" */}
        <Route path="/" element={<HomePage />} />

        {/* Rute for filmdetaljer, bruker dynamisk parameter :movie for å identifisere filmen */}
        {/* Dette tillater URL-er som /film-tittel for å vise spesifikk film-informasjon */}
        <Route path="/:movie" element={<MoviePage />} />
      </Routes>
    </>
  )
}