import { Endpoints } from '@octokit/types'
// import nock from 'nock'
import { Octokit } from 'octokit'

export const octokit = new Octokit({ auth: process.env.GH_AUTH })

// nock('https://api.github.com').persist().get(/.*/).reply(200, {})

export type Gist = Endpoints['GET /gists/{gist_id}']['response']['data']

export type File = {
  filename: string
  type: string
  language: string
  raw_url: string
  size: number
  truncated: boolean
  content: string
}

export type Files = {
  'meta.json': File
  'content.md': File
}

export type Post = Gist & { files: Files }

export type SiteMap = {
  about: Post
  posts: Record<string, Post>
}

class Api {
  siteMap: SiteMap

  constructor() {
    this.siteMap = { posts: {} } as SiteMap
  }

  getHtml = async (text: string) => {
    const res = await octokit.request('POST /markdown', { text, mode: 'gfm' })
    return res.data
  }

  getSiteMap = async () => {
    const gists = await octokit.request('GET /gists', { per_page: 100 })
    const allGists = gists.data || []

    const gistsWithContent = await Promise.all(
      allGists
        .filter(gist => {
          return Boolean(gist.files?.['meta.json']) && Boolean(gist.files?.['content.md'])
        })
        .map(gist => {
          return octokit.request('GET /gists/{gist_id}', { gist_id: gist.id })
        }),
    )

    gistsWithContent.forEach(res => {
      const data = res.data as Post
      const files = data.files
      const meta = files['meta.json'].content
      const content = files['content.md'].content

      if (meta && content) {
        const metadata = JSON.parse(meta)
        const slug = metadata?.slug

        if (slug) {
          if (slug === 'about') {
            this.siteMap.about = data
          } else {
            this.siteMap.posts[slug] = data
          }
        }
      }
    })

    return this.siteMap
  }
}

export const api = new Api()
