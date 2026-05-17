import { cn } from "@/lib/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

function CardRoot({ className, children, ...rest }: CardProps) {
  return (
    <div
      {...rest}
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-bg-card shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

type CardHeaderProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  leading?: React.ReactNode;
};

function CardHeader({
  title,
  description,
  action,
  leading,
  className,
  children,
  ...rest
}: CardHeaderProps) {
  return (
    <header
      {...rest}
      className={cn(
        "flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5 sm:py-4",
        className
      )}
    >
      {children ?? (
        <>
          <div className="flex min-w-0 items-center gap-3">
            {leading}
            <div className="flex min-w-0 flex-col">
              {title && (
                <h2 className="text-[15px] font-semibold text-ink">{title}</h2>
              )}
              {description && (
                <p className="text-[12px] text-ink-3">{description}</p>
              )}
            </div>
          </div>
          {action}
        </>
      )}
    </header>
  );
}

type CardBodyPadding = "none" | "sm" | "md";

type CardBodyProps = React.HTMLAttributes<HTMLDivElement> & {
  padding?: CardBodyPadding;
};

const bodyPaddingClasses: Record<CardBodyPadding, string> = {
  none: "",
  sm: "p-3 sm:p-4",
  md: "p-4 sm:p-5",
};

function CardBody({
  padding = "md",
  className,
  children,
  ...rest
}: CardBodyProps) {
  return (
    <div {...rest} className={cn(bodyPaddingClasses[padding], className)}>
      {children}
    </div>
  );
}

CardRoot.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardBody.displayName = "Card.Body";

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Body: CardBody,
});
