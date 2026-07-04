import { useState } from 'react'
import type { Movie } from '../types/movie'
import RatingCircle from './RatingCircle'
import TrailerModal from './TrailerModal'
import StarRating from './StarRating'
import StreamingLinks from './StreamingLinks'
import './MovieCard.css'

interface Props {
  movie: Movie
}

const MovieCard = ({ movie, isWatchlisted, onWatchlistToggle }: Props & { isWatchlisted: boolean; onWatchlistToggle: (title: string) => void }) => {
  const [showTrailer, setShowTrailer] = useState(false)

  return (
    <>
      <div className="card">
        <div className="card-left">
          <div className="poster-wrap">
            <img src={movie.poster} alt={`${movie.title} poster`} className="poster-img" />
          </div>
          <div className="card-actions">
            <button
              className={`btn-primary${isWatchlisted ? ' watchlisted' : ''}`}
              onClick={() => onWatchlistToggle(movie.title)}
            >
              {isWatchlisted ? '✓ IN WATCHLIST' : '+ ADD TO WATCHLIST'}
            </button>
            <button className="btn-outline" onClick={() => setShowTrailer(true)}>▶ TRAILER</button>
          </div>
          <div className="stills-row">
            <div className="still s1" />
            <div className="still s2" />
            <div className="still s3" />
          </div>
        </div>

        <div className="card-right">
          <h2 className="card-title">
            {movie.title} <span className="card-year">({movie.year})</span>
          </h2>
          <p className="card-synopsis">{movie.synopsis}</p>

          <div className="ratings-block">
            <RatingCircle score={movie.overallScore} />
            <div className="rating-list">
              <div className="rating-row">
                <span className="rl">Your Rating</span>
                <span className="rv">{movie.yourRating}</span>
              </div>
              <div className="rating-row">
                <span className="rl">Metascore</span>
                <span className="rv">{movie.metascore}</span>
              </div>
              <div className="rating-row">
                <span className="rl">Users</span>
                <span className="rv">{movie.usersRating}</span>
              </div>
            </div>
            <div className="meta-list">
              <div className="meta-row">
                <span className="ml">Genre</span>
                <span className="mv">{movie.genre}</span>
              </div>
              <div className="meta-row">
                <span className="ml">Release date</span>
                <span className="mv">{movie.releaseDate}</span>
              </div>
              <div className="meta-row">
                <span className="ml">Duration</span>
                <span className="mv">{movie.duration}</span>
              </div>
            </div>
          </div>

          <StarRating movieTitle={movie.title} />

          <div className="cast-section">
            {movie.cast.map(({ name, role, initials }) => (
              <div key={name} className="cast-item">
                <div className="cast-avatar">{initials}</div>
                <span className="cast-name">{name}</span>
                <span className="cast-as">as...</span>
                <span className="cast-role">{role}</span>
              </div>
            ))}
            <div className="cast-more">•••</div>
          </div>

          <StreamingLinks links={movie.streaming} />
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          trailerId={movie.trailerId}
          title={movie.title}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  )
}

export default MovieCard
