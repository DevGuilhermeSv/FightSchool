import React from "react";

export function Button({ className, ...props }) {
  return (
    <button
      className={`rounded-xl min-h-9 min-w-20 bg-amarelo hover:bg-amarelo-100 text-amarelo-text font-semibold transition px-4 ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
