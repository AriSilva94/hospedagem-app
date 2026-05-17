import { cn } from "@/lib/cn";

type AvatarTone =
  | "accent"
  | "ink"
  | "capa-1"
  | "capa-2"
  | "capa-3"
  | "capa-4"
  | "capa-5"
  | "capa-6"
  | "capa-7"
  | "capa-8"
  | "capa-9"
  | "capa-olive"
  | "capa-sage";

type AvatarSize = "sm" | "md" | "lg";
type AvatarShape = "circle" | "rounded";

type AvatarProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: AvatarTone;
  size?: AvatarSize;
  shape?: AvatarShape;
};

const toneClasses: Record<AvatarTone, string> = {
  accent: "bg-accent text-white",
  ink: "bg-ink text-bg-card",
  "capa-1": "bg-capa-1 text-white",
  "capa-2": "bg-capa-2 text-white",
  "capa-3": "bg-capa-3 text-white",
  "capa-4": "bg-capa-4 text-white",
  "capa-5": "bg-capa-5 text-white",
  "capa-6": "bg-capa-6 text-white",
  "capa-7": "bg-capa-7 text-white",
  "capa-8": "bg-capa-8 text-white",
  "capa-9": "bg-capa-9 text-white",
  "capa-olive": "bg-capa-olive text-white",
  "capa-sage": "bg-capa-sage text-white",
};

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-7 w-7 text-[12px]",
  md: "h-10 w-10 text-[15px]",
  lg: "h-16 w-16 font-serif text-2xl",
};

const shapeClasses: Record<AvatarShape, string> = {
  circle: "rounded-full",
  rounded: "rounded-xl",
};

export function Avatar({
  tone = "accent",
  size = "md",
  shape = "circle",
  className,
  children,
  ...rest
}: AvatarProps) {
  return (
    <span
      {...rest}
      className={cn(
        "grid shrink-0 place-items-center font-semibold",
        toneClasses[tone],
        sizeClasses[size],
        shapeClasses[shape],
        className
      )}
    >
      {children}
    </span>
  );
}
