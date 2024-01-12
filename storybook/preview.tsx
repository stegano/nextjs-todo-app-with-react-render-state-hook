import type { Preview } from "@storybook/react";
import "reset-css";
import "@/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
    },
    nextjs: {
      appDirectory: true,
    },
  },
};

export default preview;
