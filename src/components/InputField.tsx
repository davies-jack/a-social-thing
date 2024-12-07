import React from "react";

type Props = {
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function InputField({
  type,
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <input
      type={type || "text"}
      onChange={onChange}
      className="w-full block rounded-sm text-white bg-bg-primary p-2 px-3 text-xs tracking-wide outline-none focus:outline-bg-button"
      placeholder={placeholder}
      value={value || ""}
    />
  );
}
