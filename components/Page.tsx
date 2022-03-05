import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import styles from '../styles/Page.module.css'
import { BrightnessFill, MoonFill } from './icons'

type PageProps = {
  title: string
  description: string
  isBackArrowVisible?: boolean
}

type Scheme = 'default' | 'light' | 'dark'

const COLOR_SCHEME_MAP: Record<Scheme, string> = {
  default:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css',
  light:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css',
}

const useColorScheme = createPersistedState<Scheme>('theme')

export const Page: React.FC<PageProps> = ({ children, title, description }) => {
  const [colorScheme, setColorScheme] = useColorScheme('default')

  // If set to default, figure out what system theme is and switch to that stylesheet.
  useEffect(() => {
    if (colorScheme === 'default') {
      const mql = window.matchMedia('(prefers-color-scheme: dark)')
      setColorScheme(mql.matches ? 'dark' : 'light')
    }
  }, [colorScheme, setColorScheme])

  return (
    <div
      // Required className when using github-markdown-css
      className='markdown-body'
      style={{
        minHeight: '100vh',
        padding: '0 2rem',
      }}
    >
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <Head>
          <title>{title}</title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
          <meta name='description' content={description} />
          <link rel='icon' href='/favicon.ico' />
          <link href={COLOR_SCHEME_MAP[colorScheme]} rel='stylesheet' />
          {/* Preload these so immediately available should user toggle themes */}
          <link rel='preload' href={COLOR_SCHEME_MAP.light} as='style' />
          <link rel='preload' href={COLOR_SCHEME_MAP.dark} as='style' />
        </Head>
        <div className={styles.grid}>
          <nav className={styles.nav}>
            <code style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/'>
                <a className={styles.text}>meinstein</a>
              </Link>
            </code>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <samp style={{ marginRight: '1rem', fontSize: '85%' }}>
                <Link href='/about'>
                  <a className={styles.text}>about</a>
                </Link>
              </samp>
              {colorScheme === 'default' && (
                <button onClick={() => setColorScheme('light')} className={styles.themeBtn}>
                  {/* Placeholder while JS figures out whether to use dark or light. */}
                  <div style={{ height: '1rem', width: '1rem' }} />
                </button>
              )}
              {colorScheme === 'dark' && (
                <button onClick={() => setColorScheme('light')} className={styles.themeBtn}>
                  <BrightnessFill />
                </button>
              )}
              {colorScheme === 'light' && (
                <button onClick={() => setColorScheme('dark')} className={styles.themeBtn}>
                  <MoonFill />
                </button>
              )}
            </div>
          </nav>
          <div>
            <main className={styles.content}>{children}</main>
          </div>
          <footer className={styles.footer}></footer>
        </div>
      </div>
    </div>
  )
}
