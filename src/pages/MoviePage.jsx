// MoviePage viser detaljert informasjon om én enkelt film
// URL-parameteren (slug) brukes til å hente riktig film fra OMDB
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMovieById, getMovieByTitle } from "../services/omdb";
import styles from './MoviePage.module.css'

// Placeholder vises hvis filmen mangler plakat i OMDB
const PLACEHOLDER = 'https://via.placeholder.com/400x600/1a1a1a/555?text=No+Image'

export default function MoviePage() {

// useParams henter slug fra URL-en, f.eks. "/the-dark-knight" → slug = "the-dark-knight"
  const { movie: slug } = useParams()

// useNavigate brukes for tilbake-knappen
  const navigate = useNavigate()
  
// film lagrer all data om filmen fra OMDB API
  const [film, setFilm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

// useEffect kjører på nytt hver gang slug endres (bruker klikker en annen film)
  useEffect(() => {
    async function fetchFilm() {
      setLoading(true)
      try {
// Prøver først å hente imdbID fra sessionStorage
// Dette ble lagret i MovieCard når brukeren klikket på filmen
        const storedId = sessionStorage.getItem(slug)
        let data = null
        if (storedId) {
// Raskeste metode: hent direkte med imdbID
          data = await getMovieById(storedId)
        }

// Fallback: hvis imdbID ikke finnes, rekonstruer tittel fra slug
// F.eks. "the-dark-knight" → "the dark knight"
        if (!data) {
          const titleFromSlug = slug.replace(/-/g, ' ')
          data = await getMovieByTitle(titleFromSlug)
        }
        if (!data) setError('Filmen ble ikke funnet.')
        else setFilm(data)
      } catch {
        setError('Kunne ikke hente filmdata.')
      } finally {
        setLoading(false)
      }
    }
    fetchFilm()
  }, [slug])
// Viser spinner mens filmdata lastes inn
  if (loading) {
    return (
      <main className={styles.status}>
        <span className={styles.spinner} aria-label="Laster inn film…" />
      </main>
    )
  }
// Viser feilmelding med tilbake-knapp hvis noe gikk galt
  if (error || !film) {
    return (
      <main className={styles.status}>
        <p className={styles.errorMsg}>{error}</p>
        <button className={styles.backBtn} onClick={() => navigate('/')}>← Tilbake</button>
      </main>
    )
  }
// Bruker placeholder hvis filmen mangler plakat
  const poster = film.Poster && film.Poster !== 'N/A' ? film.Poster : PLACEHOLDER
// Splitter sjanger-strengen til en array, f.eks. "Action, Drama" → ["Action", "Drama"]

  const genres = film.Genre ? film.Genre.split(', ') : []

  return (
// <main> er hoved-innholdsområdet
    <main className={styles.main}>

{/* Tilbake-knappen navigerer til forrige side i historikken */}
<button className={styles.backBtn} onClick={() => navigate(-1)}>← Tilbake</button>

{/* <article> er semantisk riktig for et selvstendig innholdselement */}
<article className={styles.detail}>


{/* <aside> brukes for plakaten siden den er støttende innhold */}
        <aside className={styles.posterWrap}>
          <figure className={styles.posterFigure}>
            <img src={poster} alt={`Filmplakat for ${film.Title}`} />
          </figure>
        </aside>

 {/* <section> inneholder all tekstlig info om filmen */}
        <section className={styles.info}>
          <header className={styles.infoHeader}>

{/* Sjangre vises som tags øverst hvis de finnes */}

            {genres.length > 0 && (
           
              <ul className={styles.genres}>
                {genres.map((g) => <li key={g} className={styles.genreTag}>{g}</li>)}
              </ul>
            )}
            <h1 className={styles.title}>{film.Title}</h1>

 {/* Meta-informasjon: år, aldersgrense og spilletid */}
            <p className={styles.meta}>
              <time>{film.Year}</time>
 {/* Betinget rendering: vises kun hvis verdien finnes og ikke er "N/A" */}

              {film.Rated && film.Rated !== 'N/A' && <span>{film.Rated}</span>}
              {film.Runtime && film.Runtime !== 'N/A' && <span>{film.Runtime}</span>}
            </p>
          </header>

 {/* Handlingen vises kun hvis den finnes */}
          {film.Plot && film.Plot !== 'N/A' && <p className={styles.plot}>{film.Plot}</p>}
  
  {/* <dl> er semantisk riktig for nøkkel-verdi-par som regissør, skuespillere osv. */}
          <dl className={styles.facts}>
            {film.Director && film.Director !== 'N/A' && <><dt>Regissør</dt><dd>{film.Director}</dd></>}
            {film.Actors && film.Actors !== 'N/A' && <><dt>Skuespillere</dt><dd>{film.Actors}</dd></>}
            {film.Language && film.Language !== 'N/A' && <><dt>Språk</dt><dd>{film.Language}</dd></>}
            {film.Country && film.Country !== 'N/A' && <><dt>Land</dt><dd>{film.Country}</dd></>}
          </dl>

  {/* Vurderinger fra IMDb, Rotten Tomatoes osv. vises kun hvis de finnes */}

          {film.Ratings?.length > 0 && (
            <section aria-label="Vurderinger">
              <h2 className={styles.ratingsHeading}>Vurderinger</h2>
              <ul className={styles.ratings}>
                {film.Ratings.map((r) => (
                  <li key={r.Source} className={styles.ratingItem}>
                    <span className={styles.ratingSource}>{r.Source}</span>
                    <strong className={styles.ratingValue}>{r.Value}</strong>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </article>
    </main>
  )
}