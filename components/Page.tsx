import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'
import createPersistedState from 'use-persisted-state'
import styles from '../styles/Page.module.css'
import { Brightness, MoonFill } from './icons'

type PageProps = {
  title: string
  description: string
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
      style={{ padding: '0 2rem' }}
    >
      <div className={styles.page}>
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
          <div className={styles['above-the-fold']}>
            <nav className={styles.nav}>
              <div>
                <samp style={{ textDecoration: 'wavy overline', fontSize: '85%' }}>
                  <Link href='/'>
                    <a>meinstein</a>
                  </Link>
                </samp>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {colorScheme === 'default' && (
                  <div
                    role='button'
                    onClick={() => setColorScheme('light')}
                    className={styles['color-scheme-btn']}
                  >
                    <div style={{ height: '1rem', width: '1rem', padding: '0 0.25rem' }} />
                  </div>
                )}
                {colorScheme === 'dark' && (
                  <div
                    role='button'
                    onClick={() => setColorScheme('light')}
                    className={styles['color-scheme-btn']}
                  >
                    <MoonFill />
                  </div>
                )}
                {colorScheme === 'light' && (
                  <div
                    role='button'
                    onClick={() => setColorScheme('dark')}
                    className={styles['color-scheme-btn']}
                  >
                    <Brightness />
                  </div>
                )}
              </div>
            </nav>
            <main className={styles.content}>{children}</main>
          </div>
          <footer className={styles.footer}>
            <span>
              <samp style={{ textDecoration: 'wavy overline', fontSize: '85%' }}>
                <Link href='/'>
                  <a>home</a>
                </Link>
              </samp>
            </span>
            <span>
              <samp style={{ margin: '0 1.25rem' }}>·</samp>
            </span>
            <span>
              <samp style={{ textDecoration: 'wavy overline', fontSize: '85%' }}>
                <Link href='/about'>
                  <a>about</a>
                </Link>
              </samp>
            </span>
            <span>
              <samp style={{ margin: '0 1.25rem' }}>·</samp>
            </span>
            <span>
              <samp style={{ textDecoration: 'wavy overline', fontSize: '85%' }}>
                <Link href='/about'>
                  <a>categories</a>
                </Link>
              </samp>
            </span>
          </footer>
        </div>
      </div>
    </div>
  )
}
