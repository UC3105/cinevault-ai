import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import Newsletter from '../components/Newsletter'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { guruDuttMovies } from '../data/guruDuttMovies'
import '../App.css'
import './GuruDuttPage.css'

const allGenres = Array.from(new Set(guruDuttMovies.flatMap(m => m.genres))).sort()

const GuruDuttPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('gurudutt-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('gurudutt-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = guruDuttMovies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || m.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <>
      <Helmet>
        <title>Guru Dutt Films — CineVault | Pyaasa, Kaagaz Ke Phool & More</title>
        <meta name="description" content="Explore Guru Dutt's legendary filmography on CineVault. Pyaasa, Kaagaz Ke Phool, Sahib Bibi Aur Ghulam, Chaudhvin Ka Chand — reviews, ratings and trailers." />
        <link rel="canonical" href="https://cinevault-pi-five.vercel.app/guru-dutt" />
      </Helmet>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="content-stack">
            <div className="top-bar">
              <div>
                <button className="back-btn" onClick={() => navigate('/')}>← Movies</button>
                <h1 className="site-title">CineVault <span className="site-sub">— Guru Dutt</span></h1>
              </div>
              <div className="watchlist-count" title="Your watchlist">
                ♥ {watchlist.size} saved
              </div>
            </div>

            <div className="actor-header gurudutt-header">
              <div className="actor-avatar gurudutt-avatar">GD</div>
              <div className="actor-bio">
                <h2 className="actor-name">Guru Dutt</h2>
                <p className="actor-tagline gurudutt-tagline">Director · Actor · Producer · 1925–1964</p>
                <p className="actor-desc">In a career spanning just over a decade, Guru Dutt created a body of work that placed him among the greatest filmmakers in world cinema. His films — poetic, visually ravishing, and emotionally devastating — explored loneliness, artistic failure, and the cruelty of a society that discards what it doesn't understand. Pyaasa and Kaagaz Ke Phool appear on Time's All-Time 100 Movies list. He died at 39, leaving behind nine films that only grew in stature with every passing decade.</p>
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
    </>
  )
}

export default GuruDuttPage
