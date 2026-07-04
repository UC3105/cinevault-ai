export interface CastMember {
  name: string
  role: string
  initials: string
}

export interface StreamingLink {
  name: string
  url: string
  color: string
}

export interface Movie {
  title: string
  year: number
  synopsis: string
  genre: string
  genres: string[]
  releaseDate: string
  duration: string
  overallScore: number
  yourRating: number
  metascore: number
  usersRating: number
  cast: CastMember[]
  poster: string
  trailerId: string
  streaming: StreamingLink[]
}
