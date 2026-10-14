import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type Variant = "signal" | "outline" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono uppercase tracking-[0.06em] transition-colors duration-150 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  signal:
    "rounded-xs bg-signal text-on-signal hover:bg-ink hover:text-bg",
  outline:
    "rounded-xs border border-line-strong bg-surface text-ink hover:border-ink",
  ghost: "text-label text-dim hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-4 text-label",
  sm: "h-9 px-3 text-label",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = CommonProps & { to: string; href?: never };
type ButtonAsAnchor = CommonProps & {
  href: string;
  to?: never;
} & Omit<ComponentPropsWithoutRef<"a">, "className" | "children">;
type ButtonAsButton = CommonProps & {
  to?: never;
  href?: never;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export type ButtonProps = ButtonAsLink | ButtonAsAnchor | ButtonAsButton;

/** Botão do sistema. Renderiza <Link>, <a> ou <button> conforme as props. */
export function Button(props: ButtonProps) {
  const { variant = "outline", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { variant: _v, size: _s, className: _c, children: _ch, href, ...rest } =
      props as ButtonAsAnchor;
    const external = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as ButtonAsButton;
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
