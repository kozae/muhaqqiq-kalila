const config = {
  tabWidth: 2,
  useTabs: false,
  plugins: [
    "prettier-plugin-tailwindcss",
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
  ],
  overrides: [
    {
      files: ["**/*.astro"],
      options: {
        parser: "astro",
      },
    },
    { files: "**/*.svelte", options: { parser: "svelte" } },
  ],
};

export default config;
