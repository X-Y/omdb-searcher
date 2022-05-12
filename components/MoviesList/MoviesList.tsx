import React, {useState} from "react";

import {MovieSearch} from '../../interfaces/MovieSearch';
import axios from "axios";
import {MovieDetail} from "../../interfaces/MovieDetail";
import {MovieContent} from "../MovieContent/MovieContent";
import {getMovieApi} from "../../lib/frontendApi";

interface MovieItemProps extends MovieSearch {

}

interface MoviesListProps {
  movies: MovieSearch[]
}

const MovieItem:React.FC<MovieItemProps> = ({Title, Year, imdbID}) => {
  const [movieDetail, setMovieDetail] = useState<MovieDetail>({} as MovieDetail);
  const onLinkClick = async () => {
    const response = await getMovieApi(imdbID);
    setMovieDetail(response.data)
  }
  return <li>
    <a onClick={onLinkClick}>
      <span>Title: {Title}</span>
      <span>Release Year: {Year}</span>
    </a>

    {
      movieDetail &&
      <MovieContent {...movieDetail}/>
    }
  </li>
}
export const MoviesList:React.FC<MoviesListProps> = ({movies}) => {
  const listOfMovies = movies.map(movie => <MovieItem {...movie} key={'item-' + movie.imdbID}/>)
  return <ul>
    {listOfMovies}
  </ul>
}
