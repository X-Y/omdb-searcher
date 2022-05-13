import {MoviesList} from "../MoviesList/MoviesList";
import {Pagination} from "../Pagination/Pagination";
import {MovieSearchResult} from "../../interfaces/MovieSearch";
import {FC} from "react";

interface MovieListResult extends MovieSearchResult {

}
export const MovieListResult:FC<MovieListResult> = ({Search, totalResults}) => {
  return <div>
    <MoviesList movies={Search || []} />
    <Pagination totalResults={totalResults} />
  </div>
}
