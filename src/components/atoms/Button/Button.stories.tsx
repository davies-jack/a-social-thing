import type { Meta, StoryObj } from "@storybook/react";
import Button from "./";

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    label: "Click me",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Button",
    disabled: true,
  },
};

export const CustomClass: Story = {
  args: {
    label: "Custom Style",
    className: "bg-red-500 text-white",
    disabled: false,
  },
};

export const WithOnClick: Story = {
  args: {
    label: "Click Handler",
    onClick: async () => {
      alert("Button clicked!");
    },
    disabled: false,
  },
};
