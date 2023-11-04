export type Timestamp = number
export type IntAsString = string
export type DateFormattedString = string // YYYY-MM-DD

/*
 * Status
 */

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

/*
 * Library Querying
 */

export enum Category {
  Episode = 'Episode',
  FeatureFilm = 'Feature Film',
  Movie = 'Movie',
  TVMovie = 'TV Movie',
  Miniseries = 'Miniseries',
  Series = 'Series',
  Show = 'Show',
}

export type Media = {
  id: IntAsString
  image_url: string
  favorited: boolean
  created_at: Timestamp
  updated_at: Timestamp
  last_watched_at?: Timestamp
}

export type PlayableMedia = Media & {
  path: string
  duration: number
  playback_time: number
  tags: string[]
  watched: boolean
  delayed: boolean
  cancelled: boolean
  corrupted: boolean
  completed: boolean
  processed: boolean
  locked: boolean
  verified: boolean
  thumbnail_url: string
  categories: Category[]
  cast?: string[]
  directors?: string[]
  summary?: string
  full_summary?: string
  content_rating?: string
  genres?: string[]
}

export interface TVShow extends Media {
  name: string
  summary: string
  release_year: number
  release_date: DateFormattedString
  genres: string[]
  categories: Category[]
  cast?: string[]
  episode_count: number
  number_unwatched: number
  last_recorded_at: Timestamp
}

export interface Movie extends PlayableMedia {
  program_id?: string
  title: string
  release_year?: number
  release_date?: DateFormattedString
}

export interface Episode extends PlayableMedia {
  show_id: IntAsString
  season_number: number
  episode_number: number
  title: string
  episode_title: string
  original_air_date?: DateFormattedString
}

/*
 * Media Information
 */

export interface MediaInfo {
  chapters: any[]
  format: Format
  m3u8_up_to_date: boolean
  streams: Stream[]
}

export interface Format {
  bit_rate: string
  duration: string
  filename: string
  format_long_name: string
  format_name: string
  nb_programs: number
  nb_streams: number
  probe_score: number
  size: string
  start_time: string
  tags: FormatTags
}

export interface FormatTags {
  creation_time: string
  encoder: string
  title: string
}

export interface Stream {
  avg_frame_rate: string
  chroma_location?: string
  closed_captions?: number
  codec_long_name: string
  codec_name: string
  codec_tag: string
  codec_tag_string: string
  codec_type: string
  coded_height?: number
  coded_width?: number
  color_range?: string
  display_aspect_ratio?: string
  disposition: Record<string, number>
  extradata_size?: number
  film_grain?: number
  has_b_frames?: number
  height?: number
  index: number
  level?: number
  pix_fmt?: string
  profile?: string
  r_frame_rate: string
  refs?: number
  sample_aspect_ratio?: string
  start_pts: number
  start_time: string
  tags: Record<string, string>
  time_base: string
  width?: number
  bit_rate?: string
  bits_per_sample?: number
  channel_layout?: string
  channels?: number
  sample_fmt?: string
  sample_rate?: string
  duration?: string
  duration_ts?: number
}
