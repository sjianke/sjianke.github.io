import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'SJianKe',
  description: '个人记录',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // https://vitepress.dev/reference/default-theme-config
  themeConfig: {
    // logo: '/logo.png',
    search: {
      provider: 'local',
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/sjianke' }],
  },
})
