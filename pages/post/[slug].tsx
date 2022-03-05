import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Page } from '../../components'
import { api, formatDate, Post } from '../../utils'

const Post: NextPage<{ id: string; html: string; updatedAt: string; createdAt: string }> = ({
  // id,
  html,
  updatedAt,
  createdAt,
}) => {
  console.log(updatedAt)
  return (
    <Page title='fuhqu' description=''>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <div style={{ marginTop: '3rem' }}>
        <p>
          <samp>Last updated: {formatDate(updatedAt || createdAt)}</samp>
        </p>
        {/* <a href={`https://gist.github.com/${id}`}>Leave a comment</a> */}
      </div>
    </Page>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { posts } = await api.getSiteMap()
  const slugs = Object.keys(posts)

  return {
    paths: slugs.map(slug => {
      return { params: { slug } }
    }),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = typeof params?.slug === 'string' ? params.slug : ''
  const { posts } = await api.getSiteMap()
  const post = posts[slug]

  return {
    props: {
      id: post.id,
      html: post.html,
      lastUpdated: post.updated_at,
      createdAt: post.created_at,
    },
  }
}

export default Post
