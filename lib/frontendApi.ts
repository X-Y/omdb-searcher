import axios from "axios";

export const getMovieApi = async (imdbID: string) => await axios.get('/api/getMovie', {
  params: {
    id: imdbID
  }
});

interface SearchQueries {
  title: string;
  type?: string;
  releaseYear?: string;
  page?: string
}
export const searchApi = async (searchQueries: SearchQueries) => {
  const {data} = await axios.get('/api/search', {
    params: searchQueries
  });

  return data;
}
