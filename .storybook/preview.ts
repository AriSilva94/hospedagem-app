import type { Preview } from "@storybook/nextjs-vite";
import "../app/globals.css";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "var(--color-bg)" },
        { name: "card", value: "var(--color-bg-card)" },
        { name: "sunken", value: "var(--color-bg-sunken)" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
  },
};

export default preview;
