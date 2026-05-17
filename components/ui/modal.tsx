"use client";

import { useEffect, useRef } from "react";
import { IconButton } from "./icon-button";
import { cn } from "@/lib/cn";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ModalSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<ModalSize, string> = {
  sm: "sm:max-w-[420px]",
  md: "sm:max-w-[620px]",
  lg: "sm:max-w-[900px]",
  xl: "lg:max-w-[1240px]",
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  ariaLabel: string;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  className?: string;
  children: React.ReactNode;
};

function ModalRoot({
  open,
  onClose,
  ariaLabel,
  size = "md",
  closeOnOverlay = true,
  className,
  children,
}: ModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    const first = cardRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    first?.focus();
    return () => {
      lastFocusedRef.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const card = cardRef.current;
      if (!card) return;
      const focusables = Array.from(
        card.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("hidden"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 lg:p-8"
    >
      <button
        type="button"
        aria-label={closeOnOverlay ? "Fechar overlay" : undefined}
        aria-hidden={!closeOnOverlay || undefined}
        tabIndex={-1}
        disabled={!closeOnOverlay}
        className="absolute inset-0 bg-ink/30 backdrop-blur-[2px] disabled:cursor-default"
        onClick={closeOnOverlay ? onClose : undefined}
      />
      <div
        ref={cardRef}
        className={cn(
          "relative z-10 flex max-h-[95vh] w-full max-w-[95vw] flex-col overflow-hidden rounded-2xl bg-bg-card shadow-lg sm:max-h-[90vh]",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

type ModalHeaderProps = {
  title: string;
  subtitle?: string;
  leading?: React.ReactNode;
  onClose?: () => void;
  className?: string;
};

function ModalHeader({
  title,
  subtitle,
  leading,
  onClose,
  className,
}: ModalHeaderProps) {
  return (
    <header
      className={cn(
        "flex items-start justify-between gap-3 border-b border-line px-4 py-3 sm:px-6 sm:py-4",
        className
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        {leading}
        <div className="flex min-w-0 flex-col leading-tight">
          <h2 className="text-[17px] font-semibold text-ink">{title}</h2>
          {subtitle && <p className="text-[12px] text-ink-3">{subtitle}</p>}
        </div>
      </div>
      {onClose && (
        <IconButton aria-label="Fechar" onClick={onClose}>
          ✕
        </IconButton>
      )}
    </header>
  );
}

type ModalBodyPadding = "none" | "sm" | "md";

type ModalBodyProps = {
  padding?: ModalBodyPadding;
  className?: string;
  children: React.ReactNode;
};

const bodyPaddingClasses: Record<ModalBodyPadding, string> = {
  none: "",
  sm: "px-4 py-3 sm:px-5 sm:py-4",
  md: "px-4 py-4 sm:px-6 sm:py-5",
};

function ModalBody({ padding = "md", className, children }: ModalBodyProps) {
  return (
    <div
      className={cn(
        "flex-1 overflow-y-auto",
        bodyPaddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

type ModalFooterProps = {
  className?: string;
  children: React.ReactNode;
};

function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <footer
      className={cn(
        "flex flex-wrap items-center justify-between gap-2 border-t border-line px-4 py-3 sm:px-6",
        className
      )}
    >
      {children}
    </footer>
  );
}

ModalRoot.displayName = "Modal";
ModalHeader.displayName = "Modal.Header";
ModalBody.displayName = "Modal.Body";
ModalFooter.displayName = "Modal.Footer";

export const Modal = Object.assign(ModalRoot, {
  Header: ModalHeader,
  Body: ModalBody,
  Footer: ModalFooter,
});
