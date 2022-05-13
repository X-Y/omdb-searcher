import {MovieSearchResult} from "../../interfaces/MovieSearch";
import {FC} from "react";

interface ErrorResultProps extends Pick<MovieSearchResult, 'Error'> {

}
export const ErrorResult: FC<ErrorResultProps> = ({Error}) => {
  return <div>
    {Error}
  </div>
}
