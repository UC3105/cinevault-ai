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
import { vShantaramMovies } from '../data/vShantaramMovies'
import '../App.css'
import './GuruDuttPage.css'

const allGenres = Array.from(new Set(vShantaramMovies.flatMap(m => m.genres))).sort()

const VShantaramPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('vshantaram-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('vshantaram-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = vShantaramMovies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || m.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <>
      <Helmet>
        <title>V Shantaram Films — CineVault | Duniya Na Mane, Shakuntala & More</title>
        <meta name="description" content="Explore V Shantaram's legendary filmography on CineVault. Duniya Na Mane, Shakuntala, Kisan Kanya, Jhala — classic Indian cinema masterpieces." />
        <link rel="canonical" href="https://cinevault-pi-five.vercel.app/v-shantaram" />
      </Helmet>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <div className="content-stack">
            <div className="top-bar">
              <div>
                <button className="back-btn" onClick={() => navigate('/')}>← Movies</button>
                <h1 className="site-title">CineVault <span className="site-sub">— V Shantaram</span></h1>
              </div>
              <div className="watchlist-count" title="Your watchlist">
                ♥ {watchlist.size} saved
              </div>
            </div>

            <div className="actor-header gurudutt-header">
              <div className="actor-avatar gurudutt-avatar">VS</div>
              <div className="actor-bio">
                <h2 className="actor-name">V Shantaram</h2>
                <p className="actor-tagline gurudutt-tagline">Director · Actor · Producer · 1901–1990</p>
                <p className="actor-desc">V Shantaram was a visionary filmmaker and one of Indian cinema's greatest pioneers. Spanning five decades, his filmography includes groundbreaking works like Duniya Na Mane and the classical epic Shakuntala. Shantaram's films were ahead of their time — blending social realism with poetic sensibility, challenging convention and exploring themes of freedom, justice, and human potential. His influence on Indian cinema remains immeasurable, and his legacy continues to inspire filmmakers worldwide.</p>
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

export default VShantaramPage
