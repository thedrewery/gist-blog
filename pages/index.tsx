import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { Page } from '../components'
import { api, formatDate } from '../utils'

const Home: NextPage<{ posts: typeof api.siteMap.posts }> = props => {
  return (
    <Page title='fuhqu' description='' isBackArrowVisible={false}>
      <div role='list'>
        {Object.entries(props.posts).map(([slug, post]) => {
          return (
            <div key={post.id} style={{ marginBottom: '3rem' }} role='listitem'>
              <Link href={`/post/${slug}`}>
                <a>
                  <h3>{post.metadata.title}</h3>
                </a>
              </Link>
              <p>{post.metadata.snippet}</p>
              <small className='pl-c'>
                {formatDate(post.created_at || '')} · {post.comments} comments
              </small>
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
