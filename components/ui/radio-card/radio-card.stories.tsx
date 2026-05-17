import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { RadioCard } from "./radio-card";

const meta = {
  title: "UI/RadioCard",
  component: RadioCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
  },
  args: {
    selected: false,
    title: "Casa inteira",
    description: "Hóspedes têm o imóvel todo",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const NoDescription: Story = {
  args: { title: "Quarto privado", description: undefined },
};

export const Group: Story = {
  render: () => {
    const opts = [
      { id: "casa", title: "Casa inteira", description: "Hóspedes têm o imóvel todo" },
      { id: "quarto", title: "Quarto privado", description: "Quarto + áreas comuns" },
      { id: "compartilhado", title: "Quarto compartilhado", description: "Cama em quarto comum" },
    ];
    const [picked, setPicked] = useState("casa");
    return (
      <div className="flex flex-col gap-2" style={{ width: 320 }}>
        {opts.map((o) => (
          <RadioCard
            key={o.id}
            selected={picked === o.id}
            title={o.title}
            description={o.description}
            onClick={() => setPicked(o.id)}
          />
        ))}
      </div>
    );
  },
};
