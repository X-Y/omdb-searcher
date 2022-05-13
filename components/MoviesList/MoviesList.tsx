import React from "react";

import {MovieSearch} from '../../interfaces/MovieSearch';

interface MovieItemProps extends MovieSearch {

}

interface MoviesListProps {
  movies: MovieSearch[]
}

const MovieItem:React.FC<MovieItemProps> = ({Title, Year, imdbID}) => {
  return <li>
    <span>Title: {Title}</span>
    <span>Release Year: {Year}</span>
  </li>
}
export const MoviesList:React.FC<MoviesListProps> = ({movies}) => {
  const listOfMovies = movies.map(movie => <MovieItem {...movie} key={'item-' + movie.imdbID}/>)
  return <ul>
    {listOfMovies}
  </ul>
}
