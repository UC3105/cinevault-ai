export interface Series {
  title: string
  years: string
  synopsis: string
  genre: string
  genres: string[]
  seasons: number
  episodes: number
  network: string
  overallScore: number
  criticsRating: number
  usersRating: number
  poster: string
  trailerId: string
  cast: { name: string; role: string; initials: string }[]
  streaming: { name: string; url: string; color: string }[]
}
