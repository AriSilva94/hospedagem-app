import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "./input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "search", "tel", "url"],
    },
  },
  args: {
    placeholder: "Digite aqui",
    size: "md",
    error: false,
    disabled: false,
    type: "text",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };
export const ErrorState: Story = { args: { error: true, defaultValue: "abc" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Bloqueado" } };
export const Password: Story = { args: { type: "password", defaultValue: "segredo" } };
