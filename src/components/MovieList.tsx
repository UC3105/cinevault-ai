import './MovieList.css'

const movies = [
  { title: 'Once Upon a Time in America', year: 1984, genre: 'Crime, Drama', score: 8.3, color: '#1a1a2e' },
  { title: 'Finding Neverland', year: 2004, genre: 'Biography, Drama', score: 7.6, color: '#1a2a1a' },
  { title: 'Mother India', year: 1957, genre: 'Drama', score: 8.0, color: '#2a1a0e' },
  { title: 'Sophie Scholl: The Final Days', year: 2005, genre: 'Biography, History', score: 7.9, color: '#1a1a1a' },
  { title: 'The Wind That Shakes the Barley', year: 2006, genre: 'Drama, War', score: 7.7, color: '#0e1a0e' },
]

const MovieList = () => {
  return (
    <div className="movie-list">
      {movies.map(({ title, year, genre, score, color }) => (
        <div key={title} className="movie-card">
          <div className="movie-card-poster" style={{ background: color }}>
            <span className="movie-card-initial">{title[0]}</span>
          </div>
          <div className="movie-card-info">
            <p className="movie-card-title">{title}</p>
            <p className="movie-card-meta">{year} · {genre}</p>
            <p className="movie-card-score">{score.toFixed(1)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MovieList
