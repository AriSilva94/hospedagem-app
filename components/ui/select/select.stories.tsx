import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Select, type SelectOption } from "./select";

const options: SelectOption[] = [
  { value: "sp", label: "São Paulo" },
  { value: "rj", label: "Rio de Janeiro" },
  { value: "bh", label: "Belo Horizonte" },
  { value: "poa", label: "Porto Alegre" },
  { value: "cwb", label: "Curitiba" },
  { value: "rec", label: "Recife", disabled: true },
];

const meta = {
  title: "UI/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    searchable: { control: "boolean" },
  },
  args: {
    options,
    placeholder: "Selecione uma cidade",
    size: "md",
    searchable: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDefaultValue: Story = {
  args: { defaultValue: "sp" },
};

export const Controlled: Story = {
  render: (args) => {
    const [v, setV] = useState<string>("rj");
    return <Select {...args} value={v} onValueChange={setV} />;
  },
};

export const Small: Story = { args: { size: "sm" } };
export const Error: Story = { args: { error: true } };
export const Disabled: Story = { args: { disabled: true } };
export const NotSearchable: Story = { args: { searchable: false } };
