import axios from "axios";

export const getMovieApi = async (imdbID: string) => await axios.get('/api/getMovie', {
  params: {
    id: imdbID
  }
});

interface SearchQueries {
  title: string;
  type: string;
  releaseYear: number;
}
export const searchApi = async (searchQueries: SearchQueries) => axios.get('/api/search', {
  params: searchQueries
})
