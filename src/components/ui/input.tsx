"use client";

import { cn } from "@/utils/cn";
import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        {...props}
        className={cn(
          "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
          className
        )}
      />
    );
  }
);

Input.displayName = "Input";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          "focus:outline-none bg-transparent p-2 border border-border rounded-lg focus-visible:border-white w-full",
          className
        )}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Input, Textarea };
