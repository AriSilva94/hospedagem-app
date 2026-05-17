import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const tones = [
  "accent",
  "ink",
  "capa-1",
  "capa-2",
  "capa-3",
  "capa-4",
  "capa-5",
  "capa-6",
  "capa-7",
  "capa-8",
  "capa-9",
  "capa-olive",
  "capa-sage",
] as const;

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: tones },
    size: { control: "radio", options: ["sm", "md", "lg"] },
    shape: { control: "radio", options: ["circle", "rounded"] },
  },
  args: {
    children: "AR",
    tone: "accent",
    size: "md",
    shape: "circle",
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-3">
      <Avatar {...args} size="sm">AR</Avatar>
      <Avatar {...args} size="md">AR</Avatar>
      <Avatar {...args} size="lg">A</Avatar>
    </div>
  ),
};

export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Avatar {...args} shape="circle">AR</Avatar>
      <Avatar {...args} shape="rounded">AR</Avatar>
    </div>
  ),
};

export const Tones: Story = {
  render: () => (
    <div className="grid grid-cols-7 gap-3">
      {tones.map((tone) => (
        <Avatar key={tone} tone={tone}>{tone.slice(0, 2).toUpperCase()}</Avatar>
      ))}
    </div>
  ),
};
