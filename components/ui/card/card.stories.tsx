import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card } from "./card";
import { Button } from "../button";
import { Badge } from "../badge";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  render: () => (
    <Card>
      <Card.Body>Conteúdo simples dentro do card.</Card.Body>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <Card.Header title="Reserva #1024" description="Confirmada · 2 noites" />
      <Card.Body>
        Hóspede: João Silva · Check-in: 18/05 · Check-out: 20/05
      </Card.Body>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card>
      <Card.Header
        title="Imóvel"
        description="Casa beira-mar"
        action={<Badge tone="ok">Ativo</Badge>}
      />
      <Card.Body>
        <Button variant="outline" size="sm">Editar</Button>
      </Card.Body>
    </Card>
  ),
};

export const BodyPadding: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Card><Card.Body padding="none">padding=none</Card.Body></Card>
      <Card><Card.Body padding="sm">padding=sm</Card.Body></Card>
      <Card><Card.Body padding="md">padding=md (default)</Card.Body></Card>
    </div>
  ),
};
