/** @type {import('next').NextConfig} */
// const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  /**
   * Tell Next.js where the `public` folder is.
   * Replace `nextjs-github-pages` with your Github repo project name.
   */
  // assetPrefix: isProd ? '/fuhqu.github.io/' : '',
}

module.exports = nextConfig
