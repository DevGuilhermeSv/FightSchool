// src/components/ui/select.tsx
import React, { useState } from "react";
export function Select(props) {
  const { children } = props;
  return (
    <select className="w-full rounded-lg border px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
      {children}
    </select>
  );
}
export function SelectTrigger(props) {
  const { children } = props;
  return (
    <button className="border rounded px-4 py-2 w-full text-left">
      {children}
    </button>
  );
}

export function SelectValue(props) {
  const { placeholder } = props;
  return <span className="text-gray-500">{placeholder}</span>;
}

export function SelectContent(props) {
  const { children } = props;
  return <div className="mt-2 border rounded shadow bg-white">{children}</div>;
}

export function SelectItem(props) {
  const { value, children } = props;
  const [selected, setSelected] = useState(false);
  return (
    <option
      onClick={() => setSelected(true)}
      className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
        selected ? "bg-gray-200" : ""
      }`}
    >
      {children}
    </option>
  );
}
