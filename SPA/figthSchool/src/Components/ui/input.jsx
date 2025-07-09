// src/components/ui/input.tsx
import React from "react";

export function Input({ className, ...props }) {
  return (
    <input
      className="w-full rounded-lg border px-3 py-2 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
}
