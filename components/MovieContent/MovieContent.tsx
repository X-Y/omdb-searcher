import {MovieDetail} from "../../interfaces/MovieDetail";
import React from "react";

interface MovieContentProps extends MovieDetail {

}

export const MovieContent: React.FC<MovieContentProps> = ({Title, Actors, Plot}) => {
  return <article>
    <h3>{Title}</h3>
    <div>{Actors}</div>
    <div>{Plot}</div>
  </article>
}
