type Props = {
  onSubmit: (formData: FormData) => Promise<void>;
};

export default function CreatePostForm({ onSubmit }: Props) {
  return (
    <form
      action={onSubmit}
      className="w-full flex flex-col gap-2 items-start p-6"
    >
      <textarea
        name="status"
        id="status"
        placeholder="what's on your mind?"
        className="w-full resize-none rounded-md p-2 text-black"
      />
      <button
        type="submit"
        className="rounded-md p-2 px-4 text-sm text-button-text bg-bg-button font-bold self-end"
      >
        post your status
      </button>
    </form>
  );
}
