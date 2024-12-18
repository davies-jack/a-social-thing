import React from "react";

type Props = {
  type: "error" | "warning" | "info" | "success";
  children: React.ReactNode;
};

export default function Alert({ children, type }: Props) {
  const bgColorLookup = {
    error: "bg-error-red",
    warning: "bg-warning-amber",
    info: "bg-info-blue",
    success: "bg-success-green",
  };

  return (
    <div
      className={`
        ${bgColorLookup[type]}
        text-white text-xs lowercase
        rounded-md px-3 py-2
        flex flex-col gap-1
        shadow-md
    `}
    >
      {children}
    </div>
  );
}
