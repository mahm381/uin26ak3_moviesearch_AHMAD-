const API_KEY = 'd61a28be' 
const BASE_URL = 'https://www.omdbapi.com'

export async function searchMovies(query) {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie`)
  const data = await response.json()
  if (data.Response === 'False') return []
  return data.Search || []
}

export async function getMovieByTitle(title) { 
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&t=${encodeURIComponent(title)}&type=movie`)
  const data = await response.json()
  if (data.Response === 'False') return null
  return data
}

export async function getMovieById(imdbId) {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&i=${imdbId}&plot=full`)
  const data = await response.json()
  if (data.Response === 'False') return null
  return data
}

export async function getBondMovies() {
  const response = await fetch(`${BASE_URL}/?apikey=${API_KEY}&s=james+bond&type=movie`)
  const data = await response.json()
  if (data.Response === 'False') return []
  return data.Search || []
}