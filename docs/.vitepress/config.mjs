import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "芒格的前端知识库",
  description: "前端基础知识大全",
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '知识点', link: '/knowledge/html' },
      { text: '文章', link: '/article/axios-sourceCode' }
    ],

    sidebar: {
      '/knowledge/': [
        {
          text: '知识点',
          items: [
            { text: 'HTML', link: '/knowledge/html' },
            { text: 'CSS', link: '/knowledge/css' },
            { text: 'JavaScript', link: '/knowledge/javascript' },
            { text: 'Vue', link: '/knowledge/vue' },
            { text: '浏览器原理与HTTP协议', link: '/knowledge/browser' },
            { text: '算法', link: '/knowledge/algorithm' }
          ]
        }
      ],

      '/article/': [
        {
          text: '文章',
          items: [
            { text: '夯实基础--axios工具函数源码初探', link: '/article/axios-sourceCode' },
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
