// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
        },
      ],
    },
  },

  modules: ["@pinia/nuxt"],

  css: ["~/assets/scss/main.scss"],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-import variables and mixins into every component
          additionalData: `
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || "",
    },
  },

  typescript: {
    strict: true,
  },

  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
