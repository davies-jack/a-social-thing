import type { Meta, StoryObj } from "@storybook/react";
import Form from ".";
import InputField from "@/components/atoms/InputField";
import Button from "@/components/atoms/Button";

const meta: Meta<typeof Form> = {
  title: "Molecules/Form",
  component: Form,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <Form>
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        onChange={() => {}}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
        onChange={() => {}}
      />
      <Button label="Submit" />
    </Form>
  ),
};

export const WithMultipleFields: Story = {
  render: () => (
    <Form>
      <InputField
        id="name"
        label="Full Name"
        placeholder="Enter your full name"
        onChange={() => {}}
      />
      <InputField
        id="email"
        label="Email"
        type="email"
        placeholder="Enter your email"
        onChange={() => {}}
      />
      <InputField
        id="phone"
        label="Phone"
        type="tel"
        placeholder="Enter your phone number"
        onChange={() => {}}
      />
      <Button label="Register" />
    </Form>
  ),
};
