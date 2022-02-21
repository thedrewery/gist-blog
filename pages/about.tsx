import type { GetStaticProps, NextPage } from 'next'
import { Page } from '../components'
import { api } from '../utils'

const About: NextPage<{ html: string }> = ({ html }) => {
  return (
    <Page title='fuhqu' description=''>
      <div className='markdown-body' dangerouslySetInnerHTML={{ __html: html }} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { about } = await api.getSiteMap()

  return {
    props: {
      html: about.html,
    },
  }
}

export default About
