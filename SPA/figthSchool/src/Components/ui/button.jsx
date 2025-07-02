import React from "react";

export function Button({ className, ...props }) {
  return (
    <button
      className={`rounded-xl bg-amarelo hover:bg-amarelo-100 text-amarelo-text font-semibold transition ${className}`}
      {...props}
    >
      {props.children}
    </button>
  );
}
