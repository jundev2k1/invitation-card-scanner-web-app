"use client";

import { useFormContext } from "react-hook-form";
import { IconTextBox, IconTextBoxProps } from "./IconTextBox";

interface FormIconTextBoxProps
  extends Omit<IconTextBoxProps, "error" | "value" | "onChange"> {
  name: string;
}

export function FormIconTextBox({ name, ...props }: FormIconTextBoxProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string | undefined;

  return (
    <IconTextBox
      {...register(name)}
      error={error}
      {...props}
    />
  );
}
