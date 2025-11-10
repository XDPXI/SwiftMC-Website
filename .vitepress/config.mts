import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SwiftMC",
  description: "SwiftMC's official website",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Documentation', link: '/docs/dev/getting-started', activeMatch: '^/docs/', }
    ],

    sidebar: [
      {
        text: 'Administration',
        items: [
          { text: 'Getting Started', link: '/docs/admin/getting-started' }
        ]
      },
        {
            text: 'Development',
            items: [
                { text: 'Getting Started', link: '/docs/dev/getting-started' }
            ]
        }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/XDPXI/SwiftMC' }
    ]
  }
})
