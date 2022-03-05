import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import styles from '../styles/Page.module.css'
import { Brightness, MoonFill } from './icons'

type PageProps = {
  title: string
  description: string
  isBackArrowVisible?: boolean
}

type Scheme = 'default' | 'light' | 'dark'

const COLOR_SCHEME_MAP: Record<Scheme, string> = {
  // This stylesheet will use whatever the user's preferred color scheme is.
  default:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css',
  light:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css',
}

const useColorScheme = createPersistedState<Scheme>('prefers-color-scheme')

export const Page: React.FC<PageProps> = ({ children, title, description }) => {
  const [colorScheme, setColorScheme] = useColorScheme('default')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const initialColorScheme = mediaQuery.matches ? 'dark' : 'light'
    if (colorScheme === 'default') setColorScheme(initialColorScheme)
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
          <link rel='preload' href={COLOR_SCHEME_MAP.light} as='style' />
          <link rel='preload' href={COLOR_SCHEME_MAP.dark} as='style' />
          {colorScheme === 'light' && <link rel='stylesheet' href={COLOR_SCHEME_MAP.light} />}
          {colorScheme === 'dark' && <link rel='stylesheet' href={COLOR_SCHEME_MAP.dark} />}
          {colorScheme === 'default' && <link rel='stylesheet' href={COLOR_SCHEME_MAP.default} />}
        </Head>
        <div className={styles.grid}>
          <nav className={styles.nav}>
            <code style={{ display: 'flex', alignItems: 'center' }}>
              <Link href='/'>
                <a className='pl-c1'>meinstein</a>
              </Link>
            </code>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <samp style={{ marginRight: '1.25rem', fontSize: '85%' }}>
                <Link href='/about'>
                  <a>about</a>
                </Link>
              </samp>
              {colorScheme === 'default' && (
                <button onClick={() => setColorScheme('light')} className={styles.themeBtn}>
                  {/* Placeholder while JS figures out whether to use dark or light. */}
                  <div style={{ height: '1rem', width: '1rem', padding: '0 0.25rem' }} />
                </button>
              )}
              {colorScheme === 'dark' && (
                <button onClick={() => setColorScheme('light')} className={styles.themeBtn}>
                  <MoonFill />
                </button>
              )}
              {colorScheme === 'light' && (
                <button onClick={() => setColorScheme('dark')} className={styles.themeBtn}>
                  <Brightness />
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
