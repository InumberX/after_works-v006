const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'out',
  // output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    // importした画像の型定義設定を無効にする
    disableStaticImages: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
}

module.exports = nextConfig
