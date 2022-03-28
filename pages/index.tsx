import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../components'
import styles from '../styles/Home.module.css'
import { api } from '../utils'

const Home: NextPage<{
  posts: typeof api.siteMap.posts
  tags: typeof api.siteMap.tags
}> = props => {
  return (
    <Page title='fuhqu' description=''>
      <div className={styles.grid}>
        <div className={styles.content}>
          <h4>Recently Written</h4>
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
        </div>
        <aside className={styles.sidebar}>
          <div>
            {console.log(props.tags)}
            <h4>Top Categories</h4>
            <div style={{ marginTop: 24 }}>
              {Object.entries(props.tags)
                .sort((a, b) => a[1] - b[1])
                .map(([tag]) => {
                  return (
                    <code key={tag} className={styles.category}>
                      {tag}
                    </code>
                  )
                })}
            </div>
          </div>
        </aside>
      </div>
    </Page>
  )
}

export const getStaticProps: GetStaticProps<{
  posts: typeof api.siteMap.posts
}> = async () => {
  const { posts, tags } = await api.getSiteMap()
  return {
    props: {
      posts,
      tags,
    },
  }
}

export default Home
