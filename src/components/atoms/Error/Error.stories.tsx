import type { Meta, StoryObj } from "@storybook/react";
import Error from ".";

const meta: Meta<typeof Error> = {
  title: "Atoms/Error",
  component: Error,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-screen px-28">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Error>;

export const Default: Story = {
  name: "[Info] - Default",
  args: {
    children: (
      <>
        <strong>Sit back and relax, we're on it.</strong>
      </>
    ),
  },
};

export const Warning: Story = {
  name: "[Warning] - Long Message",
  args: {
    children: (
      <p>
        Est veniam magna Lorem laborum qui occaecat dolor sint officia anim
        fugiat. Amet aliqua amet esse mollit et nisi ex eu officia laboris esse
        eiusmod. Adipisicing excepteur qui officia aute ipsum. Veniam occaecat
        exercitation cillum deserunt culpa aliquip. Laboris Lorem enim veniam ea
        magna. Reprehenderit reprehenderit adipisicing fugiat eu ut ex sunt anim
        ad elit magna. Tempor nisi qui ad ad. Duis exercitation veniam
        adipisicing anim occaecat ex sit reprehenderit sunt exercitation laboris
        ad veniam reprehenderit. Fugiat laborum adipisicing anim pariatur sunt
        culpa veniam incididunt sunt. Fugiat nostrud duis minim consequat eu
        velit minim velit elit aliqua dolor. Exercitation commodo magna
        adipisicing elit ullamco nostrud aliqua non voluptate. Sint in ut
        pariatur duis cillum anim. Consectetur occaecat veniam proident anim
        adipisicing ullamco irure fugiat irure. Quis in do ipsum sit sit aute
        fugiat enim magna enim id dolor do. Labore est sit culpa officia in
        tempor enim elit sit deserunt. Enim eiusmod consequat excepteur mollit
        voluptate laboris proident incididunt duis nisi.
      </p>
    ),
    type: "warning",
  },
};

export const ErrorStory: Story = {
  name: "[Error] - Default",
  args: {
    children: (
      <>
        There seems to have been an error.{" "}
        <strong>Sit back and relax, we're on it.</strong>
      </>
    ),
    type: "error",
  },
};
