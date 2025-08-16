// src/components/ui/input.tsx
import React from "react";
import { TextInput } from "flowbite-react";

export function Input({ className = "", ...props }) {
  return <TextInput className={className} {...props} />;
}
