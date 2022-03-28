import { Endpoints } from '@octokit/types'
import countBy from 'lodash.countby'
import { Octokit } from 'octokit'

export const octokit = new Octokit({ auth: process.env.GH_AUTH })

export type Gist = Endpoints['GET /gists/{gist_id}']['response']['data']

export type Metadata = {
  title: string
  location?: string
  snippet?: string
  tags?: string[]
}

export type Post = Gist & {
  metadata: Metadata
  slug: string
  html: string
}

export type SiteMap = {
  about: Post
  tags: Record<string, number>
  posts: Record<string, Post>
}

class Api {
  siteMap: SiteMap

  constructor() {
    this.siteMap = {
      posts: {},
    } as SiteMap
  }

  getSiteMap = async () => {
    const gists = await octokit.request('GET /gists', { per_page: 100 })
    const allGists = gists.data || []

    const gistsWithContent = await Promise.all(
      allGists
        .filter(gist => {
          const fileNames = Object.keys(gist.files)
          const hasMetadataFile = fileNames.find(file => file === 'meta.json')
          const hasContentFile = fileNames.filter(file => file.endsWith('.md'))?.length === 1
          return hasMetadataFile && hasContentFile
        })
        .map(gist => {
          return octokit.request('GET /gists/{gist_id}', { gist_id: gist.id })
        }),
    )

    let tags: Array<string | undefined> = []

    for (const gist of gistsWithContent) {
      const files = gist.data.files || {}
      const metadataContent = files?.['meta.json']?.content

      const fileNames = Object.keys(files)
      const markdownFile = fileNames.find(file => file.endsWith('.md')) || ''
      const markdownContent = files[markdownFile]?.content || ''

      if (metadataContent && markdownContent) {
        const html = await octokit.request('POST /markdown', { text: markdownContent, mode: 'gfm' })

        const post: Post = {
          ...gist.data,
          html: html.data,
          slug: markdownFile.slice(0, -3),
          metadata: JSON.parse(metadataContent),
        }

        if (post.slug === 'about') {
          this.siteMap.about = post
        } else {
          tags = tags.concat(post.metadata?.tags)
          this.siteMap.posts[post.slug] = post
        }
      }
    }

    this.siteMap.tags = countBy(tags.filter(Boolean))

    return this.siteMap
  }
}

export const api = new Api()
