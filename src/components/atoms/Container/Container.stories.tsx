import type { Meta, StoryObj } from "@storybook/react";
import Container from ".";
import Button from "../Button";

const meta: Meta<typeof Container> = {
  title: "Atoms/Container",
  component: Container,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    title: "Hello, world.",
    titleLevel: "h2",
    children: (
      <div>
        <p>
          Eiusmod cupidatat veniam est consequat Lorem commodo tempor sint. Magna eiusmod laborum
          magna occaecat deserunt ullamco irure exercitation elit Lorem anim. In occaecat aute
          laboris pariatur qui et consequat. Qui excepteur mollit ut ex consectetur irure aliqua
          nulla aliqua dolore. In laborum duis veniam non incididunt duis eu veniam est sit aliquip.
          Non sint labore est pariatur do aute dolor.
        </p>

        <Button label="Click me" className="mt-4" />
      </div>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Exercitation ad sint sit laborum duis tempor officia commodo nisi ea duis velit deserunt nostrud.",
    children: <p>Laboris nisi nisi duis aliquip elit.</p>,
  },
};

export const LongContent: Story = {
  args: {
    title: "Container",
    children: (
      <p>
        Eiusmod cupidatat veniam est consequat Lorem commodo tempor sint. Magna eiusmod laborum
        magna occaecat deserunt ullamco irure exercitation elit Lorem anim. In occaecat aute laboris
        pariatur qui et consequat. Qui excepteur mollit ut ex consectetur irure aliqua nulla aliqua
        dolore. In laborum duis veniam non incididunt duis eu veniam est sit aliquip. Non sint
        labore est pariatur do aute dolor. Mollit quis eiusmod tempor cillum minim amet nulla
        exercitation occaecat excepteur quis ex sunt. Sunt excepteur reprehenderit ad in mollit
        cupidatat id eu consectetur cupidatat aute quis commodo. Aliqua ipsum mollit nulla cupidatat
        sit quis officia sit. Sit nulla aliquip consectetur minim esse ullamco. Sit cupidatat
        excepteur adipisicing cupidatat ullamco consectetur quis ea incididunt nostrud tempor
        cupidatat veniam. Cillum dolor nisi nostrud id consequat enim ea sint cupidatat anim. Anim
        exercitation magna nisi ut veniam cupidatat deserunt nulla amet ut. Mollit velit magna nulla
        dolore do ullamco in laboris ex. Pariatur sit consectetur mollit magna mollit veniam ea elit
        dolore adipisicing amet mollit mollit occaecat. In amet culpa ut mollit enim velit pariatur
        elit aliquip anim culpa. Ad laborum aliqua nulla officia quis laboris id ea et ipsum anim
        ex. Quis ad aute excepteur quis.
      </p>
    ),
  },
};

export const NoTitle: Story = {
  args: {
    children: <p>Et sunt laborum amet aliqua commodo ad amet Lorem ut.</p>,
  },
};
