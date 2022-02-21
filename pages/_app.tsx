import type { AppProps } from 'next/app'
import '../styles/github-markdown-dark.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
