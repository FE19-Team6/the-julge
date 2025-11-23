"use client";

import Dropdown, { DropdownProps } from "./Dropdown";
import { ElementType } from "react";

export default function DropdownClient<T extends ElementType = "select">(
  props: DropdownProps<T>
) {
  return <Dropdown {...props} />;
}
