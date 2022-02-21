import Head from 'next/head'
import Link from 'next/link'
import { ArrowLeft } from '.'
import styles from '../styles/Page.module.css'

type PageProps = {
  title: string
  description: string
  isBackArrowVisible?: boolean
}

export const Page: React.FC<PageProps> = ({
  children,
  title,
  description,
  isBackArrowVisible = true,
}) => {
  return (
    <div className={styles.page}>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.grid}>
        <nav className={styles.nav}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isBackArrowVisible && <ArrowLeft style={{ marginRight: '0.5rem' }} />}
            <Link href={`/`}>
              <a>meinstein</a>
            </Link>
          </div>
          <Link href={`/about`}>
            <a>about</a>
          </Link>
        </nav>
        <div>
          <main className={styles.content}>{children}</main>
        </div>
        {/* <footer className={styles.footer}>foo</footer> */}
      </div>
    </div>
  )
}
