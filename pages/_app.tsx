import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig 
      value={{
        refreshInterval: 10000,
        errorRetryCount: 3,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json()).catch(err => err)
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
