import type { Meta, StoryObj } from "@storybook/react";
import VertList from "./index";

const meta = {
  title: "Molecules/VertList",
  component: VertList,
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
} satisfies Meta<typeof VertList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        itemContent: "Item 1",
      },
      {
        itemContent: "Item 2",
      },
      {
        itemContent: "Item 3",
      },
    ],
  },
};

export const SingleItem: Story = {
  args: {
    items: [
      {
        itemContent: "Single Item",
      },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      itemContent: `Item ${i + 1}`,
      isLast: i === 9,
    })),
  },
};

export const NoCursor: Story = {
  args: {
    items: [{ itemContent: "Item 1", noCursor: true }],
  },
};

export const NoCursorManyItems: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) => ({
      itemContent: `Item ${i + 1}`,
      noCursor: true,
      isLast: i === 9,
    })),
  },
};
