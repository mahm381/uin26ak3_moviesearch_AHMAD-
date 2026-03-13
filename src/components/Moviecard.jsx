// MovieCard representerer én enkelt film i listevisningen
// Den tar imot et movie-objekt som prop og viser plakat, tittel og år
import { useNavigate } from 'react-router-dom'
import styles from './MovieCard.module.css'

// Placeholder-bilde vises dersom filmen mangler plakat i OMDB
const PLACEHOLDER = 'https://via.placeholder.com/300x445/1a1a1a/555?text=No+Image'

export default function MovieCard({ movie }) {
    // useNavigate brukes for å sende brukeren til filmsiden når de klikker
  const navigate = useNavigate()
  
  // Lager en URL-vennlig slug fra filmtittelen
  // F.eks. "The Dark Knight" blir "the-dark-knight"
  const slug = movie.Title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

  function handleClick() {

    // Lagrer imdbID i sessionStorage så MoviePage kan hente riktig film
    sessionStorage.setItem(slug, movie.imdbID)
    navigate(`/${slug}`)
  }

  // Bruker placeholder-bilde hvis Poster mangler eller er "N/A"
  const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER

  return (
    // <article> er semantisk riktig for et selvstendig innholdselement
    // role="button" og tabIndex gjør kortet tilgjengelig med tastatur
    <article className={styles.card} onClick={handleClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${movie.Title} (${movie.Year})`}>

{/* <figure> brukes for bilder med tilknyttet innhold */}
      <figure className={styles.poster}>
        <img src={poster} alt={`Filmplakat for ${movie.Title}`} loading="lazy" />
      </figure>

{/* <footer> inneholder informasjon om filmen nederst på kortet */}

      <footer className={styles.info}>
        <h2 className={styles.title}>{movie.Title}</h2>
{/* <time> er semantisk riktig for årstall */}

        <time className={styles.year}>{movie.Year}</time>
      </footer>
    </article>
  )
}