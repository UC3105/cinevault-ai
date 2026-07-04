import RatingCircle from './RatingCircle'
import './MovieDetail.css'

const cast = [
  { name: 'Cillian Murphy', role: 'J. Robert Oppenheimer', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Cillian_Murphy_2018.png/220px-Cillian_Murphy_2018.png' },
  { name: 'Emily Blunt', role: 'Katherine Oppenheimer', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Emily_Blunt_TIFF_2012.jpg/220px-Emily_Blunt_TIFF_2012.jpg' },
  { name: 'Matt Damon', role: 'Leslie Groves', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Matt_Damon_2023.jpg/220px-Matt_Damon_2023.jpg' },
]

const MovieDetail = () => {
  return (
    <div className="card">
      {/* Left: poster + actions + stills */}
      <div className="card-left">
        <div className="poster-wrap">
          <img src="/oppenheimer.jpg" alt="Oppenheimer poster" className="poster-img" />
        </div>
        <div className="card-actions">
          <button className="btn-primary">ADD TO WATCHLIST</button>
          <button className="btn-outline">WATCH TRAILER</button>
        </div>
        <div className="stills-row">
          {[1, 2, 3].map(i => (
            <div key={i} className="still" />
          ))}
        </div>
      </div>

      {/* Right: all info */}
      <div className="card-right">
        <h1 className="title">Oppenheimer <span className="year">(2023)</span></h1>
        <p className="synopsis">
          The story of J. Robert Oppenheimer, the brilliant physicist who led the Manhattan Project
          and forever changed the course of history by developing the world's first nuclear weapon.
        </p>

        <div className="ratings-block">
          <RatingCircle score={8.9} />
          <div className="rating-list">
            <div className="rating-row">
              <span className="rl">Your Rating</span>
              <span className="rv">9.2</span>
            </div>
            <div className="rating-row">
              <span className="rl">Metascore</span>
              <span className="rv">8.8</span>
            </div>
            <div className="rating-row">
              <span className="rl">Users</span>
              <span className="rv">8.7</span>
            </div>
          </div>
          <div className="meta-list">
            <div className="meta-row">
              <span className="ml">Genre</span>
              <span className="mv">Biography, Drama</span>
            </div>
            <div className="meta-row">
              <span className="ml">Release date</span>
              <span className="mv">21.07.2023</span>
            </div>
            <div className="meta-row">
              <span className="ml">Duration</span>
              <span className="mv">180 min</span>
            </div>
          </div>
        </div>

        <div className="cast-list">
          {cast.map(({ name, role, img }) => (
            <div key={name} className="cast-item">
              <img src={img} alt={name} className="cast-avatar" />
              <span className="cast-name">{name}</span>
              <span className="cast-as">as...</span>
              <span className="cast-role">{role}</span>
            </div>
          ))}
        </div>
        <div className="cast-more">•••</div>
      </div>
    </div>
  )
}

export default MovieDetail
