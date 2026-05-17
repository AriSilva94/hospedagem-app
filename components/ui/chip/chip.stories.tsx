import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Chip } from "./chip";

const meta = {
  title: "UI/Chip",
  component: Chip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["accent", "ok"] },
    size: { control: "radio", options: ["sm", "md"] },
    selected: { control: "boolean" },
  },
  args: { children: "Filtro", tone: "accent", size: "md", selected: false },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const ToneOk: Story = { args: { tone: "ok", selected: true } };

export const Group: Story = {
  render: () => {
    const [active, setActive] = useState<string>("todos");
    const opts = ["todos", "ativos", "pendentes", "cancelados"];
    return (
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <Chip key={o} selected={active === o} onClick={() => setActive(o)}>
            {o}
          </Chip>
        ))}
      </div>
    );
  },
};
