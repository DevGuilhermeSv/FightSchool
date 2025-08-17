// src/Components/ui/select.tsx
import React from "react";
import { Select as Selectflow } from "flowbite-react";
export function Select(props) {
  const { children, onChange, value, ...rest } = props;
  return (
    <Selectflow
      className="w-full rounded-lg shadow-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
      {...rest}
    >
      {children}
    </Selectflow>
  );
}
export function SelectTrigger(props) {
  const { children } = props;
  return (
    <button className="border rounded-sm px-4 py-2 w-full text-left">
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
  return (
    <div className="mt-2 border rounded-sm shadow-sm bg-white">{children}</div>
  );
}

export function SelectItem(props) {
  const { value, children } = props;
  return (
    <option
      value={value}
      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </option>
  );
}
