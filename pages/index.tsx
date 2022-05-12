import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {SearchBar} from "../components/SearchBar/SearchBar";

const Home: NextPage = () => {
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
      </main>
    </div>
  )
}

export default Home
