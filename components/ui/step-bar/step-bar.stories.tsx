import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StepBar } from "./step-bar";

const meta = {
  title: "UI/StepBar",
  component: StepBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    total: { control: { type: "number", min: 1, max: 12 } },
    current: { control: { type: "number", min: 1, max: 12 } },
    density: { control: "radio", options: ["compact", "comfortable"] },
  },
  args: { total: 4, current: 2, density: "compact" },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StepBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const First: Story = { args: { current: 1 } };
export const Last: Story = { args: { current: 4 } };
export const Comfortable: Story = { args: { density: "comfortable" } };

export const Progression: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3" style={{ width: 320 }}>
      {[1, 2, 3, 4].map((c) => (
        <StepBar key={c} {...args} current={c} />
      ))}
    </div>
  ),
};
