import React from "react";

export function Button({ className, ...props }) {
  return (
    <button
      className="rounded-xl bg-blue-600 text-white px-4 py-2 font-semibold hover:bg-blue-700 transition"
      {...props}
    >
      {props.children}
    </button>
  );
}
