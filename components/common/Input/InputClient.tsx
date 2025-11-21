"use client";

import React from "react";
import Input, { InputProps } from "./Input";

export default function InputClient<T extends React.ElementType = "input">(
  props: InputProps<T>
) {
  return <Input {...props} />;
}
