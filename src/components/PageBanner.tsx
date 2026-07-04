import { useNavigate } from 'react-router-dom'
import './PageBanner.css'

interface BannerItem {
  label: string
  description: string
  route: string
  emoji: string
  color: string
}

const banners: BannerItem[] = [
  {
    label: 'TV Series',
    description: 'Binge-worthy shows, curated picks & watchlists',
    route: '/series',
    emoji: '📺',
    color: '#2ecc71',
  },
  {
    label: 'Meryl Streep',
    description: '3 Oscars · 21 nominations · Essential filmography',
    route: '/meryl-streep',
    emoji: '🎭',
    color: '#e8b4d0',
  },
  {
    label: 'Robert De Niro',
    description: '2 Oscars · Scorsese collaborations & beyond',
    route: '/robert-de-niro',
    emoji: '🎬',
    color: '#e74c3c',
  },
  {
    label: 'Iranian Cinema',
    description: 'Majidi · Kiarostami · Farhadi · Children & humanity',
    route: '/iranian-cinema',
    emoji: '🇮🇷',
    color: '#27ae60',
  },
]

const PageBanner = () => {
  const navigate = useNavigate()

  return (
    <div className="page-banners">
      {banners.map(b => (
        <button key={b.route} className="page-banner" style={{ borderColor: b.color }} onClick={() => navigate(b.route)}>
          <span className="banner-emoji">{b.emoji}</span>
          <div className="banner-text">
            <span className="banner-label" style={{ color: b.color }}>{b.label}</span>
            <span className="banner-desc">{b.description}</span>
          </div>
          <span className="banner-arrow" style={{ color: b.color }}>→</span>
        </button>
      ))}
    </div>
  )
}

export default PageBanner
