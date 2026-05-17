import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Field } from "./field";
import { Input } from "../input";
import { Textarea } from "../textarea";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    label: "Campo",
    children: <Input placeholder="Digite aqui" />,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Nome" },
  render: (args) => (
    <Field {...args}>
      <Input placeholder="Digite seu nome" />
    </Field>
  ),
};

export const Required: Story = {
  args: { label: "E-mail", required: true },
  render: (args) => (
    <Field {...args}>
      <Input type="email" placeholder="voce@exemplo.com" />
    </Field>
  ),
};

export const WithHint: Story = {
  args: { label: "Telefone", hint: "Inclua DDD" },
  render: (args) => (
    <Field {...args}>
      <Input placeholder="(11) 99999-9999" />
    </Field>
  ),
};

export const WithError: Story = {
  args: { label: "CPF", error: "CPF inválido" },
  render: (args) => (
    <Field {...args}>
      <Input error placeholder="000.000.000-00" />
    </Field>
  ),
};

export const Textarea_: Story = {
  args: { label: "Observações", hint: "Máx 500 caracteres" },
  render: (args) => (
    <Field {...args}>
      <Textarea rows={4} placeholder="Escreva aqui" />
    </Field>
  ),
};

export const LabelSmall: Story = {
  args: { label: "Etiqueta", labelSize: "sm" },
  render: (args) => (
    <Field {...args}>
      <Input />
    </Field>
  ),
};
