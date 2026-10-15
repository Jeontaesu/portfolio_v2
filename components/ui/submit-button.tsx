"use client";

import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "./button";

/**
 * Submit button that shows loading while its form's action runs. With several submit buttons
 * (Save draft / Publish) only the one that was pressed spins, matched by name and value.
 */
export function SubmitButton({ name, value, disabled, ...props }: ButtonProps) {
  const { pending, data } = useFormStatus();
  const isPressed = pending && (!name || data?.get(name) === value);

  return (
    <Button
      type="submit"
      name={name}
      value={value}
      loading={isPressed}
      disabled={disabled || pending}
      {...props}
    />
  );
}
