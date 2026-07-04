import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import Newsletter from '../components/Newsletter'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { ashaMovies } from '../data/ashaMovies'
import '../App.css'
import './AshaPage.css'

const allGenres = Array.from(new Set(ashaMovies.flatMap(m => m.genres))).sort()

const AshaPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('asha-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('asha-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = ashaMovies.filter(m => {
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
              <h1 className="site-title">CineVault <span className="site-sub">— Asha Parekh</span></h1>
            </div>
            <div className="watchlist-count" title="Your watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <div className="actor-header asha-header">
            <div className="actor-avatar asha-avatar">AP</div>
            <div className="actor-bio">
              <h2 className="actor-name">Asha Parekh</h2>
              <p className="actor-tagline asha-tagline">Filmfare Best Actress · Padma Bhushan · The Hit Girl of Bollywood</p>
              <p className="actor-desc">From her debut in Dil Deke Dekho to the golden era of 1960s–70s Hindi cinema, Asha Parekh defined a generation. With her electric screen presence, dancing brilliance, and effortless range across romance, comedy, and drama, she was the reigning queen of Bollywood for over a decade — and remains one of its most cherished icons.</p>
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

export default AshaPage
