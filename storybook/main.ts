/* eslint-disable no-param-reassign */
import path from "node:path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-addon-next-router",
    "@storybook/addon-docs",
    "@storybook/addon-controls",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (webpackConfig) => {
    if (webpackConfig.resolve && webpackConfig.resolve.alias) {
      webpackConfig.resolve.alias = {
        /**
         * Typescript path aliases
         */
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return webpackConfig;
  },
};
export default config;
