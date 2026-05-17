import { Children, cloneElement, isValidElement, useId } from "react";
import { Label } from "../label";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  labelSize?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
};

export function Field({
  label,
  required,
  hint,
  error,
  labelSize = "md",
  className,
  children,
}: FieldProps) {
  const messageId = useId();
  const message = error ?? hint;
  const messageVisible = Boolean(message);

  const enhancedChildren = Children.map(children, (child) => {
    if (!isValidElement(child) || !messageVisible) return child;
    const existing = (child.props as { "aria-describedby"?: string })[
      "aria-describedby"
    ];
    const combined = existing ? `${existing} ${messageId}` : messageId;
    return cloneElement(child as React.ReactElement<{ "aria-describedby"?: string }>, {
      "aria-describedby": combined,
    });
  });

  return (
    <label
      className={cn(
        "flex flex-col",
        labelSize === "md" ? "gap-2" : "gap-1.5",
        className
      )}
    >
      <Label required={required} size={labelSize}>
        {label}
      </Label>
      {enhancedChildren}
      {messageVisible && (
        <span
          id={messageId}
          className={cn(
            "text-[12px]",
            error ? "text-err-ink" : "text-ink-3"
          )}
        >
          {message}
        </span>
      )}
    </label>
  );
}
