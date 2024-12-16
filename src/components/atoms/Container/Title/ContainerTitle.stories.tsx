import type { Meta, StoryObj } from "@storybook/react";
import ContainerTitle from ".";

const meta: Meta<typeof ContainerTitle> = {
  title: "Atoms/Container/Title",
  component: ContainerTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ContainerTitle>;

export const Default: Story = {
  args: {
    value: "Example Title",
    level: "h2",
  },
};

export const H1: Story = {
  args: {
    value: "Main Heading",
    level: "h1",
  },
};

export const H3: Story = {
  args: {
    value: "Subheading",
    level: "h3",
  },
};

export const LongTitle: Story = {
  args: {
    value: "This is a very long title that should demonstrate how the component handles text wrapping and overflow situations",
    level: "h2",
  },
};
