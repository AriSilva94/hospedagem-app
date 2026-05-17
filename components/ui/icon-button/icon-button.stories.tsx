import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Pencil, Trash2, Plus } from "lucide-react";
import { IconButton } from "./icon-button";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
  },
  args: { "aria-label": "Editar", size: "md", disabled: false },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <IconButton {...args}>
      <Pencil className="h-4 w-4" />
    </IconButton>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton aria-label="Adicionar" size="sm">
        <Plus className="h-4 w-4" />
      </IconButton>
      <IconButton aria-label="Adicionar" size="md">
        <Plus className="h-4 w-4" />
      </IconButton>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex items-center gap-1">
      <IconButton aria-label="Editar"><Pencil className="h-4 w-4" /></IconButton>
      <IconButton aria-label="Excluir"><Trash2 className="h-4 w-4" /></IconButton>
    </div>
  ),
};

export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => (
    <IconButton {...args}>
      <Pencil className="h-4 w-4" />
    </IconButton>
  ),
};
