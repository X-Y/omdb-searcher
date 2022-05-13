import {QueryClient, QueryClientProvider} from "react-query";
import type { AppProps } from 'next/app'

import '../styles/globals.css'
import {SearchContextProvider} from "../contexts/SearchContext/SearchContextProvider";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return <QueryClientProvider client={queryClient}>
    <SearchContextProvider>
      <Component {...pageProps} />
    </SearchContextProvider>
  </QueryClientProvider>
}

export default MyApp
