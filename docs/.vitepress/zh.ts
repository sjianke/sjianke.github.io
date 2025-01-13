import { DefaultTheme, defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '个人记录',

  themeConfig: {
    nav: nav(),
    sidebar: {
      '/zh/web/javascript/': {
        base: '/zh/web/javascript/',
        items: sidebarJavascript(),
      },
      '/zh/other/git/': {
        base: '/zh/other/git/',
        items: sidebarGit(),
      },
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    // skipToContentLabel: '跳转到内容',
  },
})

function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '前端',
      items: [
        {
          text: '前端三剑客',
          items: [
            {
              text: 'HTML',
              link: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content',
            },
            {
              text: 'CSS',
              link: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Styling_basics',
            },
            {
              text: 'JavaScript',
              link: '/zh/web/javascript/basic-examples',
              activeMatch: '/zh/web/javascript/',
            },
          ],
        },
        {
          text: '框架/库',
          items: [
            { text: 'Vue.js', link: '/vue-examples' },
            { text: 'React', link: '/react-examples' },
            { text: 'TypeScript', link: '/typescript-examples' },
          ],
        },
        {
          text: '跨平台',
          items: [
            { text: 'Uni-app', link: '/uni-app-examples' },
            { text: 'Electron', link: '/electron-examples' },
            { text: 'WeChat Mini Program', link: '/miniprogram-examples' },
          ],
        },
      ],
    },
    {
      text: '后端',
      items: [
        { text: 'Node.js', link: '/nodejs-examples' },
        { text: 'MySQL', link: '/mysql-examples' },
        { text: 'Nginx', link: '/nginx-examples' },
      ],
    },
    {
      text: '其他',
      items: [
        {
          text: 'Git',
          link: '/zh/other/git/basic-examples',
          activeMatch: '/zh/other/git/',
        },
        { text: 'HTTP', link: '/http-examples' },
        { text: 'Linux', link: '/linux-examples' },
        { text: 'Shell', link: '/shell-examples' },
      ],
    },
  ]
}

function sidebarJavascript(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'javascript',
      items: [
        {
          text: '基础',
          link: 'basic-examples',
        },
        {
          text: '闭包',
          link: 'closure-examples',
        },
        {
          text: '事件循环',
          link: 'event-loop-examples',
        },
        {
          text: '原型/原型链',
          link: 'prototype-examples',
        },
        {
          text: '作用域/作用域链',
          link: 'scope-examples',
        },
        {
          text: 'this指向',
          link: 'this-examples',
        },
      ],
    },
  ]
}

function sidebarGit(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'git',
      items: [
        {
          text: '基础',
          link: 'basic-examples',
        },
        {
          text: '命令',
          link: 'command-examples',
        },
        {
          text: '提交步骤',
          link: 'step-examples',
        },
      ],
    },
  ]
}
