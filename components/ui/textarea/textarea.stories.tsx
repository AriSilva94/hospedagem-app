import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Textarea } from "./textarea";

const meta = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    rows: { control: { type: "number", min: 1, max: 12 } },
  },
  args: {
    placeholder: "Escreva aqui...",
    rows: 4,
    error: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const ErrorState: Story = { args: { error: true, defaultValue: "Texto inválido" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Bloqueado" } };
export const LargeRows: Story = { args: { rows: 8 } };
