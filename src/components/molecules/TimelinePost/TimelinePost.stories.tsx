import type { Meta, StoryObj } from "@storybook/react";
import TimelinePost from "./";

const meta: Meta<typeof TimelinePost> = {
  title: "Molecules/TimelinePost",
  component: TimelinePost,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TimelinePost>;

const mockPost = {
  id: "1",
  status:
    "This is a sample post with some content to demonstrate how the TimelinePost component renders.",
  createdAt: new Date(),
  user: {
    id: "user1",
    username: "johndoe",
    email: "john@example.com",
  },
  likes: [],
  hasLiked: false,
  commentAmount: 0,
  userId: "user1",
  updatedAt: new Date(),
};

export const Default: Story = {
  args: {
    post: mockPost,
  },
};

export const WithLikesAndComments: Story = {
  args: {
    post: {
      ...mockPost,
      likes: [
        {
          userId: "user1",
        },
      ],
      commentAmount: 2,
    },
  },
};

export const LongPost: Story = {
  args: {
    post: {
      ...mockPost,
      status:
        "This is a much longer post that demonstrates how the component handles larger amounts of text. It might contain multiple sentences and even some line breaks.\n\nThis helps us ensure the layout works well with varying content lengths.",
    },
  },
};

export const HasLiked: Story = {
  args: {
    post: {
      ...mockPost,
      likes: [
        {
          userId: "user1",
        },
      ],
      hasLiked: true,
    },
  },
};

const twoYearsAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2);
export const PostedAWhileAgo: Story = {
  args: {
    post: {
      ...mockPost,
      createdAt: twoYearsAgo,
    },
  },
};
