import { forwardRef } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ error, className, ...rest }, ref) {
    return (
      <textarea
        ref={ref}
        aria-invalid={error || undefined}
        {...rest}
        className={cn(
          "w-full rounded-xl border bg-bg-card px-4 py-3 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:ring-4",
          error
            ? "border-err focus:border-err focus:ring-err-soft"
            : "border-line-strong focus:border-accent focus:ring-accent-soft",
          className
        )}
      />
    );
  }
);
