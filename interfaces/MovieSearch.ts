export interface MovieSearch {
  Poster: string;
  Title: string;
  Type: 'movie' | 'series' | 'episode';
  Year: string;
  imdbID: string;
}

export interface MovieSearchResult {
  Response: 'True' | 'False';
  Search?: MovieSearch[];
  totalResult?: string;
  Error?: string;
}
