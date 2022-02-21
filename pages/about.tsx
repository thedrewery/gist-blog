import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Page } from '../components'
import { api } from '../utils'

const About: NextPage<{ contentHtml: string }> = ({ contentHtml }) => {
  return (
    <Page title='fuhqu' description=''>
      <div className='markdown-body' dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { about } = await api.getSiteMap()
  const contentHtml = await api.getHtml(about.files['content.md'].content)

  return {
    props: {
      contentHtml,
    },
  }
}

export default About
