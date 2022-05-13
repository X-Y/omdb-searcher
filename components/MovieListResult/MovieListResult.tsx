import {FC} from "react";

import {MoviesList} from "../MoviesList/MoviesList";
import {Pagination} from "../Pagination/Pagination";

import {MovieSearchResult} from "../../interfaces/MovieSearch";

import styles from '../../styles/MovieListResult.module.css'


interface MovieListResult extends MovieSearchResult {

}
export const MovieListResult:FC<MovieListResult> = ({Search, totalResults}) => {
  return <div className={styles.MovieListResult}>
    <div className={styles.MovieList}>
      <MoviesList movies={Search || []} />
    </div>
    <Pagination totalResults={totalResults} />
  </div>
}
