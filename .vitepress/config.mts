import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Swift",
  head: [
    [
      "link",
      {
        rel: "icon",
        sizes: "32x32",
        href: "https://raw.githubusercontent.com/XDPXI/SwiftMC-Website/refs/heads/main/favicon.png",
      },
    ],
  ],
  description: "SwiftMC's official website",
  lastUpdated: true,
  metaChunk: true,
  cleanUrls: true,
  lang: "en-US",
  appearance: "force-dark",
  themeConfig: {
    logo: "https://raw.githubusercontent.com/XDPXI/SwiftMC-Website/refs/heads/main/favicon.png",

    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "https://docs.xdpxi.dev/swiftmc" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/XDPXI/SwiftMC" }],

    editLink: {
      pattern: "https://github.com/XDPXI/SwiftMC-Website/edit/main/:path",
    },
  },
});
