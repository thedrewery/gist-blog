import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Page.module.css'

type PageProps = {
  title: string
  description: string
}

export const Page: React.FC<PageProps> = props => {
  return (
    <div className={styles.page}>
      <Head>
        <title>{props.title}</title>
        <meta name='description' content={props.description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.grid}>
        <nav className={styles.nav}>
          <Link href={`/`}>
            <a>meinstein</a>
          </Link>
          <Link href={`/about`}>
            <a>about</a>
          </Link>
        </nav>
        <div>
          <main className={styles.content}>{props.children}</main>
        </div>
        {/* <footer className={styles.footer}>foo</footer> */}
      </div>
    </div>
  )
}
