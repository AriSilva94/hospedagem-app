import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Stat } from "./stat";

const meta = {
  title: "UI/Stat",
  component: Stat,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    valueTone: { control: "radio", options: ["ink", "accent"] },
    valueSize: { control: "radio", options: ["md", "lg"] },
    trendTone: { control: "radio", options: ["neutral", "positive"] },
    layout: { control: "radio", options: ["label-top", "value-top"] },
  },
  args: {
    label: "Receita do mês",
    value: "R$ 24.580",
    valueTone: "ink",
    valueSize: "md",
    layout: "label-top",
  },
} satisfies Meta<typeof Stat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHint: Story = {
  args: { hint: "Comparado ao mês anterior" },
};

export const WithTrend: Story = {
  args: { trend: "+12% no mês", trendTone: "positive" },
};

export const AccentLarge: Story = {
  args: { valueTone: "accent", valueSize: "lg", value: "98%" },
};

export const ValueTop: Story = {
  args: { layout: "value-top", label: "Ocupação", value: "84%" },
};
