// MovieGrid håndterer visning av en liste med filmer
// Den brukes både for søkeresultater og standard Bond-listen på forsiden


import MovieCard from './Moviecard'
import styles from './MovieGrid.module.css'

// Props:
// movies - array med filmobjekter fra OMDB API
// heading - overskrift over listen
// loading - boolean som viser spinner mens data lastes
// error - feilmelding hvis API-kallet feiler
export default function MovieGrid({ movies, heading, loading, error }) {
    
// Viser spinner mens filmene lastes inn fra API

  if (loading) {
    return (
      <section className={styles.status} aria-live="polite">
        <span className={styles.spinner} aria-label="Laster inn filmer..." />
      </section>
    )
  }
// Viser feilmelding hvis noe gikk galt med API-kallet
  if (error) {
    return (
      <section className={styles.status} aria-live="polite">
        <p className={styles.message}>{error}</p>
      </section>
    )
  }
// Viser melding hvis søket ikke ga noen resultater

  if (!movies || movies.length === 0) {
    return (
      <section className={styles.status} aria-live="polite">
        <p className={styles.message}>Ingen filmer funnet.</p>
      </section>
    )
  }

  return (
 // <section> brukes som semantisk wrapper for filmlisten
 <section className={styles.section}>
 {/* Overskriften vises kun hvis den er oppgitt */}
 {heading && <h2 className={styles.heading}>{heading}</h2>}
 {/* <ul> og <li> er semantisk riktig for en liste med filmkort */}

      <ul className={styles.grid} aria-label={heading || 'Filmer'}>
        {movies.map((movie) => (
          <li key={movie.imdbID} className={styles.item}>
           {/* Hver film rendres som en gjenbrukbar MovieCard-komponent */}

            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </section>
  )
}