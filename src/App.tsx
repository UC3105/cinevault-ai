import { useState } from 'react'
import MovieCard from './components/MovieCard'
import Sidebar from './components/Sidebar'
import SearchBar from './components/SearchBar'
import GenreFilter from './components/GenreFilter'
import Newsletter from './components/Newsletter'
import AdBanner from './components/AdBanner'
import Footer from './components/Footer'
import { movies } from './data/movies'
import './App.css'

const allGenres = Array.from(new Set(movies.flatMap(m => m.genres))).sort()

const App = () => {
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = movies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || m.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="content-stack">
          <div className="top-bar">
            <h1 className="site-title">CineVault <span className="site-sub">— Curated Cinema</span></h1>
            <div className="watchlist-count" title="Your watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <AdBanner />
          <SearchBar value={search} onChange={setSearch} />
          <GenreFilter genres={allGenres} active={genre} onChange={setGenre} />

          {filtered.length === 0 ? (
            <div className="no-results">No movies found for "{search}"</div>
          ) : (
            filtered.map(movie => (
              <MovieCard
                key={movie.title}
                movie={movie}
                isWatchlisted={watchlist.has(movie.title)}
                onWatchlistToggle={toggleWatchlist}
              />
            ))
          )}

          <Newsletter />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default App
