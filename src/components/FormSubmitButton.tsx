"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  return (
    <button
      {...props}
      className={`btn btn-primary text-lg ${className}`}
      type="submit"
    >
     <span className="loading loading-spinner" />
      {children}
    </button>
  );
}