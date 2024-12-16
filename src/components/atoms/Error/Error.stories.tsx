import type { Meta, StoryObj } from '@storybook/react';
import Error from '.';

const meta: Meta<typeof Error> = {
  title: 'Atoms/Error',
  component: Error,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  args: {
    message: 'Something went wrong',
  },
};

export const WithCustomClass: Story = {
  args: {
    message: 'Custom styled error',
    className: 'bg-blue-500',
  },
};

export const LongMessage: Story = {
  args: {
    message: 'This is a very long error message that demonstrates how the component handles lengthy text',
  },
};
