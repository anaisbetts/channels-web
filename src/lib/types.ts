export type Timestamp = number
export type IntAsString = string
export type DateFormattedString = string // YYYY-MM-DD

export interface StatusInformation {
  arch: string
  booted: boolean
  description: string
  features: { [key: string]: boolean }
  local_port: number
  name: string
  os: string
  prerelease: boolean
  start_time: string
  subscription: string
  suspected_proxies: null
  url: string
  username: string
  version: string
}

export interface TVShow {
  id: IntAsString
  name: string
  summary: string
  image_url: string
  release_year: number
  release_date: DateFormattedString
  genres: string[]
  categories: Category[]
  cast?: string[]
  episode_count: number
  number_unwatched: number
  favorited: boolean
  last_recorded_at: Timestamp
  created_at: Timestamp
  updated_at: Timestamp
  last_watched_at?: Timestamp
}

export interface Movie {
  id: IntAsString
  program_id?: string
  path: string
  title: string
  summary?: string
  full_summary?: string
  content_rating?: string
  image_url: string
  thumbnail_url: string
  duration: number
  playback_time: number
  release_year?: number
  release_date?: DateFormattedString
  genres?: string[]
  tags: string[]
  categories: Category[]
  cast?: string[]
  directors?: string[]
  watched: boolean
  favorited: boolean
  delayed: boolean
  cancelled: boolean
  corrupted: boolean
  completed: boolean
  processed: boolean
  locked: boolean
  verified: boolean
  created_at: Timestamp
  updated_at: Timestamp
  last_watched_at?: Timestamp
}

export interface Episode {
  id: IntAsString
  show_id: IntAsString
  path: string
  season_number: number
  episode_number: number
  title: string
  episode_title: string
  image_url: string
  thumbnail_url: string
  duration: number
  playback_time: number
  tags: string[]
  watched: boolean
  favorited: boolean
  delayed: boolean
  cancelled: boolean
  corrupted: boolean
  completed: boolean
  processed: boolean
  locked: boolean
  verified: boolean
  created_at: Timestamp
  updated_at: Timestamp
  program_id?: string
  summary?: string
  full_summary?: string
  content_rating?: string
  original_air_date?: DateFormattedString
  genres?: string[]
  categories?: Category[]
  cast?: string[]
  directors?: string[]
  last_watched_at?: Timestamp
}

export enum Category {
  Episode = 'Episode',
  FeatureFilm = 'Feature Film',
  Movie = 'Movie',
  TVMovie = 'TV Movie',
  Miniseries = 'Miniseries',
  Series = 'Series',
  Show = 'Show',
}
