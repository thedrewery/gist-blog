import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../components'
import styles from '../styles/Home.module.css'
import { api } from '../utils'

const Home: NextPage<{ posts: typeof api.siteMap.posts }> = props => {
  return (
    <Page title='fuhqu' description='' isBackArrowVisible={false}>
      <div role='list'>
        {Object.entries(props.posts).map(([slug, post]) => {
          const href = `/post/${slug}`

          return (
            <div key={post.id} role='listitem' className={styles.post}>
              <article>
                <Link href={href}>
                  <a>
                    <h3>{post.metadata.title}</h3>
                  </a>
                </Link>
                <p>{post.metadata.snippet}</p>
                <Link href={href}>
                  <a>
                    <p>Read More</p>
                  </a>
                </Link>
              </article>
            </div>
          )
        })}
      </div>
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
