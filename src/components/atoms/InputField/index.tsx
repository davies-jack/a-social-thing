import React from "react";

type Props = {
  id: string;
  label: string;

  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export default function InputField({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  ...props
}: Props) {
  return (
    <div>
      <label htmlFor={id} className="text-paragraph-text text-xs mb-1 font-bold">
        {label}
      </label>
      <input
        id={id}
        className="w-full block rounded-sm text-white bg-bg-primary p-2 px-3 text-xs tracking-wide outline-none focus:outline-bg-button"
        type={type || "text"}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...props}
      />
    </div>
  );
}
