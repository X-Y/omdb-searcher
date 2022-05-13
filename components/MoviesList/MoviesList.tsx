import React from "react";

import {MovieSearch} from '../../interfaces/MovieSearch';

import styles from '../../styles/MovieList.module.css'

interface MovieItemProps extends MovieSearch {

}

interface MoviesListProps {
  movies: MovieSearch[]
}

const MovieItem:React.FC<MovieItemProps> = ({Title, Year, Type, imdbID}) => {
  return <li>
    <span className={styles.title}>{Title}</span>
    <span className={styles.year}>{Year}</span>
    <span className={styles.type}>{Type}</span>
  </li>
}
export const MoviesList:React.FC<MoviesListProps> = ({movies}) => {
  const listOfMovies = movies.map(movie => <MovieItem {...movie} key={'item-' + movie.imdbID}/>)
  return <ul className={styles.MovieList}>
    {listOfMovies}
  </ul>
}
