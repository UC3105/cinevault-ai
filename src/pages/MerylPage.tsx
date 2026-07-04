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
import { merylMovies } from '../data/merylMovies'
import '../App.css'
import './MerylPage.css'

const allGenres = Array.from(new Set(merylMovies.flatMap(m => m.genres))).sort()

const MerylPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('meryl-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('meryl-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = merylMovies.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || m.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <>
      <Helmet>
        <title>Meryl Streep Films — CineVault | 3 Oscars, Essential Filmography</title>
        <meta name="description" content="Explore Meryl Streep's essential filmography on CineVault. The Deer Hunter, Sophie's Choice, The Devil Wears Prada, Kramer vs. Kramer and more — reviews, ratings and trailers." />
        <link rel="canonical" href="https://cinevault-pi-five.vercel.app/meryl-streep" />
      </Helmet>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="content-stack">
          <div className="top-bar">
            <div>
              <button className="back-btn" onClick={() => navigate('/')}>← Movies</button>
              <h1 className="site-title">
                CineVault <span className="site-sub">— Meryl Streep</span>
              </h1>
            </div>
            <div className="watchlist-count" title="Your watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <div className="meryl-header">
            <img src="/meryl-portrait.svg" alt="Meryl Streep" className="meryl-avatar" />
            <div className="meryl-bio">
              <h2 className="meryl-name">Meryl Streep</h2>
              <p className="meryl-tagline">3 Academy Awards · 21 nominations · The greatest actress of her generation</p>
              <p className="meryl-desc">From Holocaust survivor to Iron Prime Minister, from a possessed fashion editor to a tone-deaf opera diva — Meryl Streep has inhabited characters across every genre with unmatched range and depth. This is her essential filmography.</p>
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

export default MerylPage
