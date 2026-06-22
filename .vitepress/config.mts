import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "SwiftMC",
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
  themeConfig: {
    logo: "https://raw.githubusercontent.com/XDPXI/SwiftMC-Website/refs/heads/main/favicon.png",

    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "/" },
      { text: "Download", link: "/download" },
      { text: "Documentation", link: "https://docs.xdpxi.dev/swiftmc" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/XDPXI/SwiftMC" }],

    editLink: {
      pattern: "https://github.com/XDPXI/SwiftMC-Website/edit/main/:path",
    },

    footer: {
      message:
        "NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR ACCOCIATED WITH MOJANG.",
      copyright: "Copyright © 2025-2026 SwiftMC. All rights reserved.",
    },
  },
});
