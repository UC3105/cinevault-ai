import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import Newsletter from '../components/Newsletter'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { deniroMovies } from '../data/deniroMovies'
import '../App.css'
import './DeniroPage.css'

const allGenres = Array.from(new Set(deniroMovies.flatMap(m => m.genres))).sort()

const DeniroPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('deniro-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('deniro-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = deniroMovies.filter(m => {
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
            <div>
              <button className="back-btn" onClick={() => navigate('/')}>← Movies</button>
              <h1 className="site-title">CineVault <span className="site-sub">— Robert De Niro</span></h1>
            </div>
            <div className="watchlist-count" title="Your watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <div className="actor-header deniro-header">
            <div className="actor-avatar deniro-avatar">RD</div>
            <div className="actor-bio">
              <h2 className="actor-name">Robert De Niro</h2>
              <p className="actor-tagline">2 Academy Awards · 8 nominations · The defining face of American cinema</p>
              <p className="actor-desc">From the young Vito Corleone to Travis Bickle, Jake LaMotta to Jimmy Conway — Robert De Niro's collaboration with Martin Scorsese produced some of cinema's most indelible performances. A method actor of unparalleled commitment, he transformed the art of screen acting.</p>
            </div>
          </div>

          <SearchBar value={search} onChange={setSearch} />
          <GenreFilter genres={allGenres} active={genre} onChange={setGenre} />

          {filtered.length === 0 ? (
            <div className="no-results">No films found for "{search}"</div>
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
          <AdBanner />
          <Footer />
        </div>
      </main>
    </div>
  )
}

export default DeniroPage
