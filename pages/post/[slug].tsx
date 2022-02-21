import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ArrowRight, Page } from '../../components'
import styles from '../../styles/Post.module.css'
import { api, Post } from '../../utils'

const Post: NextPage<{ id: string; html: string }> = ({ id, html }) => {
  return (
    <Page title='fuhqu' description=''>
      <div
        className='markdown-body'
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <div className={styles.comment}>
        <a href={`https://gist.github.com/${id}`}>Leave a comment</a>
        <ArrowRight style={{ marginLeft: '0.5rem' }} />
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
    },
  }
}

export default Post
