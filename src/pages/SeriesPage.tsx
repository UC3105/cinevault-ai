import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SeriesCard from '../components/SeriesCard'
import SearchBar from '../components/SearchBar'
import GenreFilter from '../components/GenreFilter'
import Newsletter from '../components/Newsletter'
import AdBanner from '../components/AdBanner'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import { seriesList } from '../data/series'
import '../App.css'
import './SeriesPage.css'

const allGenres = Array.from(new Set(seriesList.flatMap(s => s.genres))).sort()

const SeriesPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('All')
  const [watchlist, setWatchlist] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('series-watchlist')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const toggleWatchlist = (title: string) => {
    setWatchlist(prev => {
      const next = new Set(prev)
      next.has(title) ? next.delete(title) : next.add(title)
      localStorage.setItem('series-watchlist', JSON.stringify([...next]))
      return next
    })
  }

  const filtered = seriesList.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(search.toLowerCase())
    const matchesGenre = genre === 'All' || s.genres.includes(genre)
    return matchesSearch && matchesGenre
  })

  return (
    <>
      <Helmet>
        <title>TV Series — CineVault | Curated Show Reviews</title>
        <meta name="description" content="Binge-worthy TV series curated by CineVault. Reviews, ratings and streaming links for the best shows including Outlander and Holocaust – Die Geschichte der Familie Weiss." />
        <link rel="canonical" href="https://cinevault-pi-five.vercel.app/series" />
      </Helmet>
    <div className="app">
      <Sidebar />
      <main className="main-content">
        <div className="content-stack">
          <div className="top-bar">
            <div>
              <button className="back-btn" onClick={() => navigate('/')}>← Movies</button>
              <h1 className="site-title">CineVault <span className="site-sub">— TV Series</span></h1>
            </div>
            <div className="watchlist-count" title="Your series watchlist">
              ♥ {watchlist.size} saved
            </div>
          </div>

          <SearchBar value={search} onChange={setSearch} />
          <GenreFilter genres={allGenres} active={genre} onChange={setGenre} />

          {filtered.length === 0 ? (
            <div className="no-results">No series found for "{search}"</div>
          ) : (
            filtered.map(series => (
              <SeriesCard
                key={series.title}
                series={series}
                isWatchlisted={watchlist.has(series.title)}
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

export default SeriesPage
