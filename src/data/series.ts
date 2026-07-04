import type { Series } from '../types/series'

export const seriesList: Series[] = [
  {
    title: 'Outlander',
    years: '2014–2023',
    synopsis: 'Claire Randall, a married WWII nurse, is mysteriously swept back in time to 18th-century Scotland, where she encounters the dashing Highland warrior Jamie Fraser and becomes entangled in the Jacobite risings. A sweeping epic of love, war, and survival across centuries.',
    genre: 'Drama, Romance, Historical',
    genres: ['Drama', 'Romance', 'Historical', 'Fantasy'],
    seasons: 7,
    episodes: 92,
    network: 'Starz',
    overallScore: 8.4,
    criticsRating: 8.6,
    usersRating: 8.2,
    poster: '/outlander.jpg',
    trailerId: 'ObRjnrFJYEY',
    cast: [
      { name: 'Caitríona Balfe', role: 'Claire Fraser', initials: 'CB' },
      { name: 'Sam Heughan', role: 'Jamie Fraser', initials: 'SH' },
      { name: 'Tobias Menzies', role: 'Frank/Jonathan Randall', initials: 'TM' },
    ],
    streaming: [
      { name: 'Starz', url: 'https://www.starz.com', color: '#000' },
      { name: 'Prime Video', url: 'https://www.amazon.com/primevideo?tag=cinebook2109-21', color: '#00a8e0' },
    ],
  },
]
