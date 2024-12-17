import type { Meta, StoryObj } from "@storybook/react";
import VertListItem from "./index";

const meta = {
  title: "Molecules/VertList/VertListItem",
  component: VertListItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-screen px-24">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof VertListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Item",
  },
};

export const FirstItem: Story = {
  args: {
    children: "First Item",
    isFirst: true,
  },
};

export const LastItem: Story = {
  args: {
    children: "Last Item",
    isLast: true,
  },
};

export const NoCursor: Story = {
  args: {
    children: "No Cursor Item",
    noCursor: true,
  },
};

export const FirstAndLastItem: Story = {
  args: {
    children: "Single Item",
    isFirst: true,
    isLast: true,
  },
};
