import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import styles from '../../styles/Home.module.css'

import {SearchBar} from "../../components/SearchBar/SearchBar";
import {useContext} from "react";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>OMDB Searcher</title>
        <meta name="description" content="Search movies with omdb api" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to OMDB Searcher {router.query.title}
        </h1>

        <SearchBar />
      </main>
    </div>
  )
}

export default Home
