import type { StreamingLink } from '../types/movie'
import './StreamingLinks.css'

interface Props {
  links: StreamingLink[]
}

const StreamingLinks = ({ links }: Props) => (
  <div className="streaming">
    <span className="streaming-label">Watch on</span>
    <div className="streaming-btns">
      {links.map(({ name, url, color }) => (
        <a
          key={name}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="streaming-btn"
          style={{ borderColor: color, color }}
        >
          {name}
        </a>
      ))}
    </div>
  </div>
)

export default StreamingLinks
