import React from "react";

import {Movie} from '../../interfaces/Movie';

interface MovieItemProps extends Movie {

}

interface MoviesListProps {
  movies: Movie[]
}

const MovieItem:React.FC<MovieItemProps> = ({Title, Year}) => {
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