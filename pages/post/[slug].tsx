import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Page } from '../../components'
import { api, Post } from '../../utils'

const Post: NextPage<{ id: string; html: string }> = ({ id, html }) => {
  return (
    <Page title='fuhqu' description=''>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <p>
        <a href={`https://gist.github.com/${id}`}>Leave a comment</a>
      </p>
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
    },
  }
}

export default Post
