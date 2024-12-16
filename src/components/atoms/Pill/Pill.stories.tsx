import type { Meta, StoryObj } from '@storybook/react';
import Pill from './index';

const meta: Meta<typeof Pill> = {
  title: 'Atoms/Pill',
  component: Pill,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Pill>;

export const Default: Story = {
  args: {
    children: 'Default Pill',
  },
};

export const CustomStyle: Story = {
  args: {
    children: 'Custom Styled Pill',
    className: 'bg-blue-500 text-white',
  },
};

export const LongText: Story = {
  args: {
    children: 'This is a pill with much longer text content',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <div className="flex items-center gap-1">
        <span>★</span>
        <span>Starred</span>
      </div>
    ),
  },
};

export const PillGroup: Story = {
  decorators: [
    (Story) => (
      <div className="flex gap-2 flex-wrap">
        <Story />
        <Pill>Tag 1</Pill>
        <Pill>Tag 2</Pill>
        <Pill>Tag 3</Pill>
      </div>
    ),
  ],
  args: {
    children: 'Primary Tag',
  },
};
