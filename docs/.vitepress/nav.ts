import type { DefaultTheme } from 'vitepress';

export function nav(): DefaultTheme.NavItem[] {
  return [
    {
      text: '前端',
      items: [
        {
          text: '基础',
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
            },
          ],
        },
        {
          text: '框架/库',
          items: [
            { text: 'Vue.js', link: '/zh/web/vue/basic-examples' },
            { text: 'React', link: '/zh/web/react/basic-examples' },
          ],
        },
        {
          text: '跨平台',
          items: [
            { text: 'Uni-app', link: '/zh/web/uni-app/basic-examples' },
            { text: 'Electron', link: '/zh/web/electron/basic-examples' },
          ],
        },
        {
          text: '扩展',
          items: [
            { text: 'TypeScript', link: '/zh/web/typescript/basic-examples' },
          ],
        },
      ],
    },
    {
      text: '后端',
      items: [
        {
          text: 'Node.js',
          link: '/zh/service/nodejs/basic-examples',
          activeMatch: '/zh/nodejs/',
        },
        {
          text: 'Nginx',
          link: '/zh/service/nginx/basic-examples',
          activeMatch: '/zh/nginx/',
        },
      ],
    },
    {
      text: '数据库',
      items: [
        {
          text: 'MySQL',
          link: '/zh/database/mysql/basic-examples',
          activeMatch: '/zh/mysql/',
        },
        {
          text: 'MongoDB',
          link: '/zh/database/mongoDB/basic-examples',
          activeMatch: '/zh/mongoDB/',
        },
      ],
    },
    {
      text: '其他',
      items: [
        {
          text: 'Git',
          link: '/zh/other/git/basic-examples',
          activeMatch: '/zh/git/',
        },
        {
          text: 'Linux',
          link: '/zh/other/linux/basic-examples',
          activeMatch: '/zh/linux/',
        },
        {
          text: 'Docker',
          link: '/zh/other/docker/basic-examples',
          activeMatch: '/zh/docker/',
        },
      ],
    },
  ];
}
