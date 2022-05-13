import type { NextPage } from 'next'
import Head from 'next/head'
import {useQuery} from "react-query";

import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'

import {SearchBar} from "../../components/SearchBar/SearchBar";
import {searchApi} from "../../lib/frontendApi";
import {MoviesList} from "../../components/MoviesList/MoviesList";
import {MovieSearchResult} from "../../interfaces/MovieSearch";
import {ErrorResult} from "../../components/ErrorResult/ErrorResult";
import {MovieListResult} from "../../components/MovieListResult/MovieListResult";


const SearchPage: NextPage = () => {
  const router = useRouter();

  const {title, page} = router.query;

  const { status, data, error, isFetching } = useQuery<MovieSearchResult>(['search', title, page], () => searchApi({
    title: typeof title === 'string' ? title : '',
    page: typeof page === 'string' ? page : ''
  }), {
    enabled: !!title,
    staleTime: 600000
  });

  const searchBarText = typeof title === 'string' ? title : '';

  let resultArea;

  if(data) {
    if(data.Response === 'True') {
      resultArea = <MovieListResult {...data} />
    } else {
      resultArea = <ErrorResult Error={data.Error} />
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>OMDB Searcher</title>
        <meta name="description" content="Search movies with omdb api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to OMDB Searcher
        </h1>

        <SearchBar text={searchBarText}/>

        {
          status === 'loading' ?
            <div>Is Loading...</div>
            : status === 'error' &&
              <div>Something happened, please try again!</div>
        }

        { resultArea }
      </main>
    </div>
  )
}

export default SearchPage
