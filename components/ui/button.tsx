import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

/* ============================================================================
   BUTTON
   ----------------------------------------------------------------------------
   Feedback lives on `:active` with a 100ms transition, so the press registers
   the instant the pointer goes down rather than on release. That single
   detail is most of the difference between an interface that feels responsive
   and one that feels remote.
   ========================================================================== */

type Variant = "primary" | "ghost" | "line";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-tungsten text-negative hover:bg-tungsten-soft border border-transparent",
  ghost:
    "bg-transparent text-ink border border-negative-edge hover:border-tungsten hover:text-tungsten",
  line: "bg-transparent text-ink border-0 px-0 hover:text-tungsten",
};

export function Button({
  children,
  href,
  variant = "primary",
  className,
  magnetic = false,
  icon = true,
  reticle,
  ...rest
}: {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
  icon?: boolean;
  reticle?: string;
} & Omit<React.ComponentProps<typeof Link>, "href" | "className" | "children">) {
  const external = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  const content = (
    <span className="inline-flex items-center gap-2">
      {children}
      {icon && (
        <ArrowUpRight
          className="h-4 w-4 transition-transform duration-300 ease-[var(--ease-out-quint)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      )}
    </span>
  );

  const classes = cn(
    "group inline-flex items-center justify-center rounded-full px-6 py-3",
    "font-medium text-[0.9375rem] tracking-[-0.01em]",
    "transition-colors duration-200 ease-out",
    "active:scale-[0.97] [transition-property:color,background-color,border-color,transform] active:duration-100",
    VARIANTS[variant],
    className
  );

  const link = external ? (
    <a
      href={href}
      className={classes}
      data-reticle={reticle}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={classes} data-reticle={reticle} {...rest}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}
