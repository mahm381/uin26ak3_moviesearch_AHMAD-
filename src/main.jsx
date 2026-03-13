// Importerer Reacts StrictMode for utviklingsadvarsler og kontroller
// StrictMode hjelper med å identifisere potensielle problemer i applikasjonen under utvikling
import { StrictMode } from 'react'

// Importerer createRoot fra react-dom/client for å gjengi React-appen
// Dette er den moderne måten å gjengi React-applikasjoner på (React 18+)
import { createRoot } from 'react-dom/client'

// Importerer BrowserRouter fra react-router-dom for å aktivere klient-side ruting
// BrowserRouter bruker HTML5 history API for å holde UI synkronisert med URL-en
import { BrowserRouter } from 'react-router-dom'

// Importerer hoved-App-komponenten som inneholder applikasjonens struktur
import App from './App.jsx'

// Importerer de globale CSS-stilene for å bruke på hele applikasjonen
import './index.css'

// Oppretter rot-elementet hvor React-appen vil bli montert
// document.getElementById('root') målretter div-en med id="root" i index.html
// render()-metoden monterer React-komponenttreet inn i DOM-en
createRoot(document.getElementById('root')).render(
  // Pakker inn appen i StrictMode for ekstra utviklingskontroller
  <StrictMode>
    {/* BrowserRouter gir ruting-kontekst til hele appen */}
    <BrowserRouter>
      {/* Gjengir hoved-App-komponenten som håndterer all ruting og layout */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)