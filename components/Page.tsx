import Head from 'next/head'
import Link from 'next/link'
import createPersistedState from 'use-persisted-state'
import styles from '../styles/Page.module.css'
import { BrightnessFill, MoonFill } from './icons'

type PageProps = {
  title: string
  description: string
  isBackArrowVisible?: boolean
}

type Theme = 'default' | 'light' | 'dark'

const THEME_MAP: Record<Theme, string> = {
  default:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown.min.css',
  dark: 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-dark.min.css',
  light:
    'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.1.0/github-markdown-light.min.css',
}

const useTheme = createPersistedState<Theme>('theme')

export const Page: React.FC<PageProps> = ({ children, title, description }) => {
  const [theme, setTheme] = useTheme('default')

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
          <link href={THEME_MAP[theme]} rel='stylesheet' />
          {/* Preload these so immediately available should user toggle themes */}
          <link rel='preload' href={THEME_MAP.light} as='style' />
          <link rel='preload' href={THEME_MAP.dark} as='style' />
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
              {theme === 'dark' ? (
                <button onClick={() => setTheme('light')} className={styles.themeBtn}>
                  <BrightnessFill />
                </button>
              ) : (
                <button onClick={() => setTheme('dark')} className={styles.themeBtn}>
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
