import React from "react";
import Button from "../Button";

export default function CreateCommentForm() {
  return (
    <form role="form">
      <div className="mt-4 flex flex-col items-center justify-center w-1/2 mx-auto">
        <div>
          <label htmlFor="comment" className="text-headline-text text-sm font-bold text-left">
            add a comment
          </label>
          <textarea id="comment" className="block resize-none w-full h-24 p-2 rounded-md border border-border-secondary"></textarea>
        </div>
        <Button label="post" className="mt-4" />
      </div>
    </form>
  );
}
