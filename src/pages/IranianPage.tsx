import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import Newsletter from '../components/Newsletter'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { iranianMovies } from '../data/iranianMovies'
import '../App.css'
import './IranianPage.css'

const allGenres = Array.from(new Set(iranianMovies.flatMap(m => m.genres))).sort()

const IranianPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('iranian-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('iranian-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = iranianMovies.filter(m => {
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
              <h1 className="site-title">CineVault <span className="site-sub">— Iranian Cinema</span></h1>
            </div>
            <div className="watchlist-count" title="Your watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <div className="actor-header iranian-header">
            <div className="iranian-flag">🇮🇷</div>
            <div className="actor-bio">
              <h2 className="actor-name">Iranian Cinema</h2>
              <p className="actor-tagline" style={{ color: '#27ae60' }}>Kiarostami · Majidi · Farhadi · Ghobadi · Panahi</p>
              <p className="actor-desc">Iranian cinema is one of world cinema's great traditions — intimate, poetic, and humanist. From Kiarostami's philosophical minimalism to Majidi's tender portraits of childhood poverty, these films speak a universal language of compassion and dignity. Many were made against extraordinary odds under state censorship.</p>
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

export default IranianPage
