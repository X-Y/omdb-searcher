export interface MovieSearch {
  Poster: string;
  Title: string;
  Type: 'movie' | 'series' | 'episode';
  Year: string;
  imdbID: string;
}
