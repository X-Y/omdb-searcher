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



const SearchPage: NextPage = () => {
  const router = useRouter();

  const {title} = router.query;
  const { status, data, error, isFetching } = useQuery<MovieSearchResult>(['search', title], () => searchApi({
    title: typeof title === 'string' ? title : ''
  }), {
    enabled: !!title,
    staleTime: 600000
  });

  let resultArea;

  if(data) {
    if(data.Response === 'True') {
      resultArea = <MoviesList movies={data.Search || []} />
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

        <SearchBar />

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
