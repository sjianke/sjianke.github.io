import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'SJianKe',
  description: '个人记录',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // https://vitepress.dev/reference/default-theme-config
  cleanUrls: true,
  lastUpdated: true,
  metaChunk: true,
  themeConfig: {
    socialLinks: [{ icon: 'github', link: 'https://github.com/sjianke' }],
  },
})
