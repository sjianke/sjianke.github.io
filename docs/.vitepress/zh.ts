import { defineConfig, type DefaultTheme } from 'vitepress';

import { nav } from './nav';
import {
  sidebarGit,
  sidebarHTML,
  sidebarJavascript,
  sidebarLinux,
  sidebarMongoDB,
  sidebarMySQL,
  sidebarNginx,
  sidebarNode,
} from './sidebar';

export const zh = defineConfig({
  lang: 'zh-Hans',
  title: 'SJianKe',
  description: '个人学习笔记',
  themeConfig: {
      nav: nav(),
      search: {
        provider: 'local',
        options: searchOptions(),
      },
    sidebar: {
      '/zh/web/html/': {
        base: 'https://developer.mozilla.org/zh-CN/docs/Learn_web_development/Core/Structuring_content',
        items: sidebarHTML(),
      },
      '/zh/web/javascript/': {
        base: '/zh/web/javascript/',
        items: sidebarJavascript(),
      },
      '/zh/service/nginx/': {
        base: '/zh/service/nginx/',
        items: sidebarNginx(),
      },
      '/zh/database/mysql/': {
        base: '/zh/database/mysql/',
        items: sidebarMySQL(),
      },
      '/zh/database/mongoDB/': {
        base: '/zh/database/mongoDB/',
        items: sidebarMongoDB(),
      },
      '/zh/other/git/': {
        base: '/zh/other/git/',
        items: sidebarGit(),
      },
      '/zh/other/linux/': {
        base: '/zh/other/linux/',
        items: sidebarLinux(),
      },
      '/zh/service/nodejs/': {
        base: '/zh/service/nodejs/',
        items: sidebarNode(),
      },
    },

    editLink: {
      pattern: 'https://github.com/sjianke/sjianke.github.io/tree/main/docs/:path',
      text: '在 GitHub 上编辑此页面',
    },

    // footer: {
    //   message: '基于 MIT 许可发布',
    //   copyright: `版权所有 © 2019-${new Date().getFullYear()} 尤雨溪`,
    // },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
    },

    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页',
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
});

function searchOptions(): DefaultTheme.LocalSearchOptions {
  return {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        noResultsText: '无法找到相关结果',
        resetButtonTitle: '清除查询条件',
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
        },
      },
    },
  };
}
