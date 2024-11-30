import React from "react";
import Button from "../Button";

type Props = {};

export default function CreateCommentForm({}: Props) {
  return (
    <form>
      <div className="mt-4 flex flex-col items-center justify-center w-1/2 mx-auto">
        <textarea className="block resize-none w-full h-24 p-2 rounded-md border border-border-secondary"></textarea>
        <Button label="post" className="mt-4" />
      </div>
    </form>
  );
}
