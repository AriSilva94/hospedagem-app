import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "radio",
      options: ["accent", "ok", "warn", "err", "slate"],
    },
    size: { control: "radio", options: ["sm", "md"] },
    uppercase: { control: "boolean" },
  },
  args: {
    children: "Ativo",
    tone: "ok",
    size: "md",
    uppercase: false,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tones: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} tone="accent">Destaque</Badge>
      <Badge {...args} tone="ok">OK</Badge>
      <Badge {...args} tone="warn">Atenção</Badge>
      <Badge {...args} tone="err">Erro</Badge>
      <Badge {...args} tone="slate">Neutro</Badge>
    </div>
  ),
};

export const Uppercase: Story = {
  args: { uppercase: true, children: "Novo" },
};
