import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Modal } from "./modal";
import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg", "xl"] },
    closeOnOverlay: { control: "boolean" },
  },
  args: {
    size: "md",
    closeOnOverlay: true,
    ariaLabel: "Modal demo",
    open: true,
    onClose: () => {},
    children: null,
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Abrir modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Modal.Header title="Nova reserva" subtitle="Informe os dados básicos" onClose={() => setOpen(false)} />
          <Modal.Body>
            <div className="flex flex-col gap-3">
              <Field label="Hóspede"><Input placeholder="Nome completo" /></Field>
              <Field label="E-mail"><Input type="email" placeholder="email@exemplo.com" /></Field>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Confirmar</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Modal.Header title="Confirmar exclusão" onClose={() => setOpen(false)} />
          <Modal.Body>Esta ação não pode ser desfeita.</Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={() => setOpen(false)}>Excluir</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  },
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <div className="p-6">
        <Button onClick={() => setOpen(true)}>Abrir</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)}>
          <Modal.Header title="Detalhes do imóvel" onClose={() => setOpen(false)} />
          <Modal.Body>Conteúdo extenso aqui.</Modal.Body>
        </Modal>
      </div>
    );
  },
};
