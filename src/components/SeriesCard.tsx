import { useState } from 'react'
import type { Series } from '../types/series'
import RatingCircle from './RatingCircle'
import TrailerModal from './TrailerModal'
import StarRating from './StarRating'
import StreamingLinks from './StreamingLinks'
import './SeriesCard.css'

interface Props {
  series: Series
  isWatchlisted: boolean
  onWatchlistToggle: (title: string) => void
}

const SeriesCard = ({ series, isWatchlisted, onWatchlistToggle }: Props) => {
  const [showTrailer, setShowTrailer] = useState(false)

  return (
    <>
      <div className="card series-card">
        <div className="card-left">
          <div className="poster-wrap">
            <img src={series.poster} alt={`${series.title} poster`} className="poster-img" />
          </div>
          <div className="card-actions">
            <button
              className={`btn-primary${isWatchlisted ? ' watchlisted' : ''}`}
              onClick={() => onWatchlistToggle(series.title)}
            >
              {isWatchlisted ? '✓ IN WATCHLIST' : '+ ADD TO WATCHLIST'}
            </button>
            <button className="btn-outline" onClick={() => setShowTrailer(true)}>▶ TRAILER</button>
          </div>
        </div>

        <div className="card-right">
          <h2 className="card-title">
            {series.title} <span className="card-year">({series.years})</span>
          </h2>
          <p className="card-synopsis">{series.synopsis}</p>

          <div className="ratings-block">
            <RatingCircle score={series.overallScore} />
            <div className="rating-list">
              <div className="rating-row">
                <span className="rl">Critics</span>
                <span className="rv">{series.criticsRating}</span>
              </div>
              <div className="rating-row">
                <span className="rl">Users</span>
                <span className="rv">{series.usersRating}</span>
              </div>
            </div>
            <div className="meta-list">
              <div className="meta-row">
                <span className="ml">Genre</span>
                <span className="mv">{series.genre}</span>
              </div>
              <div className="meta-row">
                <span className="ml">Seasons</span>
                <span className="mv">{series.seasons} seasons · {series.episodes} eps</span>
              </div>
              <div className="meta-row">
                <span className="ml">Network</span>
                <span className="mv">{series.network}</span>
              </div>
            </div>
          </div>

          <StarRating movieTitle={series.title} />

          <div className="cast-section">
            {series.cast.map(({ name, role, initials }) => (
              <div key={name} className="cast-item">
                <div className="cast-avatar">{initials}</div>
                <span className="cast-name">{name}</span>
                <span className="cast-as">as...</span>
                <span className="cast-role">{role}</span>
              </div>
            ))}
          </div>

          <StreamingLinks links={series.streaming} />
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          trailerId={series.trailerId}
          title={series.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  )
}

export default SeriesCard
