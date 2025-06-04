import type { DefaultTheme } from 'vitepress';

export function sidebarHTML(): DefaultTheme.SidebarItem[] {
  return [];
}

export function sidebarJavascript(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Javascript',
      items: [
        {
          text: '基础',
          link: 'basic-examples',
        },
        {
          text: '作用域/作用域链',
          link: 'scope-examples',
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
          text: 'this指向',
          link: 'this-examples',
        },
        {
          text: '异步编程/Promise/async/await',
          link: 'async-examples',
        },
        {
          text: '迭代器/生成器',
          link: 'iterator-examples',
        },
      ],
    },
    {
      text: '示例',
      items: [
        {
          text: '日历',
          link: 'calendar-examples',
        },
      ],
    },
  ];
}

export function sidebarGit(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Git',
      items: [
        {
          text: '基础',
          link: 'basic-examples',
        },
        {
          text: '命令',
          link: 'command-examples',
        },
      ],
    },
  ];
}

export function sidebarLinux(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Linux',
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
          text: '连接远程linux',
          link: 'remote-examples',
        },
      ],
    },
  ];
}

export function sidebarMySQL(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'MySQL',
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
          text: 'SQL',
          link: 'sql-examples',
        },
      ],
    },
  ];
}

export function sidebarMongoDB(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'MongoDB',
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
          text: '查询',
          link: 'query-examples',
        },
      ],
    },
  ];
}

export function sidebarNginx(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Nginx',
      items: [
        {
          text: '基础',
          link: 'basic-examples',
        },
        {
          text: '配置',
          link: 'config-examples',
        },
      ],
    },
    {
      text: '常见问题',
      items: [
        {
          text: '反向代理 - 跨域',
          link: 'proxy-examples',
        },
        {
          text: 'vue页面刷新丢失',
          link: 'refresh-examples',
        },
      ],
    },
  ];
}

export function sidebarNode(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: '介绍',
      link: 'basic-examples',
    },
    {
      text: 'Buffer(数据块)',
      link: 'buffer-examples',
    },
    {
      text: 'Stream(流)',
      link: 'stream-examples',
    },
    {
      text: 'File System(文件系统)',
      link: 'fs-examples',
    },
    {
      text: 'Path(路径)',
      link: 'path-examples',
    },
    {
      text: 'HTTP(网路协议)',
      link: 'http-examples',
    },
    {
      text: 'OS(操作系统)',
      link: 'os-examples',
    },
    {
      text: 'process(进程)',
      link: 'process-examples',
    },
    {
      text: 'Child Process(子进程)',
      link: 'child-process-examples',
    },
    {
      text: 'Cluster(集群)',
      link: 'cluster-examples',
    },
    {
      text: 'Events(事件触发器)',
      link: 'events-examples',
    },
    {
      text: 'require 实现',
      link: 'require-examples',
    },
    {
      text: 'Crypto(密码学)',
      link: 'crypto-examples',
    },
    {
      text: '示例',
      items: [
        {
          text: 'pngquant 应用',
          link: 'pngquant-examples',
        }
      ]
    }
  ];
}
