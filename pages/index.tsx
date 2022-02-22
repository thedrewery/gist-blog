import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../components'
import styles from '../styles/Home.module.css'
import { api, formatDate } from '../utils'

const Home: NextPage<{ posts: typeof api.siteMap.posts }> = props => {
  return (
    <Page title='fuhqu' description='' isBackArrowVisible={false}>
      <ul>
        {Object.entries(props.posts).map(([slug, post]) => {
          return (
            <li key={post.id} className={styles.post}>
              <Link href={`/post/${slug}`}>
                <a>
                  <h3 className={styles.title}>{post.metadata.title}</h3>
                  <p className={styles.snippet}>{post.metadata.snippet}</p>
                  <p className={styles.meta}>
                    {formatDate(post.created_at || '')} · {post.comments} comments
                  </p>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{
  posts: typeof api.siteMap.posts
}> = async () => {
  const { posts } = await api.getSiteMap()
  return {
    props: {
      posts,
    },
  }
}

export default Home
