"use client";

import Button, { ButtonProps } from "./Button";

export default function ButtonClient<T extends React.ElementType = "button">(
  props: ButtonProps<T>
) {
  return <Button {...props} />;
}
