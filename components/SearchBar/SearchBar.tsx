import {FormEvent, useState} from "react";
import axios from "axios";

import {MovieSearch} from "../../interfaces/MovieSearch";
import {MoviesList} from "../MoviesList/MoviesList";
import {searchApi} from "../../lib/frontendApi";

export const SearchBar = () => {
  const [movies, setMovies] = useState<MovieSearch[]>([]);
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      title: {value: string};
    }
    const searchQueries = Object.fromEntries([
      ['title', target.title.value],
    ].filter(([, val]) => !!val));

    const response = await searchApi(searchQueries);
    setMovies(response.data.Search);

  }
  return <form onSubmit={onFormSubmit}>
    <div>
      <input type={'text'} name={'title'}/>
      <button>Search</button>
    </div>

    <MoviesList movies={movies} />
  </form>
}
