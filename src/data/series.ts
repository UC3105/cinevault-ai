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
    trailerId: 'PFFKjptRr7Y',
    cast: [
      { name: 'Caitríona Balfe', role: 'Claire Fraser', initials: 'CB' },
      { name: 'Sam Heughan', role: 'Jamie Fraser', initials: 'SH' },
      { name: 'Tobias Menzies', role: 'Frank/Jonathan Randall', initials: 'TM' },
    ],
    streaming: [
      { name: 'Starz', url: 'https://www.starz.com', color: '#555' },
      { name: 'Prime Video', url: 'https://www.amazon.com/primevideo?tag=cinebook2109-21', color: '#00a8e0' },
    ],
  },
  {
    title: 'Holocaust – Die Geschichte der Familie Weiss',
    years: '1978',
    synopsis: 'The Holocaust is seen through the eyes of two families: the Weiss family, German Jews whose lives are destroyed by the Nazi regime, and the Dorf family, whose son Erik rises through the SS ranks. This landmark American miniseries brought the Holocaust into living rooms worldwide, won four Emmy Awards, and sparked a national reckoning in Germany when it aired there in 1979.',
    genre: 'Drama, War, Historical',
    genres: ['Drama', 'War', 'Historical', 'Holocaust'],
    seasons: 1,
    episodes: 4,
    network: 'NBC',
    overallScore: 8.5,
    criticsRating: 8.8,
    usersRating: 8.2,
    poster: '/holocaust-weiss.png',
    trailerId: 'nZy_i9EApOE',
    cast: [
      { name: 'Meryl Streep', role: 'Inga Helms Weiss', initials: 'MS' },
      { name: 'James Woods', role: 'Karl Weiss', initials: 'JW' },
      { name: 'Michael Moriarty', role: 'Erik Dorf', initials: 'MM' },
    ],
    streaming: [
      { name: 'Prime Video', url: 'https://www.amazon.com/primevideo?tag=cinebook2109-21', color: '#00a8e0' },
      { name: 'YouTube', url: 'https://www.youtube.com/results?search_query=Holocaust+1978+miniseries', color: '#ff0000' },
    ],
  },
]
