import type { Meta, StoryObj } from "@storybook/react";
import InputField from ".";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Atoms/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputField>;

type AllowedArgs = Story["args"] & {
  placeholder: string;
  value?: string;
  id: string;
  label: string;
};

const RenderWithValueState = (args: AllowedArgs) => {
  const [value, setValue] = useState(args.value || "");
  const placeholder = args.placeholder;

  return (
    <InputField
      {...args}
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
    onChange: (e) => console.log("Input changed:", e.target.value),
    id: "input-field-id",
    label: "Input Field Label",
  },
  render: (args) => <RenderWithValueState {...args} />,
};

export const WithValue: Story = {
  args: {
    placeholder: "Enter text...",
    value: "Initial value",
    onChange: (e) => console.log("Input changed:", e.target.value),
    id: "input-field-id",
    label: "Input Field Label",
  },
  render: (args) => <RenderWithValueState {...args} />,
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password...",
    onChange: (e) => console.log("Password changed:", e.target.value),
    id: "input-field-id",
    label: "Input Field Label",
  },
  render: (args) => <RenderWithValueState {...args} />,
};

export const Number: Story = {
  args: {
    type: "number",
    placeholder: "Enter number...",
    onChange: (e) => console.log("Number changed:", e.target.value),
    id: "input-field-id",
    label: "Input Field Label",
  },
  render: (args) => <RenderWithValueState {...args} />,
};

export const LongLabel: Story = {
  args: {
    id: "input-field-id",
    label: "This is a very long label that should be truncatedtruncatedtruncatedtruncated",
  },
  render: (args) => <RenderWithValueState {...args} />,
};
